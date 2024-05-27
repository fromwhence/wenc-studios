'use strict';

const getStartedForm = document.getElementById('get-started-form');
const getStartedPhone = document.querySelector('.phone--get-started');

// Adds hypens to phone input
getStartedPhone.addEventListener('keyup', e => {
  if (
    e.key != 'Backspace' &&
    (getStartedPhone.value.length === 3 || getStartedPhone.value.length === 7)
  ) {
    getStartedPhone.value += '-';
  }
});

// Contact form submit
async function handleSubmit(event) {
  event.preventDefault();
  const getContactStatus = document.querySelector('.status--get-started');
  const data = new FormData(event.target);
  fetch(event.target.action, {
    method: getStartedForm.method,
    body: data,
    headers: {
      Accept: 'application/json',
    },
  })
    .then(response => {
      getContactStatus.classList.add('success');
      getContactStatus.innerHTML =
        'Thank you! I look forward to connecting with you.';
      // 'Thank you! I will be away until Tuesday, 5/28, and look forward to contacting you then.';
      getContactStatus.addEventListener('click', () => {
        getContactStatus.classList.remove('success');
      });
      setTimeout(() => {
        getContactStatus.classList.remove('success');
      }, 4000);
      getStartedForm.reset();
    })
    .catch(error => {
      getContactStatus.classList.add('error');
      getContactStatus.innerHTML =
        'Oops! There was a problem submitting your form. Pleaes try again.';
      getContactStatus.addEventListener('click', () => {
        getContactStatus.classList.remove('error');
      });
      setTimeout(() => {
        getContactStatus.classList.remove('error');
      }, 4000);
    });
}
getStartedForm.addEventListener('submit', handleSubmit);
