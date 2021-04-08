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
const headerHeight = document.querySelector('.header-container');

const sticky = headerHeight.offsetHeight - navHamburger.offsetHeight - 10;

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

// Restore top of page and root href dafter browser refresh
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}

// Reset href after page refresh
window.addEventListener('load', e => {
  window.location.href = 'https://www.wencphoto.com';
});

// Render scroll to top arrow if document is height is larger than 2000px
const scrollToTopArrow = document.querySelector('.scroll-to-top');
if (document.body.offsetHeight > 2000) {
  scrollToTopArrow.classList.add('active');
}

// Scroll to top event
scrollToTopArrow.addEventListener('click', () => {
  scrollToTop();
  window.location.href = 'https://www.wencphoto.com';
});
