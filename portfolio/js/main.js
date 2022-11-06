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

// intro\

window.addEventListener("load", function () {
  var intro = document.getElementById("intro");
  var header = document.getElementById("header");
  let firstMain = document.getElementById("tab1");
  function intro1() {
    intro.classList.add("open");
  }
  function introRe1() {
    intro.querySelector(".first").style.opacity = "0";
  }
  function introRe2() {
    intro.querySelector(".twice").style.opacity = "1";
  }
  function introRe3() {
    intro.querySelector(".twice").style.opacity = "0";
  }
  function intro2() {
    intro.classList.add("none");
    header.classList.remove("hide");
  }
  function intro3() {
    firstMain.classList.add("active");
  }
  setTimeout(() => intro1(), 500);
  setTimeout(() => introRe1(), 1100);
  setTimeout(() => introRe2(), 1700);
  setTimeout(() => introRe3(), 2300);
  setTimeout(() => intro2(), 3400);
  setTimeout(() => intro3(), 3400);
});

// header

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
    tabOpen(idx);
  });

  function tabOpen(i) {
    let showTabs = $tabs.eq(i).attr("href");
    $($main).fadeOut();
    setTimeout(() => {
      $(`${showTabs}`).stop().fadeIn(500);
    }, 1000);
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

// tab1
(() => {
  let slideTexts = document.querySelectorAll(".workText"),
    textWrap = document.querySelector(".textWrap"),
    tabslide = document.getElementById("tab1"),
    slideBgs = document.querySelectorAll(".bg"),
    bgWrap = document.querySelector(".bgWrap"),
    bgCount = slideBgs.length,
    currentIndex = 0,
    number,
    wheelTimer;

  tabslide.addEventListener("wheel", (e) => {
    e.preventDefault();
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      if (e.deltaY > 0) {
        currentIndex++;
        goToBack();
        moveSLide(currentIndex);
        activeTitle();
        activeBg();
      } else {
        currentIndex--;
        goToBack();
        moveSLide(currentIndex);
        activeTitle();
        activeBg();
      }
    }, 100);
  });

  function goToBack() {
    if (currentIndex == 13) {
      bgWrap.classList.remove("animate");
      currentIndex = 0;
      setTimeout(() => {
        bgWrap.classList.add("animate");
      }, 150);
    } else if (currentIndex == -13) {
      bgWrap.classList.remove("animate");
      currentIndex = 0;
      setTimeout(() => {
        bgWrap.classList.add("animate");
      }, 150);
    }
  }

  function activeTitle() {
    number = currentIndex + 12;
    slideTexts.forEach((text) => {
      text.classList.remove("on");
    });
    if (number < 0 || number > 24) {
      currentIndex = 0;
    } else {
      slideTexts[number].classList.add("on");
    }
  }

  // number +10 한 이유는 21%2 10.5 인데 인덱스는 0부터 시작하니까 중간위치 10번을 햔재 번호로 지정하기 위해
  // 2n 개 추가하면 number 은 current + 10+n

  function activeBg() {
    number = currentIndex + 12;
    slideBgs.forEach((bg) => {
      bg.classList.remove("on");
      bg.classList.remove("sub");
    });
    slideBgs[number].classList.add("on");
    if (number == 0) {
      slideBgs[number + 1].classList.add("sub");
    } else if (number == 24) {
      slideBgs[number - 1].classList.add("sub");
    } else {
      slideBgs[number + 1].classList.add("sub");
    }
  }

  function moveSLide(i) {
    currentIndex = i;
    textWrap.style.top = -i * 100 + "%";
    bgWrap.style.left = -i * 100 + "%";
  }

  for (let i = 0; i < bgCount; i++) {
    slideTexts[i].style.top = i * 100 + "%";
    slideBgs[i].style.left = i * 100 + "%";
  }

  slideTexts[12].classList.add("on");
  slideBgs[12].classList.add("on");
  slideBgs[13].classList.add("sub");
})();

// tab2

(() => {
  let observer = new IntersectionObserver((e) => {
    e.forEach((Item, j) => {
      setTimeout(() => {
        if (Item.isIntersecting) {
          Item.target.classList.add("active");
        } else {
          Item.target.classList.remove("active");
        }
      }, j * 300);
    });
    threshold: 0.5;
  });

  document
    .querySelectorAll(".proScroll")
    .forEach((elem) => observer.observe(elem));
})();

// tab3
(() => {
  const textElems = document.querySelectorAll(".text");
  const graphicElems = document.querySelectorAll(".graphic-item");
  let currentItem = graphicElems[0]; //현재 활성화 된 visible붙은 이미지
  let ioIndex;
  
  

  const io = new IntersectionObserver((entries) => {
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
  function activate() {
    currentItem.classList.add("visible");
  }

  function inactivate() {
    currentItem.classList.remove("visible");
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
        activate();
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

// tab3skill 변수
(() => {
  let skill = document.getElementById("skillBox"),
    skillAni = document.querySelectorAll(".skillAni"),
    skillPer = document.querySelectorAll(".skill"),
    skillWidth = new Array();

  window.addEventListener("scroll", () => {
    let skillBoundingRect;
    skillBoundingRect = skill.getBoundingClientRect();
    if (
      skillBoundingRect.top > window.innerHeight * 0.2 &&
      skillBoundingRect.top < window.innerHeight * 0.8
    ) {
      skillAni.forEach((bar, j) => {
        skillWidth[j] = bar.dataset.width * 1;
        setTimeout(() => {
          skillAni[j].style.width = `${skillWidth[j]}%`;
          skillPer[j].textContent = `${skillWidth[j]}%`;
          console.log(j);
        }, j * 100);
      });
    }
  });
})();
// tab2,tab3 scroll
(() => {
  let beforePosition = document.documentElement.scrollTop;

  window.addEventListener("scroll", () => {
    let header = document.getElementById("header"),
      afterPosition = document.documentElement.scrollTop;

    if (afterPosition > 50) {
      if (beforePosition < afterPosition) {
        header.classList.add("active");
      } else {
        header.classList.remove("active");
      }
    }
    beforePosition = afterPosition;
  });
})();
