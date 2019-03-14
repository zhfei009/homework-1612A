"use strict";

var xhr = new XMLHttpRequest();
xhr.open("GET", "/api/list", true);
xhr.send();
xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
        // console.log(xhr.responseText)
        var data = JSON.parse(xhr.responseText);
        data.mes.forEach(function (element) {
            document.querySelector(".shops").innerHTML += " <dl>\n                                <dt><img src=\"./images/1_31.jpg\" alt=\"\"></dt>\n                                <dd>\n                                    <h5>" + element.name + "</h5>\n                                    <p>" + element.intro + "</p>\n                                    <p class=\"lasts\">\n                                        <span class=\"prace\">" + element.prace + "</span>\n                                        <span>\u95E8\u5E02\u4EF7 " + element.menshijia + "</span>\n                                    </p>\n                                    <b>\u5DF2\u552E" + element.shows + "</b>\n                                </dd>\n                            </dl>";
        });
    }
};