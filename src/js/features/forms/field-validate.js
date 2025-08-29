import { validateInput } from "./field-validators";
import { bindValidationUI, bindTextLabelUI } from "./field-ui";

// 送信直前：全フィールドを判定 → エラーUI反映（最終チェック）
export const initCheckBtn = (form) => {
  const formBoxes = form.querySelectorAll(".basic-info-form__box");
  formBoxes.forEach((formBox) => {
    const controls = formBox.querySelectorAll("input, select, textarea");
    controls.forEach((el) => {
      inputValidateCheck(el, formBox, form);
    });
  });
};

const inputValidateCheck = (element, formBox, root) => {
  const result = validateInput(element, { root });
  bindValidationUI(formBox, result);
  return result.ok;
};

// 入力・変更のたびにフォーム全体の妥当性を再計算して送信ボタンを制御する
export const initValidateBtn = (form) => {
  const validateForm = form.querySelector(".validate-form");

  const recalc = () => initValidateForm(validateForm);

  recalc();
  form.addEventListener("input", recalc);
  form.addEventListener("change", recalc);

  // ステップがある場合のバリデーション更新
  form.querySelectorAll(".next-btn, .prev-btn").forEach((btn) => {
    btn.addEventListener("click", recalc);
  });
};

// ラベルの見た目だけを初期化（クリックでON・外側クリックでOFF）
export const initTextLabelUI = (form) => {
  bindTextLabelUI(form);
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
