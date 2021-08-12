'use strict';

function selectElementByClass(className) {
  return document.querySelector(`.${className}`);
}

const sectionsSmall = [
  selectElementByClass('about'),
  selectElementByClass('services'),
  selectElementByClass('rates'),
  selectElementByClass('schedule'),
  selectElementByClass('contact'),
];

const navItemsSmall = {
  about: selectElementByClass('aboutNavItemSmall'),
  services: selectElementByClass('servicesNavItemSmall'),
  rates: selectElementByClass('ratesNavItemSmall'),
  schedule: selectElementByClass('scheduleNavItemSmall'),
  contact: selectElementByClass('contactNavItemSmall'),
};

// console.log(thresholdValue);
// intersection observer setup
const observerOptionsSmall = {
  root: null,
  rootMargin: '0px',
  // threshold: window.innerWidth < 768 ? 0 : 0.25,
  threshold: 0.2,
};

function observerCallbackSmall(entries, observerSmall) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // get the nav item corresponding to the id of the section that is currently in view
      const navItemSmall = navItemsSmall[entry.target.id];
      // add 'active' class on the navItem
      navItemSmall.classList.add('active');
      // remove 'active' class from any navItem that is not
      // same as 'navItem' defined above
      Object.values(navItemsSmall).forEach(item => {
        if (item != navItemSmall) {
          item.classList.remove('active');
        }
      });
    }
  });
}

const observerSmall = new IntersectionObserver(
  observerCallbackSmall,
  observerOptionsSmall
);

sectionsSmall.forEach(sec => observerSmall.observe(sec));
