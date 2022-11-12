// intro

window.addEventListener("load", function () {
  let intro = document.getElementById("intro"),
    header = document.getElementById("header"),
    pageStart = document.querySelectorAll(".pageStart");
  body = document.querySelector("body");

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
    header.classList.add("active");
    header.classList.remove("hide");
  }
  function intro3() {
    body.style.overflowY = "auto";
    let start = pageStart[0].offsetTop;
    window.scrollTo({ top: start, behavior: "smooth" });
  }
  setTimeout(() => intro1(), 500);
  setTimeout(() => introRe1(), 1100);
  setTimeout(() => introRe2(), 1700);
  setTimeout(() => introRe3(), 2300);
  setTimeout(() => intro2(), 3400);
  setTimeout(() => intro3(), 3400);
});

// header scroll + observar
(() => {
  let beforePosition = document.documentElement.scrollTop,
    tabsElems = document.querySelectorAll(".tabs"),
    work = document.getElementById("work").offsetTop,
    project = document.getElementById("project").offsetTop,
    about = document.getElementById("about").offsetTop,
    secPos = new Array(work, project, about),
    bg = document.querySelector(".wrap");

  tabsElems.forEach((elem, i) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      goToSec(i);
    });
  });

  function goToSec(i) {
    window.scrollTo({ top: secPos[i], behavior: "smooth" });
  }

  window.addEventListener("scroll", () => {
    let header = document.getElementById("header"),
      afterPosition = document.documentElement.scrollTop;

    // bg change

    if (afterPosition > secPos[1]) {
      bg.style.backgroundColor = "rgb(242,242,242)";
    } else {
      bg.style.backgroundColor = "rgb(17,17,17)";
    }

    if (afterPosition > 50) {
      beforePosition < afterPosition
        ? header.classList.add("active")
        : header.classList.remove("active");
    }
    beforePosition = afterPosition;
  });

  let observer = new IntersectionObserver((e) => {
    e.forEach((Item, j) => {
      console.log(j);
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

// about scroll + skillbar

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
// skill bar
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
        }, j * 100);
      });
    }
  });
})();
// about scroll + skillbar================================
