'use strict';

const form = document.getElementById('contact-form');

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById('status');
  const data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: 'application/json',
    },
  })
    .then(response => {
      status.classList.add('success');
      status.innerHTML = 'Thank you! We look forward to connecting with you.';
      status.addEventListener('click', () => {
        status.classList.remove('success');
      });
      setTimeout(() => {
        status.classList.remove('success');
      }, 4000);
      form.reset();
    })
    .catch(error => {
      status.classList.add('error');
      status.innerHTML =
        'Oops! There was a problem submitting your form. Pleaes try again.';
      status.addEventListener('click', () => {
        status.classList.remove('error');
      });
      setTimeout(() => {
        status.classList.remove('error');
      }, 4000);
    });
}
form.addEventListener('submit', handleSubmit);
