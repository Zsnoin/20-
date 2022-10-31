$(function () {
    //1、全选模块
    //就是把全选按钮的值赋值给其他复选框
    //事件可以使用change
    $('.checkbox1,.checkbox2').change(function () {
        //拿到自己的选中状态
        $(this).prop('checked');
        $('.checkbox,.checkbox2,.checkbox1').prop('checked', $(this).prop('checked'));

        //如果全选  商品都添加背景
        if ($(this).prop('checked')) {
            $('.content-three').addClass('change');
        }
        else {
            $('.content-three').removeClass('change');
        }
    });

    //2、其他复选框的状态
    //$(".checkbox:checked")获取到选中状态的复选框集合
    $(".checkbox").change(function () {
        //如果选中的复选框集合的个数和除全选按钮外的复选框个数相等，那么则选中全选按钮，反之亦然。
        if ($(".checkbox:checked").length === $(".checkbox").length) {
            $('.checkbox1,.checkbox2').prop('checked', true);
        } else {
            $('.checkbox1,.checkbox2').prop('checked', false);

        }

        if ($(this).prop('checked')) {
            //让当前的商品添加change类名
            $(this).parents('.content-three').addClass('change');
        }
        else {
            $(this).parents('.content-three').removeClass('change');
        }
    })

    //3、商品增减 小计模块
    //手动输入小计模块
    $('.nan').change(function () {
        var n = $(this).val();
        if (n >= 1) {
            //小计模块
            //拿到单价
            var p = $(this).parent().siblings('.price').html();
            //console.log(p);
            //截取字符串 获取到数字
            p = p.substr(1);
            var num = p * n * 1;
            //四舍五入保留两位小数
            num = num.toFixed(2);
            //小计
            $(this).parent().siblings('.sum').html("￥" + num);
        } else {
            $(this).parent().siblings('.sum').html("￥" + 0.00);
        }
    })

    //增加模块
    $('.increment').click(function () {
        var n = $(this).siblings('input').val();
        n++;
        $(this).siblings('input').val(n);
        //小计模块
        //拿到单价
        var p = $(this).parent().siblings('.price').html();
        //console.log(p);
        //截取字符串 获取到数字
        p = p.substr(1);
        var num = p * n;
        //四舍五入保留两位小数
        num = num.toFixed(2);
        //console.log(num);
        //小计
        $(this).parent().siblings('.sum').html("￥" + num);

        //点击增加时重新计算总价
        total();
    })
    //减少模块 有最小值1
    $('.decrement').click(function () {
        var n = $(this).siblings('input').val();
        n--;
        if (n >= 1) {
            $(this).siblings('input').val(n);
            var p = $(this).parent().siblings('.price').html();
            //console.log(p);
            //截取字符串 获取到数字
            p = p.substr(1);
            var num = p * n;
            //四舍五入保留两位小数
            num = num.toFixed(2);
            //console.log(num);
            //小计
            $(this).parent().siblings('.sum').html("￥" + num)
        }

        //点击减少时重新计算总价
        total();
    })

    //计算总价封装成函数
    // function total() {
    //     // 结算模块 如果全选框的checked 为 true 则一共选中的商品数量为 $(".checkbox").length 其余复选框的数量
    //     if ($('.checkbox1').prop('checked') === true) {
    //         $('.total-num').children('span').html($(".checkbox").length);
    //     }
    //     else {
    //         $('.total-num').children('span').html(0);
    //     }
    //     //总数为选中状态下的复选框总数
    //     $('.total-num').children('span').html($(".checkbox:checked").length);

    //     var sums = 0;
    //     for (var i = 0; i < $(".checkbox").length; i++) {
    //         if ($(".checkbox")[i].checked === true) {
    //             sums = sums + $('.sum')[i].innerHTML.substr(1) * 1;
    //         }
    //     }
    //     $('.total-sum').html("总价：￥" + sums.toFixed(2));
    //     $('.total-sum').css({
    //         color: 'red',
    //     })
    // }



    function total() {
        var count = 0;//计算总件数
        var money = 0;//计算总价钱
        //修改总件数
        $('.nan').each(function (i, e) {
            if ($('.checkbox')[i].checked == true) {
                count += parseInt($(e).val());
                    money += parseInt($($('.sum')[i]).text().substr(1))

            }
        })
        $('.total-num span').text(count);
        $('.total-sum span').text('￥' + money.toFixed(2));
        //修改总价格

    }


    total();
    //.content,.sum 状态发生变化时执行 总数重新计算
    $('.content,.sum').change(function () {
        total();
    })

    //4、删除模块 
    $('.del').click(function () {
        //点击删除后删除对应的父元素
        $(this).parent().parent().parent().remove();
        if ($(".checkbox").length == 0) {
            $('.checkbox1,.checkbox2').prop('checked', false);
        }
        total();
    })

    //删除选中
    $('.del-checked').click(function () {
        //删除选中状态下的复选框对应的父级
        $('.checkbox:checked').parent().parent().parent().remove();
        //全部删除后，全选框取消选中
        if ($(".checkbox").length == 0) {
            $('.checkbox1,.checkbox2').prop('checked', false);
        }
        total();
    })
    //清理购物车
    $('.clear-shop').click(function () {
        $('.del').parent().parent().parent().remove();
        $('.checkbox,.checkbox1,.checkbox2').prop('checked', false);
        total();
    })

    //5、鼠标移入板块
    $('.login').find('.a1').mouseenter(function () {
        $('.login').find('.a1').css({
            color: 'red',
        })
    });
    $('.login').find('.a1').mouseleave(function () {
        $('.login').find('.a1').css({
            color: '',
        })
    });
    $('.menu li').mouseenter(function () {
        $(this).css({
            color: 'red',
        })
    })
    $('.menu li').mouseleave(function () {
        $(this).css({
            color: '',
        })
    })

    $('.last-three .ul li').mouseenter(function () {
        $(this).css({
            color: 'red',
        })
    })
    $('.last-three .ul li').mouseleave(function () {
        $(this).css({
            color: '',
        })
    })


})    