export const VALIDATION = {
  REQUIRED: "required",
  TOO_SHORT: "too_short",
};

export const validateInput = (element, { root } = {}) => {
  if (element.disabled) return { ok: true };

  // 1) ラジオ：同一nameのいずれかが選択されていればOK
  if (element.type === "radio") {
    return validateRadio(element, { root });
  }

  // 2) チェックボックス：自身が required なら checked 必須
  if (element.type === "checkbox") {
    return validateCheckbox(element);
  }

  const value = (element.value ?? "").trim();

  // 3) パスワード：必須＋最小文字数
  if (element.id === "password") {
    return validatePassword(value);
  }

  // 4) SELECT：必須なら空禁止
  if (element.tagName === "SELECT") {
    return validateSelect(element);
  }

  // 5) INPUT/TEXTAREA：必須なら空禁止（前後空白は無視）
  if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
    return validateInputOrTextarea(element, value);
  }

  // 6) その他（特別扱いなし）
  return { ok: true };
};

const validateRadio = (element, { root } = {}) => {
  // root > el.form > document の順でスコープを決める
  const scope = root ?? element.form ?? document;
  const group = Array.from(
    scope.querySelectorAll(`input[type="radio"][name="${element.name}"]`)
  );

  // グループが無ければ単独ラジオの必須チェックを行う
  if (group.length === 0) {
    if (element.required && !element.checked) {
      return { ok: false, code: VALIDATION.REQUIRED };
    } else {
      return { ok: true };
    }
  }

  // グループ内に required が一つでもあれば必須とみなす
  const groupIsRequired = group.some((r) => r.required);
  if (!groupIsRequired) {
    return { ok: true };
  }

  // 必須のときは「どれか1つチェックされているか」
  const groupHasChecked = group.some((r) => r.checked);
  if (!groupHasChecked) {
    return { ok: false, code: VALIDATION.REQUIRED };
  }

  return { ok: true };
};

const validateCheckbox = (element) => {
  if (element.required && !element.checked) {
    return { ok: false, code: VALIDATION.REQUIRED };
  }
  return { ok: true };
};

const validatePassword = (value) => {
  if (value === "") return { ok: false, code: VALIDATION.REQUIRED };
  if (value.length < 4)
    return { ok: false, code: VALIDATION.TOO_SHORT, payload: { min: 4 } };
  return { ok: true };
};

const validateSelect = (element) => {
  if (
    element.required &&
    (element.value === "" || element.selectedIndex === -1)
  ) {
    return { ok: false, code: VALIDATION.REQUIRED };
  }
  return { ok: true };
};

const validateInputOrTextarea = (element, value) => {
  if (element.required && value === "") {
    return { ok: false, code: VALIDATION.REQUIRED };
  }
  return { ok: true };
};
