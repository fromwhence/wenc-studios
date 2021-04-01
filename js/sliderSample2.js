'use strict';
const sampleSlider2 = document.querySelector('.sample-slider-2');
const sampleSliderTrack2 = document.querySelector('.sample-slider--track-2');
const sampleSlides2 = Array.from(sampleSliderTrack2.children);
const sampleSliderImages2 = Array.from(
  document.querySelectorAll('.sample-slider--image-2')
);

const nextButton2 = document.querySelector('.sample-slider--btn-right-2');
const prevButton2 = document.querySelector('.sample-slider--btn-left-2');
const dotIndicators2 = document.querySelector('.sample-slider--nav-dots-2');
const dots2 = Array.from(dotIndicators2.children);

const sampleSlideWidth2 = sampleSlides2[0].getBoundingClientRect().width;
const sampleSlideHeight2 = sampleSlides2[0].getBoundingClientRect().height;

// Resize slider based on image width
const resizeSampleSliderHeight2 = function () {
  if (window.innerWidth < 800) {
    let imageHeight = sampleSlideWidth2;
    sampleSlider2.style.height = `${imageHeight + 25}px`;
  } else {
    let imageHeight = sampleSlideWidth2;
    sampleSliderImages2.style.height = `${imageHeight + 25}px`;
  }
};

window.addEventListener('load', resizeSampleSliderHeight2);
window.addEventListener('resize', resizeSampleSliderHeight2);
window.addEventListener('orientationchange', function () {
  location.reload();
  resizeSampleSliderHeight2();
});

// Arrange slides next to one another
const setSlidePosition2 = (sampleSlide2, index) => {
  sampleSlide2.style.left = sampleSlideWidth2 * index + 'px';
};
sampleSlides2.forEach(setSlidePosition2);

// Current slide and nav dot
let currentSlide2 = sampleSliderTrack2.querySelector('.current-slide-2');
let currentDot2 = dotIndicators2.querySelector('.current-slide-2');
let targetSlide2;
let targetDot2;

const moveToSlide2 = (sampleSliderTrack2, currentSlide2, targetSlide2) => {
  sampleSliderTrack2.style.transform =
    'translateX(-' + targetSlide2.style.left + ')';
  currentSlide2 = sampleSliderTrack2.querySelector('.current-slide-2');
  currentSlide2.classList.remove('current-slide-2');
  targetSlide2.classList.add('current-slide-2');
};

const updateDots2 = (currentDot2, targetDot2) => {
  currentDot2.classList.remove('current-slide-2');
  targetDot2.classList.add('current-slide-2');
};

const nextSampleButton2 = () => {
  nextButton2.addEventListener('click', e => {
    e.preventDefault();
    disableScroll();
    setTimeout(enableScroll, 200);
    const currentSlide2 = sampleSliderTrack2.querySelector('.current-slide-2');
    const nextSlide2 = currentSlide2.nextElementSibling;
    const currentDot2 = dotIndicators2.querySelector('.current-slide-2');
    const nextDot2 = currentDot2.nextElementSibling;

    moveToSlide2(sampleSliderTrack2, currentSlide2, nextSlide2);
    updateDots2(currentDot2, nextDot2);
  });
};

const prevSampleButton2 = () => {
  prevButton2.addEventListener('click', e => {
    currentSlide2 = sampleSliderTrack2.querySelector('.current-slide-2');
    const prevSlide2 = currentSlide2.previousElementSibling;
    const currentDot2 = dotIndicators2.querySelector('.current-slide-2');
    const prevDot2 = currentDot2.previousElementSibling;

    moveToSlide2(sampleSliderTrack2, currentSlide2, prevSlide2);
    updateDots2(currentDot2, prevDot2);
  });
};

dotIndicators2.addEventListener('click', e => {
  targetDot2 = e.target.closest('button');

  if (!targetDot) return;

  currentSlide2 = sampleSliderTrack2.querySelector('.current-slide-2');
  currentDot2 = dotIndicators2.querySelector('.current-slide-2');
  const targetIndex2 = dots2.findIndex(dot => dot === targetDot2);
  const targetSlide2 = sampleSlides2[targetIndex2];

  moveToSlide2(sampleSliderTrack2, currentSlide2, targetSlide2);
  updateDots2(currentDot2, targetDot2);
});

nextSampleButton2();
prevSampleButton2();
