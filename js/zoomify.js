$(function () {
    let className = ".photos";//自己图片的类
    let maxWidth = "80%";//图片最大宽度，以图片原来的尺寸为基准
    bk_image(className, maxWidth);

    function bk_image(className, maxWidth) {
        //创建标签
        let image_box = $('<div></div>');
        let image_single = $('<img></img>');//大图片
        let image_alt_div = $('<div></div>');//装h1 alt
        let image_alt_content_tag = $('<h1></h1>');//h1 alt

        image_box.appendTo("body");
        image_single.appendTo(image_box); //将子元素添加到父亲
        image_alt_div.appendTo(image_box);
        image_alt_content_tag.appendTo(image_alt_div);

        image_single.css("maxWidth", maxWidth);
        setImg(className);
        removeImg(className);

        function setImg(className) {//点击小图放大
            let img_list = $(className);
            img_list.click(function () {
                image_box.addClass("bk-image");
                image_single.attr("src", $(this).attr("src"));
                image_alt_content_tag.text($(this).attr("alt"));

                image_box.removeClass("remove");
                image_box.removeClass("hide-.after");
                image_alt_div.removeClass("remove");
            })
        }

        function removeImg() { //点击大图放小
            image_box.click(function () {
                image_box.addClass("remove");
                image_box.addClass("hide-after");
                image_alt_div.addClass("remove");
                setTimeout(function () {
                    try {
                        image_box.removeClass("bk-image");
                        image_box.addClass("remove");
                        image_alt_div.addClass("remove");
                        image_single.attr("src", "");
                        image_alt_content_tag.text("")
                    } catch (err) {
                        console.log("错误")
                    }
                }, 300);
            })
        }
    }
});