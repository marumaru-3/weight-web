import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

const PATH_VALIDATE = "../../../features/forms/field-validate";
const PATH_VALIDATORS = "../../../features/forms/field-validators";
const PATH_UI = "../../../features/forms/field-ui";

vi.mock("../../../features/forms/field-validators", () => ({
  validateInput: vi.fn(),
}));
vi.mock("../../../features/forms/field-ui", () => ({
  bindValidationUI: vi.fn(),
}));

import * as validators from "../../../features/forms/field-validators.js";

const load = async () => {
  const validate = await import(PATH_VALIDATE);
  const validators = await import(PATH_VALIDATORS);
  const ui = await import(PATH_UI);
  return { ...validate, ...validators, ...ui };
};

describe("field-validate.js", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    document.body.innerHTML = `
      <form id="test-form">
        <div class="basic-info-form__box">
          <div class="validate-form__input">
            <div class="label-name">ユーザー名</div>
            <input type="text" id="username" required />
          </div>
        </div>
        <div class="basic-info-form__box">
          <div class="validate-form__input">
            <div class="label-name">年</div>
            <select name="birth-year"
              id="birth-year"
              class="label-input"
              required>
              <option value disabled selected></option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>
        <div class="basic-info-form__box">
          <div class="validate-form__input">
            <div class="label-name">内容</div>
            <textarea id="content" name="content" rows="5" cols="33" required>
            </textarea>
          </div>
        </div>

      </form>
    `;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("initCheckBtn", () => {
    let initCheckBtn, validateInput, bindValidationUI;
    let form, input, select, textarea;
    let result;

    beforeEach(async () => {
      ({ initCheckBtn, validateInput, bindValidationUI } = await load());
      form = document.querySelector("#test-form");
      input = document.querySelector("#username");
      select = document.querySelector("#birth-year");
      textarea = document.querySelector("#content");
      result = { ok: false, message: "必須" };
    });

    it("input,select,textarea の3つ判定→UIが3回ずつ呼ばれる", () => {
      // Arrange
      validateInput.mockReturnValue(result);

      // Act
      initCheckBtn(form);

      // Assert
      // 各関数が3回ずつ呼ばれているか
      expect(validateInput).toHaveBeenCalledTimes(3);
      expect(bindValidationUI).toHaveBeenCalledTimes(3);

      // 各関数に引数が適切に入っているか
      expect(validateInput).toHaveBeenNthCalledWith(1, input, { root: form });
      expect(validateInput).toHaveBeenNthCalledWith(2, select, { root: form });
      expect(validateInput).toHaveBeenNthCalledWith(3, textarea, {
        root: form,
      });

      const boxInput = input.closest(".validate-form__input");
      const boxSelect = select.closest(".validate-form__input");
      const boxTextarea = textarea.closest(".validate-form__input");

      expect(bindValidationUI).toHaveBeenNthCalledWith(1, boxInput, result);
      expect(bindValidationUI).toHaveBeenNthCalledWith(2, boxSelect, result);
      expect(bindValidationUI).toHaveBeenNthCalledWith(3, boxTextarea, result);
    });

    it("disabledがある場合はスキップ", () => {
      // Arrange
      select.disabled = true;
      validateInput.mockReturnValue(result);

      // Act
      initCheckBtn(form);

      // Assert
      // 各関数がselect以外呼ばれているか
      expect(validateInput).toHaveBeenCalledTimes(2);
      expect(bindValidationUI).toHaveBeenCalledTimes(2);

      expect(validateInput).toHaveBeenNthCalledWith(1, input, { root: form });
      expect(validateInput).toHaveBeenNthCalledWith(2, textarea, {
        root: form,
      });

      const boxInput = input.closest(".validate-form__input");
      const boxTextarea = textarea.closest(".validate-form__input");

      expect(bindValidationUI).toHaveBeenNthCalledWith(1, boxInput, result);
      expect(bindValidationUI).toHaveBeenNthCalledWith(2, boxTextarea, result);
    });

    it("initCheckBtnの引数がnull/undefinedの場合は何もしない", () => {
      // Arrange
      validateInput.mockReturnValue(result);

      // Act
      initCheckBtn(null);
      initCheckBtn(undefined);

      // Assert
      // 各関数が呼ばれていないか
      expect(validateInput).toHaveBeenCalledTimes(0);
      expect(bindValidationUI).toHaveBeenCalledTimes(0);
    });
  });

  describe("initValidateBtn", () => {
    let mod;
    let form;

    const REQ_SELECTOR =
      "input[required], select[required], textarea[required]";

    const getRequiredCount = (root) =>
      root.querySelectorAll(REQ_SELECTOR).length;

    beforeEach(async () => {
      form = document.querySelector("#test-form");
      validators.validateInput.mockReturnValue({ ok: true, message: "" });
      mod = await import(PATH_VALIDATE);
    });

    it("初期化時に全 required を1回だけ再計算する", () => {
      // Act
      mod.initValidateBtn(form);

      // Assert
      expect(validators.validateInput).toHaveBeenCalledTimes(
        getRequiredCount(form)
      );
    });

    it("inputイベントで再計算する", () => {
      // Arrange
      mod.initValidateBtn(form);
      validators.validateInput.mockClear();

      // Act
      const input = form.querySelector("#username");
      input.value = "Alice";
      input.dispatchEvent(new Event("input", { bubbles: true }));

      // Assert
      expect(validators.validateInput).toHaveBeenCalledTimes(
        getRequiredCount(form)
      );
    });

    it("changeイベントで再計算する", () => {
      // Arrange
      mod.initValidateBtn(form);
      validators.validateInput.mockClear();

      // Act
      const select = form.querySelector("#birth-year");
      select.value = "2025";
      select.dispatchEvent(new Event("change", { bubbles: true }));

      // Assert
      expect(validators.validateInput).toHaveBeenCalledTimes(
        getRequiredCount(form)
      );
    });

    it("nextボタンクリックで再計算する", () => {
      // Arrange
      form.insertAdjacentHTML(
        "beforeend",
        `<button type="button" class="next-btn">next</button>`
      );
      vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
        cb(0);
        return 1;
      });
      mod.initValidateBtn(form);
      validators.validateInput.mockClear();

      // Act
      form.querySelector(".next-btn").click();

      // Assert
      expect(validators.validateInput).toHaveBeenCalledTimes(
        getRequiredCount(form)
      );
    });

    it("prevボタンクリックで再計算する", () => {
      // Arrange
      form.insertAdjacentHTML(
        "beforeend",
        `<button type="button" class="prev-btn">prev</button>`
      );
      vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
        cb(0);
        return 1;
      });
      mod.initValidateBtn(form);
      validators.validateInput.mockClear();

      // Act
      form.querySelector(".prev-btn").click();

      // Assert
      expect(validators.validateInput).toHaveBeenCalledTimes(
        getRequiredCount(form)
      );
    });

    it("引数がnullの場合は何もしない", () => {
      // Act
      mod.initValidateBtn(null);

      // Assert
      expect(validators.validateInput).toHaveBeenCalledTimes(0);
    });

    it("二重初期化してもイベントは重複しない", () => {
      // Arrange
      mod.initValidateBtn(form);
      mod.initValidateBtn(form);
      validators.validateInput.mockClear();

      // Act
      const input = form.querySelector("#username");
      input.value = "Alice";
      input.dispatchEvent(new Event("input", { bubbles: true }));

      // Assert
      expect(validators.validateInput).toHaveBeenCalledTimes(
        getRequiredCount(form)
      );
    });
  });

  // describe("initValidateForm", () => {});
  // describe("initTextLabelUI", () => {});
  // describe("initRealtimeOnClick", () => {
  //   let initCheckBtn, validateInput, bindValidationUI;

  //   beforeEach(async () => {
  //     ({ initCheckBtn, validateInput, bindValidationUI } = await load());
  //   });

  //   it("テスト1", () => {});
  //   it("テスト2", () => {});
  // });
});
