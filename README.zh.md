# Proj.Help

[English](README.md) · [中文](README.zh.md) · [Deutsch](README.de.md)

一个社区看板：发布项目点子、获取帮助与回复，并以英文或中文阅读帖子。

登录方式为 **仅 Microsoft**。只有允许域名下的学校 Microsoft 账号可以加入。域名在代码中配置，界面不会显示。

应用使用 Next.js，部署在 Vercel，并使用 Supabase（Auth、Postgres 与行级安全）。

## 功能

- 按分类发布项目点子，并说明需要的帮助
- 收集回复，包括「我可以帮忙」
- 在英文和中文之间翻译点子或回复
- 在 English 与 中文 之间切换界面

## 本地开发

```bash
npm install
cp .env.example .env.local
```

### 1. 启动 Supabase

```bash
npx supabase start
```

把 API URL 和 publishable/anon key 写入 `.env.local`：

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

如果你不是在全新的本地环境上，请套用 schema：

```bash
npx supabase db reset
```

### 2. Microsoft Entra ID（登录必需）

1. 在 [Azure Portal](https://portal.azure.com) → Microsoft Entra ID → App registrations → New registration。
2. 支持的账户类型：若你有学校租户，选 **this organization only**，否则选任意组织目录中的账户。
3. Redirect URI（Web）：`https://<project-ref>.supabase.co/auth/v1/callback`  
   本地：`http://localhost:54321/auth/v1/callback`
4. 创建一个 client secret。
5. 在 ID token 上添加可选声明 `email` 和 `xms_edov`（见 [Supabase Azure 指南](https://supabase.com/docs/guides/auth/social-login/auth-azure)）。
6. 在 Supabase Auth → Providers → Azure 中启用 Azure，并填入 client ID、secret，以及可选的租户 URL：
   `https://login.microsoftonline.com/<tenant-id>`
7. 本地 CLI 把同样的值放进 `supabase/.env`：

```env
AZURE_CLIENT_ID=
AZURE_SECRET=
AZURE_TENANT_URL=https://login.microsoftonline.com/<tenant-id>
```

邮箱/密码注册已关闭。`before_user_created` 钩子会拒绝任何非 Microsoft、或不在允许学校域名下的账号。OAuth 回调与 RLS 策略执行同一条规则。

### 3. 运行站点

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## Vercel

本仓库是 Next.js 应用。`vercel.json` 把 Application / Framework Preset 设为 **Next.js**。如果现有 Vercel 项目仍显示 Other 或为空：

1. 打开项目 → **Settings → General → Framework Preset**
2. 选择 **Next.js**
3. 构建命令保持 `npm run build`（或 Next.js 默认值）
4. 重新部署

在 Vercel 中导入 Git 仓库（或运行 `npx vercel`）。Root Directory 应保持为空 / 仓库根目录。

## Supabase（必须自行连接）

本仓库**没有**创建或关联托管的 Supabase 项目。在完成以下步骤之前，登录、点子和回复都无法工作：

1. 在 [supabase.com](https://supabase.com) 创建项目。
2. 运行 schema：在 Supabase SQL 编辑器中粘贴 `supabase/migrations/20260904112922_init_proj_help.sql`，**或者**关联 CLI（`npx supabase link` 然后 `npx supabase db push`）。
3. 在 Supabase **Authentication → Providers** 中启用 **Azure**，并填入 Microsoft 应用的 client ID、secret 以及可选租户 URL。
4. 在 Supabase **Authentication → URL configuration** 中：
   - Site URL：`https://<your-vercel-domain>`
   - Redirect allow list：`https://<your-vercel-domain>/auth/callback`
5. 在 Vercel → **Settings → Environment Variables** 中添加：
   - `NEXT_PUBLIC_SUPABASE_URL` — Project Settings → API → Project URL
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — publishable / anon key
6. 可选：在 Vercel Marketplace 添加 **Supabase** 集成，而不用手填这两个值。
7. 变量保存后，在 Vercel 上重新部署。

Microsoft 登录还需要上面本地开发步骤中的 Entra ID 应用。Azure redirect URI 必须是 `https://<project-ref>.supabase.co/auth/v1/callback`。

翻译功能可添加 [AI Gateway](https://vercel.com/docs/ai-gateway) 密钥作为 `AI_GATEWAY_API_KEY`，或在生产环境依赖 Vercel OIDC。

## 环境变量

| 名称 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | 浏览器/服务器 publishable key |
| `AI_GATEWAY_API_KEY` | 可选。启用点子/回复翻译 |
| `AZURE_CLIENT_ID` / `AZURE_SECRET` | Microsoft 应用（本地 Supabase） |
| `AZURE_TENANT_URL` | 可选的学校租户限制 |

## 安全

- 只启用 Azure 提供方
- `public.hook_restrict_signup_to_school` 会拦截非 Microsoft 以及非学校域名的注册
- 若邮箱或提供方不对，`/auth/callback` 路由会把用户签出
- 每张公开表都有 RLS，要求 JWT 邮箱属于学校域名
- 授权从不读取 `user_metadata`
