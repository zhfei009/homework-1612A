new BScroll('.box');

var xml = new XMLHttpRequest();
xml.open('get', '/list', true)
xml.onload = function() {
    if (xml.readyState == 4 && xml.status == 200) {
        var data = JSON.parse(xml.responseText);
        console.log(data)
        renderlist(data.data[0].iconlist)
        render(data.data[0].images)
    }
}
xml.send()


function renderlist(data) {
    var html = '';
    data.forEach(function(val) {
        html += ` <dl>
        <dt><i class="iconfont ${val.icon}"></i></dt>
        <dd>${val.iname}</dd>
    </dl>`
    })
    document.getElementsByClassName('iconlist')[0].innerHTML = html;
}

function render(data) {
    var len = data.length;
    var html = '';
    for (var i = 1; i <= len; i++) {
        var start = (i - 1) * 1;
        var end = start + 1;
        var str = data.slice(start, end);
        var listhtml = ''
        str.forEach(function(val) {
            listhtml += ` <div class="con">
            <img src="./${val.img}" alt="">

            <div class="taikcon">
                <ul>
                    <li>${val.talk}</li>
                    <li>${val.talk}</li>
                    <li>${val.talk}</li>
                </ul>
            </div>
        </div>`
        })
        html += ` <div class="swiper-slide">
                    <div class="list">${listhtml}</div></div>`
    }
    document.querySelector('#wrapper').innerHTML = html;
    //轮播图
    new Swiper(".swiper-container", {
        autoplay: {
            delay: 1000
        },
        loop: true,
        direction: 'vertical'
    })
}