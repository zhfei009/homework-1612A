var $ = {
    ajax: function(opts) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open(opts.type, opts.url, opts.async);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                opts.success && opts.success(xhr.responseText)
            }
        }
        xhr.send();
    }
}