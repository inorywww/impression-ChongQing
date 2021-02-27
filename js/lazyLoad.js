window.onload = function() {
    var viewHeight =document.documentElement.clientHeight; //获取可视区高度
    function lazyLoad() {
        var eles=document.querySelectorAll(".photos");
        Array.prototype.forEach.call(eles,function(item,index){
            var rect;
            if(item.dataset.original==="")
                return;
            rect=item.getBoundingClientRect();// 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
            if(rect.bottom>=0 && rect.top < viewHeight){
                !function(){
                    var img=new Image();
                    img.src=item.dataset.original;
                    img.onload=function(){
                        item.src=img.src
                    };
                    item.removeAttribute("data-original");
                }()
            }
        });
    }
    lazyLoad();//刚开始还没滚动屏幕时，要先触发一次函数，初始化首页的页面图片
    document.addEventListener("scroll",lazyLoad);
};
