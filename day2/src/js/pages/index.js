define(["mui","swiper","bscroll"],function(mui,SW,BS){
	mui.init();
	new SW(".banner");
	var scroll = new SW(".main");
	new BS("section");
	var btn = document.querySelectorAll(".slideTo>b");
	for(var i=0;i<btn.length;i++){
		btn[i].addEventListener("tap",function(){
			console.log(this.getAttribute("data-id"));
			scroll.slideTo(this.getAttribute("data-id"),1000)
		})
	}
})