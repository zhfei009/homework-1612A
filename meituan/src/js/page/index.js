require(['./js/config.js'], function() {
    require(['Swiper', 'BScroll'], function(Swiper, BScroll) {
        init();

        function init() {
            new Swiper(".swiper-container", { //轮播
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                loop: true,
                direction: "horizontal",
                // autoplay: {
                //     delay: 1500
                // }
            });

            new BScroll("section", {
                probeType: 2, //获取滚动的位置,等于二或者大于的时候，才触发scroll事件
                scrollBar: true, //开启滚动条
                click: true
            });

            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/list', true);
            xhr.send();
            xhr.onload = () => {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    console.log(JSON.parse(xhr.responseText));
                }
            }

        }
    });
});