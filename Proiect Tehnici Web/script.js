var swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween:10,
    loop: true,
    initialSlide: 0,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

 
  