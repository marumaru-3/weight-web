import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import {
  initCopy,
  DIALOG_CLASS,
  SHOW_DELAY_MS,
  HIDE_AFTER_MS,
  REMOVE_AFTER_MS,
} from "../../../components/buttons/copy-btn";

describe("copy-btn.js", () => {
  let root;

  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = `
    <div id="root">
      <div class="copy-contents">
        <p class="copy-link">copy icon</p>
        <p class="copy__value">test value</p>
      </div>
    </div>
    `;

    root = document.getElementById("root");

    // クリップボードAPIをモック
    Object.defineProperty(global.navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue() },
      configurable: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });

  it("クリックでクリップボードに値を書き込む&トースト作成", async () => {
    // Arrange
    const btn = root.querySelector(".copy-link");
    initCopy(root);

    // Act
    btn.click();
    await Promise.resolve();

    // Assert
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test value");
    expect(document.querySelector(`.${DIALOG_CLASS}`)).not.toBeNull();
  });

  it("ダイアログが表示→非表示→削除される", async () => {
    // Arrange
    const btn = root.querySelector(".copy-link");
    initCopy(root);

    // Act
    btn.click();
    await Promise.resolve();

    // Assert
    // 生成直後：要素はあるが .show はまだ付かない（10ms後）
    let dialog = document.querySelector(`.${DIALOG_CLASS}`);
    expect(dialog).not.toBeNull();
    expect(dialog.classList.contains("show")).toBe(false);

    // SHOW_DELAY_MS 通過 → .show が付く
    vi.advanceTimersByTime(SHOW_DELAY_MS);
    expect(dialog.classList.contains("show")).toBe(true);

    // HIDE_AFTER_MS 通過 → .show が外れる
    vi.advanceTimersByTime(HIDE_AFTER_MS - SHOW_DELAY_MS);
    expect(dialog.classList.contains("show")).toBe(false);

    // REMOVE_AFTER_MS 通過 → 要素が削除される
    vi.advanceTimersByTime(REMOVE_AFTER_MS - HIDE_AFTER_MS);
    dialog = document.querySelector(`.${DIALOG_CLASS}`);
    expect(dialog).toBeNull();
  });

  it("連続クリックしてもダイアログが増えない", async () => {
    // Arrange
    const btn = root.querySelector(".copy-link");
    initCopy(root);

    // 1回目
    btn.click();
    await Promise.resolve();
    let dialogs = document.querySelectorAll(`.${DIALOG_CLASS}`);
    expect(dialogs.length).toBe(1);
    const first = dialogs[0];

    // 2回目
    btn.click();
    await Promise.resolve();
    dialogs = document.querySelectorAll(`.${DIALOG_CLASS}`);
    expect(dialogs.length).toBe(1);
    expect(dialogs[0]).toBe(first);
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
  });

  it("ダイアログのA11y属性が正しく設定される", async () => {
    // Arrange
    const btn = root.querySelector(".copy-link");
    initCopy(root);

    // Act
    btn.click();
    await Promise.resolve();

    // Assert
    let dialog = document.querySelector(`.${DIALOG_CLASS}`);
    expect(dialog.getAttribute("role")).toBe("status");
    expect(dialog.getAttribute("aria-live")).toBe("polite");
    expect(dialog.getAttribute("aria-atomic")).toBe("true");
  });

  it("ダイアログのメッセージ差し替え", async () => {
    // Arrange
    const btn = root.querySelector(".copy-link");
    initCopy(root, { message: "差し替えたメッセージだよ" });

    // Act
    btn.click();
    await Promise.resolve();

    // Assert
    let dialog = document.querySelector(`.${DIALOG_CLASS}`);
    expect(dialog.textContent).toBe("差し替えたメッセージだよ");
  });
});
