//获取节点
const xia = document.querySelector(".xia");
const shang = document.querySelector(".shang");
const baner = document.querySelector(".banner");

const bscroll = new BScroll(".main", {
    probeType: 2,
    click: true
});

addEvent();
// 事件监听
function addEvent() {
    bscroll.on("scroll", scrollFn); //滚动时加载事件
    bscroll.on("scrollEnd", scrollFnn); //滚动结束之后的事件
}

function scrollFn() {
    // 判断 实例对象.y滚动高度 大于50
    if (this.y > 70) {
        xia.innerHTML = "释放刷新";
    } else {
        xia.innerHTML = "下拉刷新";
    }
    // 判断 实例对象.y滚动高度 小于 滚动最低下的距离 - 50
    if (this.y < (this.maxScrollY - 50)) {
        shang.innerHTML = "释放加载";
    } else {
        shang.innerHTML = "上拉加载";
    }
}

function scrollFnn() {
    //下拉刷新
    if (xia.innerHTML == "释放刷新") {
        location.reload(); //刷新页面
    }
    //上拉加载
    if (shang.innerHTML == "释放加载") {
        jiaS(); //加载数据
    }
}

function jiaS() {
    axios.get("/app/findInfo").then(val => {
        let newData = val.data.data;
        baner.innerHTML = `<img src="${newData[0].img}" alt="">`;
        console.log(newData[0].img);
    })
}