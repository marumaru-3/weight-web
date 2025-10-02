import { describe, it, expect, beforeEach } from "vitest";

import {
  initRestrictToAlphanumeric,
  initRestrictToNumeric,
  initRestrictDecimal,
} from "../../../features/forms/input-filters";

describe("input-filters.js", () => {
  let input;
  beforeEach(() => {
    document.body.innerHTML = `<input id="test" type="text">`;
    input = document.querySelector("#test");
  });

  describe("initRestrictToAlphanumeric", () => {
    it("半角英数字と記号のみ許可（日本語等は除去）", () => {
      // Arrange
      initRestrictToAlphanumeric("#test");

      // Act
      input.value = "123abcあいう!@#";
      const ev = new InputEvent("input", { bubbles: true });
      input.dispatchEvent(ev);

      // Assert
      expect(input.value).toBe("123abc!@#");
    });

    it("IME中は何もしない、compositionendで1回だけ正規化", () => {
      // Arrange
      initRestrictToAlphanumeric("#test");

      // Act
      // IME開始
      input.dispatchEvent(new Event("compositionstart", { bubbles: true }));
      // IME中の未確定 input を再現
      input.value = "abcあ123[]{";
      const ev = new InputEvent("input", {
        bubbles: true,
        inputType: "insertCompositionText",
        data: "あ",
      });
      // Happy DOM 対策：isComposing を後付け
      Object.defineProperty(ev, "isComposing", { value: true });
      input.dispatchEvent(ev);

      // Assert
      // 変換中は触らない（見かけ上「あ」が見えていてOK）
      expect(input.value).toBe("abcあ123[]{");
      // IME確定
      input.dispatchEvent(new Event("compositionend", { bubbles: true }));
      // 確定のタイミングで一度だけ正規化（全角除去）
      expect(input.value).toBe("abc123[]{");
    });

    it("コピーしたテキストをペーストしても許可外は除去される", () => {
      // Arrange
      initRestrictToAlphanumeric("#test");

      // Act
      input.value = "Aびーcd1234+ *;";
      const ev = new InputEvent("input", {
        bubbles: true,
        inputType: "insertFromPaste",
        data: "Aびーcd1234+ *;",
      });
      input.dispatchEvent(ev);

      // Assert
      expect(input.value).toBe("Acd1234+ *;");
    });

    it("すべて無効文字なら空になる", () => {
      // Arrange
      initRestrictToAlphanumeric("#test");

      // Act
      input.value = "１２３４あいうえおＡＢＣ";
      const ev = new InputEvent("input", { bubbles: true });
      input.dispatchEvent(ev);

      // Assert
      expect(input.value).toBe("");
    });
  });

  describe("initRestrictToNumeric", () => {
    it("半角数字のみ許可（0-9）", () => {
      // Arrange
      initRestrictToNumeric("#test");

      // Act
      input.value = "0123abcあいう!@#9";
      const ev = new InputEvent("input", { bubbles: true });
      input.dispatchEvent(ev);

      // Assert
      expect(input.value).toBe("01239");
    });
  });

  describe("initRestrictDecimal", () => {
    it("数値のみ整数部 0〜3 桁まで", () => {
      // Arrange
      initRestrictDecimal("#test");

      // Act
      input.value = "abc78@!9ああ";
      const ev = new InputEvent("input", { bubbles: true });
      input.dispatchEvent(ev);

      // Assert
      expect(input.value).toBe("789");
    });

    it("小数部 0〜1 桁まで", () => {
      // Arrange
      initRestrictDecimal("#test");

      // Act
      input.value = "789.234.5";
      const ev = new InputEvent("input", { bubbles: true });
      input.dispatchEvent(ev);

      // Assert
      expect(input.value).toBe("789.2");
    });

    it("余分なドットは1個に正規化し、小数は1桁に制限", () => {
      // Arrange
      initRestrictDecimal("#test");

      // Act
      input.value = "1..2.34";
      const ev = new InputEvent("input", { bubbles: true });
      input.dispatchEvent(ev);

      // Assert
      expect(input.value).toBe("1.2");
    });

    it("末尾ドットを許容する", () => {
      // Arrange
      initRestrictDecimal("#test");

      // Act
      input.value = "111.";
      const ev = new InputEvent("input", { bubbles: true });
      input.dispatchEvent(ev);

      // Assert
      expect(input.value).toBe("111.");
    });

    it("先頭ドットを許容する", () => {
      // Arrange
      initRestrictDecimal("#test");

      // Act
      input.value = ".9";
      const ev = new InputEvent("input", { bubbles: true });
      input.dispatchEvent(ev);

      // Assert
      expect(input.value).toBe(".9");
    });

    it("最大 999.9まで", () => {
      // Arrange
      initRestrictDecimal("#test");

      // Act
      input.value = "999.9";
      const ev = new InputEvent("input", { bubbles: true });
      input.dispatchEvent(ev);

      // Assert
      expect(input.value).toBe("999.9");
    });

    it("上限を超えた場合は 999.9 に丸める（整数/小数）", () => {
      // Arrange
      initRestrictDecimal("#test");

      input.value = "1234.5";
      const ev1 = new InputEvent("input", { bubbles: true });
      input.dispatchEvent(ev1);
      expect(input.value).toBe("999.9");

      input.value = "1000";
      const ev2 = new InputEvent("input", { bubbles: true });
      input.dispatchEvent(ev2);
      expect(input.value).toBe("999.9");
    });
  });
});
