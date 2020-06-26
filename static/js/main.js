$(function () {
    addRem(window);

    $(document).on('click', '.add-info .add-btn', function(){
        $('.add-driver-cur').show();
        $('body').addClass('scroll');
    });
    $(document).on('click', '.add-driver-cur .select dt', function(){
        if($(this).siblings('dd').children().length>0){
            $(this).siblings('dd').stop().slideToggle();
        } else {
            alert('无可用驾驶员');
        }
        return false;
    });
    $(document).on('click', '.add-driver-cur .select .option', function(){
        var val=$(this).text();
        $(this).closest('.select').find('.val').val(val);
        $(this).closest('.select').find('dd').slideUp();
        return false;
    });
    $(document).on('click', function(){
        $('.select dd').stop().slideUp();
    });
    $(document).on('click', '.car-box .car-btn', function(){
        var n=$(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        $(this).closest('.car-box').find('.car-con').eq(n).addClass('on').siblings().removeClass('on');
    })
    $(document).on('click', '.car-con .item', function(){
        if($(this).hasClass('on')){
            $(this).removeClass('on');
        } else {
            $('.car-con .item').removeClass('on');
            $(this).addClass('on');
        }
    })
    $(document).on('click', '.add-driver-cur .confirm', function(){
        var carNumber=$('.car-con .item.on').text();
        var driverName=$('.driver-box .val').val();
        if(carNumber.length>0 && driverName){
            console.log(11);
            $('.table tbody').append(
                '<tr>\n' +
                '    <td class="list-car-info">'+carNumber+'</td>\n' +
                '    <td class="lsit-driver-name">'+driverName+'</td>\n' +
                '    <td>\n' +
                '        <p class="clear">删除</p>\n' +
                '    </td>\n' +
                '</tr>'
            );
            showhdie();
            $('.add-driver-cur').hide();
            $('.driver-box .val').val('');
            $('.car-con .item').removeClass('on');
            $('body').removeClass('scroll');
        } else {
            $('.tanc').show();
        }
    });
    $(document).on('click', '.add-driver-cur .cancel', function(){
        $('.add-driver-cur').hide();
        $('.driver-box .val').val('');
        $('.car-con .item').removeClass('on');
        $('body').removeClass('scroll');
    });
    $('.err-tis .confirm').click(function(){
        $(this).closest('.err-tis').hide();
    });
    $(document).on('click', '.table .clear', function(){
        $(this).closest('tr').remove();
        showhdie();
    });
    $(document).on('click', '.table .clear-all', function(){
        $(this).closest('.table').find('tbody').empty();
        showhdie();
    });
    showhdie();
    function showhdie(){
        if($('.table tbody').children().length > 0){
            $('.table .clear-all-tr').show();
            $('.table .txt-none-tr').hide();
        } else {
            $('.table .clear-all-tr').hide();
            $('.table .txt-none-tr').show();
        }
    }

    laydate.render({
        elem: '#date-inp',
        type: 'datetime'
    });

});
function addRem(win) {
    var doc = win.document;
    var html = doc.documentElement;
    var option = html.getAttribute('data-use-rem');
    if (option === null) return;
    // default 750px；
    var baseWidth = option == 'default' || option == '' || parseInt(option) <= 0 ? 750 : parseInt(option);
    var grids = baseWidth / 100,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = html.clientWidth || 375; // default to 375 if can't get device-width
            html.style.fontSize = clientWidth / grids + 'px';
        };
    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
}