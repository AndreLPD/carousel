(function(){
    const $carousel = document.querySelector(".carousel");
    const $carouselInner = document.querySelector(".carousel__inner");
    const $carouselItens = document.querySelectorAll(".carousel__item");
    const $btnPrev = document.querySelector(".carousel__btn--prev");
    const $btnNext = document.querySelector(".carousel__btn--next");
    const $carouselPaginacao = document.querySelector(".carousel__paginacao");
    
    const $qtdBanners = $carouselItens.length;
    let bannerAtual = 0;
    let paginacaoLi = true;

    $carousel.style.overflowX = "hidden";
    /*$btnPrev.style.display = "block";
    $btnNext.style.display = "block";*/

    $btnPrev.addEventListener("click", showPrev);
    $btnNext.addEventListener("click", showNext);

    if(paginacaoLi === true){
        for (let i = 0; i < $qtdBanners; i++) {
            let newElement = document.createElement("li");
            newElement.classList.add("item__pag");
            newElement.value = i;
            $carouselPaginacao.append(newElement); 
        }
    }
    const $carouselItemPag = document.querySelectorAll(".item__pag");
    Array.prototype.forEach.call($carouselItemPag, function($itemLi){
        $itemLi.addEventListener("click", mostraBannerPag);
    });

    function mostraBannerPag(){
        var largura = getComputedStyle($carouselItens[0]).width;
        largura = parseInt(largura);
        var posTotal = largura*$carouselItens.length*-1;
        var posAtual = this.value*largura*-1;
        $carouselInner.style.transform = 'translateX('+posAtual+'px)';
    }
    function showPrev(){
        bannerAtual--;
        mostraBanner(bannerAtual)
    }
    function showNext(){
        bannerAtual++;
        mostraBanner(bannerAtual);
    }
    function setupNav(bannerAtual){
        if(bannerAtual>0){
            $btnPrev.disabled = false;
        }else{
            bannerAtual = 0;
            $btnPrev.disabled= true;
        }
        if(bannerAtual === $qtdBanners - 1){
            $btnNext.disabled = true;
        }else{
            $btnNext.disabled = false;
        }
    }
    function mostraBanner(bannerAtual){
        setupNav(bannerAtual);
        var largura = getComputedStyle($carouselItens[0]).width;
        largura = parseInt(largura);
        var posicaoTotal = largura*$carouselItens.length*-1;
        var posicaoAtual = bannerAtual*largura*-1;
        
        if(bannerAtual>=0){
            if(posicaoAtual>posicaoTotal){
                $carouselInner.style.transform = 'translateX('+posicaoAtual+'px)';
            }
        }
    }
})()