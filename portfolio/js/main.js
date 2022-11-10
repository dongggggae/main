// intro

window.addEventListener("load", function () {
  let intro = document.getElementById("intro"),
    header = document.getElementById("header"),
    workSec = document.getElementById("work"),
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
    let workSecLocation = workSec.offsetTop;
    window.scrollTo({ top: workSecLocation, behavior: "smooth" });
  }
  setTimeout(() => intro1(), 500);
  setTimeout(() => introRe1(), 1100);
  setTimeout(() => introRe2(), 1700);
  setTimeout(() => introRe3(), 2300);
  setTimeout(() => intro2(), 3400);
  setTimeout(() => intro3(), 3400);
});

// header scroll
(() => {
  let beforePosition = document.documentElement.scrollTop,
    scrTop = window.scrollY,
    tabsElems = document.querySelectorAll(".tabs"),
    work = document.getElementById("work").offsetTop,
    project = document.getElementById("project").offsetTop,
    about = document.getElementById("about").offsetTop,
    secPos = new Array(work, project, about);

  activeHeader();

  function activeHeader() {
    tabsElems.forEach((elem, i) => {
      elem.addEventListener("click", (e) => {
        e.preventDefault();
        for (let i = 0; i < tabsElems.length; i++) {
          tabsElems[i].classList.remove("on");
        }
        tabsElems[i].classList.add("on");
        goToSec(i);
      });
    });
  }
  function goToSec(i) {
    window.scrollTo({ top: secPos[i], behavior: "smooth" });
  }

  window.addEventListener("scroll", () => {
    let header = document.getElementById("header"),
      afterPosition = document.documentElement.scrollTop;

    if (afterPosition > 50) {
      beforePosition < afterPosition
        ? header.classList.add("active")
        : header.classList.remove("active");
    }
    beforePosition = afterPosition;
  });
})();
// section1,2,3 title
(() => {
  const pTag1 = document.querySelector(".first-title");
  const pTag2 = document.querySelector(".second-title");
  const pTag3 = document.querySelector(".third-title");

  const textArr1 = "WORK WORK WORK WORK WORK WORK WORK WORK WORK WORK".split(
    " "
  );
  const textArr2 =
    "PROJECT PROJECT PROJECT PROJECT PROJECT PROJECT PROJECT PROJECT PROJECT PROJECT".split(
      " "
    );
  const textArr3 =
    "ABOUT ABOUT ABOUT ABOUT ABOUT ABOUT ABOUT ABOUT ABOUT ABOUT".split(" ");

  let count1 = 0;
  let count2 = 0;
  let count3 = 0;

  initTexts(pTag1, textArr1);
  initTexts(pTag2, textArr2);
  initTexts(pTag3, textArr3);

  function initTexts(element, textArray) {
    textArray.push(...textArray);
    for (let i = 0; i < textArray.length; i++) {
      element.innerText += `${textArray[i]}\u00A0\u00A0\u00A0\u00A0`;
    }
  }

  function marqueeText(count, element, direction) {
    if (count > element.scrollWidth / 2) {
      element.style.transform = `translate3d(0, 0, 0)`;
      count = 0;
    }
    element.style.transform = `translate3d(${direction * count}px, 0, 0)`;

    return count;
  }

  function animate() {
    count1++;
    count2++;
    count3++;

    count1 = marqueeText(count1, pTag1, -1);
    count2 = marqueeText(count2, pTag2, 1);
    count3 = marqueeText(count3, pTag3, -1);

    window.requestAnimationFrame(animate);
  }

  function scrollHandler() {
    count1 += 20;
    count2 += 20;
    count3 += 20;
  }

  window.addEventListener("scroll", scrollHandler);
  animate();
  window.addEventListener("load", () => {
    let introElems = document.querySelectorAll(".title");
    introElems.forEach((elem, i) => {
      setTimeout(() => {
        elem.style.opacity = 1;
      }, (i + 1) * 700);
    });
  });
})();
// marqueetitle===================================
// work slide===============
(() => {
  let slideTexts = document.querySelectorAll(".workText"),
    textWrap = document.querySelector(".textWrap"),
    slideBgs = document.querySelectorAll(".bg"),
    bgWrap = document.querySelector(".bgWrap"),
    bgCount = slideBgs.length,
    currentIndex = 0,
    number,
    wheelTimer;

  bgWrap.addEventListener("wheel", (e) => {
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
    }, 70);
  });

  function goToBack() {
    if (currentIndex == 13 || currentIndex == -13) {
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
// workslide ==================================
// project section tab menu
(() => {
  let TitElems = document.querySelectorAll(".projectTit h2"),
    figureElems = document.querySelectorAll(".projectImgWrap figure");

  TitElems.forEach((elem, i) => {
    elem.addEventListener("mouseover", () => {
      for (let i = 0; i < figureElems.length; i++) {
        figureElems[i].classList.remove("active");
        TitElems[i].classList.remove("on");
      }
      figureElems[i].classList.add("active");
      TitElems[i].classList.add("on");
    });
  });
})();
// project section tab menu===============================
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
