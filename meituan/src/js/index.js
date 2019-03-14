var swiperSlide = document.querySelectorAll(".swiper-slide");
var likecenter=document.querySelector(".likecenter");


function ajax(opt) {
    return new Promise((resolve, reject) => {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open("get", "/data", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject(xhr.status)
                }
            }
        }
        xhr.send();
    })

}

ajax({
    url: "/data"
}).then(data => {
    var str = "";
    data.data.forEach((item) => {
        str +=
            `
                    <dl>
                            <dt><img src="${item.img}" alt=""></dt>
                            <dd>${item.title}</dd>
                    </dl>
        `
    })

    swiperSlide.forEach(file => {
        file.innerHTML = str;
    })

    var html="";
    data.list.forEach(file=>{
       html+=`
        <dl>
                    <dt><img src="${file.img}" alt=""></dt>
                    <dd>
                        <p>${file.name}</p>
                        <p>[15店通用]鸡腿堡+薯条+中杯可乐1份</p>
                        <p>
                            <span>${file.price}元</span>
                            <span>门市价：${file.door}元</span>
                            <span>已售${file.num}</span>
                        </p>
                    </dd>
                </dl> 
       `
    })
    likecenter.innerHTML=html;

}, error => {
    console.log(error)
})

var scroll = new BScroll('.center', {

})
var swiper = new Swiper(".swiper-container", {

})