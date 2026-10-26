# 咕噜口语官网

基于 Next.js App Router，使用 Node.js 服务部署。

```bash
npm ci
npm run dev
```

## 构建与服务器部署

```bash
npm ci
npm run build
```

开发服务使用 `.next-dev/`，生产构建使用 `.next/`，两者可以同时运行。

`npm run build` 会清理并重新生成完整运行目录 `dist/`，不生成压缩包，由流水线负责打包或上传：

```text
dist/
├── server.js
├── package.json
├── node_modules/       # 构建时收集的必要运行依赖
├── public/             # 图片、字体等资源
└── .next/              # 服务端产物和 static 浏览器资源
```

流水线必须收集 **dist 下的全部内容，包含隐藏目录 .next/**；不要只匹配 `dist/*` 而漏掉隐藏文件。将目录内容部署到服务器后，进入发布目录启动：

```bash
HOSTNAME=127.0.0.1 PORT=3000 NODE_ENV=production node server.js
```

服务器只需 Node.js，不必上传源码或重新安装 npm 依赖。构建机和服务器需使用兼容的操作系统、CPU 架构及相同 Node.js 主版本；部署 Linux 服务器时应在 Linux 环境构建。

本地验证构建产物可使用 `HOSTNAME=127.0.0.1 PORT=3000 npm run start`。端口和监听地址通过环境变量配置，不再向启动命令传 `--port` 或 `--hostname`。

Nginx 代理到 `127.0.0.1:3000`，进程守护交给现有 systemd/PM2 服务。日志输出到控制台，可由进程管理器或 nohup 收集。构建前可设置 `SITE_URL` 和 `NEXT_PUBLIC_BASE_PATH`。

## 资讯与文章

文章由 Next.js 服务端实时读取 `speakguru-engine-v2--backend` 的公开文章接口；不读取本地 Markdown / HTML 文件，也不依赖浏览器缓存。后台新增、更新文章后，下次请求即可显示，无需重新构建官网。

官网通过服务端环境变量 `ARTICLE_API_BASE_URL` 配置文章接口根地址；未设置时默认使用 `https://test-enginev2.huoideas.com/api/v1/public/seo/articles`。文章使用后端 `spring.datasource` 数据库中的 `app_seo_article` 表。

```bash
ARTICLE_API_BASE_URL=https://test-enginev2.huoideas.com/api/v1/public/seo/articles HOSTNAME=127.0.0.1 PORT=8000 NODE_ENV=production node server.js
```

修改接口地址后重启 Node 进程即可，无需重新构建。

完整接口、SEO、异常处理及部署说明见 [文章维护指南](docs/articles.md)。
