define(["swiper","axios","BScroll"], function(Swiper,axios,BScroll) {
    var mySwiper=new Swiper(".swiper-container",{
        autoplay:true,
        loop:true,
        pagination:{
            el:".swiper-pagination"
        }
    })
    axios.get("/getMeg").then(data=>{
        let str="";
        data.data.forEach(item => {
            console.log(item)
            str+=`<dl>
                    <dt><img src="${item.img}" alt=""></dt>
                    <dd>
                        <b>${item.title}</b>
                        <p>${item.meg}</p>
                        <div>
                            <p><span>${item.pic}</span><i>${item.yuan}</i></p>
                            <p>${item.people}</p>
                        </div>
                    </dd>
                </dl>`
        });
        proList.innerHTML=str;
        var myBScroll=new BScroll(".main")
    })
});