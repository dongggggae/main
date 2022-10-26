// let tabs = document.querySelectorAll(".tabs"),
//   wallPaper = document.getElementById("wallPaper");
// tabs.forEach((tab, i) => {
//   tab.addEventListener("click", function (e) {
//     e.preventDefault();
//     openPage(i);
//   });
// });

// function openPage(i) {
//   tabs.forEach((tab) => {
//     tab.classList.remove("on");
//   });
//   tabs[i].classList.add("on");
//   let currentTab = tabs[i].getAttribute("class");
//   let change = currentTab.replace("tabs", "");
//   let bgChange = change.replace("on", "");
//   if (i == 0 || i == 2) {
//     wallPaper.className = bgChange;
//   } else {
//     wallPaper.className = bgChange;
//   }
// }
// 제이쿼리 자바스크립트로 바꿀거임
let $tabs = $(".tabs"),
  $wallPaper = $("#wallPaper");

$tabs.click(function (e) {
  e.preventDefault();
  let idx = $(this).index();
  $tabs.removeClass("on");
  $(this).addClass("on");
  openPage(idx);
});

function openPage(i) {
  let currentTab = $tabs.eq(i).attr("class");
  let change = currentTab.replace("tabs", "");
  let bgChange = change.replace("on", "");

  if (i == 0 || i == 2) {
    $wallPaper.attr("class", bgChange);
    $tabs.find(".tab").css({ color: "rgb(255, 255, 255)" });
  } else {
    $wallPaper.attr("class", bgChange);
    $tabs.find(".tab").css({ color: "rgb(17, 17, 17)" });
  }
}
