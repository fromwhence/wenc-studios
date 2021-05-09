'use strict';

// Slider
const slider = function () {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider-btn--left');
  const btnRight = document.querySelector('.slider-btn--right');
  const dotContainer = document.querySelector('.dots');

  const slideImage = document.querySelectorAll('.slide-image');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Slider functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots-dot" data-slide=${i}></button>`
      );
    });
  };

  // Resize slider based on slide image height
  const resizeSliderHeight = function () {
    if (window.innerWidth < 768) {
      let imageHeight = slideImage[0].height;
      slider.style.height = `${imageHeight + 20}px`;
      console.log('Resize under 768px');
    } else {
      let imageHeight = slideImage[0].height;
      slider.style.height = `${imageHeight + 20}px`;
      console.log('Resize over 768px');
    }
  };

  // Full screen slider
  const expandIcon = document.querySelector('.expand-slider-icon');
  const closeExpandedSlider = document.querySelector('.close-expanded-slider');
  const sliderContainer = document.querySelector('.slider-container');

  expandIcon.addEventListener('click', () => {
    sliderContainer.classList.add('expand');
    resizeSliderHeight();
  });

  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      sliderContainer.classList.add('expand');
      resizeSliderHeight();
    });
  });

  closeExpandedSlider.addEventListener('click', () => {
    sliderContainer.classList.remove('expand');
    resizeSliderHeight();
    scrollToTop();
  });

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      sliderContainer.classList.remove('expand');
      resizeSliderHeight();
      scrollToTop();
    }
  });

  window.addEventListener('load', resizeSliderHeight);
  window.addEventListener('orientationchange', resizeSliderHeight);
  window.addEventListener('resize', resizeSliderHeight);

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots-dot')
      .forEach(dot => dot.classList.remove('dots-dot--active'));

    document
      .querySelector(`.dots-dot[data-slide="${slide}"]`)
      .classList.add('dots-dot--active');
  };

  // Sets slide 1 to 0 position
  const goToSlide = function (slide) {
    slides.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  goToSlide(0);

  // Hides slides to prevent image swiping at page load
  const hideSlides = function () {
    slides.forEach(function (s, i) {
      if (i > 0) {
        s.classList.add('is-invisible');
      }
    });
  };
  hideSlides();

  const showSlides = function () {
    slides.forEach(slide => slide.classList.remove('is-invisible'));
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
    showSlides();
  };
  // Previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
    showSlides();
  };

  const init = function () {
    createDots();
    activateDot(0);
  };
  init();

  btnRight.addEventListener('click', e => {
    nextSlide();
    disableScroll();
    setTimeout(enableScroll, 200);
  });
  btnLeft.addEventListener('click', prevSlide);

  // Event delegation to add click funtion to dots
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots-dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
      showSlides();
    }
  });
};

slider();
