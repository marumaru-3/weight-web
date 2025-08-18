import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

import { handleFetchErrorUI } from "../../api/ui-error-handler";

describe("ui-error-handler.js / handleFetchErrorUI", () => {
  let originalAlert;

  beforeEach(() => {
    vi.restoreAllMocks();

    // alert をモック（happy-dom でも一応上書きして明示）
    originalAlert = global.alert;
    global.alert = vi.fn();

    // console をサイレンスしつつスパイ化
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    global.alert = originalAlert;
  });

  it("Content-Type が JSON のとき：サーバーレスポンスを log し、alert を表示する", async () => {
    const response = {
      headers: { get: () => "application/json; charset=utf-8" },
      json: async () => ({ error: "bad request" }),
      text: async () => "SHOULD_NOT_CALL",
    };

    const err = new Error("boom");
    await handleFetchErrorUI(err, response);

    expect(console.log).toHaveBeenCalledWith("通信エラー:", err);
    expect(console.log).toHaveBeenCalledWith("サーバーレスポンス:", {
      error: "bad request",
    });
    expect(global.alert).toHaveBeenCalledWith(
      "モーダルの読み込みに失敗しました。\n" + err.message
    );
  });

  it("Content-Type が JSON 以外のとき：text を log し、alert は出さない", async () => {
    const response = {
      headers: { get: () => "text/html" },
      json: async () => ({ SHOULD_NOT: "CALL" }),
      text: async () => "<html>oops</html>",
    };

    await handleFetchErrorUI(new Error("x"), response);

    expect(console.log).toHaveBeenCalledWith(
      "サーバーレスポンス:",
      "<html>oops</html>"
    );
    expect(global.alert).not.toHaveBeenCalled();
  });

  it("レスポンス解析で例外が起きた場合：console.error を出す（フォールバック確認）", async () => {
    const response = {
      headers: { get: () => null },
      text: async () => {
        throw new Error("parse fail");
      },
    };

    await handleFetchErrorUI(new Error("network"), response);

    expect(console.error).toHaveBeenCalledWith(
      "エラー内容の解析中に失敗しました:",
      expect.any(Error)
    );
  });
});
