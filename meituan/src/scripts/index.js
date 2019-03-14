const xhr = new XMLHttpRequest();
xhr.open("GET", "/api/list", true)
xhr.send()
xhr.onreadystatechange = function() {
    if (xhr.status == 200 && xhr.readyState == 4) {
        // console.log(xhr.responseText)
        let data = JSON.parse(xhr.responseText);
        data.mes.forEach(element => {
            document.querySelector(".shops").innerHTML += ` <dl>
                                <dt><img src="./images/1_31.jpg" alt=""></dt>
                                <dd>
                                    <h5>${element.name}</h5>
                                    <p>${element.intro}</p>
                                    <p class="lasts">
                                        <span class="prace">${element.prace}</span>
                                        <span>门市价 ${element.menshijia}</span>
                                    </p>
                                    <b>已售${element.shows}</b>
                                </dd>
                            </dl>`
        });
    }
}