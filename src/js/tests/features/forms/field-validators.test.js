import { describe, it, expect, beforeEach } from "vitest";

import {
  validateInput,
  VALIDATION,
} from "../../../features/forms/field-validators";

describe("field-validators.js", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("disabled要素は常にok:trueになる", () => {
    const el = document.createElement("input");
    el.value = "";
    el.required = true;
    el.disabled = true;
    expect(validateInput(el)).toEqual({ ok: true });
  });

  describe("radio", () => {
    it("未選択の場合はok:falseになる", () => {
      document.body.innerHTML = `
        <form>
          <input type="radio" name="gender" value="male" required>
          <input type="radio" name="gender" value="female" required>
        </form>
      `;
      const el = document.querySelector("input[name='gender']");
      expect(validateInput(el)).toMatchObject({
        ok: false,
        code: VALIDATION.REQUIRED,
      });
    });
    it("選択済みの場合はok:trueになる", () => {
      document.body.innerHTML = `
        <form>
          <input type="radio" name="gender" value="male" required checked>
          <input type="radio" name="gender" value="female" required>
        </form>
      `;
      const el = document.querySelector("input[name='gender']");
      expect(validateInput(el)).toEqual({ ok: true });
    });
    it("単独で未チェックの場合はok:falseになる", () => {
      const el = document.createElement("input");
      el.type = "radio";
      el.name = "gender";
      el.value = "male";
      el.required = true;
      expect(validateInput(el)).toMatchObject({
        ok: false,
        code: VALIDATION.REQUIRED,
      });
    });
    it("単独でチェック済みの場合はok:trueになる", () => {
      const el = document.createElement("input");
      el.type = "radio";
      el.name = "gender";
      el.value = "male";
      el.required = true;
      el.checked = true;
      expect(validateInput(el)).toEqual({ ok: true });
    });

    describe("scope切り替え", () => {
      beforeEach(() => {
        document.body.innerHTML = `
          <form id="form1">
            <input type="radio" name="gender" value="male" required>
            <input type="radio" name="gender" value="female" required>
          </form>
          <form id=form2>
            <input type="radio" name="gender" value="male" required checked>
            <input type="radio" name="gender" value="female" required>
          </form>
          <div id="container">
            <input type="radio" name="gender" value="other" required>
          </div>
        `;
      });
      it("rootをformに指定した場合は他フォームを無視する", () => {
        const form1 = document.getElementById("form1");
        const el = form1.querySelector("input[name='gender']");
        expect(validateInput(el, { root: form1 })).toMatchObject({
          ok: false,
          code: VALIDATION.REQUIRED,
        });
      });
      it("rootをdocumentに指定した場合は他フォームを含めて判定", () => {
        const form1 = document.getElementById("form1");
        const el = form1.querySelector("input[name='gender']");
        expect(validateInput(el, { root: document })).toEqual({ ok: true });
      });
      it("root未指定でform内ならそのformのみを判定", () => {
        const form1 = document.getElementById("form1");
        const el = form1.querySelector("input[name='gender']");
        expect(validateInput(el)).toMatchObject({
          ok: false,
          code: VALIDATION.REQUIRED,
        });
      });
      it("root未指定でform外ならdocument全体を判定", () => {
        const container = document.getElementById("container");
        const el = container.querySelector("input[name='gender']");
        expect(validateInput(el)).toEqual({ ok: true });
      });
    });
  });

  describe("checkbox", () => {
    it("未チェックの場合はok:falseになる", () => {
      const el = document.createElement("input");
      el.type = "checkbox";
      el.required = true;
      el.checked = false;
      expect(validateInput(el)).toMatchObject({
        ok: false,
        code: VALIDATION.REQUIRED,
      });
    });
    it("チェック済みの場合はok:trueになる", () => {
      const el = document.createElement("input");
      el.type = "checkbox";
      el.required = true;
      el.checked = true;
      expect(validateInput(el)).toEqual({ ok: true });
    });
  });

  describe("password", () => {
    it("空文字の場合はok:falseになる", () => {
      const el = document.createElement("input");
      el.id = "password";
      el.value = "";
      el.required = true;
      expect(validateInput(el)).toMatchObject({
        ok: false,
        code: VALIDATION.REQUIRED,
      });
    });
    it("3文字以内の場合はok:falseになる", () => {
      const el = document.createElement("input");
      el.id = "password";
      el.value = "tes";
      el.required = true;
      expect(validateInput(el)).toMatchObject({
        ok: false,
        code: VALIDATION.TOO_SHORT,
        payload: { min: 4 },
      });
    });
    it("4文字以上の場合はok:trueになる", () => {
      const el = document.createElement("input");
      el.id = "password";
      el.value = "test";
      el.required = true;
      expect(validateInput(el)).toEqual({ ok: true });
    });
  });

  describe("select", () => {
    it("空の場合はok:falseになる", () => {
      const el = document.createElement("select");
      el.innerHTML = `
      <option value=""></option>
      <option value="1">1</option>
      `;
      el.value = "";
      el.required = true;
      expect(validateInput(el)).toMatchObject({
        ok: false,
        code: VALIDATION.REQUIRED,
      });
    });
    it("未選択の場合はok:falseになる", () => {
      const el = document.createElement("select");
      el.selectedIndex = -1;
      el.required = true;
      expect(validateInput(el)).toMatchObject({
        ok: false,
        code: VALIDATION.REQUIRED,
      });
    });
    it("選択済みの場合はok:trueになる", () => {
      const el = document.createElement("select");
      el.innerHTML = `
      <option value=""></option>
      <option value="1">1</option>
      `;
      el.value = "1";
      el.required = true;
      expect(validateInput(el)).toEqual({ ok: true });
    });
  });

  describe("input/textarea", () => {
    it("空の場合はok:falseになる", () => {
      const el = document.createElement("input");
      el.value = "";
      el.required = true;
      expect(validateInput(el)).toMatchObject({
        ok: false,
        code: VALIDATION.REQUIRED,
      });
    });
    it("記載済みの場合はok:trueになる", () => {
      const el = document.createElement("input");
      el.value = "text";
      el.required = true;
      expect(validateInput(el)).toEqual({ ok: true });
    });
    it("前後に空白があってもok:trueになる", () => {
      const el = document.createElement("input");
      el.value = "  text  ";
      el.required = true;
      expect(validateInput(el)).toEqual({ ok: true });
    });
    it("空白だけの場合はok:falseになる", () => {
      const el = document.createElement("input");
      el.value = "    ";
      el.required = true;
      expect(validateInput(el)).toMatchObject({
        ok: false,
        code: VALIDATION.REQUIRED,
      });
    });
  });

  it("どれにも当てはまらない場合はok:trueになる", () => {
    const el = document.createElement("input");
    el.type = "number";
    el.value = "";
    el.required = false;
    expect(validateInput(el)).toEqual({ ok: true });
  });
});
