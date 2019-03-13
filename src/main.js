require.config({
    baseUrl: '../src/index',
    paths: {
        'swiper': '../src/js/swiper.min',
        'flexible': "../src/js/flexible"
    },
    shim: { //加载项目依赖的时候使用的配置项
        Swiper: {
            deps: ['css!./css/swiper/css'],
            exports: 'Swiper'
        }
    }
})