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
const sampleSlideHeight = sampleSlides[0].getBoundingClientRect().height;

// Resize slider based on image width
const resizeSliderHeight = function () {
  if (window.innerWidth < 800) {
    let imageHeight = sampleSlideWidth;
    sampleSlider.style.height = `${imageHeight}px`;
  } else {
    let imageHeight = sampleSlideWidth;
    sampleSlider.style.height = `${imageHeight + 20}px`;
  }
};

window.addEventListener('load', resizeSliderHeight);
window.addEventListener('resize', resizeSliderHeight);
window.addEventListener('orientationchange', function () {
  location.reload();
  resizeSliderHeight();
});

// Arrange slides next to one another
const setSlidePosition = (sampleSlide, index) => {
  sampleSlide.style.left = sampleSlideWidth * index + 'px';
};
sampleSlides.forEach(setSlidePosition);

// Current slide and nav dot
let currentSlide = sampleSliderTrack.querySelector('.current-slide');
console.log(currentSlide);
let currentDot = dotIndicators.querySelector('.current-slide');
let targetSlide;
let targetDot;

const moveToSlide = (sampleSliderTrack, currentSlide, targetSlide) => {
  sampleSliderTrack.style.transform =
    'translateX(-' + targetSlide.style.left + ')';
  currentSlide = sampleSliderTrack.querySelector('.current-slide');
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
};

nextButton.addEventListener('click', e => {
  e.preventDefault();
  disableScroll();
  setTimeout(enableScroll, 200);
  const currentSlide = sampleSliderTrack.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotIndicators.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;

  moveToSlide(sampleSliderTrack, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
});

prevButton.addEventListener('click', e => {
  currentSlide = sampleSliderTrack.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotIndicators.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;

  moveToSlide(sampleSliderTrack, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
});

dotIndicators.addEventListener('click', e => {
  targetDot = e.target.closest('button');

  if (!targetDot) return;

  currentSlide = sampleSliderTrack.querySelector('.currentSlide');
  currentDot = dotIndicators.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = sampleSlides[targetIndex];

  moveToSlide(sampleSliderTrack, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
});
