let tabs = document.querySelectorAll(".tabs"),
  wallPaper = document.getElementById("wallPaper");

tabs.forEach((tab, i) => {
  tab.addEventListener("click", function (e) {
    e.preventDefault();
    openPage(i);
  });
});
function openPage(i) {
  tabs.forEach((tab) => {
    tab.classList.remove("on");
  });
  tabs[i].classList.add("on");
  let currentTab = tabs[i].getAttribute("class");
  let change = currentTab.replace("tabs", "");
  let bgChange = change.replace("on", "");
  if (i == 0 || i == 2) {
    wallPaper.className = bgChange;
  } else {
    wallPaper.className = bgChange;
  }
}
