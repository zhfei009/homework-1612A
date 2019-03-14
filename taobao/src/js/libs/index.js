require(['./js/config.js'], function() {
    require(['Swiper', 'BScroll'], function(Swiper, BScroll) {
        init();

        function init() {
            var swiper = new Swiper(".swiper-container", { //轮播
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                loop: true,
                direction: "horizontal",
                autoplay: {
                    delay: 1500
                }
            });

            new BScroll("section", {
                probeType: 2, //获取滚动的位置,等于二或者大于的时候，才触发scroll事件
                scrollBar: true, //开启滚动条
                click: true
            });

        }
    });
});