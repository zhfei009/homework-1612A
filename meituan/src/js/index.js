const swiper = new Swiper('.icon-list', {
    pagination: {
        el: '.swiper-pagination'
    }
})

const bscroll = new BScroll('.main', {

})
const content = document.querySelector('.content');

axios.get('/getdata').then(res => {
    const listdata = res.data.data;
    console.log(listdata)
    content.innerHTML += listdata.map(val => {
        return `<div class="cont-item">
        <div class="left">
            <img src="${val.img}" alt="">
        </div>
        <div class="right">
            <span class="title">${val.title}</span>
            <span>${val.menu}</span>
            <div class="price">
                <span class="active">${val.price}</span><span>${val.menshi}</span>
                <span>${val.sale}</span>
            </div>
        </div>
    </div>`
    }).join('');
})