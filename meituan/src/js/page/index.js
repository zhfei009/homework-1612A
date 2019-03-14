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

            xhr.onload = () => {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    console.log(JSON.parse(xhr.responseText));
                    var data = JSON.parse(xhr.responseText);
                    if (data.code == 0) {
                        var html = '';
                        data.data.forEach((v, i) => {
                            // console.log(v, i)
                            html += `<dl>
                                        <dt>
                                            <img src="./img/${v.img}" alt="">
                                        </dt>
                                        <dd>
                                            <h4>${v.title}</h4>
                                            <p>${v.content}</p>
                                            <div class="jia">
                                                <p> <time><b>${v.newPrice}</b>元</time> 门市价：<span>${v.oldPrice}</span>元</p>
                                                <p>已售：<span>${v.sold}</span></p>
                                            </div>
                                        </dd>
                                    </dl>`;
                        });
                        document.querySelector('.cont').innerHTML += html;
                    }

                }
            }
            xhr.send();
        }
    });
});