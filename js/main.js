// 첫번쫴 화면에서는 prev 비활성화 마지막화면에서는 next 비활성화
// next누르면 앞으로 prev누르면 뒤로
// 화면에 맞게 indicator 활성화 indicator클릭하면 이동
// 자동 슬라이드

$(function () {
  let container = $(".slideContainer"),
    slides = $(container).find("img"),
    slideCount = slides.length,
    indicator = $(container).find(".indicator"),
    prev = $(container).find(".prev"),
    next = $(container).find(".next"),
    currentIndex = 0;
  indicatorHtml = "";

  setInterval(playSlide, 5000);
  function playSlide() {
    let nextIndex = (currentIndex + 1) % slideCount;
    goSlide(currentIndex);
    currentIndex = nextIndex;
  }

  function goSlide(i) {
    currentIndex = i;
    container
      .find(".slideWrap")
      .animate({ left: 100 * -i + "%" }, 500, "swing");
    ActiveNav();
  }

  slides.each(function (i) {
    let newLeft = i * 100 + "%";
    $(this).css({ left: newLeft });
    indicatorHtml += "<a href='#'>" + (i + 1) + "</a>";
  });
  indicator.html(indicatorHtml);

  function ActiveNav() {
    if (currentIndex == 0) {
      prev.hide();
    } else {
      prev.show();
    }
    if (currentIndex == slideCount - 1) {
      next.hide();
    } else {
      next.show();
    }
    indicator
      .find("a")
      .eq(currentIndex)
      .addClass("on")
      .siblings()
      .removeClass("on");
  }
  $(".btn").click(function (e) {
    e.preventDefault();
    if ($(this).hasClass("prev")) {
      goSlide(currentIndex - 1);
    } else {
      goSlide(currentIndex + 1);
    }
  });
  indicator.find("a").click(function (e) {
    e.preventDefault();
    let idx = $(this).index();
    goSlide(idx);
  });

  ActiveNav();
});
