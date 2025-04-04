import "./helper.js";

// buttons
import "./components/buttons/copy.js";

// modals
import "./modals/modal.js";

// utils
import { initLayout } from "./utils/layout.js";

// components
import { initAccordion } from "./components/accordion.js";
import { userPopup } from "./components/user-popup.js";

// features
import { initWeightDays } from "./features/records/weight-days.js";
import { initWeightGraph } from "./features/graph.js";

// ======== 条件付きで初期化実行 ========
if (document.querySelector("#header")) {
  initLayout();
}

if (document.querySelector(".accordion")) {
  initAccordion();
}

if (document.querySelector("#header__info")) {
  userPopup();
}

if (document.querySelector(".weight-days__blocks")) {
  initWeightDays();
}

if (document.querySelector("#graph")) {
  initWeightGraph();
}
