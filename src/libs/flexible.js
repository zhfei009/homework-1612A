(function(d, f) {
    // d: window
    // f: window['lib']
    var s = d.document;
    var c = s.documentElement;  // html
    var m = s.querySelector('meta[name="viewport"]');
    var n = s.querySelector('meta[name="flexible"]');
    var a = 0;
    var r = 0;
    var b = 0;
    var l;
    var e = f.flexible || (f.flexible = {});
    if (n) {
        var j = n.getAttribute("content");
        if (j) {
            var q = j.match(/initial\-dpr=([\d\.]+)/);
            var h = j.match(/maximum\-dpr=([\d\.]+)/);
            if (q) {
                a = parseFloat(q[1]);
                r = parseFloat((1 / a).toFixed(2))
            }
            if (h) {
                a = parseFloat(h[1]);
                r = parseFloat((1 / a).toFixed(2))
            }
        }
    }
    if (!a && !r) {
        // d:window
        var p = d.navigator.appVersion.match(/android/gi);

        var o = d.navigator.appVersion.match(/iphone/gi);
        var k = d.devicePixelRatio; // 获取设备像素比 = 物理像素 / 设备独立像素
        if (k >= 3 && (!a || a >= 3)) { 
            a = 3 
        } else { 
            if (k >= 2 && (!a || a >= 2)) {
                 a = 2 
            } else {
                 a = 1 
            } 
        }
        console.log(a) // 3,2,1
        r = 1 / a; // 初始比例  // 0.3333  0.5   1
    }
    // c:html
    c.setAttribute("data-dpr", a); // 动态添加data-drp显示设备像素比
    // 动态添加meta
    m = s.createElement("meta");
    m.setAttribute("name", "viewport");
    m.setAttribute("content", "width=device-width, initial-scale=" + r + ", maximum-scale=" + r + ", minimum-scale=" + r + ", user-scalable=no");
    // <meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">

    if (c.firstElementChild) {
        c.firstElementChild.appendChild(m)
    } else {
        var g = s.createElement("div");
        g.appendChild(m);
        s.write(g.innerHTML)
    }

    function i() {
        // c:html
        var u = c.getBoundingClientRect().width; // 布局视图的宽 = 设备尺寸 * 像素比
        console.log(u)
        // iphone  u=>375   a=>2
        if (u / a > 540) { u = 540 * a } // 根据设备像素比计算设计尺寸
        var w = u / 10; // 动态设置字体大小
        console.log(w)
        // w=>37.5
        c.style.fontSize = w + "px";
        e.rem = d.rem = w;
        var v = parseFloat(c.style.fontSize),  // 37.5
            t = parseFloat(window.getComputedStyle(c).getPropertyValue("font-size")); 
        console.log("flexible.refreshRem: fontSize && finalFontSize => ", v, t);
        if (v !== t) {
            c.style.fontSize = v * (v / t) + "px";
            console.log("flexible.refreshRem.fixed: fontSize  => ", c.style.fontSize)
        }
    }
    d.addEventListener("resize", function() {
        clearTimeout(l);
        l = setTimeout(i, 300)
    }, false);
    d.addEventListener("pageshow", function(t) {
        if (t.persisted) {
            clearTimeout(l);
            l = setTimeout(i, 300)
        }
    }, false);
    if (s.readyState === "complete") { s.body.style.fontSize = 12 * a + "px" } else { s.addEventListener("DOMContentLoaded", function(t) { s.body.style.fontSize = 12 * a + "px" }, false) }
    i();
    e.dpr = d.dpr = a;
    e.refreshRem = i;
    e.rem2px = function(u) { var t = parseFloat(u) * this.rem; if (typeof u === "string" && u.match(/rem$/)) { t += "px" } return t };
    e.px2rem = function(u) { var t = parseFloat(u) / this.rem; if (typeof u === "string" && u.match(/px$/)) { t += "rem" } return t }
})(window, window["lib"] || (window["lib"] = {}));