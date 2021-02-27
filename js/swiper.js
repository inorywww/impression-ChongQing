$(function () {
    let timer = null;
    let index = 0;
    let len = $(".swiper-item").width();

    function changeImg(index) {
        $(".bg-swiper").animate({"left": -1 * len * index}, 2000);

    }

    function autoPlay() {
        timer = setInterval(function () {
            index++;
            if (index === 4) {
                index = 0;
            }
            changeImg(index);
        }, 3500);
    }

    autoPlay();
    lr();

    function lr() {
        $(".lr-l").click(function () {
            clearInterval(timer);
            index--;
            if (index === -1) {
                index = 3;
            }
            changeImg(index);
            autoPlay();
        });

        $(".lr-r").click(function () {
            clearInterval(timer);
            index++;
            if (index === 4) {
                index = 0
            }
            changeImg(index);
            autoPlay();
        });
        //隐藏
        $(".lr-l").mouseover(function () {
            $(".swiper-left").animate({
                left :"30px"
            },300)
        });
        $(".lr-l").mouseout(function () {
            $(".swiper-left").animate({
                left :"-60px"
            },300)
        });

        $(".lr-r").mouseover(function () {
            $(".swiper-right").animate({
                right :"30px"
            },300)
        });
        $(".lr-r").mouseout(function () {
            $(".swiper-right").animate({
                right :"-60px"
            },300)
        });
    }

    $(window).scroll(function () {
        let currentTop = $(window).scrollTop();
        if (currentTop > 200) {
            $(".lr").fadeOut();
        } else {
            $(".lr").fadeIn();
        }
    });
});