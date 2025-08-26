// 半角英数字の入力制御
export const initRestrictToAlphanumeric = (selector) => {
  document.querySelectorAll(selector).forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(
        /[^a-zA-Z0-9 !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g,
        ""
      );
    });
  });
};

// 半角数字の入力制御
export const initRestrictToNumeric = (selector) => {
  document.querySelectorAll(selector).forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    });
  });
};

// 半角数字(小数点あり)の入力制御
export const initRestrictToFloat = (selector) => {
  document.querySelectorAll(selector).forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*)\./g, "$1");
    });
  });
};

/**
 * 数値入力用リアルタイムフィルター
 * - 整数部 0〜3 桁
 * - 小数部 0〜1 桁（末尾ドットも許容）
 * - 最大 999.9 kg
 * initRestrictWeight
 */
export const initRestrictDecimal = (selector) => {
  document.querySelectorAll(selector).forEach((input) => {
    input.addEventListener("input", () => {
      let newValue = input.value;

      // 数字とドット以外を除去
      newValue = newValue.replace(/[^0-9.]/g, "");

      // ドットは1個だけ許容（2個目以降を消す）
      newValue = newValue.replace(/(\..*)\./g, "$1");

      // 整数部 3桁まで、小数部 1桁までにトリム
      const [intPart = "", decPart = ""] = newValue.split(".");
      const trimmedInt = intPart.slice(0, 3);
      const trimmedDec = decPart.slice(0, 1);

      newValue =
        trimmedDec !== "" || newValue.includes(".")
          ? `${trimmedInt}.${trimmedDec}`
          : trimmedInt;

      // 999.9 超えたら強制 999.9 に
      const num = parseFloat(newValue);
      if (!isNaN(num) && num > 999.9) {
        newValue = "999.9";
      }

      input.value = newValue;
    });
  });
};
