var $={
    ajax:function(opt){
       var xhr = window.XMLHttpRequest ? new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP");
       xhr.open("get",opt.url,true);
       xhr.onreadystatechange = function(){
           if(xhr.readyState===4){
               if(xhr.status===200){
                   opt.success &&opt.success(eval("("+xhr.responseText+")"))
               }
           }else{
               opt.error && opt.error()
           }
       }
       xhr.send()
    }
}