// 多重バインド防止用
const boundInputs = new WeakSet();

/**
 * 共通入力制御ヘルパー
 * - 同一要素への多重バインドを防止（WeakSet）
 */
const bindInputFilter = (selector, handler) => {
  const inputs = document.querySelectorAll(selector);
  inputs.forEach((input) => {
    if (boundInputs.has(input)) return;
    boundInputs.add(input);

    const onHandler = (e) => {
      handler(e.target);
    };

    input.addEventListener("input", onHandler);
    input.addEventListener("change", onHandler);
  });
};

/**
 * 半角英数字と記号のみ許可（日本語等は除去）
 */
export const initRestrictToAlphanumeric = (selector) => {
  bindInputFilter(selector, (el) => {
    el.value = el.value.replace(
      /[^a-zA-Z0-9 !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g,
      ""
    );
  });
};

/**
 * 半角数字のみ許可（0-9）
 */
export const initRestrictToNumeric = (selector) => {
  bindInputFilter(selector, (el) => {
    el.value = el.value.replace(/[^0-9]/g, "");
  });
};

/**
 * 小数点を1個まで許可（単純な小数入力）
 * - 非数字/余分なドット除去
 */
export const initRestrictToFloat = (selector) => {
  bindInputFilter(selector, (el) => {
    el.value = el.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  });
};

/**
 * 数値入力用リアルタイムフィルター
 * - 整数部 0〜3 桁
 * - 小数部 0〜1 桁（末尾ドットも許容）
 * - 最大 999.9 kg
 *  - 非数字/余分なドット除去
 */
export const initRestrictDecimal = (selector) => {
  bindInputFilter(selector, (el) => {
    let newValue = el.value;

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

    el.value = newValue;
  });
};
