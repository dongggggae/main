// intro

window.addEventListener("load", function () {
  let intro = document.getElementById("intro"),
    header = document.getElementById("header"),
    workSec = document.getElementById("work"),
    main = document.getElementById("main");

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
    main.classList.remove("none");
    let mainLocation = main.offsetTop;
    window.scrollTo({ top: mainLocation, behavior: "smooth" });
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

// tab1
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
