import { describe, it, expect, beforeEach } from "vitest";

import { initAccordion } from "../../components/accordion";

describe("accordion.js", () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <ul>
      <li class="accordion">
        <button class="accordion-btn">アコーディオンボタン1</button>
        <div class="accordion-content">開閉のコンテンツ内容1</div>
      </li>
      <li class="accordion">
        <button class="accordion-btn">アコーディオンボタン2</button>
        <div class="accordion-content">開閉のコンテンツ内容2</div>
      </li>
    </ul>
    `;
    initAccordion();
  });

  it("初期化時にA11y属性と状態が正しく設定される", () => {
    // Arrange
    const accordion = document.querySelector(".accordion");
    const btns = document.querySelectorAll(".accordion-btn");
    const contents = document.querySelectorAll(".accordion-content");

    // Assert
    expect(accordion.getAttribute("data-state")).toBe("close");
    btns.forEach((btn, i) => {
      const content = contents[i];
      const btnId = btn.id;
      const contentId = content.id;

      expect(btnId).toBe(`accordion-btn-${i + 1}`);
      expect(contentId).toBe(`accordion-panel-${i + 1}`);
      expect(btn.getAttribute("aria-controls")).toBe(contentId);
      expect(content.getAttribute("aria-labelledby")).toBe(btnId);
      expect(btn.getAttribute("aria-expanded")).toBe("false");
      expect(contents[i].hidden).toBe(true);
    });
  });

  it("クリックで1つ目のアコーディオンが開く", () => {
    // Arrange
    const accordion = document.querySelectorAll(".accordion")[0];
    const btn = document.querySelectorAll(".accordion-btn")[0];
    const content = document.querySelectorAll(".accordion-content")[0];

    // Act
    btn.click();

    // Assert
    expect(accordion.getAttribute("data-state")).toBe("open");
    expect(btn.getAttribute("aria-expanded")).toBe("true");
    expect(content.hidden).toBe(false);
  });

  it("クリック2回で1つ目のアコーディオンが閉じる", () => {
    // Arrange
    const accordion = document.querySelectorAll(".accordion")[0];
    const btn = document.querySelectorAll(".accordion-btn")[0];
    const content = document.querySelectorAll(".accordion-content")[0];

    // Act
    btn.click();
    btn.click();

    // Assert
    expect(accordion.getAttribute("data-state")).toBe("close");
    expect(btn.getAttribute("aria-expanded")).toBe("false");
    expect(content.hidden).toBe(false);

    const evt = new Event("transitionend", { bubbles: true, cancelable: true });
    Object.defineProperty(evt, "propertyName", { value: "max-height" });
    content.dispatchEvent(evt);

    expect(content.hidden).toBe(true);
  });

  it("1つ目を開いても2つ目は閉じたまま", () => {
    // Arrange
    const acc1 = document.querySelectorAll(".accordion")[0];
    const btn1 = document.querySelectorAll(".accordion-btn")[0];
    const content1 = document.querySelectorAll(".accordion-content")[0];
    const acc2 = document.querySelectorAll(".accordion")[1];
    const btn2 = document.querySelectorAll(".accordion-btn")[1];
    const content2 = document.querySelectorAll(".accordion-content")[1];

    // Act
    btn1.click();

    // Assert
    expect(acc1.getAttribute("data-state")).toBe("open");
    expect(btn1.getAttribute("aria-expanded")).toBe("true");
    expect(content1.hidden).toBe(false);
    expect(acc2.getAttribute("data-state")).toBe("close");
    expect(btn2.getAttribute("aria-expanded")).toBe("false");
    expect(content2.hidden).toBe(true);
  });
});
