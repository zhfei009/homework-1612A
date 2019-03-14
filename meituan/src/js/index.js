'use strict';

var main = document.querySelector('.main');
var main2 = document.querySelector('.main2');
//var section = document.getElementsByTagName('section');

var xhr = new XMLHttpRequest();
xhr.open('GET', '/api/list', true);
xhr.send();
xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        console.log(JSON.parse(xhr.responseText));
        var data = JSON.parse(xhr.responseText).data;
        var html = '';
        data.forEach(function(item, i) {

            html += '<dl>\n                        <dt><img src="' + item.img + '" alt=""></dt>\n                        <dd>' + item.title + '</dd>\n                    </dl>';
        });
        main.innerHTML = html;
        main2.innerHTML = html;

        var list = JSON.parse(xhr.responseText).list;
        console.log(list);
        var str = '';
        list.forEach(function(item, i) {
            str += '<dl>\n                    <dt><img src="' + item.img + '" alt=""></dt>\n                    <dd>\n                        <p>' + item.name + '</p>\n                        <p>' + item.title + '</p>\n                        <p>\n                            <span class="price">' + item.price + '</span>\n                            <span>' + item.men + '</span>\n                            <span class="sale">' + item.sale + '</span>\n                        </p>\n                    </dd>\n                </dl>';
        });
        content.innerHTML += str;
    }
};
var myBScroll = new BScroll('section');
var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
        el: 'swiper-pagination',
        paginationClickable: true
    }
});