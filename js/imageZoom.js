'use strict';

const artworkImage = document.querySelector('.artwork-detail-image');
const fullImageBtn = document.querySelector('.full-btn');
const detailBtn = document.querySelector('.detail-btn');

detailBtn.addEventListener('click', function () {
  fullImageBtn.classList.remove('active');
  detailBtn.classList.add('active');
  artworkImage.classList.remove('zoom-out');
  artworkImage.classList.add('detail');
});

fullImageBtn.addEventListener('click', function () {
  fullImageBtn.classList.add('active');
  detailBtn.classList.remove('active');
  artworkImage.classList.remove('detail');
  artworkImage.classList.add('zoom-out');
});
