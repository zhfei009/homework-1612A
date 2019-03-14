let data
var likeBox = document.querySelector(".like-box")
$.ajax({
    url:"./data/data.json",
    success:function(res){
       data=  res.data
       render(data)
       console.log(data)
    }
})
function render(dara){
    var str="";
    data.forEach(file=>{
        str += `
                <dl>
                    <dt><img src="${file.img}"></dt>
                    <dd>
                        <h2>${file.title}</h2>
                        <span>${file.content}</span>
                        <div class="bottom">
                            <p>${file.price}</p>
                            <span>门市价${file.menshi}</span>
                        </div>
                    </dd>
                    <div class="sale">已售${file.shou}</div>
                  </dl>
                `
    })
    likeBox.innerHTML = str
}