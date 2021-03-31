'use strict';
const sampleSlider = document.querySelector('.sample-slider');
const sampleSliderTrack = document.querySelector('.sample-slider--track');
const sampleSlides = Array.from(sampleSliderTrack.children);
const sampleSliderImages = Array.from(
  document.querySelectorAll('.sample-slider--image')
);

const nextButton = document.querySelector('.sample-slider--btn-right');
const prevButton = document.querySelector('.sample-slider--btn-left');
const dotIndicators = document.querySelector('.sample-slider--nav-dots');
const dots = Array.from(dotIndicators.children);

const sampleSlideWidth = sampleSlides[0].getBoundingClientRect().width;

// Arrange slides next to one another
const setSlidePosition = (sampleSlide, index) => {
  sampleSlide.style.left = sampleSlideWidth * index + 'px';
};
sampleSlides.forEach(setSlidePosition);

const moveToSlide = (sampleSliderTrack, currentSlide, targetSlide) => {
  sampleSliderTrack.style.transform =
    'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

nextButton.addEventListener('click', e => {
  e.preventDefault();
  const currentSlide = sampleSliderTrack.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;

  moveToSlide(sampleSliderTrack, currentSlide, nextSlide);
});

prevButton.addEventListener('click', e => {
  e.preventDefault();
  const currentSlide = sampleSliderTrack.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;

  moveToSlide(sampleSliderTrack, currentSlide, prevSlide);
});

// dotIndicators.addEventListener('click', e);
