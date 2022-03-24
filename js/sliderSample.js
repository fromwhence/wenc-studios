'use strict';

const sampleSlider = document.querySelector('.sample-slider');
const sampleSliderTrack = document.querySelector('.sample-slider--track');
const sampleSlides = Array.from(sampleSliderTrack.children);
const sampleSliderImages = document.querySelectorAll('.sample-slider--image');

const nextButton = document.querySelector('.sample-slider--btn-right');
const prevButton = document.querySelector('.sample-slider--btn-left');
const dotIndicators = document.querySelector('.sample-slider--nav-dots');
const dots = Array.from(dotIndicators.children);

const staticSlide = document.querySelector('.tier--example-container-static');

let sampleSlideWidth = sampleSlides[0].offsetWidth;
let sampleSlideHeight = sampleSlideWidth;

// Resize slider based on slide image height
const resizeSampleSliderHeight = function () {
  if (window.innerWidth < 768) {
    let sampleImageHeight = sampleSliderImages[0].height;
    sampleSlider.style.height = `${sampleImageHeight + 30}px`;
    staticSlide.style.height = `${sampleImageHeight + 15}px`;
  } else {
    let sampleImageHeight = sampleSliderImages[0].height;
    sampleSlider.style.height = `${sampleImageHeight + 40}px`;
    staticSlide.style.height = `${sampleImageHeight + 40}px`;
  }
};

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
    targetDot = e.target.closest('.sample-slider--nav-dot');

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

nextSampleButton();
prevSampleButton();
dotIndicatorsTracking();

// Fullscreen tier 1 view and tier 3 static
const expandIconStatic = document.querySelector('.static-expand-icon');
const expandIconStatic2 = document.querySelector('.static-expand-icon-2');
const closeFullScreenIconStatic = document.querySelector('.static-close-icon');
const closeFullScreenIconStatic2 = document.querySelector(
  '.static-close-icon-2'
);
const sampleStaticContainer = document.querySelector(
  '.sample-static-container'
);
const sampleStaticContainer2 = document.querySelector(
  '.sample-static-container-2'
);
const sampleStaticImage = document.querySelector(
  '.sample-slider--image-static'
);
const sampleStaticImage2 = document.querySelector(
  '.sample-slider--image-static-2'
);
const sampleArtistCredit = document.querySelector('.artist-credit');

// Expand Tier 1 image on click
sampleStaticImage.addEventListener('click', () => {
  closeFullScreenIconStatic.classList.add('active');
  sampleArtistCredit.style.visibility = 'hidden';
  expandIconStatic.style.display = 'none';
  sampleStaticContainer.classList.add('expand');
  resizeSampleSliderHeight();
});

expandIconStatic.addEventListener('click', () => {
  closeFullScreenIconStatic.classList.add('active');
  sampleArtistCredit.style.visibility = 'hidden';
  expandIconStatic.style.display = 'none';
  sampleStaticContainer.classList.add('expand');
  resizeSampleSliderHeight();
});

closeFullScreenIconStatic.addEventListener('click', () => {
  closeFullScreenIconStatic.classList.remove('active');
  sampleArtistCredit.style.visibility = 'visible';
  expandIconStatic.style.display = 'inline-block';
  sampleStaticContainer.classList.remove('expand');
  resizeSampleSliderHeight();
});

// Tier 3 static version
sampleStaticImage2.addEventListener('click', () => {
  closeFullScreenIconStatic2.classList.add('active');
  expandIconStatic2.style.display = 'none';
  sampleStaticContainer2.classList.add('expand');
  resizeSampleSliderHeight();
});

expandIconStatic2.addEventListener('click', () => {
  closeFullScreenIconStatic2.classList.add('active');
  expandIconStatic2.style.display = 'none';
  sampleStaticContainer2.classList.add('expand');
  resizeSampleSliderHeight();
});

closeFullScreenIconStatic2.addEventListener('click', () => {
  closeFullScreenIconStatic2.classList.remove('active');
  expandIconStatic2.style.display = 'inline-block';
  sampleStaticContainer2.classList.remove('expand');
  resizeSampleSliderHeight();
});

// Fullscreen tier 2 slider view
const expandIcon = document.querySelector('.sample-expand-icon');
const closeFullScreenIcon = document.querySelector('.sample-close-icon');
const sampleSliderContainerExpanded = document.querySelector(
  '.sample-slider-container'
);

// Expand tier 2 images
sampleSliderImages.forEach(sampleSlide => {
  sampleSlide.addEventListener('click', () => {
    sampleSliderContainerExpanded.classList.add('expand');
    closeFullScreenIcon.classList.add('active');
    expandIcon.style.display = 'none';
    resizeSampleSliderHeight();
  });
});

expandIcon.addEventListener('click', () => {
  closeFullScreenIcon.classList.add('active');
  expandIcon.style.display = 'none';
  sampleSliderContainerExpanded.classList.add('expand');
  resizeSampleSliderHeight();
});

closeFullScreenIcon.addEventListener('click', () => {
  closeFullScreenIcon.classList.remove('active');
  expandIcon.style.display = 'inline-block';
  sampleSliderContainerExpanded.classList.remove('expand');
  resizeSampleSliderHeight();
});
