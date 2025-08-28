import { validateInput } from "./field-validators";
import { applyValidation } from "./field-ui";

// ボタンクリック時のチェック
export const initCheckBtn = () => {
  const formBoxes = document.querySelectorAll(".basic-info-form__box");
  formBoxes.forEach((formBox) => {
    const input = formBox.querySelector("input");
    const selects = formBox.querySelectorAll("select");

    if (input) inputValidateCheck(input, formBox);
    if (selects.length) {
      selects.forEach((select) => {
        inputValidateCheck(select, formBox);
      });
    }
  });
};

const inputValidateCheck = (element, formBox, root) => {
  const result = validateInput(element, { root });
  applyValidation(formBox, result);
  return result.ok;
};

// ボタン制御バリデーション
export const initValidateBtn = (form) => {
  initValidateForm(form.querySelector(".validate-form"));
  form.addEventListener("input", () =>
    initValidateForm(form.querySelector(".validate-form"))
  );
  form.addEventListener("change", () =>
    initValidateForm(form.querySelector(".validate-form"))
  );

  // ステップがある場合のバリデーション更新
  form.querySelectorAll(".next-btn, .prev-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      initValidateForm(form.querySelector(".validate-form"));
    });
  });
};

export const initValidateForm = (form) => {
  if (!form) return false;

  // '.step'がある場合は、現在アクティブな'.step'を対象にする
  const activeStep = form.querySelector(".step.visible");
  const target = activeStep || form;

  // required なフィールドをすべて取得
  const requiredFields = [...target.querySelectorAll("[required]")];

  // すべての必須項目が入力済みか判定
  const isValid = requiredFields.every((field) => {
    const ok = validateInput(element, { root: target }).ok;
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
