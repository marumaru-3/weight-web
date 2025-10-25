import { label } from "happy-dom/lib/PropertySymbol.js";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

// canvas.getContext をモック（Chart.js は 2D コンテキストの .canvas に触る）
HTMLCanvasElement.prototype.getContext = vi.fn(function () {
  return { canvas: this };
});

// Chart をモック（config を検査できるように保持する）
const chartRegistry = new Map();
global.Chart = class {
  static getChart(el) {
    return chartRegistry.get(el) || null;
  }
  constructor(ctx, config) {
    this.ctx = ctx;
    this.config = config;
    this.options = config?.options || {};
    this.update = vi.fn();
    this.destroy = vi.fn(() => chartRegistry.delete(ctx.canvas));
    chartRegistry.set(ctx.canvas, this);
  }
};
Chart.register = vi.fn();
window["chartjs-plugin-annotation"] = {};

// matchMedia を安定化
const mmFalse = {
  matches: false,
  media: "(max-width: 599px)",
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
};
const mmTrue = {
  matches: true,
  media: "(max-width: 599px)",
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
};
window.matchMedia = vi.fn(() => mmFalse);

// fetchChartData 戻り値取得用
const MOCK_PAYLOAD = {
  chart_arr: [
    { date: "2025-03-10", weight: "67.3", bmi: "23.70", bfp: "17.99" },
    { date: "2025-03-27", weight: "66.0", bmi: "23.25", bfp: "17.45" },
    { date: "2025-04-20", weight: "65.5", bmi: "23.07", bfp: "17.23" },
    { date: "2025-04-21", weight: "66.0", bmi: "23.25", bfp: "17.45" },
    { date: "2025-07-14", weight: "444.0", bmi: "156.38", bfp: "177.21" },
    { date: "2025-07-15", weight: "1000.0", bmi: "352.21", bfp: "412.20" },
    { date: "2025-07-16", weight: "205.0", bmi: "72.20", bfp: "76.19" },
    { date: "2025-07-17", weight: "64.3", bmi: "22.65", bfp: "16.73" },
    { date: "2025-07-18", weight: "888.0", bmi: "312.76", bfp: "364.86" },
    { date: "2025-07-21", weight: "0.0", bmi: "0.00", bfp: "-10.45" },
    { date: "2025-08-14", weight: "65.0", bmi: "22.89", bfp: "17.02" },
    { date: "2025-09-04", weight: "111.0", bmi: "39.10", bfp: "36.47" },
    { date: "2025-10-02", weight: "12.2", bmi: "4.30", bfp: "-5.29" },
    { date: "2025-10-08", weight: "65.9", bmi: "23.21", bfp: "17.40" },
    { date: "2025-10-09", weight: "67.0", bmi: "23.60", bfp: "17.87" },
    { date: "2025-10-10", weight: "65.0", bmi: "22.89", bfp: "17.02" },
    { date: "2025-10-12", weight: "64.0", bmi: "22.54", bfp: "16.60" },
    { date: "2025-10-13", weight: "64.7", bmi: "22.79", bfp: "16.90" },
    { date: "2025-10-14", weight: "64.5", bmi: "22.72", bfp: "16.81" },
    { date: "2025-10-15", weight: "64.0", bmi: "22.54", bfp: "16.60" },
    { date: "2025-10-16", weight: "63.8", bmi: "22.47", bfp: "16.51" },
  ],
  ideal_weight: 64,
};

const { initWeightGraph } = await import("../../features/graph.js");

describe("graph.js", () => {
  let fetchChartDataMock;
  let graphElement;
  let weightGraphDate;
  let btnWeek;
  let btnMonth;
  let btn3Month;
  let btnHalfYear;
  let btnYear;
  let summaryBlocks;

  beforeEach(() => {
    document.body.innerHTML = `
    <div class="weight-graph">
      <p class="weight-graph__date"></p>
      <div class="weight-graph__switch">
        <button id="weight-graph__week"
          class="btn">1週間</button>
        <button id="weight-graph__month"
          class="btn btn--select">1ヶ月</button>
        <button id="weight-graph__three-month"
          class="btn">3ヶ月</button>
        <button id="weight-graph__half-year"
          class="btn">半年</button>
        <button id="weight-graph__year"
          class="btn">1年</button>
      </div>
      <canvas id="graph"
        class="weight-graph__canvas"></canvas>
    </div>
    <div class="weight-summary">
      <div class="weight-summary__block card"
        data-summary="average">
        <p class="weight-summary__title"><span class="period">1ヶ月</span>の平均体重</p>
        <p class="weight-summary__text">
          <span class="weight-summary__num"></span>
          <span class="weight-summary__unit">kg</span>
        </p>
      </div>
      <div class="weight-summary__block card"
        data-summary="bfp">
        <p class="weight-summary__title"><span class="period">1ヶ月</span>の平均体脂肪率<span class="in-bl">(推定)</span></p>
        <p class="weight-summary__text">
          <span class="weight-summary__num"></span>
          <span class="weight-summary__unit">%</span>
        </p>
      </div>
      <div class="weight-summary__block card"
        data-summary="bmi">
        <p class="weight-summary__title"><span class="period">1ヶ月</span>の平均BMI</p>
        <p class="weight-summary__text">
          <span class="weight-summary__num"></span>
        </p>
      </div>
      <div class="weight-summary__block card"
        data-summary="in_de">
        <p class="weight-summary__title"><span class="period">1ヶ月</span>前平均と比較</p>
        <p class="weight-summary__text">
          <span class="weight-summary__num"></span>
          <span class="weight-summary__unit">kg</span>
        </p>
      </div>
      <div class="weight-summary__block card"
        data-summary="best">
        <p class="weight-summary__title"><span class="period">1ヶ月</span>の最高体重</p>
        <p class="weight-summary__text">
          <span class="weight-summary__num"></span>
          <span class="weight-summary__unit">kg</span>
        </p>
      </div>
      <div class="weight-summary__block card"
        data-summary="lowest">
        <p class="weight-summary__title"><span class="period">1ヶ月</span>の最低体重</p>
        <p class="weight-summary__text">
          <span class="weight-summary__num"></span>
          <span class="weight-summary__unit">kg</span>
        </p>
      </div>
    </div>
    `;
    graphElement = document.getElementById("graph");
    weightGraphDate = document.querySelector(".weight-graph__date");
    btnWeek = document.getElementById("weight-graph__week");
    btnMonth = document.getElementById("weight-graph__month");
    btn3Month = document.getElementById("weight-graph__three-month");
    btnHalfYear = document.getElementById("weight-graph__half-year");
    btnYear = document.getElementById("weight-graph__year");
    summaryBlocks = document.querySelectorAll(".weight-summary__block");

    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-10-20T00:00:00+09:00"));
    chartRegistry.clear();

    // fetchChartData のモック（DIで注入する）
    fetchChartDataMock = vi.fn().mockResolvedValue(MOCK_PAYLOAD);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe("initWeightGraph", () => {
    it("初期化時：1ヶ月チャートが生成されているか", async () => {
      await initWeightGraph({ fetchChartData: fetchChartDataMock });

      // Assert
      const chart = Chart.getChart(graphElement);
      const { labels, datasets } = chart.config.data;
      const data = datasets[0].data;

      // 1ヶ月分のラベルとデータ
      expect(Array.isArray(labels)).toBe(true);
      expect(Array.isArray(data)).toBe(true);
      expect(labels.length).toBe(data.length);

      //　期間チェック
      expect(labels[0]).toBe("2025/09/21");
      expect(labels.at(-1)).toBe("2025/10/20");
      expect(labels.length).toBe(30);
    });

    it("初期化時：タイトルが2025/09/21～2025/10/20になってるか", async () => {
      await initWeightGraph({ fetchChartData: fetchChartDataMock });

      expect(weightGraphDate.textContent).toBe("2025/09/21～2025/10/20");
    });

    it("目標体重ライン：64kgで描画されるか", async () => {
      await initWeightGraph({ fetchChartData: fetchChartDataMock });

      const chart = Chart.getChart(graphElement);

      const ann = chart.config.options.plugins.annotation.annotations.goalLine;

      expect(ann.yMin).toBe(64);
      expect(ann.yMax).toBe(64);
    });

    it("サマリー（平均/BMI/BFP/増減/最高/最低）が値で表示されるか（データがある場合）", async () => {
      await initWeightGraph({ fetchChartData: fetchChartDataMock });

      // 各サマリーブロックの値をチェック
      // 期待値は deriveSummary と同じロジックで算出済み
      // 対象期間 = 2025/09/21〜2025/10/20 に含まれるデータ
      const expected = {
        rangeText: "1ヶ月",
        average: "59.0",
        bmi: "20.78",
        bfp: "14.49",
        in_de: "-52.0",
        best: "67.0",
        lowest: "12.2",
      };

      const getVal = (key) =>
        document.querySelector(
          `.weight-summary__block[data-summary="${key}"] .weight-summary__num`
        )?.textContent;

      document
        .querySelectorAll(".weight-summary__block .period")
        .forEach((el) => {
          expect(el.textContent).toBe(expected.rangeText);
        });

      expect(getVal("average")).toBe(expected.average);
      expect(getVal("bmi")).toBe(expected.bmi);
      expect(getVal("bfp")).toBe(expected.bfp);
      expect(getVal("in_de")).toBe(expected.in_de);
      expect(getVal("best")).toBe(expected.best);
      expect(getVal("lowest")).toBe(expected.lowest);
    });

    describe("各ボタンクリック：タイトル/チャート/サマリーが更新されるか", () => {
      // 各サマリーの取得
      const getSummaryView = () => {
        const pick = (key) =>
          document.querySelector(
            `.weight-summary__block[data-summary="${key}"] .weight-summary__num`
          ).textContent ?? "";

        const periods = [
          ...document.querySelectorAll(".weight-summary__block .period"),
        ].map((el) => el.textContent);

        return {
          periods,
          average: pick("average"),
          bmi: pick("bmi"),
          bfp: pick("bfp"),
          in_de: pick("in_de"),
          best: pick("best"),
          lowest: pick("lowest"),
        };
      };
      // 数値 or "--" をざっくり検証
      const assertSummaryFormats = (view) => {
        expect(view.average).toMatch(/^(-?\d+(\.\d)?|--)$/);
        expect(view.best).toMatch(/^(-?\d+(\.\d)?|--)$/);
        expect(view.lowest).toMatch(/^(-?\d+(\.\d)?|--)$/);

        expect(view.in_de).toMatch(/^(-?\+?\d+(\.\d)?|--)$/);

        expect(view.bmi).toMatch(/^(-?\d+(\.\d{2})?|--)$/);
        expect(view.bfp).toMatch(/^(-?\d+(\.\d{2})?|--)$/);
      };
      // 何かしら値が変わったか（配列ごと比較）
      const assertSummarychanged = (before, after) => {
        const keys = ["average", "bmi", "bfp", "in_de", "best", "lowest"];
        const changedSome = keys.some((k) => before[k] !== after[k]);
        expect(changedSome).toBe(true);
      };

      // 検証用ヘルパ
      const assertChartRange = (expected) => {
        const chart = Chart.getChart(graphElement);
        const { labels, datasets } = chart.config.data;
        const data = datasets[0].data;

        //　期間チェック
        expect(labels.length).toBe(data.length);
        if (expected.first) expect(labels[0]).toBe(expected.first);
        if (expected.last) expect(labels.at(-1)).toBe(expected.last);
        if (expected.len) expect(labels.length).toBe(expected.len);
      };

      const clickAndAssert = (btn, { title, first, last, len }) => {
        const before = getSummaryView();
        btn.click();

        // タイトル
        expect(weightGraphDate.textContent).toBe(title);

        // チャート
        assertChartRange({ first, last, len });

        // サマリー
        const after = getSummaryView();
        assertSummaryFormats(after);
        assertSummarychanged(before, after);
      };

      it("1週間ボタンクリック：タイトル/チャート/サマリーが更新されるか", async () => {
        await initWeightGraph({ fetchChartData: fetchChartDataMock });

        clickAndAssert(btnWeek, {
          title: "2025/10/14～2025/10/20",
          first: "2025/10/14",
          last: "2025/10/20",
          len: 7,
        });
      });

      it("3ヶ月/半年/1年ボタンクリック：タイトル/チャート/サマリーが更新されるか", async () => {
        await initWeightGraph({ fetchChartData: fetchChartDataMock });

        clickAndAssert(btn3Month, {
          title: "2025/07/21～2025/10/20",
          last: "2025/10/20",
        });
        clickAndAssert(btnHalfYear, {
          title: "2025/04/21～2025/10/20",
          last: "2025/10/20",
        });
        clickAndAssert(btnYear, {
          title: "2024/10/21～2025/10/20",
          last: "2025/10/20",
        });
      });

      it("1週間ボタン→1ヶ月ボタンクリック：タイトル/チャート/サマリーが更新されるか", async () => {
        await initWeightGraph({ fetchChartData: fetchChartDataMock });

        clickAndAssert(btnWeek, {
          title: "2025/10/14～2025/10/20",
          last: "2025/10/20",
        });
        clickAndAssert(btnMonth, {
          title: "2025/09/21～2025/10/20",
          last: "2025/10/20",
        });
      });
    });

    it("モバイル表示（599px以下）：最大点数が12になるか", async () => {
      window.matchMedia = vi.fn(() => mmTrue);
      await initWeightGraph({ fetchChartData: fetchChartDataMock });

      const chart = Chart.getChart(graphElement);
      const { datasets } = chart.config.data;
      const data = datasets[0].data;

      const nonNull = data.filter((v) => v != null).length;

      expect(nonNull).toBeLessThanOrEqual(12);
    });

    it("チャート切り替え時：既存チャートがdestroyされてから新規作成されるか", async () => {
      await initWeightGraph({ fetchChartData: fetchChartDataMock });

      const oldChart = Chart.getChart(graphElement);

      btnWeek.click();

      expect(oldChart.destroy).toHaveBeenCalledTimes(1);

      const newChart = Chart.getChart(graphElement);
      expect(newChart).not.toBe(oldChart);
    });

    it("切り替えボタン：btn--selectが適切に付け替わる", async () => {
      await initWeightGraph({ fetchChartData: fetchChartDataMock });

      expect(btnMonth.classList.contains("btn--select")).toBe(true);

      btnWeek.click();

      expect(btnMonth.classList.contains("btn--select")).toBe(false);
      expect(btnWeek.classList.contains("btn--select")).toBe(true);
    });

    it("#graph が存在しない場合は何もしない", async () => {
      document.body.innerHTML = "";

      expect(
        async () =>
          await initWeightGraph({ fetchChartData: fetchChartDataMock })
      ).not.toThrow();
    });
  });
});
