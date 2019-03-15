var xml = new XMLHttpRequest();
xml.open('get', '/list', true)
xml.onreadystatechange = function() {
    if (xml.readyState == 4 && xml.status == 200) {
        var data = JSON.parse(xml.responseText);
        //console.log(data)
        render(data.data)
    }
}
xml.send()

function render(data) {
    var html = ''
    data.forEach(function(val) {
        html += ` <dl>
        <dt><i class="iconfont ${val.icon}"></i></dt>
        <dd>${val.iname}</dd>
    </dl>`
    })
    document.getElementsByClassName('list')[0].innerHTML = html
}