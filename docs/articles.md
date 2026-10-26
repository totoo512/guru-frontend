# 文章维护与服务部署

## 唯一数据源

数据源为 `speakguru-engine-v2--backend` 的公开文章接口，读取该后端 `spring.datasource` 数据库中的 `app_seo_article` 表：

- 分页：`GET /api/v1/public/seo/articles?pageNum=1&pageSize=9`
- 详情：`GET /api/v1/public/seo/articles/14027`
- 响应业务状态为 `code: "SUCCESS"`；列表包含 `data.list` 和 `data.total`，按 ID 倒序。

Next.js 服务端通过 `ARTICLE_API_BASE_URL` 指定以上接口的根地址，默认值为
`http://127.0.0.1:5566/api/v1/public/seo/articles`。生产环境跨机器部署时，应在 Node 进程启动环境中填入实际后端内网或 HTTPS 地址。
该变量不带 `NEXT_PUBLIC_` 前缀，仅在服务端使用；修改后重启进程生效，无需重建。

文章由迁移后的后端自动或手动生成入库；历史文章如需继续展示，需导入该表并保留原 ID。
文章读取接口无需登录，生成入口仍要求管理员身份。本前端不提供写入接口或后台登录，也不存储本地文章副本。

列表显示接口返回的总篇数，并按接口分页。详情使用单篇接口，不依赖文章处于列表的哪一页。网址继续保留 `/news/14027`，列表分页为 `/news/page/2`。

## 新增、更新与删除

后台完成文章维护后，访客下次请求列表或详情即可读取新内容；已打开页面需刷新。列表及详情的服务端 fetch 使用 no-store，React cache 仅对同一轮渲染中的重复读取去重，不跨请求永久缓存。无需重新构建、导入文件或重启官网服务。

后台正文沿用 HTML，进入页面前会去掉脚本、事件属性、iframe 和全局样式，直接输出主页面正文，供用户和爬虫阅读。标题、摘要、日期和结构化数据均来自对应文章。接口没有提供的日期不会伪造成当前日期。

详情接口返回 HTTP 404 或 data: null 时展示 404；接口超时、HTTP 错误、业务失败或格式异常作为加载失败处理，避免将临时故障当作文章删除。辅助的推荐文章加载失败不会影响已取得的文章正文。

## SEO

文章通过服务端渲染输出完整标题和正文，具有独立 title、description、canonical、Open Graph 及 JSON-LD。保留统一顶栏和底栏。

- `/sitemap.xml`：站点地图索引。
- `/sitemaps/site.xml`：首页、企业版、资讯列表和分页。
- `/sitemaps/1.xml`、`/sitemaps/2.xml` 等：每份覆盖 100 篇文章，按需请求后台，不在单次请求中拉取全部历史文章。
- `/robots.txt`：声明站点地图索引。

站点地图的上游请求及共享缓存按 5 分钟周期刷新，内容变化可能稍晚反映。接口异常时地图返回 503，而非空地图。新增文章数跨越分片边界时，索引刷新后会自动包含新分片。

生产域名默认 `https://speakguru.net`；其他域名构建时设置 `SITE_URL`。子路径部署通过 `NEXT_PUBLIC_BASE_PATH` 配置。

## 生产部署

本项目使用 `output: "standalone"`，构建命令会自动将运行依赖及静态资源汇总到 dist/，不生成压缩包：

```bash
npm ci
npm run build
```

流水线收集 `dist/` 的全部内容（必须包括隐藏目录 `.next/`），部署后在发布目录启动：

```bash
ARTICLE_API_BASE_URL=http://127.0.0.1:5566/api/v1/public/seo/articles HOSTNAME=127.0.0.1 PORT=3000 NODE_ENV=production node server.js
```

dist/ 包含必要依赖、public 资源和浏览器静态资源；服务器无需再次 npm install。不要仅复制普通 .next 目录，也不再部署旧 out/。服务器与构建环境需保持操作系统/架构兼容，Node.js 主版本一致。

本地验证：`HOSTNAME=127.0.0.1 PORT=3000 npm run start`。建议用进程管理器保持服务运行，日志输出控制台。

Nginx 示例：

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

文章页面不要额外配置 Nginx/CDN 的长期 HTML 缓存，否则更新仍会延迟。官网服务器需能访问 `ARTICLE_API_BASE_URL` 对应的新后端；接口请求由服务端完成，不受浏览器跨域限制。

`.github/workflows/deploy.yml` 已改成构建验证，不再上传 out/ 或部署 GitHub Pages。真实服务器发布需接入该服务器的现有部署流程。

验证：`npm run test:article-api`、`npm run build`；运行生产服务后访问 `/news`、`/news/page/2`、`/news/14027` 和 `/sitemap.xml`。
