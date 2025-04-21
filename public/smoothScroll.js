$('header .list a, .btn-gototop').click(function(){
  $.scrollTo(this.hash || 0, 700);
})

// document.querySelectorAll('header .list a, .btn-gototop').forEach((el) => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const targetId = this.hash || this.getAttribute('href');
//     const targetElement = document.querySelector(targetId);

//     if (targetElement) {
//       window.scrollTo({
//         top: targetElement.offsetTop,
//         behavior: 'smooth',
//       });
//     } else {
//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth',
//       });
//     }
//   });
// });

// jQuery 코드 (단순히 내부 스크롤만 처리)
// $(document).ready(function () {
//   $("header .list a[href^='#'], .btn-gototop").on("click", function (e) {
//     e.preventDefault();
//     const href = this.getAttribute("href");
//     const target = document.querySelector(href);
//     if (target) {
//       window.scrollTo({
//         top: target.offsetTop,
//         behavior: "smooth"
//       });
//     }
//   });
// }); 

// $(document).ready(function () {
//   $("header .list a[href^='#'], .btn-gototop").on("click", function (e) {
//     e.preventDefault();

//     const href = this.getAttribute("href");
//     if (!href || !href.startsWith("#")) return; // 🚫 잘못된 값 방지

//     const target = document.querySelector(href);
//     if (target) {
//       // scroll 위치 정확히 계산 (모션 중일 때도 OK)
//       const targetTop = target.getBoundingClientRect().top + window.scrollY;

//       window.scrollTo({
//         top: targetTop,
//         behavior: "smooth",
//       });
//     }
//   });
// });

