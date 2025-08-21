import { describe, it, expect, vi, beforeEach } from "vitest";

import { initCopy } from "../../../components/buttons/copy-btn";

describe("copy-btn.js", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div class="copy-contents">
      <p class="copy-link">copy icon</p>
      <p class="copy__value">test value</p>
    </div>
    `;

    // クリップボードAPIをモック
    Object.defineProperty(global.navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue() },
      configurable: true,
    });
  });

  it("クリックでクリップボードに値を書き込む&トースト作成", async () => {
    // Arrange
    const btn = document.querySelector(".copy-link");
    initCopy();

    // Act
    btn.click();
    await Promise.resolve();

    // Assert
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test value");
    expect(document.querySelector(".copy-dialog")).not.toBeNull();
  });

  it("ダイアログのライフサイクル", () => {});

  it("値が無いときは何も起こらない", () => {});
  it("連続クリックしてもダイアログが増えない", () => {});
});
