'use strict';

const contactForm = document.getElementById('contact-form');
const contactPhone = document.querySelector('.phone--contact');

// Adds hyphens to phone input
contactPhone.addEventListener('keyup', e => {
  if (
    e.key != 'Backspace' &&
    (contactPhone.value.length === 3 || contactPhone.value.length === 7)
  ) {
    contactPhone.value += '-';
  }
});

// Contact form submit
async function handleSubmit(event) {
  event.preventDefault();
  const contactStatus = document.querySelector('.status--contact');
  const data = new FormData(event.target);
  fetch(event.target.action, {
    method: contactForm.method,
    body: data,
    headers: {
      Accept: 'application/json',
    },
  })
    .then(response => {
      contactStatus.classList.add('success');
      contactStatus.innerHTML =
        'Thank you! I look forward to connecting with you.';
      // 'Thank you! I will be away until Monday, 1/6, and look forward to contacting you then.';
      contactStatus.addEventListener('click', () => {
        contactStatus.classList.remove('success');
      });
      setTimeout(() => {
        contactStatus.classList.remove('success');
      }, 4000);
      contactForm.reset();
    })
    .catch(error => {
      contactStatus.classList.add('error');
      contactStatus.innerHTML =
        'Oops! There was a problem submitting your form. Pleaes try again.';
      contactStatus.addEventListener('click', () => {
        contactStatus.classList.remove('error');
      });
      setTimeout(() => {
        contactStatus.classList.remove('error');
      }, 4000);
    });
}
contactForm.addEventListener('submit', handleSubmit);
