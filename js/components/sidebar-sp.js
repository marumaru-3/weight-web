const setVhUnit = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--sidebar-sp_vh", `${vh}px`);
};
setVhUnit();
window.addEventListener("resize", setVhUnit);
