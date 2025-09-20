import { validateInput } from "./field-validators";
import { bindValidationUI, bindTextLabelUI } from "./field-ui";

// 送信直前：全フィールドを判定 → エラーUI反映（最終チェック）
export const initCheckBtn = (form) => {
  if (!form) return;
  const formInputs = form.querySelectorAll(".validate-form__input");
  formInputs.forEach((formInput) => {
    const controls = formInput.querySelectorAll("input, select, textarea");
    controls.forEach((el) => {
      inputValidateCheck(el, formInput, form);
    });
  });
};

const inputValidateCheck = (element, formBox, root) => {
  if (element.disabled) return true;
  const result = validateInput(element, { root });
  bindValidationUI(formBox, result);
  return result.ok;
};

// フォーム単位で初期化済みを記録するWeakMap
const validateBtnRegistry = new WeakSet();

// 入力・変更のたびにフォーム全体の妥当性を再計算して送信ボタンを制御する
export const initValidateBtn = (form) => {
  if (!form) return;

  if (validateBtnRegistry.has(form)) return;
  validateBtnRegistry.add(form);

  const recalc = () => initValidateForm(form);

  recalc();
  form.addEventListener("input", recalc);
  form.addEventListener("change", recalc);

  // ステップがある場合のバリデーション更新
  form.querySelectorAll(".next-btn, .prev-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      requestAnimationFrame(recalc);
    });
  });
};

// フォーム全体の妥当性を判定し、送信ボタンの有効・無効を切り替える
export const initValidateForm = (form) => {
  if (!form) return false;

  const activeStep = form.querySelector(".step.visible");
  const target = activeStep || form;

  const requiredFields = [...target.querySelectorAll("[required]")];

  const isValid = requiredFields.every((field) => {
    const ok = validateInput(field, { root: target }).ok;
    return ok;
  });

  const submitButtons = form.querySelectorAll(".submit-btn");
  submitButtons.forEach((btn) => {
    if (isValid) {
      btn.classList.remove("disabled");
    } else {
      btn.classList.add("disabled");
    }
    btn.disabled = !isValid;
  });

  return isValid;
};

// ラベルの見た目だけを初期化（クリックでON・外側クリックでOFF）
export const initTextLabelUI = (root) => {
  if (!root) return;
  bindTextLabelUI(root);
};

// root要素ごとの「バインド済み状態」を記録するWeakMap
const realtimeValidationRegistry = new WeakMap();

// クリックされた要素にだけリアルタイム検証を仕込む（フォーム全体に委譲）
export const initRealtimeOnClick = (form) => {
  if (!form) return;

  if (!realtimeValidationRegistry.has(form)) {
    realtimeValidationRegistry.set(form, new WeakSet());
  }
  const boundSet = realtimeValidationRegistry.get(form);

  form.addEventListener("click", (e) => {
    const el = e.target?.closest("input, select, textarea");
    if (!el || !form.contains(el)) return;

    if (el.disabled) return;
    if (boundSet.has(el)) return;

    initRealtimeValidation(el, form);
    boundSet.add(el);
  });
};

const initRealtimeValidation = (element, form) => {
  if (!element) return;
  if (element.disabled) return;

  const isSelect = element.tagName === "SELECT";
  const isToggle = element.type === "radio" || element.type === "checkbox";
  const eventType = isSelect || isToggle ? "change" : "input";

  const handler = () => {
    const root =
      form?.querySelector(".step.visible") ?? form ?? element.form ?? document;
    const box = element.closest(".validate-form__input");
    const result = validateInput(element, { root });
    bindValidationUI(box, result);
  };

  element.addEventListener(eventType, handler);
};
