import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

const PATH_VALIDATE = "../../../features/forms/field-validate";
const PATH_VALIDATORS = "../../../features/forms/field-validators";
const PATH_UI = "../../../features/forms/field-ui";

vi.mock("../../../features/forms/field-validators", () => ({
  validateInput: vi.fn(),
}));
vi.mock("../../../features/forms/field-ui", () => ({
  bindValidationUI: vi.fn(),
  bindTextLabelUI: vi.fn(),
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

  describe("initValidateForm", () => {
    let form;
    let mod;

    const addSubmit = (state = "disabled") => {
      const disabledAttr = state === "disabled" ? "disabled" : "";
      const disabledClass = state === "disabled" ? "disabled" : "";
      form.insertAdjacentHTML(
        "beforeend",
        `<button type="button" class="submit-btn ${disabledClass}" ${disabledAttr}>送信</button>`
      );
      return form.querySelector(".submit-btn");
    };

    beforeEach(async () => {
      form = document.querySelector("#test-form");
      validators.validateInput.mockReturnValue({ ok: true, message: "" });
      mod = await import(PATH_VALIDATE);
    });

    it("必須がすべてOKなら true を返し、ボタンを有効化する", () => {
      // Arrange
      const btn = addSubmit("disabled");

      // Act
      const res = mod.initValidateForm(form);

      // Assert
      expect(res).toBe(true);
      expect(btn.disabled).toBe(false);
      expect(btn.classList.contains("disabled")).toBe(false);
      expect(
        validators.validateInput.mock.calls.every(([, o]) => o?.root === form)
      );
    });

    it("NGが1つでもあれば false を返し、ボタンを無効化する", () => {
      // Arrange
      const btn = addSubmit("disabled");
      validators.validateInput
        .mockReturnValueOnce({ ok: false, message: "入力してください" })
        .mockReturnValue({ ok: true, message: "" });

      // Act
      const res = mod.initValidateForm(form);

      // Assert
      expect(res).toBe(false);
      expect(btn.disabled).toBe(true);
      expect(btn.classList.contains("disabled")).toBe(true);
    });

    it(".step.visible があればそのステップのみ判定", () => {
      // Arrange
      form.innerHTML = `
        <div id="step1" class="step visible">
          <input type="text" id="one" required />
          <input type="text" id="two" required />
          <button type="button" id="btn--go-to-step2" class="submit-btn disabled" disabled>次に進む</button>
        </div>
        <div id="step2" class="step hidden">
          <input type="text" id="three" required />
          <button type="button" class="submit-btn disabled" disabled>送信</button>
        </div>
      `;
      const step1 = document.querySelector(".step.visible");
      const requiredInStep1 = step1.querySelectorAll("[required]").length;

      // Act
      const res = mod.initValidateForm(form);

      // Assert
      expect(res).toBe(true);

      // ① 呼び出し回数＝可視ステップ内の required 個数
      expect(validators.validateInput).toHaveBeenCalledTimes(requiredInStep1);
      // ② 呼ばれた要素は全部 step 配下
      const calls = validators.validateInput.mock.calls;
      const calledEls = calls.map(([el]) => el);
      expect(calledEls.every((el) => step1.contains(el))).toBe(true);
      // ③ すべて root は step
      expect(calls.every(([, o]) => o?.root === step1)).toBe(true);
    });

    it("ボタンが存在しなくてもエラーなく実行できる", () => {
      // Arrange
      const requiredCount = form.querySelectorAll("[required]").length;

      // Act
      const res = mod.initValidateForm(form);

      // Assert
      expect(res).toBe(true);
      expect(validators.validateInput).toHaveBeenCalledTimes(requiredCount);
    });

    it("必須が0件なら true を返し、ボタンを有効化する", () => {
      // Arrange
      form.querySelectorAll("[required]").forEach((field) => {
        field.removeAttribute("required");
      });
      const btn = addSubmit("disabled");

      // Act
      const res = mod.initValidateForm(form);

      // Assert
      expect(res).toBe(true);
      expect(btn.disabled).toBe(false);
      expect(btn.classList.contains("disabled")).toBe(false);
      expect(validators.validateInput).not.toHaveBeenCalled();
    });
  });

  describe("initTextLabelUI", () => {
    let form;
    let mod;
    let ui;

    beforeEach(async () => {
      form = document.querySelector("#test-form");
      mod = await import(PATH_VALIDATE);
      ui = await import(PATH_UI);
    });

    it("引数 root があるときbindTextLabelUIを実行", () => {
      // Act
      mod.initTextLabelUI(form);
      // Assert
      expect(ui.bindTextLabelUI).toHaveBeenCalledTimes(1);
      expect(ui.bindTextLabelUI).toHaveBeenCalledWith(form);
    });

    it("引数 root がnullの場合は実行しない", () => {
      // Act
      mod.initTextLabelUI(null);
      // Assert
      expect(ui.bindTextLabelUI).not.toHaveBeenCalled();
    });
  });

  // describe("initRealtimeOnClick", () => {
  //   let initCheckBtn, validateInput, bindValidationUI;

  //   beforeEach(async () => {
  //     ({ initCheckBtn, validateInput, bindValidationUI } = await load());
  //   });

  //   it("テスト1", () => {});
  //   it("テスト2", () => {});
  // });
});
