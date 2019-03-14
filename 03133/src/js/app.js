const bscroll = new BScroll(".main", {
    probeType: 2,
    click: true
});
const box = document.querySelector(".box");

let xhr = new XMLHttpRequest();
xhr.open('get', '/api/list', true);
xhr.send();
xhr.onload = () => {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        var data = JSON.parse(xhr.responseText);
        box.innerHTML = data.map(val => {
            // console.log(val)
            return `<dl class="dls">
            <dt><img src="${val.img}" alt=""></dt>
            <dd>
                <h6>${val.name}</h6>
                <p>总书记阿大家都会sad哈哈</p>
                <div class="jia">
                    <h5><span>${val.money}</span>元</h5>
                    <p>门市价31元</p>
                </div>
            </dd>
        </dl>`;
        }).join("");
    }
}