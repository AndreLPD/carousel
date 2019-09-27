"use strict";

(function () {
  'use strict';

  var $carousel = document.querySelector(".carousel");
  var $carouselInner = document.querySelector(".carousel__inner");
  var $carouselItens = document.getElementsByClassName("carousel__item");
  var $btnPrev = document.querySelector(".carousel__btn--prev");
  var $btnNext = document.querySelector(".carousel__btn--next");
  var $carouselPaginacao = document.querySelector(".carousel__paginacao");
  var $qtdBanners = $carouselItens.length;
  var bannerAtual = 0;
  var paginacaoLi = true;
  var automaticBanner = true;
  var interval = null;
  $carousel.style.overflowX = "hidden";
  $btnPrev.style.display = "block";
  $btnNext.style.display = "block";
  $btnPrev.addEventListener("click", showPrev);
  $btnNext.addEventListener("click", showNext);

  if (paginacaoLi) {
    montaPag();
  }

  if (automaticBanner) {
    criaIntervalBanner();
  }

  function criaIntervalBanner() {
    var secondsBanner = 5000;
    interval = setInterval(function () {
      if (bannerAtual >= $qtdBanners - 1) {
        bannerAtual = 0;
        mostraBanner(bannerAtual);
      } else {
        bannerAtual++;
        mostraBanner(bannerAtual);
      }

      addOrRemoveActive(bannerAtual);
    }, secondsBanner);
  }

  function limpaBannerInterval() {
    clearInterval(interval);
  }

  var $carouselItemPag = document.querySelectorAll(".item__pag");
  $carouselItemPag[0].classList.add("active");
  Array.prototype.forEach.call($carouselItemPag, function ($itemLi) {
    $itemLi.addEventListener("click", mostraBannerPag);
  });

  function montaPag() {
    for (var i = 0; i < $qtdBanners; i++) {
      var newLi = document.createElement("li");
      newLi.classList.add("item__pag");
      newLi.value = i;
      $carouselPaginacao.append(newLi);
    }
  }

  function addOrRemoveActive(event) {
    Array.prototype.forEach.call($carouselItemPag, function ($itemCarousel) {
      $itemCarousel.classList.remove("active");
    });

    if (event.target) {
      event.target.classList.add('active');
    } else {
      $carouselItemPag[bannerAtual].classList.add("active");
    }
  }

  function mostraBannerPag(event) {
    addOrRemoveActive(event);
    mostraBanner(this.value);
  }

  function showPrev() {
    if (bannerAtual !== 0) {
      bannerAtual--;
    }

    addOrRemoveActive(bannerAtual);
    mostraBanner(bannerAtual);
  }

  function showNext() {
    bannerAtual++;
    addOrRemoveActive(bannerAtual);
    mostraBanner(bannerAtual);
  }

  function disableNav(bannerAtual) {
    $btnPrev.disabled = !bannerAtual > 0;
    $btnNext.disabled = bannerAtual === $qtdBanners - 1;
  }

  function mostraBanner(bannerAtual) {
    if (automaticBanner) limpaBannerInterval();
    disableNav(bannerAtual);
    var largura = parseInt(getComputedStyle($carouselItens[0]).width);
    var posicaoTotal = largura * $carouselItens.length * -1;
    var posicaoAtual = bannerAtual * largura * -1;
    $carouselInner.style.transform = 'translateX(' + posicaoAtual + 'px)';
    if (automaticBanner) criaIntervalBanner();
  }
})();
