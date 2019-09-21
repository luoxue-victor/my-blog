<template>
  <div class="wrapper">
    <div class="background">
      <img src="https://www.swiper.com.cn/demo/snh48/images/background.jpg" alt="">
    </div>
    <div class="item-bg"></div>
    <div class="news-slider__wrp">
      <swiper
        :options="swiperOption"
        ref="mySwiper"
        @someSwiperEvent="callback"
      >
        <swiper-slide v-for="index in 5" :key="index">
          <div>
            <div class="news-slider__item">
              <a href="#" class="news__item">
                <div class="news-date">
                  <span class="news-date__title">26</span>
                  <span class="news-date__txt">八月</span>
                </div>
                <div class="news__title">SNH48
                  <br>盛夏好声音
                </div>
                <p
                  class="news__txt"
                >《盛夏好声音》是SNH482015年发行的第八张EP，也是SNH48第二张总选投票专辑，共收录了《盛夏好声音》、《自我主张》、《亲吻进行式》、《眼神加速度》、《清纯哲学》5首歌曲</p>
                <div class="news__img">
                  <img src="https://www.swiper.com.cn/demo/snh48/images/girl1.jpg" alt="news">
                </div>
              </a>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination" slot="pagination"></div>
        <div class="news-slider-prev news-slider__arrow" slot="button-prev"></div>
        <div class="news-slider-next news-slider__arrow" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import _ from "jquery";
import Swiper from "swiper";

const $: any = _;

@Component({
  computed: {
    swiper() {
      const t: any = this;
      const refs: any = t.$refs;
      return refs.mySwiper.swiper;
    }
  }
})
export default class HelloWorld extends Vue {
  callback(e: any) {
    console.log(e);
  }
  swiperOption = {
    effect: "coverflow",
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    keyboard: true,
    spaceBetween: 0,
    slidesPerView: 3,
    speed: 300,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 0,
      modifier: 3,
      slideShadows: false
    },
    breakpoints: {
      480: {
        spaceBetween: 0,
        centeredSlides: true
      }
    },
    simulateTouch: true,
    navigation: {
      nextEl: ".news-slider-next",
      prevEl: ".news-slider-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    on: {
      init: function() {
        const bg: any = document.querySelector(".item-bg");
        const activeItem: any = document.querySelector(".swiper-slide-active");
        const sliderItem = activeItem.querySelector(".news__item");
        $(".swiper-slide-active .news__item").addClass("active");
        const x = sliderItem.getBoundingClientRect().left;
        const y = sliderItem.getBoundingClientRect().top;
        const width = sliderItem.getBoundingClientRect().width;
        const height = sliderItem.getBoundingClientRect().height;
        $(".item-bg").addClass("active");
        bg.style.width = width + "px";
        bg.style.height = height + "px";
        bg.style.transform = "translateX(" + x + "px ) translateY(" + y + "px)";
      },
      touchEnd() {
        $(".news__item").removeClass("active");
        $(".swiper-slide-active .news__item").addClass("active");
      },
      slideChange() {
        $(".news__item").removeClass("active");
      },
      slideChangeTransitionEnd() {
        const bg: any = document.querySelector(".item-bg");
        $(".news__item").removeClass("active");
        const activeItem: any = document.querySelector(".swiper-slide-active");
        const sliderItem: any = activeItem.querySelector(".news__item");
        $(".swiper-slide-active .news__item").addClass("active");
        const x = sliderItem.getBoundingClientRect().left;
        const y = sliderItem.getBoundingClientRect().top;
        const width = sliderItem.getBoundingClientRect().width;
        const height = sliderItem.getBoundingClientRect().height;
        $(".item-bg").addClass("active");
        bg.style.width = width + "px";
        bg.style.height = height + "px";
        bg.style.transform = "translateX(" + x + "px ) translateY(" + y + "px)";
      }
    }
  };
  mounted() {
    const bg: any = document.querySelector(".item-bg");
    const items = document.querySelectorAll(".news__item");
    const item = document.querySelector(".news__item");
    if ($(window).width() > 800) {
      $(document).on("mouseover", ".news__item", function(
        _event: any,
        _element: any
      ) {
        const newsItem = document.querySelectorAll(".news__item");
        newsItem.forEach(function(element, index) {
          element.addEventListener("mouseover", function(this: any) {
            const _that: any = this;
            const x: any = _that.getBoundingClientRect().left;
            const y = _that.getBoundingClientRect().top;
            const width = _that.getBoundingClientRect().width;
            const height = _that.getBoundingClientRect().height;
            $(".item-bg").addClass("active");
            $(".news__item").removeClass("active");
            bg.style.width = width + "px";
            bg.style.height = height + "px";
            bg.style.transform =
              "translateX(" + x + "px ) translateY(" + y + "px)";
          });
          element.addEventListener("mouseleave", function() {
            $(".item-bg").removeClass("active");
            $(".news__item").removeClass("active");
          });
        });
      });
    }
  }
}
</script>

<style scoped lang="scss">
html {
  position: relative;
  overflow-x: hidden !important;
}

body {
  font-family: sans-serif;
}

a,
a:hover {
  text-decoration: none;
}

.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}

.background {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.background:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    30deg,
    rgba(255, 255, 255, 0.6) 0%,
    #0e5dc4 100%
  );
  opacity: 0.9;
}
.background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  user-select: none;
}

.item-bg {
  width: 300px;
  height: 500px;
  position: absolute;
  top: 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 26px 6px rgba(0, 0, 0, 0.25);
  opacity: 0;
  transition: all 0.3s;
  left: -30px;
}
.item-bg.active {
  left: 0;
  top: 0;
  opacity: 1;
}

.news-slider {
  z-index: 2;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
}
@media screen and (max-width: 1200px) {
  .news-slider {
    max-width: 1000px;
  }
}
@media screen and (max-width: 576px) {
  .news-slider {
    margin-top: 45px;
  }
}
.news-slider__wrp {
  display: flex;
  align-items: flex-start;
  position: relative;
  z-index: 2;
  margin: 0 auto;
}
.news-slider__item {
  width: 400px;
  flex-shrink: 0;
}
@media screen and (max-width: 992px) {
  .news-slider__item {
    width: 340px;
  }
}
.news-slider__item.swiper-slide {
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
}
.news-slider__item.swiper-slide-active,
.news-slider__item.swiper-slide-prev,
.news-slider__item.swiper-slide-next {
  opacity: 1;
  pointer-events: auto;
}
.news-slider__ctr {
  position: relative;
  z-index: 12;
}
.news-slider__arrow {
  background: #fff;
  border: none;
  display: inline-flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 26px 6px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  z-index: 12;
  cursor: pointer;
  outline: none !important;
}
.news-slider__arrow:focus {
  outline: none !important;
}
.news-slider__arrow .icon-font {
  display: inline-flex;
}
.news-slider__arrow.news-slider-prev {
  left: 15px;
  transform: translateY(-50%);
}
.news-slider__arrow.news-slider-next {
  right: 15px;
  transform: translateY(-50%);
}
.swiper-pagination {
  text-align: center;
  margin-top: 50px;
}
.swiper-pagination .swiper-pagination-bullet {
  width: 13px;
  height: 10px;
  display: inline-block;
  background: #fff;
  opacity: 0.2;
  margin: 0 5px;
  border-radius: 20px;
  transition: opacity 0.5s, background-color 0.5s, width 0.5s;
  transition-delay: 0.5s, 0.5s, 0s;
}
.swiper-pagination .swiper-pagination-bullet-active {
  opacity: 1;
  background: #ffffff;
  width: 100px;
  transition-delay: 0s;
}
@media screen and (max-width: 576px) {
  .swiper-pagination .swiper-pagination-bullet-active {
    width: 70px;
  }
}
.news__item {
  padding: 40px;
  color: #fff;
  border-radius: 10px;
  display: block;
  transition: all 0.3s;
}
@media screen and (min-width: 800px) {
  .news__item:hover {
    color: #222222;
    transition-delay: 0.1s;
  }
  .news__item:hover .news-date,
  .news__item:hover .news__title,
  .news__item:hover .news__txt {
    opacity: 1;
    transition-delay: 0.1s;
  }
  .news__item:hover .news__img {
    box-shadow: none;
  }
}
.news__item.active {
  color: #222222;
}
.news__item.active .news-date,
.news__item.active .news__title,
.news__item.active .news__txt {
  opacity: 1;
}
.news__item.active .news__img {
  box-shadow: none;
}
@media screen and (max-width: 992px) {
  .news__item {
    padding: 30px;
  }
}
@media screen and (max-width: 576px) {
  .news__item {
    padding: 20px;
  }
}
.news-date {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid;
  display: inline-block;
  opacity: 0.7;
  transition: opacity 0.3s;
}
@media screen and (max-width: 576px) {
  .news-date {
    margin-bottom: 10px;
    display: inline-flex;
    align-items: center;
    padding-bottom: 0;
  }
}
.news-date__title {
  display: block;
  font-size: 32px;
  margin-bottom: 10px;
  font-weight: 500;
}
@media screen and (max-width: 576px) {
  .news-date__title {
    margin-right: 10px;
  }
}
.news-date__txt {
  font-size: 16px;
}
.news__title {
  font-size: 25px;
  font-weight: 500;
  opacity: 0.7;
  margin-top: 10px;
  margin-bottom: 15px;
  transition: opacity 0.3s;
}
@media screen and (max-width: 576px) {
  .news__title {
    font-size: 22px;
    margin-bottom: 10px;
  }
}
.news__txt {
  margin: 10px 0;
  line-height: 1.6em;
  font-size: 15px;
  opacity: 0.7;
  transition: opacity 0.3s;
}
.news__img {
  border-radius: 10px;
  box-shadow: 0 6px 26px 6px rgba(0, 0, 0, 0.25);
  height: 200px;
  margin-top: 30px;
  width: 100%;
  transition: all 0.3s;
  transform-origin: 0% 0%;
}
@media screen and (max-width: 576px) {
  .news__img {
    height: 180px;
    margin-top: 20px;
  }
}
.news__img img {
  max-width: 100%;
  border-radius: 10px;
  height: 100%;
  width: 100%;
}
#icon {
  display: none;
}
</style>