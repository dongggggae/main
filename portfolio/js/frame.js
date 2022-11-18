// $("a.link").click(function (e) {
//   let href = $(this).attr("href");
//   e.preventDefault();
//   $(".frame").animate({ top: "0" });
//   $(".frame").load(`./${href}`);
//   $(".frame").css({
//     width: "100vw",
//     height: "100vh",
//     "z-index": "999",
//     overflow: "auto",
//   });
//   $("#frameBtn").addClass("on");
//   $("#frameBtn").css({ cursor: "pointer" });
// });
// $("#frameBtn").click(function (e) {
//   e.preventDefault();
//   $(".frame").animate({ top: "100%" });
//   $("#frameBtn").removeClass("on");
//   $(".frame").css({ "z-index": 0 });
//   $(this).css({ cursor: "default" });
// });
