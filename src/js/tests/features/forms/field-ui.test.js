import { describe, it, expect, beforeEach } from "vitest";

import { VALIDATION } from "../../../features/forms/field-validators";

import {
  bindValidationUI,
  bindTextLabelUI,
} from "../../../features/forms/field-ui";

describe("field-ui.js", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("bindValidationUI", () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div class="basic-info-form__box">
          <div class="basic-info-form__input validate-form__input">
            <label for="username" class="text-label">
              <div class="label-name">
                ユーザー名（必須）
              </div>
              <div class="label-input">
                <input type="text" id="username" name="username" class="validate-target" maxlength="10" required>
              </div>
            </label>
          </div>
          <div class="validate-text"></div>
        </div>
      `;
    });

    it("エラー時にエラー表示が正しく反映される・ラベルを正しく切り取られている", () => {
      const container = document.querySelector(".validate-form__input");
      const result = {
        ok: false,
        code: VALIDATION.REQUIRED,
      };
      const input = document.querySelector("input");
      input.value = "";

      bindValidationUI(container, result);

      const msgEl = document.querySelector(".validate-text");

      expect(msgEl.textContent).toEqual("ユーザー名を入力してください");
      expect(container.classList.contains("no-text")).toBe(true);
      expect(container.getAttribute("aria-invalid")).toBe("true");
    });
    it("正常時にエラー表示が解除される", () => {
      const container = document.querySelector(".validate-form__input");
      const result = {
        ok: true,
      };
      const input = document.querySelector("input");
      input.value = "text";

      bindValidationUI(container, result);

      const msgEl = document.querySelector(".validate-text");

      expect(msgEl.textContent).toEqual("");
      expect(container.classList.contains("no-text")).toBe(false);
      expect(container.getAttribute("aria-invalid")).toBe("false");
    });
    it("引数が子孫要素でも処理される", () => {
      const container = document.querySelector(".validate-form__input");
      const result = {
        ok: true,
      };
      const input = document.querySelector("input");
      input.value = "text";

      bindValidationUI(input, result);

      const msgEl = document.querySelector(".validate-text");

      expect(msgEl.textContent).toEqual("");
      expect(container.classList.contains("no-text")).toBe(false);
      expect(container.getAttribute("aria-invalid")).toBe("false");
    });
    it("引数がラッパ要素でも処理される", () => {
      const wrapper = document.querySelector(".basic-info-form__box");
      const container = document.querySelector(".validate-form__input");
      const result = {
        ok: true,
      };
      const input = document.querySelector("input");
      input.value = "text";

      bindValidationUI(wrapper, result);

      const msgEl = document.querySelector(".validate-text");

      expect(msgEl.textContent).toEqual("");
      expect(container.classList.contains("no-text")).toBe(false);
      expect(container.getAttribute("aria-invalid")).toBe("false");
    });
    it("引数resultがfalsyな値のとき早期return", () => {
      const container = document.querySelector(".validate-form__input");
      const input = document.querySelector("input");
      input.value = "text";

      expect(() => bindValidationUI(container, null)).not.toThrow();

      const msgEl = document.querySelector(".validate-text");

      expect(msgEl.textContent).toEqual("");
      expect(container.classList.contains("no-text")).toBe(false);
      expect(container.hasAttribute("aria-invalid")).toBe(false);
    });
    it(".validate-textが無い場合早期return", () => {
      const msgEl = document.querySelector(".validate-text");
      msgEl.remove();

      const container = document.querySelector(".validate-form__input");
      const result = {
        ok: true,
      };
      const input = document.querySelector("input");
      input.value = "text";

      expect(() => bindValidationUI(container, result)).not.toThrow();

      expect(document.querySelector(".validate-text")).toBeNull();
      expect(container.classList.contains("no-text")).toBe(false);
      expect(container.hasAttribute("aria-invalid")).toBe(false);
    });
  });

  describe("bindTextLabelUI", () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <form id="user-info-form">
          <div class="basic-info-form__box">
            <div class="basic-info-form__input validate-form__input">
              <label for="password" class="text-label">
                <div class="label-name">
                  パスワード
                </div>
                <div class="label-input pwd">
                  <input type="password" name="password" id="password" class="validate-target" required>
                  <button type="button" class="pwd-btn">
                    目のアイコン
                  </button>
                </div>
              </label>
            </div>
            <div class="validate-text"></div>
          </div>
        </form>
      `;
    });
    it("テキスト内部クリックで発動", () => {
      const root = document;
      const container = document.querySelector(".validate-form__input");
      const input = document.querySelector("input");

      const unbind = bindTextLabelUI(root);

      input.click();

      expect(container.classList.contains("click")).toBe(true);
      expect(container.classList.contains("text-on")).toBe(true);

      unbind();
    });
    it("テキスト内部クリック2回で何もおこらない", () => {
      const root = document;
      const container = document.querySelector(".validate-form__input");
      const input = document.querySelector("input");

      const unbind = bindTextLabelUI(root);

      input.click();
      const before = [...container.classList];

      input.click();
      const after = [...container.classList];

      expect(after).toEqual(before);

      unbind();
    });
    it("unbindした後は何もおこらない", () => {
      const root = document;
      const container = document.querySelector(".validate-form__input");
      const input = document.querySelector("input");

      const unbind = bindTextLabelUI(root);

      unbind();
      input.click();

      expect(container.classList.contains("click")).toBe(false);
      expect(container.classList.contains("text-on")).toBe(false);
    });
    it("同じrootで複数回bindしても返り値（unbind）が同じ", () => {
      const root = document;

      const unbind1 = bindTextLabelUI(root);
      const unbind2 = bindTextLabelUI(root);

      expect(unbind1).toBe(unbind2);

      unbind1();
    });
  });
});
