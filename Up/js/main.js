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

// intro\

(() => {
  String.prototype.toKorChars = function () {
    var cCho = [
        "ㄱ",
        "ㄲ",
        "ㄴ",
        "ㄷ",
        "ㄸ",
        "ㄹ",
        "ㅁ",
        "ㅂ",
        "ㅃ",
        "ㅅ",
        "ㅆ",
        "ㅇ",
        "ㅈ",
        "ㅉ",
        "ㅊ",
        "ㅋ",
        "ㅌ",
        "ㅍ",
        "ㅎ",
      ],
      cJung = [
        "ㅏ",
        "ㅐ",
        "ㅑ",
        "ㅒ",
        "ㅓ",
        "ㅔ",
        "ㅕ",
        "ㅖ",
        "ㅗ",
        "ㅘ",
        "ㅙ",
        "ㅚ",
        "ㅛ",
        "ㅜ",
        "ㅝ",
        "ㅞ",
        "ㅟ",
        "ㅠ",
        "ㅡ",
        "ㅢ",
        "ㅣ",
      ],
      cJong = [
        "",
        "ㄱ",
        "ㄲ",
        "ㄳ",
        "ㄴ",
        "ㄵ",
        "ㄶ",
        "ㄷ",
        "ㄹ",
        "ㄺ",
        "ㄻ",
        "ㄼ",
        "ㄽ",
        "ㄾ",
        "ㄿ",
        "ㅀ",
        "ㅁ",
        "ㅂ",
        "ㅄ",
        "ㅅ",
        "ㅆ",
        "ㅇ",
        "ㅈ",
        "ㅊ",
        "ㅋ",
        "ㅌ",
        "ㅍ",
        "ㅎ",
      ],
      cho,
      jung,
      jong;
    var str = this,
      cnt = str.length,
      chars = [],
      cCode;
    for (var i = 0; i < cnt; i++) {
      cCode = str.charCodeAt(i);
      if (cCode == 32) {
        chars.push(" ");
        continue;
      } // 한글이 아닌 경우
      if (cCode < 0xac00 || cCode > 0xd7a3) {
        chars.push(str.charAt(i));
        continue;
      }
      cCode = str.charCodeAt(i) - 0xac00;

      jong = cCode % 28;
      // 종성
      jung = ((cCode - jong) / 28) % 21;

      // 중성
      cho = ((cCode - jong) / 28 - jung) / 21;
      // 초성

      //기본 코드 테스트가 ㅌㅔㅅ-ㅌ- 형식으로 저장됨
      // chars.push(cCho[cho], cJung[jung]);
      // if (cJong[jong] !== '') {
      //     chars.push(cJong[jong]);
      //     }

      //  테스트라는 문장이 있으면 ㅌ테ㅅ스ㅌ트 형식으로 저장되도록함 (타이핑을 위해서)
      chars.push(cCho[cho]);
      chars.push(String.fromCharCode(44032 + cho * 588 + jung * 28));
      if (cJong[jong] !== "") {
        chars.push(String.fromCharCode(44032 + cho * 588 + jung * 28 + jong));
      }
    }

    return chars;
  };

  //타이핑할 문장
  var result = "함께+성장+지금+여기+";
  var typeing1 = [];
  result = result.split(""); // 한글자씩자름

  //각글자 초성,중성,종성으로 나눔
  for (var i = 0; i < result.length; i++) {
    typeing1[i] = result[i].toKorChars();
  }
  console.log(typeing1);

  //출력할 엘리먼트요소 가져옴
  var resultDiv = document.getElementById("intro_txt");

  //
  var text = "";
  var i = 0;
  var j = 0;
  var text = "";

  //총글자수
  var imax = typeing1.length;

  //setInterval을 이용해 반복적으로 출력
  var inter = setInterval(typi, 60);

  function rp() {
    let str = document.getElementById("intro_txt").innerText;
    str1 = str
      .replace("함께+", "함께+<i>")
      .replace("성장+", "성장+</i>")
      .replace("지금+", "지금+<i>")
      .replace("여기+", "여기+</i>");
    document.getElementById("intro_txt").innerHTML = str1;
  }

  function typi() {
    //글자수만큼 반복후 종료
    if (i <= imax - 1) {
      //각 글자가 초성 중성 종성 순서대로 추가되도록
      var jmax = typeing1[i].length;
      resultDiv.innerHTML = text + typeing1[i][j];
      j++;
      if (j == jmax) {
        text += typeing1[i][j - 1]; //초성중성종성 순서대로 출력된 글자는 저장 ( 다음 글자와 이어붙이기 위해서 )
        i++;
        j = 0;
      }
      rp();
    } else {
      clearInterval(inter);
    }
  }
  var intro_mo = document.getElementById("intro");
  var header = document.getElementById("header");
  let firstMain = document.getElementById("tab1");
  function intro1() {
    intro_mo.classList.add("op_on");
  }
  function intro2() {
    intro_mo.classList.add("none");
    header.classList.remove("hide");
  }
  function intro3() {
    firstMain.classList.add("active");
  }
  setTimeout(() => intro1(), 1600);
  setTimeout(() => intro2(), 3700);
  setTimeout(() => intro3(), 3700);
})();

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
    $("main").fadeOut();
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
    workSlide = document.querySelector(".workSlide"),
    slideBgs = document.querySelectorAll(".bg"),
    bgWrap = document.querySelector(".bgWrap"),
    bgCount = slideBgs.length,
    currentIndex = 0,
    number,
    wheelTimer;

  workSlide.addEventListener("wheel", (e) => {
    e.preventDefault();
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      if (e.deltaY > 0) {
        console.log(e);
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
    }, 30);
  });

  slideTexts.forEach((text) => {
    text.addEventListener("click", (e) => {
      e.preventDefault();
      let index = e.currentTarget.dataset.index * 1 - 1;
      activeTitle();
      activeBg();
      if (index < number) {
        currentIndex--;
        moveSLide(currentIndex);
        activeTitle();
        activeBg();
      } else if (index > number) {
        currentIndex++;
        moveSLide(currentIndex);
        activeTitle();
        activeBg();
      }
      console.log(number, "num");
      console.log(index, "in");
      console.log(currentIndex, "cur");
    });
  });

  function goToBack() {
    if (currentIndex == 13) {
      bgWrap.classList.remove("animate");
      textWrap.classList.remove("animate");
      currentIndex = 0;
      setTimeout(() => {
        bgWrap.classList.add("animate");
        textWrap.classList.add("animate");
      }, 150);
    } else if (currentIndex == -13) {
      bgWrap.classList.remove("animate");
      textWrap.classList.remove("animate");
      currentIndex = 0;
      setTimeout(() => {
        bgWrap.classList.add("animate");
        textWrap.classList.add("animate");
      }, 150);
    }
  }

  function activeTitle() {
    number = currentIndex + 12;
    slideTexts.forEach((text, number) => {
      text.classList.remove("on");
      text.classList.remove("sub");
    });
    if (number < 0 || number > 24) {
      currentIndex = 0;
    } else {
      slideTexts[number].classList.add("on");
    }
    if (number == 0) {
      slideTexts[number + 1].classList.add("sub");
    } else if (number == 24) {
      slideTexts[number - 1].classList.add("sub");
    } else {
      slideTexts[number - 1].classList.add("sub");
      slideTexts[number + 1].classList.add("sub");
    }
  }

  // number +10 한 이유는 21%2 10.5 인데 인덱스는 0부터 시작하니까 중간위치 10번을 햔재 번호로 지정하기 위해
  // 2n 개 추가하면 number 은 current + 10+n

  function activeBg() {
    number = currentIndex + 12;
    slideBgs.forEach((bg, number) => {
      bg.classList.remove("on");
      bg.classList.remove("sub");
    });
    slideBgs[number].classList.add("on");
    if (number == 0) {
      slideBgs[number + 1].classList.add("sub");
    } else if (number == 24) {
      slideBgs[number - 1].classList.add("sub");
    } else {
      slideBgs[number - 1].classList.add("sub");
      slideBgs[number + 1].classList.add("sub");
    }
  }

  function moveSLide(i) {
    currentIndex = i;
    textWrap.style.top = -i * 33.3333 + "%";
    bgWrap.style.left = -i * 100 + "%";
  }

  for (let i = 0; i < bgCount; i++) {
    slideTexts[i].style.top = i * 100 + "%";
    slideBgs[i].style.left = i * 100 + 50 + "%";
  }
  // jquery
  slideTexts[11].classList.add("sub");
  slideTexts[13].classList.add("sub");
  slideTexts[12].classList.add("on");
  slideBgs[12].classList.add("on");
})();

// tab3
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
