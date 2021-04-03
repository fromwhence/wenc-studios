'use strict';
const sampleSlider = document.querySelector('.sample-slider');
const sampleSliderTrack = document.querySelector('.sample-slider--track');
const sampleSlides = Array.from(sampleSliderTrack.children);
const sampleSliderImages = document.querySelectorAll('.sample-slider--image');

const nextButton = document.querySelector('.sample-slider--btn-right');
const prevButton = document.querySelector('.sample-slider--btn-left');
const dotIndicators = document.querySelector('.sample-slider--nav-dots');
const dots = Array.from(dotIndicators.children);

let sampleSlideWidth = sampleSlides[0].clientWidth;
let sampleSlideHeight = sampleSlideWidth;

// Resize slider based on image width
const resizeSampleSliderHeight = function () {
  if (window.innerWidth < 800) {
    sampleSlider.style.height = `${sampleSlideHeight * 0.9}px`;
    console.log(sampleSlider.style.height);
  } else {
    sampleSlider.style.height = `${sampleSlideHeight * 0.9}px`;
    console.log(sampleSlider.style.height);
  }
};

resizeSampleSliderHeight();

window.addEventListener('load', resizeSampleSliderHeight);
window.addEventListener('resize', resizeSampleSliderHeight);
window.addEventListener('orientationchange', function () {
  location.reload();
  resizeSampleSliderHeight();
});

// Arrange slides next to one another
const setSlidePosition = (sampleSlide, index) => {
  sampleSlide.style.left = sampleSlideWidth * index + 'px';
};
sampleSlides.forEach(setSlidePosition);

// Current slide and nav dot
let currentSlide = sampleSliderTrack.querySelector('.current-slide');
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

const hideShowArrows = (sampleSlides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === sampleSlides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
};

const nextSampleButton = () => {
  nextButton.addEventListener('click', e => {
    e.preventDefault();
    disableScroll();
    setTimeout(enableScroll, 200);
    const currentSlide = sampleSliderTrack.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotIndicators.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = sampleSlides.findIndex(
      sampleSlide => sampleSlide === nextSlide
    );

    moveToSlide(sampleSliderTrack, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(sampleSlides, prevButton, nextButton, nextIndex);
  });
};

const prevSampleButton = () => {
  prevButton.addEventListener('click', e => {
    currentSlide = sampleSliderTrack.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotIndicators.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = sampleSlides.findIndex(
      sampleSlide => sampleSlide === prevSlide
    );

    moveToSlide(sampleSliderTrack, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(sampleSlides, prevButton, nextButton, prevIndex);
  });
};

const dotIndicatorsTracking = () => {
  dotIndicators.addEventListener('click', e => {
    targetDot = e.target.closest('button');

    if (!targetDot) return;

    currentSlide = sampleSliderTrack.querySelector('.current-slide');
    currentDot = dotIndicators.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = sampleSlides[targetIndex];

    moveToSlide(sampleSliderTrack, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(sampleSlides, prevButton, nextButton, targetIndex);
  });
};

dotIndicatorsTracking();
nextSampleButton();
prevSampleButton();
