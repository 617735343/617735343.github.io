$(document).ready(function(){
    var sub = $('#sub')

    var activeRow
    var activeMenu

    var timer

    var mouseInSub = false

    sub.on('mouseenter',function(e){
        mouseInSub=true;
    }).on('mouseleave',function(e){
        mouseInSub=false;
    })

    var mouseTrack = []

    var moveHandler = function(e){
        mouseTrack.push({
            //获取鼠标的x，y的值
            x:e.pageX,
            y:e.pageY,
        })
        if(mouseTrack.length > 3){
            mouseTrack.shift()
        }
    }

    $('#test')
        .on('mouseenter',function(e){
            sub.removeClass('none')
            console.log(1);

            $(document).bind('mousemove',moveHandler)
        })
        .on('mouseleave',function(e){
            sub.addClass('none')
            console.log(2);

            if(activeRow){
                activeRow.removeClass('active')
                activeRow = null;
                console.log(3);
            }
            if(activeMenu){
                activeMenu.addClass('none')
                activeMenu = null;
                console.log(4);
            }

            $(document).unbind('mousemove',moveHandler)
        })
        .on('mouseenter','li',function(e){
            if(!activeRow){
                activeRow = $(e.target).addClass('active')
                activeMenu = $('#'+activeRow.data('id'))
                activeMenu.removeClass('none');
                console.log(5);
                return
            }
            if(timer){
                clearTimeout(timer)
            }
            //设置延迟 使用户切换更方便
            // timer = setTimeout(function(){
                //如果鼠标在它中就不执行下面的代码，直接返回
                if(mouseInSub){
                    return
                }
                activeRow.removeClass('active')
                activeMenu.addClass('none')
    
                activeRow = $(e.target)
                activeRow.addClass('active')
                activeMenu = $('#'+activeRow.data('id'))
                activeMenu.removeClass('none')
                timer = null
            // },300)
            
            
        })
    })