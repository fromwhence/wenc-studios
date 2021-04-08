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
      status.innerHTML = 'Success! We look forward to connecting with you.';
      setTimeout(() => {
        status.classList.remove('success');
      }, 4000);
      form.reset();
    })
    .catch(error => {
      status.classList.add('error');
      status.innerHTML =
        'Oops! There was a problem submitting your form. Pleaes try again.';
    });
}
form.addEventListener('submit', handleSubmit);
