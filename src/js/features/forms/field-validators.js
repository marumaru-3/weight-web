export const VALIDATION = {
  REQUIRED: "required",
  TOO_SHORT: "too_short",
};

export const validateInput = (element) => {
  // パスワードの特別ルール
  if (element.id === "password") {
    const missing =
      element.validity?.valueMissing ?? element.value.trim() === "";
    if (missing) return { ok: false, code: VALIDATION.REQUIRED };
    if (element.value.length < 4)
      return { ok: false, code: VALIDATION.TOO_SHORT };

    return { ok: true };
  }

  if (element.tagName === "SELECT") {
    const missing = element.validity?.valueMissing ?? element.value === "";
    return missing ? { ok: false, code: VALIDATION.REQUIRED } : { ok: true };
  }

  if (element.tagName === "INPUT") {
    const missing =
      element.validity?.valueMissing ?? element.value.trim() === "";
    return missing ? { ok: false, code: VALIDATION.REQUIRED } : { ok: true };
  }

  return { ok: true };
};
