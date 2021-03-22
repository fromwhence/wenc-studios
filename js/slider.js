'use strict';

// Slider
const slider = function () {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider-btn--left');
  const btnRight = document.querySelector('.slider-btn--right');
  const dotContainer = document.querySelector('.dots');

  const slideWidth = slides[0].getBoundingClientRect().width;
  const slideHeight = slides[0].getBoundingClientRect().height;
  const slidesSmall = document.querySelectorAll('.slide-small');
  const slidesLarge = document.querySelectorAll('.slide-large');

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

  // Resize carsousel based on slide image height
  const resizeSliderHeight = function () {
    if (window.innerWidth < 1000) {
      slidesSmall.forEach(image => {
        image.classList.remove('is-hidden');
      });
      slidesLarge.forEach(image => {
        image.classList.add('is-hidden');
      });
      let imageHeight = slidesSmall[0].height;
      slider.style.height = `${imageHeight + 30}px`;
    } else {
      slidesSmall.forEach(image => {
        image.classList.add('is-hidden');
      });
      slidesLarge.forEach(image => {
        image.classList.remove('is-hidden');
      });
      let imageHeight = slidesLarge[0].height;
      slider.style.height = `${imageHeight}px`;
    }
  };

  window.addEventListener('load', resizeSliderHeight);
  window.addEventListener('resize', resizeSliderHeight);
  window.addEventListener('orientationchange', function () {
    location.reload();
    resizeSliderHeight();
  });
  // End of resize

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

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // short-ciruiting syntax
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

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
