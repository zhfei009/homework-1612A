require(['config'], function() {
    require(['mui'], function(mui) {
        var inner = document.querySelector('#inner');
        var sw = document.querySelector('.swiper-slide');
        console.log(sw)
        mui.ajax('/app', {
            dataType: 'json', //服务器返回json格式数据
            type: 'post', //HTTP请求类型
            success: function(data) {
                var str = data.data[0].img;
                sw.innerHTML = `<div class="swiper-slide">
				<div class="inner" id="inner">
					<img src="${str}" alt="">
				</div>
			</div>`;
            },
            error: function(xhr, type, errorThrown) {

            }
        });
    })
})