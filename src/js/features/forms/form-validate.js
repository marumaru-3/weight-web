// ボタン制御バリデーション
export const initValidateBtn = () => {
  initValidateForm(document.querySelector(".validate-form"));
  document.addEventListener("input", () =>
    initValidateForm(document.querySelector(".validate-form"))
  );
  document.addEventListener("change", () =>
    initValidateForm(document.querySelector(".validate-form"))
  );

  // ステップがある場合のバリデーション更新
  document.querySelectorAll(".next-btn, .prev-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      initValidateForm(document.querySelector(".validate-form"));
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
    if (field.type === "radio" || field.type === "checkbox") {
      // ラジオボタンは同じ name のどれかが選択されていればOK
      return form.querySelector(`input[name="${field.name}"]:checked`);
    } else if (field.id === "password") {
      // パスワードは4文字以上でOK
      return field.value.length > 3;
    } else {
      // input や select は value が空でなければOK
      return field.value.trim() !== "";
    }
  });

  const submitButtons = document.querySelectorAll(".submit-btn");
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
