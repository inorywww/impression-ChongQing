// javaScript document
// jquery-3.3.1
$(function () {
    navFade();
    toTop();
    toOther();
    ciallo();

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
                $(".arrow").show();
                $(".menu").addClass("nav-not-top");
            }
            if (currentTop >200){
                $(".arrow").hide();
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

    //电梯导航
    function toOther() {
        $("#btn4").siblings("li").click(function () {
            let disTop = $(".main-bg").eq($(this).index()).offset().top;
            $("body,html").stop().animate({
                scrollTop: disTop
            }, 1200);
            if (disTop == $(".main-bg").eq($(this).index()).offset().top) {
                $(".menu").fadeOut(500);
            }
        });
    }

    //欢迎
    function ciallo() {
        $(".ciallo").mouseover(function () {
            $(this).text("重庆欢迎你！");
        });
        $(".ciallo").mouseout(function () {
            $(this).text("Ciallo～(∠・ω< )⌒★");
        });
        $(".ciallo").mousedown(function () {
        });
    }

    //隐藏箭头
    // fadeArrow();
    function fadeArrow() {
        $(window).scroll(function () {
            let aTop = $(window).scrollTop();
            if(aTop > 100){
                $(".arrow").hide()
            }
        });
    }
});


