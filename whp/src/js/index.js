let swiper = new Swiper(".swiper-container", {
    autoplay: true,
    pagination: {
        el: ".swiper-pagination"
    }
})

let bscroll = new BScroll('.section ', {
    scrollY: true,
    click: true
})

function ajax() {
    let xhr = new XMLHttpRequest();
    xhr.open("get", "/listData", true);
    xhr.send()
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = xhr.responseText;
            addEvent(data)
        }
    }
}
ajax()


function addEvent(data) {
    const cont = document.querySelector(".list");
    const data1 = JSON.parse(data)
    let html = "";
    data1.map((item) => {
        console.log(item)
        html += `<div class="box">
        <div><img src="${item.image}" alt=""></div>
            <div>
                <h3>${item.name}</h3>
                <p>[${item.mag}]</p>
                <div>
                    <p><span>${item.price}元</span>门市价${item.retailp}元</p>
                    <p>已售${item.retailp}</p>
                </div>
            </div>
        </div>`;
        cont.innerHTML = html;
    })
}