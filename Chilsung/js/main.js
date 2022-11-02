// header
$(function () {
  let $header = $("header"),
    $headerHeight = $header.outerHeight(),
    $menu = $(".gnb .main");

  $menu
    .mouseenter(function () {
      let $subHeight = $(this).find("ul").outerHeight();
      $header
        .stop()
        .animate({ height: $headerHeight + $subHeight + "px" }, 300);
      $(this).find("ul").show();
    })
    .mouseleave(function () {
      $header.stop().animate({ height: $headerHeight + "px" }, 300);
      $(this).find("ul").hide();
    });
});

// sect1 slide
(() => {
  let slideWrap = document.querySelector(".slideWrap"),
    slides = document.querySelectorAll(".slide"),
    slideCount = slides.length,
    currentIndex = 0;

  slides.forEach((slide, i) => {
    slide.style.left = i * 100 + "%";
  });

  function slideShow() {
    let nextIndex = (currentIndex + 1) % slideCount;
    slideWrap.style.left = -currentIndex * 100 + "%";
    slides.forEach((slide, currentIndex) => {
      slide.classList.remove("on");
    });
    slides[currentIndex].classList.add("on");
    currentIndex = nextIndex;
  }

  setInterval(slideShow, 5000);

  
})();
// sect2,3
(() => {
  let grid;
  const frame = ".productItem";
  const box = ".productItem article";
  const speed = "0.5s";
  const articleclass = "on";
  const productItemElems = document.querySelectorAll(".menu li a");
  let inner = document.getElementById("inner");
  let productPage = document.querySelectorAll(".product");

  window.addEventListener("load", function () {
    init();
    filter(productItemElems);
  });
  function init() {
    grid = new Isotope(frame, {
      itemSelector: box,
      columnWidth: box,
      transitionDuration: speed,
    });
  }
  function filter(target) {
    target.forEach((item, i) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        activeMenu(i);
        const sort = this.getAttribute("href");
        grid.arrange({ filter: sort });
      });
    });
  }

  function activeMenu(i) {
    productItemElems.forEach((elem) => {
      elem.classList.remove("on");
    });
    productItemElems[i].classList.add("on");
  }
  productItemElems.forEach((menu, i) =>
    menu.addEventListener("click", function (e) {
      e.preventDefault();
      let currentTab = e.target.getAttribute("href");
      let changeTab = currentTab.replace(".", "");
      inner.className = changeTab;
      openPage(i);
    })
  );
  function openPage(i) {
    productPage.forEach((page) => {
      page.classList.remove("on");
    });
    productPage[i].classList.add("on");
  }
  let tabs = document.querySelectorAll(".tabBtn li a"),
    contents = document.querySelectorAll(".content");

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (e) {
      e.preventDefault();
      for (let j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove("on");
        contents[j].classList.remove("on");
      }
      tabs[i].classList.add("on");
      contents[i].classList.add("on");
    });
  }
})();


// scroll


let beforePosition = document.documentElement.scrollTop;

window.addEventListener("scroll", (e) => {
  let fixTitle = document.querySelectorAll(".fixTitle"),
    scrollPos = window.scrollY || document.documentElement.scrollTop,
    afterPosition = document.documentElement.scrollTop,
    header = document.querySelector("header"),
    lastSec = document.getElementById("sect4"),
    secondSec = document.getElementById("sect2");

  if (afterPosition > 50) {
    if (beforePosition < afterPosition) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  }
  beforePosition = afterPosition;

  if (scrollPos >= secondSec.offsetTop) {
    fixTitle[0].classList.add("on");
    if (scrollPos - 200 > secondSec.offsetTop) {
      fixTitle[0].style.opacity = "0";
    } else {
      fixTitle[0].style.opacity = "1";
    }
  } else {
    fixTitle[0].classList.remove("on");
  }

  if (scrollPos >= lastSec.offsetTop) {
    fixTitle[1].classList.add("on");
    if (scrollPos - 400 > lastSec.offsetTop) {
      fixTitle[1].style.opacity = "0";
    } else {
      fixTitle[1].style.opacity = "1";
    }
  } else {
    fixTitle[1].classList.remove("on");
  }
  console.log(scrollPos);
  console.log(lastSec.offsetTop);
});
