// define(['flexible', 'Swiper'], (flexible, Swiper) => {
//     function render() {
//         this.init();
//     }
//     render.prototype = {
//         init() {
//             console.log(1111)
//         },

//     }
//     new render();
// })


require(['./scripts/config.js'], function() {
    require(['Swiper'], function(Swiper) {
        init();

        function init() {

        }
    })
})