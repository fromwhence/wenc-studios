'use strict';

// Removes :focus outline for mouse users
(function (document, window) {
  if (!document || !window) {
    return;
  }
  var styleText =
    '::-moz-focus-inner{border:0 !important;}:focus{outline: none !important;';
  var unfocus_style = document.createElement('STYLE');

  window.unfocus = function () {
    document.getElementsByTagName('HEAD')[0].appendChild(unfocus_style);
    document.addEventListener('mousedown', function () {
      unfocus_style.innerHTML = styleText + '}';
    });
    document.addEventListener('keydown', function () {
      unfocus_style.innerHTML = '';
    });
  };

  unfocus.style = function (style) {
    styleText += style;
  };

  unfocus();
})(document, window);

// Navigation hamburger

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const navModal = document.querySelector('.nav-modal');

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
  navModal.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    navModal.classList.toggle('active');
  });
});

// Scroll to top
// Render scroll to top arrow if document is height is larger than 2000px
const scrollToTop = document.querySelector('.scroll-to-top');
if (document.body.offsetHeight > 2000) {
  scrollToTop.classList.add('active');
}

// Scroll to top event
scrollToTop.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});
