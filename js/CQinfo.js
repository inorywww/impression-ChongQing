$(function () {
    navFade();
    toTop();

    let flag = true;
// 1.显示隐藏电梯导航
    let toolTop = $(".text1").offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() > toolTop-60) {
            $(".fixed-nav").fadeIn();
        } else {
            $(".fixed-nav").fadeOut();
        }
    }

    $(".fixed-nav li").click(function () {
        console.log($(this).index());
        let disTop = $(".main-bg").eq($(this).index()).offset().top;
        $("body,html").stop().animate({
            scrollTop: disTop
        }, 0);
        $(this).addClass("current").siblings().removeClass();
        if (disTop == $(".main-bg").eq($(this).index()).offset().top) {
            $(".menu").fadeOut(500);
        }
    });

    $(window).scroll(function () {
        toggleTool();
        $(".main-bg").each(function(i, ele) {
            if ($(document).scrollTop() >= $(ele).offset().top-10) {
                $(".fixed-nav li").eq(i).addClass("current").siblings().removeClass();
            }
        });
    });




    //返回顶部
    function toTop() {
        $("#btn4").click(function () {
            $("body,html").stop().animate({
                scrollTop: 0
            }, 1200);
        });
    }
    //鼠标滚动时隐藏nav
    function navFade() {
        $(window).scroll(function () {
            let currentTop = $(window).scrollTop();
            if (currentTop < 50) {
                $(".menu").removeClass("nav-not-top");
            } else {
                $(".menu").addClass("nav-not-top");
            }

        });
        $("html").mousewheel(function (event) {//鼠标上下滚动隐藏nav，使用了mousewheel插件
            if (event.deltaY < 0) {//鼠标往下滑
                $(".menu").fadeOut(300);
                // console.log("下滑了");
            } else if (event.deltaY > 0) {
                $(".menu").fadeIn(300);
                // console.log("上滑了");
            }
        });
    }
});