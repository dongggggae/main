let slideTexts = document.querySelectorAll(".text"),
textWrap = document.querySelector(".textWrap"),
slideBgs = document.querySelectorAll(".bg"),
bgWrap = document.querySelector(".bgWrap"),
bgCount = slideBgs.length,
textCount = slideTexts.length,
currentIndex = 0,
number;

window.addEventListener("wheel", (e) => {
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


slideTexts[10].classList.add("on");
slideBgs[10].classList.add("on");