// intro

window.addEventListener("load", function () {
  let intro = document.getElementById("intro"),
    header = document.getElementById("header"),
    pageIntro = document.querySelectorAll(".secIntro");
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
    let start = pageIntro[0].offsetTop;
    window.scrollTo({ top: start - 30, behavior: "smooth" });
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
    sectElems = document.querySelectorAll("section");

  // 각 섹션위치 찾아가기
  tabsElems.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      let href = tab.getAttribute("href");
      let sectTop = document.querySelector(href).offsetTop;
      window.scrollTo({ top: sectTop, behavior: "smooth" });
    });
  });

  window.addEventListener("scroll", () => {
    let afterPosition = document.documentElement.scrollTop;
    // section 높이마다 헤더 on//off
    sectElems.forEach((section, i) => {
      let sectTop = section.offsetTop;

      if (afterPosition + 150 >= sectTop) {
        tabsElems.forEach((tab) => {
          tab.classList.remove("on");
        });
        tabsElems[i].classList.add("on");
      }
    });

    // header on//off
    if (afterPosition > 50) {
      beforePosition < afterPosition
        ? header.classList.add("active")
        : header.classList.remove("active");
    }
    beforePosition = afterPosition;
  });
})();

/* work random filter
 섹션의 위치에 도달하면 랜덤 배열로 content에 on 클래서 넣어서 보여지게한다 << 한번만 실행
 각각의 버튼을 누르게 되면 그 해당하는 classlist를 받아와서 실행 시킨다.
 removeclass를 하고 난 뒤에 none 넣고 다시 랜덤배열로 on 넣는다. */

//  all responsive renew clone
(() => {
  const allBtn = document.getElementById("all");
  const responBtn = document.getElementById("responsive");
  const renewBtn = document.getElementById("renew");
  const cloneBtn = document.getElementById("clone");
  const liElems = document.querySelectorAll("li.content");
  // let btnElems = document.querySelectorAll(".btnArea button");
  let array = [];
  // 로드되면 인트로 끝나고 바로 work 실행
  window.addEventListener("load", () => {
    function workSHow() {
      randomNum();
      activeFilter("all");
    }
    setTimeout(() => workSHow(), 3500);
  });

  function randomNum() {
    while (array.length < liElems.length) {
      let ramdom = Math.trunc(Math.random() * liElems.length);
      if (array.indexOf(ramdom) < 0) {
        array.push(ramdom);
      }
    }
  }

  function activeFilter(filter) {
    liElems.forEach((elem, i) => {
      liElems[i].classList.remove("on");
      let j = array[i];
      elemClass = elem.classList;
      if (elemClass.contains(filter)) {
        elem.style.display = "block";
      } else {
        elem.style.display = "none";
      }
      setTimeout(() => {
        elem.classList.add("on");
      }, j * 150);
    });
  }
  randomNum();

  allBtn.addEventListener("click", () => {
    liElems.forEach((elem, i) => {
      let j = array[i];
      liElems[i].classList.remove("on");
      elem.style.display = "block";
      setTimeout(() => {
        elem.classList.add("on");
      }, j * 150);
    });
  });
  responBtn.addEventListener("click", () => {
    activeFilter("responsive");
  });
  renewBtn.addEventListener("click", () => {
    activeFilter("renew");
  });
  cloneBtn.addEventListener("click", () => {
    activeFilter("clone");
  });
})();

// projectscroll
(() => {
  const proSec = document.getElementById("project");
  let projectElems = document.querySelectorAll(".project"),
    imgElems = document.querySelectorAll(".projectImg figure");
  projectBg = ["rgb(0, 115, 229)", "rgb(161, 161, 229)", "rgb(30, 31, 33)"];
  window.addEventListener("scroll", () => {
    let scr = document.documentElement.scrollTop;
    projectElems.forEach((project, i) => {
      if (scr >= project.offsetTop) {
        if (i == i) {
          proSec.style.backgroundColor = projectBg[i];
        }
        imgElems.forEach((img) => {
          img.classList.remove("on");
        });
        imgElems[i].classList.add("on");
      }
    });
  });
})();

// observe
(() => {
  let observer = new IntersectionObserver(
    (e) => {
      e.forEach((Item, j) => {
        setTimeout(() => {
          if (Item.isIntersecting) {
            Item.target.classList.add("active");
          }
        }, j * 500);
      });
    },
    {
      threshold: 0.5,
    }
  );

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
  //  새로고침 했을 때 상단으로 돌아가기 화면이 보여 졌을 때 첫 이미지는 보여야 하니 활성화 첫 이미지 활성화
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
