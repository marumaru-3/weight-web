// ヘッダースクロール非表示
const header = document.getElementById("header");
const headerHeight = header.offsetHeight;
let startPos = 0;

window.addEventListener("load", () => {
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY || document.documentElement.scrollTop;

    if (scrollPos > startPos && scrollPos > headerHeight) {
      header.style.top = `-${headerHeight}px`;
    } else {
      header.style.top = "0";
    }

    startPos = scrollPos;
  });
});

// サイドバークリック表示切り替え
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.querySelector(".layout__sidebar");
menuToggle.addEventListener("click", () => {
  if (sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
    sidebar.classList.add("close");
  } else {
    sidebar.classList.remove("close");
    sidebar.classList.add("open");
  }
});

// サイドバーレスポンシブ表示切り替え
const mediaQueryTB = window.matchMedia("(max-width: 1299px)");

function sidebarResponse(mediaQuery) {
  if (mediaQuery.matches) {
    sidebar.classList.remove("open");
    sidebar.classList.add("close");
  } else {
    sidebar.classList.remove("close");
    sidebar.classList.add("open");
  }
}

// 初回適用
sidebarResponse(mediaQueryTB);

mediaQueryTB.addEventListener("change", sidebarResponse);

// レスポンシブ表示のとき、サイドバー以外の場所をクリックしたら表示切り替え
document.addEventListener("click", (e) => {
  if (!e.target.closest(".layout__sidebar")) {
    if (mediaQueryTB.matches) {
      sidebar.classList.remove("open");
      sidebar.classList.add("close");
    }
  }
});
