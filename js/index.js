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

// Sticky nav hamburger and nav bar
const navHamburger = document.querySelector('.nav-toggle');
const navStickyBar = document.querySelector('.nav-sticky-bar');
const sticky = navHamburger.offsetTop;
console.log(sticky + 2);

const stickyNav = () => {
  if (window.pageYOffset >= sticky) {
    navHamburger.classList.add('sticky');
    navStickyBar.style.opacity = '1';
    navStickyBar.style.height = '2.25rem';
  } else {
    navHamburger.classList.remove('sticky');
    navStickyBar.style.opacity = '0';
    navStickyBar.style.height = '0';
  }
};

// Navigation hamburger
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
  document.body.classList.toggle('active');
  document.body.classList.toggle('fixed');
  navStickyBar.style.opacity = '0';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    document.body.classList.toggle('active');
    document.body.classList.toggle('fixed');
    navStickyBar.style.opacity = '1';
    // document.body.style.position = '';
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
