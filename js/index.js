'use strict';

// Removes :focus outline for mouse users
(function (document, window) {
  if (!document || !window) {
    return;
  }
  const styleText =
    '::-moz-focus-inner{border:0 !important;}:focus{outline: none !important;';
  const unfocus_style = document.createElement('STYLE');

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

// Removes section portion of url when pate is refreshed
const defaultUrl = 'https://wencphoto.com/';
history.replaceState(null, null, ' ');

// Sticky hamburger nav
window.onscroll = () => {
  stickyNav();
};

// Sticky nav hamburger and nav bar
const navHamburger = document.querySelector('.nav-toggle');
const headerHeight = document.querySelector('.business-name-container');
console.log(headerHeight.offsetHeight);

const sticky = headerHeight.offsetHeight - navHamburger.offsetHeight;

const stickyNav = () => {
  if (window.pageYOffset >= sticky) {
    navHamburger.classList.add('sticky');
  } else {
    navHamburger.classList.remove('sticky');
  }
};

// Navigation hamburger
const nav = document.querySelector('.nav');
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

// Side nav active assignment
const sideNavLinks = document.querySelectorAll('.side-nav-link');

sideNavLinks.forEach(sideNavLink => {
  sideNavLink.addEventListener('click', event => {
    const activeSideNavLink = document.querySelector('.side-nav-link.active');
    if (activeSideNavLink && activeSideNavLink !== sideNavLink) {
      activeSideNavLink.classList.remove('active');
    }
    sideNavLink.classList.toggle('active');
  });
});

// Scroll to top when page is reloaded
const scrollToTop = function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

// Add drop shadow to wide nav bar while scrolling
// const wideNavBar = document.querySelector('.header-container');
// // Setup isScrolling variable
// let isScrolling;
// // Listen for scroll events
// window.addEventListener(
//   'scroll',
//   function (event) {
//     // Clear our timeout throughout the scroll
//     window.clearTimeout(isScrolling);
//     wideNavBar.classList.add('scroll-shadow');
//     // Set a timeout to run after scrolling ends
//     isScrolling = setTimeout(function () {
//       wideNavBar.classList.remove('scroll-shadow');
//     }, 66);
//   },
//   false
// );

// Disable scroll when clicking next slide
const disableScroll = () => {
  let x = window.scrollX;
  let y = window.scrollY;
  window.onscroll = function () {
    window.scrollTo(x, y);
  };
};

const enableScroll = () => {
  window.onscroll = function () {};
};

// Restore top of page and root href after browser refresh
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}

// Render scroll to top arrow if document is height is larger than 2000px
const scrollToTopArrow = document.querySelector('.scroll-to-top');
if (document.body.offsetHeight > 2000) {
  scrollToTopArrow.classList.add('active');
}

// Scroll to top event
scrollToTopArrow.addEventListener('click', () => {
  scrollToTop();
});
