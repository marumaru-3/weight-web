import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("../../api/ui-error-handler.js", () => ({
  handleFetchErrorUI: vi.fn().mockResolvedValue(undefined),
}));

const importTarget = () => import("../../api/fetch.js");

describe("fetch.js / fetchData", () => {
  beforeEach(() => {
    vi.resetModules();
    global.fetch = vi.fn();
  });

  it("JSONを返す (ok=true & Content-Type: application/json) ", async () => {
    const json = { ok: 1 };
    global.fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => "application/json; charset=utf-8" },
      json: async () => json,
      text: async () => "SHOULD_NOT_CALL",
    });

    const { fetchData } = await importTarget();
    const res = await fetchData("/api");
    expect(res).toEqual(json);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("TEXTを返す (ok=true & 非JSON) ", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => "text/html" },
      json: async () => ({ SHOULD_NOT: "CALL" }),
      text: async () => "<div>html</div>",
    });

    const { fetchData } = await importTarget();
    const res = await fetchData("/page");
    expect(res).toBe("<div>html</div>");
  });

  it("異常系 (ok=false) :UIハンドラが呼ばれ、失敗オブジェクトを返す", async () => {
    const response = {
      ok: false,
      headers: { get: () => "application/json" },
      json: async () => ({ error: "bad" }),
      text: async () => "bad",
    };
    global.fetch.mockResolvedValue(response);

    const { handleFetchErrorUI } = await import(
      "../../api/ui-error-handler.js"
    );
    const { fetchData } = await importTarget();

    const res = await fetchData("/404");
    expect(handleFetchErrorUI).toHaveBeenCalled(expect.any(Error), response);
    expect(res).toEqual({
      success: false,
      message: "通信エラーが発生しました。",
    });
  });
});
