var swiper = new Swiper('.banner', {
    autoplay: true,
    loop: true,
    pagination: {
        el: '.swiper-pagination'
    }
})
var swiper2 = new Swiper('.right', {
    autoplay: true,
    loop: true,
    direction: 'vertical'
})

var bs = new BScroll('.main', {
    probeType: 2,
    click: true
})