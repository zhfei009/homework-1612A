"use strict";var swiperSlide=document.querySelectorAll(".swiper-slide"),likecenter=document.querySelector(".likecenter");function ajax(n){return new Promise(function(n,e){var t=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");t.open("get","/data",!0),t.onreadystatechange=function(){4===t.readyState&&(200===t.status?n(JSON.parse(t.responseText)):e(t.status))},t.send()})}ajax({url:"/data"}).then(function(n){var e="";n.data.forEach(function(n){console.log(n),e+='\n                    <dl>\n                            <dt><img src="'+n.img+'" alt=""></dt>\n                            <dd>'+n.title+"</dd>\n                    </dl>\n        "}),swiperSlide.forEach(function(n){n.innerHTML=e});var t="";n.list.forEach(function(n){t+='\n        <dl>\n                    <dt><img src="'+n.img+'" alt=""></dt>\n                    <dd>\n                        <p>'+n.name+"</p>\n                        <p>[15店通用]鸡腿堡+薯条+中杯可乐1份</p>\n                        <p>\n                            <span>"+n.price+"元</span>\n                            <span>门市价："+n.door+"元</span>\n                            <span>已售"+n.num+"</span>\n                        </p>\n                    </dd>\n                </dl> \n       "}),likecenter.innerHTML=t},function(n){console.log(n)});var scroll=new BScroll(".center",{}),swiper=new Swiper(".swiper-container",{});