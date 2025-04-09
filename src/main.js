import "./style.css";

// buttons
import "./js/components/buttons/copy.js";

// modals
import "./js/modals/modal.js";

// utils
import { initLayout } from "./js/utils/layout.js";

// components
import { initAccordion } from "./js/components/accordion.js";
import { userPopup } from "./js/components/user-popup.js";

// features
import { initWeightDays } from "./js/features/records/weight-days.js";
import { initWeightGraph } from "./js/features/graph.js";

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
