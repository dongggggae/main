let observer = new IntersectionObserver((e) => {
  e.forEach((Item, j) => {
    setTimeout(() => {
      if (Item.isIntersecting) {
        Item.target.classList.add("active");
      } else {
        Item.target.classList.remove("active");
      }
    }, j * 300);
  });
  threshold: 0.5;
});

document
  .querySelectorAll(".proScroll")
  .forEach((elem) => observer.observe(elem));
