(function(){
    'use strict';
    const $carousel = document.querySelector(".carousel");
    const $carouselInner = document.querySelector(".carousel__inner");
    const $carouselItens = document.getElementsByClassName("carousel__item");
    const $btnPrev = document.querySelector(".carousel__btn--prev");
    const $btnNext = document.querySelector(".carousel__btn--next");
    const $carouselPaginacao = document.querySelector(".carousel__paginacao");
    
    const $qtdBanners = $carouselItens.length;
    let bannerAtual = 0;
    let paginacaoLi = true;
    let automaticBanner = true;
    var interval = null;

    $carousel.style.overflowX = "hidden";
    $btnPrev.style.display = "block";
    $btnNext.style.display = "block";

    $btnPrev.addEventListener("click", showPrev);
    $btnNext.addEventListener("click", showNext);

    if(paginacaoLi){
      montaPag();  
    }
    if(automaticBanner){
        criaIntervalBanner();
    }
    function criaIntervalBanner(){
        let secondsBanner = 5000;
        interval = setInterval(function(){
            if(bannerAtual >= $qtdBanners - 1){
                bannerAtual = 0;
                mostraBanner(bannerAtual);
            }else{
                bannerAtual++;
                mostraBanner(bannerAtual);
            }
            addOrRemoveActive(bannerAtual);
        }, secondsBanner);
    }
    function limpaBannerInterval(){
        clearInterval(interval);
    }
    const $carouselItemPag = document.querySelectorAll(".item__pag");
    $carouselItemPag[0].classList.add("active");
    Array.prototype.forEach.call($carouselItemPag, function($itemLi){
        $itemLi.addEventListener("click", mostraBannerPag);
    });
    function montaPag(){
        for (let i = 0; i < $qtdBanners; i++) {
            let newLi = document.createElement("li");
            newLi.classList.add("item__pag");
            newLi.value = i;
            $carouselPaginacao.append(newLi); 
        }
    }
    
    function addOrRemoveActive(event){
        Array.prototype.forEach.call($carouselItemPag, function($itemCarousel){
            $itemCarousel.classList.remove("active");
        })
        if(event.target) {
            event.target.classList.add('active')
        }else{
            $carouselItemPag[bannerAtual].classList.add("active");
        } 

    }
    function mostraBannerPag(event){
        addOrRemoveActive(event);
        mostraBanner(this.value);
    }
    function showPrev(){
        if(bannerAtual !== 0){
            bannerAtual--;
        }
        addOrRemoveActive(bannerAtual);
        mostraBanner(bannerAtual)
    }
    function showNext(){
        bannerAtual++;
        addOrRemoveActive(bannerAtual);
        mostraBanner(bannerAtual);
    }
    function disableNav(bannerAtual){
        $btnPrev.disabled = !bannerAtual>0;
        $btnNext.disabled = bannerAtual === $qtdBanners - 1;
    }
    function mostraBanner(bannerAtual){
        if(automaticBanner) limpaBannerInterval();
        disableNav(bannerAtual);
        var largura = parseInt(getComputedStyle($carouselItens[0]).width);
        var posicaoTotal = largura*$carouselItens.length*-1;
        var posicaoAtual = bannerAtual*largura*-1;    
        $carouselInner.style.transform = 'translateX('+posicaoAtual+'px)';
        if(automaticBanner) criaIntervalBanner();
        
    }
})()