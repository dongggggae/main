let slideTexts = document.querySelectorAll(".text"),
  textWrap = document.querySelector(".textWrap"),
  workSlide = document.querySelector(".workSlide"),
  slideBgs = document.querySelectorAll(".bg"),
  bgWrap = document.querySelector(".bgWrap"),
  bgCount = slideBgs.length,
  textCount = slideTexts.length,
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
  text.addEventListener("click", (e) => {});
});

function goToBack() {
  if (currentIndex == 11) {
    bgWrap.classList.remove("animate");
    textWrap.classList.remove("animate");
    currentIndex = 0;
    setTimeout(() => {
      bgWrap.classList.add("animate");
      textWrap.classList.add("animate");
    }, 150);
  } else if (currentIndex == -11) {
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
  number = currentIndex + 10;
  slideTexts.forEach((text, number) => {
    text.classList.remove("on");
    text.classList.remove("sub");
  });
  if (number < 0 || number > 20) {
    currentIndex = 0;
  } else {
    slideTexts[number].classList.add("on");
  }
  if (number == 0) {
    slideTexts[number + 1].classList.add("sub");
  } else if (number == 20) {
    slideTexts[number - 1].classList.add("sub");
  } else {
    slideTexts[number - 1].classList.add("sub");
    slideTexts[number + 1].classList.add("sub");
  }
  console.log(number);
}

// number +10 한 이유는 21%2 10.5 인데 인덱스는 0부터 시작하니까 중간위치 10번을 햔재 번호로 지정하기 위해
// 2n 개 추가하면 number 은 current + 10+n

function activeBg() {
  number = currentIndex + 10;
  slideBgs.forEach((bg, number) => {
    bg.classList.remove("on");
    bg.classList.remove("sub");
  });
  slideBgs[number].classList.add("on");
  if (number == 0) {
    slideBgs[number + 1].classList.add("sub");
  } else if (number == 20) {
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
slideTexts[9].classList.add("sub");
slideTexts[11].classList.add("sub");
slideTexts[10].classList.add("on");
slideBgs[10].classList.add("on");
