let proObserver = new IntersectionObserver((e) => {
  e.forEach((Item, j) => {
    setTimeout(() => {
      if (Item.isIntersecting) {
        Item.target.classList.add("active");
      } else {
        Item.target.classList.remove("active");
      }
    }, j * 300);
  });
});
let proScroll = document.querySelectorAll(".proScroll");

proScroll.forEach((scrollItem, i) => {
  proObserver.observe(scrollItem);
});
