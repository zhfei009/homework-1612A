/*
 * @Author: mikey.樊国庆 
 * @Date: 2018-12-29 11:08:44 
 * @Last Modified by: mikey.樊国庆
 * @Last Modified time: 2018-12-29 16:29:04
 */

/**
 * 
 */
// var myTouch = {
//     tap: function(el, callback) {
//         timeStart = 0;
//         var isMove = false; //判断是否为对象
//         if (typeof el === "object") {
//             //事件
//             el.addEventListener("touchstart", function() {
//                 timeStart = new Date() * 1;
//             });
//             el.addEventListener("touchmove", function() {
//                 isMove = true;
//             });
//             el.addEventListener("touchend", function() {
//                 var timeEnd = new Date() * 1;
//                 if (timeEnd - timeStart < 150 && !isMove) {
//                     callback && callback(event, this);
//                 }
//                 isMove = false;
//                 timeStart = 0;
//             });
//         }
//     }
// }
var Tap = {
    tap: function(el, callback) {
        var timeStart;
        var timeEnd;
        var isMove = false;
        //判断是否为对象
        if (typeof el === "object") {
            el.addEventListener("touchstart", function() {
                timeStart = new Date() * 1;
            });
            el.addEventListener("touchmove", function() {
                isMove = true;
            });
            el.addEventListener("touchend", function() {
                timeEnd = new Date() * 1;
                if (timeEnd - timeStart < 150 && !isMove) {
                    callback && callback(event, this);
                }
                isMove = false;
            })
        }
    },

    swipe: function(el, dir, callback) {
        var startJuli = null;
        var endJuli = null;
        var fanwei = 30;
        //判断是否为对象
        if (typeof el === "object") {
            el.addEventListener("touchstart", function(e) { //触摸时（开始）
                //获取手指触碰时的坐标
                startJuli = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                }
            });
            el.addEventListener("touchmove", function(e) {
                if (startJuli) {
                    //获取鼠标抬起时最后离开时的坐标
                    endJuli = {
                        x: e.changedTouches[0].clientX,
                        y: e.changedTouches[0].clientY
                    }
                }
            });
            el.addEventListener("touchend", function() {
                //调用回调函数
                if (dir == direction() && startJuli && endJuli) {
                    callback && callback();
                }
            });
            /**
             * 判断手指移动的方向   上下左右
             */
            function direction() {
                var dir = "";
                //判断是横方向还是竖方向  Math.abs()取绝对值
                var dirX = Math.abs(endJuli.x - startJuli.x);
                var dirY = Math.abs(endJuli.y - startJuli.y);
                if (dirX > dirY) { //如果划横方向的距离大于划竖方向的距离    
                    //横向
                    if (endJuli.x - startJuli.x > fanwei) { //如果手指触摸离开时的坐标-触摸时的坐标大于30
                        //向右
                        dir = "right";
                    } else if (startJuli.x - endJuli.x > fanwei) { //如果手指触摸时的坐标-触摸离开时的坐标大于30
                        //向左
                        dir = "left";
                    }
                } else if (dirY > dirX) { //如果划竖方向的距离大于划横方向的距离
                    //竖向
                    if (startJuli.y - endJuli.y > fanwei) {
                        //向上
                        dir = "up";
                    } else if (endJuli.y - startJuli.y > fanwei) {
                        //向下
                        dir = "down";
                    }
                }
                return dir;
            }
        }
    }
}