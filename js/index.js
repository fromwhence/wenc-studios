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

// Sticky hamburger nav
window.onscroll = () => {
  stickyNav();
};

// Get the navbar
const navHamburger = document.querySelector('.nav-toggle');
const navBar = document.querySelector('.nav-sticky-bar');
const sticky = navHamburger.offsetTop;
// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
const stickyNav = () => {
  if (window.pageYOffset >= sticky) {
    navHamburger.classList.add('sticky');
    navBar.classList.add('sticky-border');
  } else {
    navHamburger.classList.remove('sticky');
    navBar.classList.remove('sticky-border');
  }
};

// Navigation hamburger
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
  document.body.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    document.body.classList.toggle('active');
  });
});

// Accordion tier examples
const accordionLinks = document.querySelectorAll('.tier-example-link');

accordionLinks.forEach(accordionLink => {
  accordionLink.addEventListener('click', event => {
    const activeAccordionLink = document.querySelector(
      '.tier-example-link.active'
    );
    if (activeAccordionLink && activeAccordionLink !== accordionLink) {
      activeAccordionLink.classList.remove('active');
      activeAccordionLink.nextElementSibling.style.maxHeight = 0;
    }
    accordionLink.classList.toggle('active');
    const accordionItemContent = accordionLink.nextElementSibling;
    if (accordionLink.classList.contains('active')) {
      accordionItemContent.style.maxHeight =
        accordionItemContent.scrollHeight + 'px';
    } else {
      accordionItemContent.style.maxHeight = 0;
    }
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
