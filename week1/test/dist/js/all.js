"use strict";

var a = "123";
'use strict';

var wrapper = document.querySelector('.swiper-wrapper');
axios.get('/list', {
    params: {
        page: 0
    }
}).then(function (data) {
    wrapper.innerHTML = data.data.map(function (file) {
        return '<div class="swiper-slide">\n                            <div class="content">\n                                <h3>' + file.title + '</h3>\n                                <img src="' + file.img + '" alt="">\n                            </div>\n                        </div>';
    }).join('');
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical'
    });
});