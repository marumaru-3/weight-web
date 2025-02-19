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
