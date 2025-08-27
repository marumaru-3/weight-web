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

const inputValidateCheck = (element, formBox) => {
  const result = validateInput(element);
  applyValidation(formBox, result);
  return result.ok;
};
