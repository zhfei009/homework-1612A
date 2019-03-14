/*
 * @Author: TianyouZhang
 * @Date: 2018-12-29 10:44:34
 * @LastEditors: TianyouZhang
 * @LastEditTime: 2019-01-02 11:19:57
 * @function 封装移动端的tap事件和move事件
 */

/**
 * @param {object} el: 调用此方法的dom对象
 * @param {function} callback: 触发此方法执行的回调函数
 */
var myTouch = {
    // 点击的特点：1. 手抬起的时间减去手触碰的时间小于150ms  2. 不能移动
    tap: function(el, callback) {
        // 声明手触碰的时间
        var timeStart = 0;
        // 声明是否移动
        var isMove = false;
        // 判断el必须是对象
        if (typeof el === 'object') {
            el.addEventListener('touchstart', function() {
                timeStart = new Date() * 1;
            })
            el.addEventListener('touchmove', function() {
                isMove = true;
            })
            el.addEventListener('touchend', function() {
                var timeEnd = new Date() * 1;
                if (timeEnd - timeStart < 150 && !isMove) {
                    callback && callback(event, this)
                }
                isMove = false;
                timeStart = 0;
            })
        }
    },
    /**
     * @param {object} el: 调用此方法的dom对象
     * @param {function} callback: 触发此方法执行的回调函数 
     * @param {string} dir: 告诉你我要滑动的方向
     * 封装手指在屏幕的移动事件, 向上，向下，向左，向右
     */
    swipe: function(el, dir, callback) {
        var startPoint = null;
        var endPoint = null;
        var fanwei = 30;
        if (typeof el === 'object') {
            el.addEventListener('touchstart', function(e) {
                // 获取手指触碰时的坐标
                startPoint = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                }
                console.log(startPoint)
            })
            el.addEventListener('touchmove', function(e) {
                if (startPoint) {
                    // 获取手指移动的结束坐标
                    endPoint = {
                        x: e.changedTouches[0].clientX,
                        y: e.changedTouches[0].clientY
                    }
                }
                
            })
            el.addEventListener('touchend', function(e) {
                // 调用回调函数
                if (startPoint && endPoint && dir == direction()) {
                    callback && callback();
                }
            })
            /**
             * 判断手指移动的方向 上下左右
             */
            function direction() {
                var dir = '';
                // 判断横方向还是竖方向 Math.abs()取绝对值
                var diffX = Math.abs(endPoint.x - startPoint.x)
                var diffY = Math.abs(endPoint.y - startPoint.y)
                if (diffX > diffY) {
                    // 横向
                    if (endPoint.x - startPoint.x > fanwei) {
                        // 向右
                        dir = 'right'
                    } else if (startPoint.x - endPoint.x > fanwei){
                        // 向左
                        dir = 'left'
                    }
                } else if (diffY > diffX) {
                    // 纵向
                    if (endPoint.y - startPoint.y > fanwei) {
                        // 向下
                        dir = 'down'
                    } else if (startPoint.y - endPoint.y > fanwei){
                        // 向上
                        dir = 'up'
                    }
                }
                return dir;
            }
        }
    }
}