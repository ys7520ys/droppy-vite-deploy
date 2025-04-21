import Aos from "aos";
import { Autoplay, Pagination } from "swiper/modules";

export const swiperSettings1 = {
  centeredSlides:true,
  modules: [Autoplay],
  spaceBetween: 10,
  slidesPerView: 3,
  loop: true,
  speed: 800,
  autoplay: {
    delay: 1800,
    disableOnInteraction: false,
  },
  pagination: { clickable : true },
  onSlideChange: () => Aos.refresh(), 
  breakpoints: {
    100: { slidesPerView: 1 }, // 모바일 (320px 이상일 때 1개)
    750: { slidesPerView: 3 }, // 모바일 (320px 이상일 때 1개)
    1024: { slidesPerView: 4 }, // 노트북 (1024px 이상일 때 3개)
    1440: { slidesPerView: 5 }, // 큰 화면 (1440px 이상일 때 5개)
  }
};
