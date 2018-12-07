$(document).ready(function(){
    var address_show=$('#address_show');
    var address_none=$('#address_none');

    var activeRow;
    var activeMeun;

    $('#address_show').on('mouseenter',function(e){
        address_none.removeClass('none');
    }).on('mouseleave',function(e){
        address_none.addClass('none');
        if(activeRow){
            activeRow.removeClass('active');
            activeRow = null;
        }
        if(activeMeun){
            activeMeun.addClass('none');
            activeMeun = null;
        }
    })
    .on('mouseenter','div',function(e){
        if(!activeRow){
            activeRow = $(e.target).addClass('active');
            activeMeun = $('#'+activeRow.data('id'));
            activeMeun.removeClass('none');
            return;
        }
        activeRow.removeClass('active');
        activeRow.addClass('none');
        activeRow = $(e.target);
        activeMeun = $('#'+activeRow.data('id'));
        activeMeun.removeClass('none');
    })
})