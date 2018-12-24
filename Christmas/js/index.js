(function () {
    var stage, textStage, form, input;
    var circles, textPixels, textFormed;
    var offsetX, offsetY, text;
    var colors = ['#B2949D', '#FFF578', '#FF5F8D', '#37A9CC', '#188EB2'];

    function init() {
        initStages();
        // initForm();
        initText();
        initCircles();
        animate();
        addListeners();
    }

    // Init Canvas
    function initStages() {
        offsetX = (window.innerWidth - 600) / 2;
        offsetY = (window.innerHeight - 300) / 2;
        textStage = new createjs.Stage("text");
        textStage.canvas.width = 600;
        textStage.canvas.height = 200;

        stage = new createjs.Stage("stage");
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;
    }

    function initForm() {
        form = document.getElementById('form');
        form.style.top = offsetY + 200 + 'px';
        form.style.left = offsetX + 'px';
        input = document.getElementById('inputText');
    }

    function initText() {
        text = new createjs.Text("t", "80px 'Source Sans Pro'", "#eee");
        text.textAlign = 'center';
        text.x = 300;
    }

    function initCircles() {
        circles = [];
        for (var i = 0; i < 1000; i++) {
            var circle = new createjs.Shape();
            var r = 7;
            var x = window.innerWidth * Math.random();
            var y = window.innerHeight * Math.random();
            var color = colors[Math.floor(i % colors.length)];
            var alpha = 0.2 + Math.random() * 0.5;
            circle.alpha = alpha;
            circle.radius = r;
            circle.graphics.beginFill(color).drawCircle(0, 0, r);
            circle.x = x;
            circle.y = y;
            circles.push(circle);
            stage.addChild(circle);
            circle.movement = 'float';
            tweenCircle(circle);
        }
    }


    // animating circles
    function animate() {
        stage.update();
        requestAnimationFrame(animate);
    }

    function tweenCircle(c, dir) {
        if (c.tween) c.tween.kill();
        if (dir == 'in') {
            c.tween = TweenLite.to(c, 0.4, {
                x: c.originX, y: c.originY, ease: Quad.easeInOut, alpha: 1, radius: 5, scaleX: 0.4, scaleY: 0.4, onComplete: function () {
                    c.movement = 'jiggle';
                    tweenCircle(c);
                }
            });
        } else if (dir == 'out') {
            c.tween = TweenLite.to(c, 0.8, {
                x: window.innerWidth * Math.random(), y: window.innerHeight * Math.random(), ease: Quad.easeInOut, alpha: 0.2 + Math.random() * 0.5, scaleX: 1, scaleY: 1, onComplete: function () {
                    c.movement = 'float';
                    tweenCircle(c);
                }
            });
        } else {
            if (c.movement == 'float') {
                c.tween = TweenLite.to(c, 5 + Math.random() * 3.5, {
                    x: c.x + -100 + Math.random() * 200, y: c.y + -100 + Math.random() * 200, ease: Quad.easeInOut, alpha: 0.2 + Math.random() * 0.5,
                    onComplete: function () {
                        tweenCircle(c);
                    }
                });
            } else {
                c.tween = TweenLite.to(c, 0.05, {
                    x: c.originX + Math.random() * 3, y: c.originY + Math.random() * 3, ease: Quad.easeInOut,
                    onComplete: function () {
                        tweenCircle(c);
                    }
                });
            }
        }
    }

    function formText() {
        for (var i = 0, l = textPixels.length; i < l; i++) {
            circles[i].originX = offsetX + textPixels[i].x;
            circles[i].originY = offsetY + textPixels[i].y;
            tweenCircle(circles[i], 'in');
        }
        textFormed = true;
        if (textPixels.length < circles.length) {
            for (var j = textPixels.length; j < circles.length; j++) {
                circles[j].tween = TweenLite.to(circles[j], 0.4, { alpha: 0.1 });
            }
        }
    }

    function explode() {
        for (var i = 0, l = textPixels.length; i < l; i++) {
            tweenCircle(circles[i], 'out');
        }
        if (textPixels.length < circles.length) {
            for (var j = textPixels.length; j < circles.length; j++) {
                circles[j].tween = TweenLite.to(circles[j], 0.4, { alpha: 1 });
            }
        }
    }

    var a = 4;
    var p = "圣诞的钟声即将响起，落叶飞舞着，温馨洋溢着，祝福伴随着，多少个不眠之夜都不及今天的平安夜来得幸福而快乐，温暖着这个不一样的夜晚。工作上的不如意或者生活中的不愉快都将它们通通抹掉，多点爱自己，才能把生活过得更加的美好。在此送上一句————";
    var s = "圣诞节快乐";
    var next = '戳我进入下个页面';
    // event handlers
    function addListeners() {
        // form.addEventListener('submit', function(e) {
        //     e.preventDefault();
        //     if(textFormed) {
        //         explode();
        //         if(input.value != '') {
        //             setTimeout(function() {
        //                 createText(input.value.toUpperCase());
        //             }, 810);
        //         } else {
        //             textFormed = false;
        //         }
        //     } else {
        //         createText(input.value.toUpperCase());
        //     }

        // });

        if (a > 0) {
            setTimeout(function () {
                a--;
                createText(a.toString());

                addListeners();
            }, 1000)

        } else if (a == 0) {
            setTimeout(function () {
                a--;
                createText("Start");
                addListeners();
            }, 1000)
        }else if(a == -1){
            setTimeout(function () {
                a--;
                createText("丽华");
                addListeners();
            }, 1000)
        }else if(a == -2){
            setTimeout(function () {
                a--;
                createText("祝你")
                addListeners();
            }, 1000)
        }else if(a == -3){
            setTimeout(function () {
                createText("圣诞快乐")
                a--;
                addListeners();
            }, 1000)
            
        }else if(a == -4){
            setTimeout(function () {
                clearCanvas();
                a--;
                addListeners();
            }, 1000)
        }else if(a == -5){
            setTimeout(function () {
                playerP("",p);
                a--;
                addListeners();
            }, 1000)
            
        }else if(a == -6){
            setTimeout(function () {
                playerS("",s);
                a--;
                addListeners();
            }, 12000)
        }else if(a == -7){
            setTimeout(function(){
                playerA('',next);
            },2000)
        }

    }

    var zhufuP = document.querySelector(".zhufu p");
    var zhufuS = document.querySelector(".zhufu span");
    var zhufua = document.querySelector('.zhufu a');
      console.log(zhufuP)
    //   console.log(zhufuStrong)

      function playerP(prefix,code,fn){
        let n = 0;
        setTimeout(function run(){
          n++;
          zhufuP.textContent = code.substring(0,n);
          if(n<code.length){
            setTimeout(run,100);
          }
        },70)
      }

      function playerS(prefix,code,fn){
        let i = 0;
        setTimeout(function runS(){
          i++;
          zhufuS.textContent = code.substring(0,i);
          if(i<code.length){
            setTimeout(runS,570);
          }
        },500)
      }

      function playerA(prefix,code,fn){
        zhufua.style['opacity'] = 1;
      }

      

    function clearCanvas() {
        console.log(textStage);
        document.querySelector("#stage").style["opacity"] = "0";
        document.querySelector(".zhufubox").style["background"] = "url(" + "./img/true.jfif" + ")" + " " + "no-repeat";
        document.querySelector(".zhufubox").style["background-size"] = "100%" + " " + "100%";
        document.querySelector(".zhufubox").style["opacity"] = "1";
    }

    function createText(t) {
        var fontSize = 860 / (t.length);
        if (fontSize > 160) fontSize = 160;
        text.text = t;
        text.font = "900 " + fontSize + "px 'Source Sans Pro'";
        text.textAlign = 'center';
        text.x = 300;
        text.y = (172 - fontSize) / 2;
        textStage.addChild(text);
        textStage.update();

        var ctx = document.getElementById('text').getContext('2d');
        var pix = ctx.getImageData(0, 0, 600, 200).data;
        textPixels = [];
        for (var i = pix.length; i >= 0; i -= 4) {
            if (pix[i] != 0) {
                var x = (i / 4) % 600;
                var y = Math.floor(Math.floor(i / 600) / 4);

                if ((x && x % 8 == 0) && (y && y % 8 == 0)) textPixels.push({ x: x, y: y });
            }
        }

        formText();

    }


    window.onload = function () { init() };
})();