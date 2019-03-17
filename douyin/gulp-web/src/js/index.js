const wrapper = document.querySelector('.swiper-wrapper');


axios.get('/getdata').then(val => {
    const data = val.data.data;
    console.log(data)
    wrapper.innerHTML = data.map((item) => {
        return `<div class="swiper-slide">
        <img src="${item.img}" alt="">
        <div class="title">
                <div class="news">@SOLA</div>
                <div class="content">${item.type}</div>
            </div>
            <div class="sidebar">
                <ul>
                    <li class="massage-person">
                        <img src="${item.tou}" alt="">
                    </li>
                    <li class="favorite">
                        <i class="iconfont icon-shoucang1"></i>
                        <p>3.7w</p>
                    </li>
                    <li class="discuss">
                        <i class="iconfont icon-xiaoxi"></i>
                        <p>10.2w</p>
                    </li>
                    <li class="share">
                        <i class="iconfont icon-weixin11"></i>
                        <p>10.1w</p>
                    </li>
                    <li class="music">
                        <img src="${item.tou}" alt="">
                    </li>
                </ul>
            </div>
    </div>`

    }).join('');
    const swiper = new Swiper('.swiper-container', {
        direction: 'vertical'
    })

})