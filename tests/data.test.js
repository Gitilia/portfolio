import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("portfolio data", () => {
  it("exports required person + project fields", () => {
    const src = readFileSync(join(root, "js/data.js"), "utf8");
    const sandbox = { window: {} };
    vm.runInNewContext(src, sandbox);
    const data = sandbox.window.PORTFOLIO;
    assert.equal(data.person.name, "Ilia Dobkin");
    assert.ok(data.projects.length >= 3);
    assert.ok(data.demos.some((d) => d.href.includes("compare.levkin.ca")));
    assert.ok(data.lanes.some((l) => l.href.includes("sdet.levkin.ca")));
  });

  it("keeps public demos on https", () => {
    const src = readFileSync(join(root, "js/data.js"), "utf8");
    const sandbox = { window: {} };
    vm.runInNewContext(src, sandbox);
    for (const d of sandbox.window.PORTFOLIO.demos) {
      assert.match(d.href, /^https:\/\//);
    }
  });
});

describe("index shell", () => {
  it("points canonical at iliadobkin.com and links sdet", () => {
    const html = readFileSync(join(root, "index.html"), "utf8");
    assert.match(html, /canonical" href="https:\/\/iliadobkin\.com\/"/);
    assert.match(html, /https:\/\/sdet\.levkin\.ca/);
  });
});
