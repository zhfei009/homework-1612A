var $ = {
    formate: function(data) {
        var str = "";
        for (var key in data) {
            str += key + "=" + data[key] + "&";
        }
        return str.replace(/&$/, "");
    },
    ajax: function(opts) {
        var async = true; 
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject();
        var data = typeof(opts.data) == "string" ? opts.data : this.formate(opts.data);
        var url = opts.type == "get" ? opts.url + "?" + data : opts.url;
        xhr.open(opts.type, url, async);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                opts.success && opts.success(JSON.parse(xhr.responseText));
            } else {
                opts.error && opts.error(xhr.responseText);
            }
        }
        xhr.send(opts.type == "get" ? null : data);
    }
}