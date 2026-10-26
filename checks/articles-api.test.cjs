const { test, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

// Use the existing compiler; disable render-scoped memoization in unit tests.
function loadUtility(name) {
  const filename = path.resolve(`lib/${name}.ts`);
  const mod = new Module(filename, module);
  mod.filename = filename;
  mod.paths = module.paths;
  const originalRequire = mod.require.bind(mod);
  mod.require = id => id === "react" ? { cache: fn => fn } : id === "./article-html" ? loadUtility("article-html") : originalRequire(id);
  mod._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText, filename);
  return mod.exports;
}
const { getArticlePage, getArticle } = loadUtility("articles");
const originalFetch = global.fetch;
afterEach(() => { global.fetch = originalFetch; });
const fixture = { id: 42, title: "真实标题", content: '<html><head><style>bad</style></head><body><p>正文</p><script>bad()</script></body></html>', createTime: "2026-10-21 09:30:00", updateTime: null };
function respond(data, code = "SUCCESS") { return new Response(JSON.stringify({ code, data }), { headers: { "Content-Type": "application/json" } }); }

test("fetches only the requested page, uses total and sanitizes upstream HTML", async () => {
  global.fetch = async (url, options) => {
    assert.match(url, /\/public\/seo\/articles\?pageNum=2&pageSize=9$/);
    assert.equal(options.cache, "no-store");
    assert.ok(options.signal);
    return respond({ total: 123, list: [fixture] });
  };
  const page = await getArticlePage(2);
  assert.equal(page.total, 123);
  assert.equal(page.articles[0].html, "<p>正文</p>");
  assert.equal(page.articles[0].publishedAt, "2026-10-21T01:30:00.000Z");
});
test("repeated requests read updated backend content", async () => {
  let n = 0;
  global.fetch = async () => respond({ ...fixture, title: `版本${++n}` });
  assert.equal((await getArticle("42")).title, "版本1");
  assert.equal((await getArticle("42")).title, "版本2");
});
test("distinguishes missing articles from upstream failures", async () => {
  global.fetch = async () => respond(null);
  assert.equal(await getArticle("42"), undefined);
  global.fetch = async () => new Response("not found", { status: 404 });
  assert.equal(await getArticle("42"), undefined);
  await assert.rejects(getArticlePage(), /HTTP 404/);
  global.fetch = async () => new Response("unavailable", { status: 503 });
  await assert.rejects(getArticle("42"), /HTTP 503/);
  global.fetch = async () => respond(null, 500);
  await assert.rejects(getArticle("42"), /失败状态/);
});
test("rejects invalid IDs before fetching and mismatched detail IDs", async () => {
  global.fetch = async () => { throw new Error("must not fetch"); };
  assert.equal(await getArticle("../oops"), undefined);
  global.fetch = async () => respond({ ...fixture, id: 43 });
  await assert.rejects(getArticle("42"), /ID 不匹配/);
});
test("keeps sitemap caching separate and rejects malformed lists", async () => {
  global.fetch = async (_, options) => {
    assert.equal(options.next.revalidate, 300);
    return respond({ total: 1, list: [fixture] });
  };
  await getArticlePage(1, 100, 300);
  global.fetch = async () => respond({ total: 1, list: null });
  await assert.rejects(getArticlePage(), /格式异常/);
  await assert.rejects(getArticlePage(-1), /分页参数无效/);
});

test("reads configured backend base URL at runtime and removes trailing slash", async () => {
  const previous = process.env.ARTICLE_API_BASE_URL;
  process.env.ARTICLE_API_BASE_URL = "http://backend.test/api/v1/public/seo/articles/";
  try {
    global.fetch = async (url) => {
      assert.equal(url, "http://backend.test/api/v1/public/seo/articles/42");
      return respond(fixture);
    };
    assert.equal((await getArticle("42")).slug, "42");
  } finally {
    if (previous === undefined) delete process.env.ARTICLE_API_BASE_URL;
    else process.env.ARTICLE_API_BASE_URL = previous;
  }
});
