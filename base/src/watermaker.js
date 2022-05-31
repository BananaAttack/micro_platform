let watermark = {}
const idd = '1.234523841642.1234124163';
var _interval = null;
let setWatermark = (str) => {
    let id =idd;
    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }
    // 创建一个画布
    let can = document.createElement('canvas')
    // 设置画布的长宽
    can.width = 350
    can.height = 350
    let cans = can.getContext('2d')
    // 设置旋转角度
    cans.rotate(-20 * Math.PI / 180)
    cans.font = '24px Vedana'
    // 设置填充绘画的颜色、渐变或者模式
    cans.fillStyle = 'rgba(200, 200, 200, 0.70)'
    // 设置文本内容的当前对齐方式
    cans.textAlign = 'center'
    // 设置在绘制文本时使用的当前文本基线
    cans.textBaseline = 'Middle'
    // 在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
    cans.fillText('学术中心认证', can.width / 4, can.height / 4)
    let div = document.createElement('div')
    div.id = id
    div.style.display='inline-block'
    div.style.pointerEvents = 'none'
    div.style.top =-document.getElementById('au_report').clientHeight + 'px'
    div.style.left = '-50px'
    div.style.position = 'relative'
    div.style.zIndex = '100'
    div.style.width = document.getElementById('au_report').clientWidth + 'px'
    div.style.height =document.getElementById('au_report').clientHeight + 'px'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    document.getElementById('au_report').appendChild(div)
    return id
}
// 该方法只允许调用一次
// 添加水印的方法
watermark.set = (str) => {
    let id = setWatermark(str);
    _interval = setInterval(() => {
        if (document.getElementById(id) === null) {
            id = setWatermark(str);
        }
    }, 500);
    window.onresize = () => {
        setWatermark(str);
    };
}
// 移除水印的方法
watermark.remove = () => {
    if (document.getElementById(idd) !== null) {
        var box = document.getElementById(idd);
        box.parentNode.removeChild(box);
        _interval ? clearInterval(_interval) : '';
    }
}
export default watermark