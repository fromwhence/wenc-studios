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

let sampleSlideWidth2 = sampleSlides2[0].offsetWidth;
let sampleSlideHeight2 = sampleSlideWidth2;

// Resize slider based on slide image height
const resizeSampleSliderHeight2 = function () {
  if (window.innerWidth < 768) {
    let sampleImageHeight2 = sampleSliderImages2[0].height;
    sampleSlider2.style.height = `${sampleImageHeight2 + 30}px`;
  } else {
    let sampleImageHeight2 = sampleSliderImages2[0].height;
    sampleSlider2.style.height = `${sampleImageHeight2 + 40}px`;
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

const hideShowArrows2 = (
  sampleSlides2,
  prevButton2,
  nextButton2,
  targetIndex2
) => {
  if (targetIndex2 === 0) {
    prevButton2.classList.add('is-hidden');
    nextButton2.classList.remove('is-hidden');
  } else if (targetIndex2 === sampleSlides2.length - 1) {
    prevButton2.classList.remove('is-hidden');
    nextButton2.classList.add('is-hidden');
  } else {
    prevButton2.classList.remove('is-hidden');
    nextButton2.classList.remove('is-hidden');
  }
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
    const nextIndex2 = sampleSlides2.findIndex(
      sampleSlide2 => sampleSlide2 === nextSlide2
    );

    moveToSlide2(sampleSliderTrack2, currentSlide2, nextSlide2);
    updateDots2(currentDot2, nextDot2);
    hideShowArrows2(sampleSlides2, prevButton2, nextButton2, nextIndex2);
  });
};

const prevSampleButton2 = () => {
  prevButton2.addEventListener('click', e => {
    currentSlide2 = sampleSliderTrack2.querySelector('.current-slide-2');
    const prevSlide2 = currentSlide2.previousElementSibling;
    const currentDot2 = dotIndicators2.querySelector('.current-slide-2');
    const prevDot2 = currentDot2.previousElementSibling;
    const prevIndex2 = sampleSlides2.findIndex(
      sampleSlide2 => sampleSlide2 === prevSlide2
    );

    moveToSlide2(sampleSliderTrack2, currentSlide2, prevSlide2);
    updateDots2(currentDot2, prevDot2);
    hideShowArrows2(sampleSlides2, prevButton2, nextButton2, prevIndex2);
  });
};

const dotIndicatorsTracking2 = () => {
  dotIndicators2.addEventListener('click', e => {
    targetDot2 = e.target.closest('.sample-slider--nav-dot-2');
    // if (!targetDot) return;
    currentSlide2 = sampleSliderTrack2.querySelector('.current-slide-2');
    currentDot2 = dotIndicators2.querySelector('.current-slide-2');
    const targetIndex2 = dots2.findIndex(dot => dot === targetDot2);
    const targetSlide2 = sampleSlides2[targetIndex2];
    moveToSlide2(sampleSliderTrack2, currentSlide2, targetSlide2);
    updateDots2(currentDot2, targetDot2);
    hideShowArrows2(sampleSlides2, prevButton2, nextButton2, targetIndex2);
  });
};

dotIndicatorsTracking2();
nextSampleButton2();
prevSampleButton2();

// Fullscreen sample slider view
const expandIcon2 = document.querySelector('.sample-expand-icon-2');
const closeFullScreenIcon2 = document.querySelector('.sample-close-icon-2');
const sampleSliderContainerExpanded2 = document.querySelector(
  '.sample-static-container-2'
);

// sampleSliderImages2.forEach(sampleSlide2 => {
//   sampleSlide2.addEventListener('click', () => {
//     console.log('Clicked');
//     sampleSliderContainerExpanded2.classList.add('expand');
//     closeFullScreenIcon2.classList.add('active');
//     expandIcon2.style.display = 'none';
//     resizeSampleSliderHeight2();
//   });
// });

// sampleSlideImage2.addEventListener('click', () => {
//   closeFullScreenIcon2.classList.add('active');
//   expandIcon2.style.display = 'none';
//   sampleSliderContainerExpanded2.classList.add('expand');
//   resizeSampleSliderHeight2();
// });

expandIcon2.addEventListener('click', () => {
  closeFullScreenIcon2.classList.add('active');
  expandIcon2.style.display = 'none';
  sampleSliderContainerExpanded2.classList.add('expand');
  resizeSampleSliderHeight2();
});

closeFullScreenIcon2.addEventListener('click', () => {
  closeFullScreenIcon2.classList.remove('active');
  expandIcon2.style.display = 'inline-block';
  sampleSliderContainerExpanded2.classList.remove('expand');
  resizeSampleSliderHeight2();
});
