var tap = function(obj, callBack){
    if(typeof obj != 'object') return;
    // 变量
    var startTime = 0; // 记录触摸开始时间
    var isMove = false; // 记录是否产生移动

    obj.addEventListener('touchstart',function(){
        startTime = Date.now();
    });

    obj.addEventListener('touchmove',function(){
        isMove = true;
    });

    obj.addEventListener('touchend',function(e){
        if(Date.now() - startTime < 200 && !isMove){
            //触碰时间在200ms以内,不产生移动
            callBack && callBack(e);
        }
        // 清零
        startTime = 0;
        isMove = false;
    });
};
