(function(){
    const $carousel = document.querySelector(".carousel");
    const $carouselInner = document.querySelector(".carousel__inner");
    const $carouselItens = document.querySelectorAll(".carousel__item");
    const $btnPrev = document.querySelector(".carousel__btn--prev");
    const $btnNext = document.querySelector(".carousel__btn--next");
    const $qtdBanners = $carouselItens.length;
    let bannerAtual = 0;

    $carousel.style.overflowX = "hidden";
    $btnPrev.style.display = "block";
    $btnNext.style.display = "block";

    $btnPrev.addEventListener("click", showPrev);
    $btnNext.addEventListener("click", showNext);

    function showPrev(){
        bannerAtual--;
        mostraBanner(bannerAtual)
    }
    function showNext(){
        bannerAtual++;
        mostraBanner(bannerAtual);
    }

    function mostraBanner(bannerAtual){
        var largura = getComputedStyle($carouselItens[0]).width;
        largura = parseInt(largura);
        var posicaoTotal = largura*$carouselItens.length*-1;
        console.log("posicaoTotal",posicaoTotal);
        var posicaoAtual = bannerAtual*largura*-1;
        console.log("posicaoAtual",posicaoAtual);
        

        if(bannerAtual>0){
            $btnPrev.disabled = false;
        }
        else{
            $btnPrev.disabled = true;
        }
        if(bannerAtual === $qtdBanners - 1){
            $btnNext.disabled = true;
        }else{
            $btnNext.disabled = false;
        }
        if(posicaoAtual>posicaoTotal){
            $carouselInner.style.transform = 'translateX('+posicaoAtual+'px)';
        }
            
        

        
    }

})()