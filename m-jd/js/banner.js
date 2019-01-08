function getId(id) {
    return document.getElementById(id);
}
function getTag(name, oPane) {
    return (oPane || document).getElementsByTagName(name);
}
function getQr(name, oPane) {
    return (oPane || document).querySelectorAll(name);
}

function Banner(id, imgs) {
    this.init.apply(this, arguments);
}

Banner.prototype = {
    init(id, imgs) {
        this.banner = getId(id);
        this.ul = getTag("ul", this.banner)[0];
        this.ol = getTag('ol', this.banner)[0];
        this.imgs = imgs;
        this.timer = null;
        this.index = 0;
        this.oIndex = 0;
        this.setHtml();
        //定义滑动的距离
        this.startX = 0;
        this.moveX = 0;
        this.distanceX = 0;
        //定义控制滑动的开关
        this.isMove = false;
        this.ulLi = getQr('ul li', this.banner)[0];
        this.olLi = getQr('ol li',this.banner);
        this.olLi[this.oIndex].classList.add("hover");
        this.setInterval(this);
        
    }
}

//添加Html
Banner.prototype.setHtml = function () {
    var fram = document.createDocumentFragment();
    for (var i = 0; i < this.imgs.length; i++) {
        var li = document.createElement('li');
        this.ul.appendChild(li);
        var a = document.createElement('a');
        a.href = "#";
        li.appendChild(a);
        var img = document.createElement('img');
        img.src = imgs[i];
        a.appendChild(img);
    }

    for (var i = 0; i < this.imgs.length - 1; i++) {
        var li = document.createElement('li');
        fram.appendChild(li)
    }
    this.ol.appendChild(fram);
   
}

//自动轮播
Banner.prototype.setInterval = function (_this) {
    _this.timer = setInterval(function () {
        _this.player(_this);
    }, 3000);

    //触摸时执行
    _this.banner.addEventListener('touchstart',function(e){
        clearInterval(_this.timer);
        //获取点击时的距离
        _this.startX = e.touches[0].clientX;
    })

    //触摸过程中执行
    _this.banner.addEventListener('touchmove',function(e){
        _this.isMove = true;
        //获取滑动时的距离
        _this.moveX = e.touches[0].clientX;
        //计算滑动的距离
        _this.distanceX = _this.moveX - _this.startX;
        _this.fn(_this,-_this.index * _this.ulLi.offsetWidth + _this.distanceX); 
    })

    //触摸完执行
    _this.banner.addEventListener('touchend',function(){
        //当超过了一定距离的时候
        if(_this.isMove && (Math.abs(_this.distanceX) > _this.ulLi.offsetWidth/3)){
            //当超过一定的距离的时候
            if(_this.distanceX > 0){
                _this.index --;
                _this.oIndex --;
                if (_this.index < 0) {
                    _this.index = _this.imgs.length - 2;
                    _this.ul.style.left = -(_this.imgs.length - 1) * _this.banner.offsetWidth + 'px';
                }
                if(_this.oIndex < 0){
                    _this.oIndex = _this.olLi.length - 1;
                }
            }else{
                _this.index ++;
                _this.oIndex ++;
                if (_this.index > _this.imgs.length - 1) {
                    _this.index = 1;
                    _this.ul.style.left = 0 + 'px';
                }
                if(_this.oIndex > _this.olLi.length - 1){
                    _this.oIndex = 0;
                }
            }
            _this.fn(_this,-_this.index * _this.ulLi.offsetWidth);
            _this.setColor(_this.oIndex);
        }else{
            _this.fn(_this,-_this.index * _this.ulLi.offsetWidth);
            _this.setColor(_this.oIndex);
        }
        //设置自动轮播
        _this.timer = setInterval(function () {
            _this.player(_this);
        }, 3000);
    })
}

Banner.prototype.player = function (_this) {
    _this.index ++;
    _this.oIndex ++; 
    if (_this.index > _this.imgs.length - 1) {
        _this.index = 1;
        _this.ul.style.left = 0 + 'px';
    }
    if(_this.oIndex > _this.olLi.length - 1){
        _this.oIndex = 0;
    }

    _this.setColor(_this.oIndex);
    // _this.ul.style.left = -_this.index * _this.ulLi.offsetWidth + 'px';
    _this.fn(_this,-_this.index * _this.ulLi.offsetWidth);
}

Banner.prototype.setColor = function(oIndex){
    for(var i=0;i<this.olLi.length;i++){
        this.olLi[i].classList.remove("hover");
    }
    this.olLi[oIndex].classList.add("hover");
}

//缓动函数
Banner.prototype.fn = function (_this, target) {
    var speen = _this.ul.offsetLeft - target > 0 ? -10 : 10;
    // console.log(ul.offsetTop)
    clearInterval(_this.ul.timer);
    _this.ul.timer = setInterval(function () {
        _this.ul.style.left = _this.ul.offsetLeft + speen + 'px';
        var value = _this.ul.offsetLeft - target;
        if (Math.abs(value) <= Math.abs(speen)) {
            _this.ul.style.left = target + 'px';
            clearInterval(_this.ul.timer);
        }
    }, 10)
}

var imgs = ['./img/l1.jpg', './img/l2.jpg', './img/l3.jpg', './img/l4.jpg', './img/l5.jpg', './img/l6.jpg', './img/l7.jpg', './img/l8.jpg', './img/l1.jpg'];
var banner = new Banner("banner", imgs);