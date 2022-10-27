let slideContainer = document.querySelector(".slideContainer"),
  slideWrap = document.querySelector(".slideWrap"),
  slides = document.querySelectorAll("img"),
  prev = document.querySelector(".prev a"),
  next = document.querySelector(".next a"),
  slideCount = slides.length,
  currentIndex = 0,
  topHeight = 0;

function tallstHeight() {
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].offsetHeight > topHeight) {
      topHeight = slides[i].offsetHeight;
    }
  }
  slideContainer.style.height = topHeight + "px";
  slideWrap.style.height = topHeight + "px";
}

tallstHeight();

for (let i = 0; i < slides.length; i++) {
  slides[i].style.left = i * 100 + "%";
}

function goToSlide(i) {
  currentIndex = i;
  slideWrap.style.left = -i * 100 + "%";
  // updateNav();
}

prev.addEventListener("click", function (e) {
  e.preventDefault();
  slideWrap.classList.add("animate");
  if (currentIndex == 0) {
    goToSlide(slideCount - 1);
  } else {
    goToSlide(currentIndex - 1);
  }
});
next.addEventListener("click", function (e) {
  e.preventDefault();
  slideWrap.classList.add("animate");
  if (currentIndex == slideCount - 1) {
    goToSlide(0);
  } else {
    goToSlide(currentIndex + 1);
  }
});

function updateNav() {
  if (currentIndex == 0) {
    prev.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
  }
  if (currentIndex == slideCount - 1) {
    next.classList.add("disabled");
  } else {
    next.classList.remove("disabled");
  }
}
goToSlide(0);
