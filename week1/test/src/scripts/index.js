const wrapper = document.querySelector('.swiper-wrapper');
axios.get('/list', {
    params: {
        page: 0
    }
}).then(data => {
    wrapper.innerHTML = data.data.map(file => {
        return `<div class="swiper-slide">
                            <div class="content">
                                <h3>${file.title}</h3>
                                <img src="${file.img}" alt="">
                            </div>
                        </div>`;
    }).join('');
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical'
    })
})