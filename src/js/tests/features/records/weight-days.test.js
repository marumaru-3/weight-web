import { describe, it, expect, beforeEach, vi } from "vitest";

import { initWeightDays } from "../../../features/records/weight-days";

describe("weight-days.js", () => {
  describe("initWeightDays", () => {
    let parent;
    let btnMore;
    let switchBtns;
    beforeEach(() => {
      document.body.innerHTML = `
        <div class="weight-days">
          <ul class="weight-days__switch">
            <button class="btn btn--select" data-sort="new">新しい順</button>
            <button class="btn" data-sort="old">古い順</button>
          </ul>
          <div class="weight-days__blocks"></div>
          <button class="btn btn--more">もっと見る</button>
        </div>
      `;
      parent = document.querySelector(".weight-days__blocks");
      btnMore = document.querySelector(".weight-days .btn--more");
      switchBtns = [
        ...document.querySelectorAll(".weight-days__switch button"),
      ];

      const dates = [
        "2025/10/02",
        "2025/09/02",
        "2025/08/02",
        "2025/07/02",
        "2025/06/02",
        "2025/05/02",
        "2025/04/02",
        "2025/03/02",
        "2025/02/02",
        "2025/01/02",
        "2024/12/02",
        "2024/11/02",
        "2024/10/02",
      ];
      dates.forEach((date) => {
        let block = document.createElement("div");
        block.classList.add("weight-days__block");
        let dateElem = document.createElement("p");
        dateElem.classList.add("weight-days__date");
        dateElem.textContent = date;
        block.appendChild(dateElem);
        parent.appendChild(block);
      });
    });

    const blocks = () => [...document.querySelectorAll(".weight-days__block")];

    const dates = () =>
      blocks().map(
        (block) =>
          block.querySelector(".weight-days__date")?.textContent?.trim() ?? ""
      );

    const visibleCount = () =>
      blocks().filter((block) => block.classList.contains("show")).length;

    const switchBtnClick = (sort) =>
      document
        .querySelector(`.weight-days__switch [data-sort="${sort}"]`)
        ?.click();

    const switchBtnSort = (sort) =>
      document
        .querySelector(`.weight-days__switch [data-sort="${sort}"]`)
        ?.classList.contains("btn--select") === true;

    it("初期化時：6個の体重記録ブロックが表示・新しい順になっているか", () => {
      // Act
      initWeightDays();

      const got = dates();
      const expectedNew = [...got].sort((a, b) => b.localeCompare(a));

      // Assert
      expect(visibleCount()).toBe(6);
      expect(got).toEqual(expectedNew);
    });

    it("古い順クリック：体重記録ブロックが古い順になっているか", () => {
      // Act
      initWeightDays();
      switchBtnClick("old");

      const got = dates();
      const expectedOld = [...got].sort((a, b) => a.localeCompare(b));

      // Assert
      expect(visibleCount()).toBe(6);
      expect(got).toEqual(expectedOld);
    });

    it("古い順クリック：btn--selectクラスが古い順ボタンにつくか", () => {
      // Act
      initWeightDays();
      switchBtnClick("old");

      // Assert
      expect(switchBtnSort("old")).toEqual(true);
    });

    it("古い順→新しい順クリック：体重記録ブロックが新しい順になっているか", () => {
      // Act
      initWeightDays();

      // Assert
      // 古い順
      switchBtnClick("old");
      const got1 = dates();
      const expectedOld = [...got1].sort((a, b) => a.localeCompare(b));
      expect(got1).toEqual(expectedOld);
      // 新しい順
      switchBtnClick("new");
      const got2 = dates();
      const expectedNew = [...got2].sort((a, b) => b.localeCompare(a));
      expect(got2).toEqual(expectedNew);
    });

    it("古い順→新しい順クリック：btn--selectクラスが新しい順ボタンにつくか", () => {
      // Act
      initWeightDays();

      // Assert
      // 古い順
      switchBtnClick("old");
      expect(switchBtnSort("old")).toEqual(true);
      // 新しい順
      switchBtnClick("new");
      expect(switchBtnSort("new")).toEqual(true);
    });

    it("初期化→新しい順クリック：体重記録ブロックが新しい順のままか", () => {
      // Act
      initWeightDays();

      // Assert
      // 初期化
      const got = dates();
      const expectedNew = [...got].sort((a, b) => b.localeCompare(a));
      expect(got).toEqual(expectedNew);
      // 新しい順クリック
      switchBtnClick("new");
      const got2 = dates();
      const expectedNew2 = [...got2].sort((a, b) => b.localeCompare(a));
      expect(got2).toEqual(expectedNew2);
      expect(got).toEqual(got2);
      expect(expectedNew).toEqual(expectedNew2);
    });

    it("もっと見るクリック：体重記録ブロックが12個表示されるか", () => {
      // Act
      initWeightDays();
      btnMore.click();

      // Assert
      expect(visibleCount()).toBe(12);
    });

    it("もっと見る2回クリック：体重記録ブロックが6個→12個→13個と正常に表示されるか", () => {
      // Act
      initWeightDays();

      // Assert
      // 初期状態
      expect(visibleCount()).toBe(6);
      // 1回目クリック
      btnMore.click();
      expect(visibleCount()).toBe(12);
      // 2回目クリック
      btnMore.click();
      expect(visibleCount()).toBe(13);
    });

    it("もっと見る2回クリック：もっと見るボタンが非表示になっているか", () => {
      // Act
      initWeightDays();

      // Assert
      btnMore.click();
      expect(btnMore.classList.contains("hide")).toBe(false);
      btnMore.click();
      expect(btnMore.classList.contains("hide")).toBe(true);
    });

    it("必要な要素が無い場合は何もしない", () => {
      // Arrange
      document.body.innerHTML = ``;

      // Assert
      expect(() => initWeightDays()).not.toThrow();
      expect(initWeightDays()).toBeUndefined();
    });
  });
});
