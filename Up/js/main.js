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
  $wallPaper = $("#wallPaper"),
  currentTab;

$tabs.click(function (e) {
  e.preventDefault();
  let idx = $(this).index();
  $tabs.removeClass("on");
  $(this).addClass("on");
  changeBg(idx);
  tabShow(idx);
});

function changeBg(i) {
  // bg색상 바꾸기
  if (i % 2 == 0) {
    currentTab = "even";
    $wallPaper.attr("class", currentTab);
  } else {
    currentTab = "odd";
    $wallPaper.attr("class", currentTab);
  }
}

function tabShow(i) {
  // bg가 바뀌고 나서 탭 보여주기
  if (i % 2 == 0) {
    
    setTimeout(function () {
      $tabs.find(".tab").css({ color: "rgb(17, 17, 17)" });
    }, 1150);
  } else {
    setTimeout(function () {
      $tabs.find(".tab").css({ color: "rgb(255, 255, 255)" });
    }, 1150);
  }
}
