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

// header js
(() => {
  let $tabs = $(".tabs"),
    $wallPaper = $("#wallPaper"),
    $main = $("main"),
    currentTab;

    

  $tabs.click(function (e) {
    e.preventDefault();
    let idx = $(this).index();
    $tabs.removeClass("on");
    $(this).addClass("on");
    changeBg(idx);
    tabShow(idx);
  });

  function tabOpen(i) {
    let showTabs = $tabs.eq(i).attr("href");
    let changeTabs = showTabs.replace("#", "");
    $main.id()
  }

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
        $tabs.find(".tab").css({ color: "rgb(255, 255, 255)" });
      }, 1150);
    } else {
      setTimeout(function () {
        $tabs.find(".tab").css({ color: "rgb(17, 17, 17)" });
      }, 1150);
    }
  }
})();










// TABS3 js
// 전역 을 쓰게 되면 혹시나 겹칠까봐 tabs 123 에 각각의 함수들을 묶음으로 사용
(() => {
  const actions = {
    birdFlies(go) {
      if (go) {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    },

    birdFlies2(go) {
      if (go) {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translate(${window.innerWidth}px ,${
          -window.innerHeight * 0.7
        }px )`;
      } else {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    },
  };

  const textElems = document.querySelectorAll(".text");
  const graphicElems = document.querySelectorAll(".graphic-item");
  let currentItem = graphicElems[0]; //현재 활성화 된 visible붙은 이미지
  let ioIndex;
  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1;
    //   console 창에 검정색으로 표시된다 . ==> 문자열
    //   index는 숫자열로 하는게 사용하기 좋다 *1을 하는게 제일 쉽다
  });

  for (let i = 0; i < textElems.length; i++) {
    io.observe(textElems[i]);
    textElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  // action이라는 변수 받아와서 활성화 비활성화
  function activate(action) {
    currentItem.classList.add("visible");
    if (action) {
      actions[action](true);
    }
  }

  function inactivate(action) {
    currentItem.classList.remove("visible");
    if (action) {
      actions[action](false);
    }
  }

  window.addEventListener("scroll", () => {
    let text;
    let boundingRect;
    // for 문 남용을 방지 하기 위해 ioINdext 이거는 최대 3 개까지 만 for문이 돈다 내용이 많아 졌을 때의 대비

    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      text = textElems[i];
      if (!text) continue;
      boundingRect = text.getBoundingClientRect();
      //   x,y크기,탑 값을 알기 위해
      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        // == graphicElems[i].classList.add("visible");
        inactivate();
        currentItem = graphicElems[text.dataset.index];
        activate(currentItem.dataset.action);
      }
    }

    window.addEventListener("load", function () {
      setTimeout(function () {
        scrollTo(0, 0);
      }, 100);
    });
  });
  // 새로고침 했을 때 상단으로 돌아가기
  // 화면이 보여 졌을 때 첫 이미지는 보여야 하니 활성화 첫 이미지 활성화
  activate();
})();
