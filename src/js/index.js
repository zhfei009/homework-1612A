define(['mui','flex'],function(mui){
	mui.init();
	function init(){
		var gallery = mui('.mui-slider');
		gallery.slider({
			autoplay:true,
			interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
		});
	};
	init()
})