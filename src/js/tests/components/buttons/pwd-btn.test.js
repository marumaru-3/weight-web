import { describe, it, expect, beforeEach } from "vitest";

import { initPwdClick } from "../../../components/buttons/pwd-btn";

describe("pwd-btn.js", () => {
  beforeEach(() => {
    document.body.innerHTML = `<input id="password" type="password">
      <button data-hidden="true">
        <span class="icon"></span>
      </button>`;
  });

  it("初期同期を実行", () => {
    initPwdClick();

    const pwdText = document.querySelector("input");
    const pwdBtn = document.querySelector("button");

    expect(pwdBtn.dataset.inited).toBe("1");
    expect(pwdBtn.dataset.hidden).toBe("true");
    expect(pwdText.type).toBe("password");
  });
});
