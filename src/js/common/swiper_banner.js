/*
 * @Author: 刘祥祥 
 * @Date: 2018-10-26 14:44:17 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-03-12 16:17:49
 */

var mySwiperWrap = new Swiper(".swiper-container", {
    on: {
        slideChange: function() {
            var ind = this.activeIndex;
            $('footer dl').eq(ind).addClass('color').siblings().removeClass('color')

        }
    }
});


new Swiper(".banner", {
    pagination: {
        el: ".page",
        clickable: true
    },
    loop: true,
    autoplay: {
        delay: 1500
    }
})