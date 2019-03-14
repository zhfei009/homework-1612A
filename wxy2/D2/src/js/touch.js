/*
 * @Author: mikey.胡瑞杰 
 * @Date: 2019-01-08 19:13:24 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-01-10 19:57:00
 */

var myTouch = {
    //点击事件
    tap: function(el, callback) {
        var startTime = 0;
        var isMove = false;
        el.addEventListener('touchstart', function() {
            startTime = new Date() * 1;
        })
        el.addEventListener('touchmove', function() {
            isMove = true;
        })
        el.addEventListener('touchend', function(e) {
            var endTime = new Date() * 1;
            if (endTime - startTime < 150 && !isMove) {
                callback && callback(e);
            }
        })
    },
    //移动事件
    swipe: function(el, dir, callback) {
        var startPoint = null;
        var endPoint = null;
        if (typeof el === 'object') {
            el.addEventListener('touchstart', function(e) {
                var touchObj = e.touches[0];
                startPoint = {
                    x: touchObj.clientX,
                    y: touchObj.clientY
                }
            });
            el.addEventListener('touchmove', function() {

            })
            el.addEventListener('touchend', function(e) {
                var touchObj = e.changedTouches[0];
                endPoint = {
                    x: touchObj.clientX,
                    y: touchObj.clientY
                }
                if (dir == duration()) {
                    callback && callback();
                }
            })
        }

        function duration() {
            var dir = '';
            var diffX = Math.abs(endPoint.x - startPoint.x);
            var diffY = Math.abs(endPoint.y - startPoint.y);
            if (diffX > diffY) {
                //横向
                if (endPoint.x - startPoint.x > 30) {
                    dir = 'right';
                } else if (startPoint.x - endPoint.x > 30) {
                    dir = 'left';
                }
            } else {
                //纵向
                if (endPoint.y - startPoint.y > 30) {
                    dir = 'down';
                } else if (startPoint.y - endPoint.y > 30) {
                    dir = 'up';
                }
            }
            return dir;
        }
    }
}