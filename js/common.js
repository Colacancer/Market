$.star = {
    // 输入校验是否为数字,两位小数
    checkNumber: function (str) {
        var re = /^\d+\.?\d{0,2}$/;

        if (re.test(str) && str.length < 10) {

            return true;
        } else {
            return false;
        }
    },
    // 3位数字加一个逗号
    formatNumber: function (str) {
        return (str + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },
    // 判断值是否为空
    isNull: function (str) {
        if (str == null || str == 'undefined' || str == '') {
            return true;
        } else {
            return false;
        }
    },
    alertDanger: function (body_dom, msg) {
        if (msg && body_dom.length >= 1) {
            var html = '';
            var error_dom = $('.body-error-message');
            if (error_dom.length == 0) {
                html += '<div class="alert alert-danger body-error-message">' + msg + '</div>';

                body_dom.prepend(html);
            } else {
                error_dom.text(msg);
            }
        }
    },
    clearAlert: function () {
        var error_dom = $('.body-error-message');

        if (error_dom.length > 0) {
            error_dom.remove();
        }
    },
    page: function (count, limit, current_page, page_dom) {
        var str = "";
        current_page = parseInt(current_page);
        var pre_page = current_page - 1 ? current_page - 1 : 1;
        var show_size = 5;//显示5个li
        var total_size = count % limit == 0 ? parseInt(count / limit) : (parseInt(count / limit) + 1);//总页数
        var next_page = current_page == total_size ? total_size : current_page + 1;
        var pageActive;
        var n = 2;
        if (count > limit) {//数量大于限制显示分页
            show_size = show_size > total_size ? total_size : show_size;
            str += '<li><a href="javascript:void(0)" page-no="1">首页</a></li><li><a page-no="' + pre_page + '" href="javascript:void(0);">上一页</a></li>';
            if (current_page <= show_size) {
                for (var i = 1; i <= show_size; i++) {
                    if (i == current_page) {
                        pageActive = 'page active';
                    } else {
                        pageActive = '';
                    }
                    str += '<li class="' + pageActive + '"><a page-no="' + i + '" href="javascript:void(0);">' + i + '</a></li>';
                }
            } else {
                var start;
                var end;
                if (total_size < show_size + current_page) {
                    start = total_size - show_size + 1;
                    end = total_size;
                } else {
                    start = current_page - n;
                    end = current_page + show_size - n;
                }
                for (var i = start; i <= end; i++) {
                    if (i == current_page) {
                        pageActive = 'page active';
                    } else {
                        pageActive = '';
                    }
                    str += '<li class="' + pageActive + '"><a page-no="' + i + '" href="javascript:void(0);">' + i + '</a></li>';
                }
            }
            str += '<li><a page-no="' + next_page + '" href="javascript:void(0);">下一页</a></li><li><a href="javascript:void(0)" page-no="' + total_size + '">尾页</a></li>';
        }

        page_dom.html(str);
    },
    getLoginUserId: function () {
        var uid = 0;

        $.ajax({
            async: false,
            dataType: 'json',
            type: 'GET',
            url: '/api/login/isLogin',
            success: function (res) {

                uid = res.body.value;
            }
        });

        return uid;
    }
};
//: 返回顶端
$(document).on('click', '#scroll-up', function () {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
});
$(window).scroll(function () {
    var $this = $(this);
    if ($this.scrollTop() < 100) {
        $('#scroll-up').fadeOut();
    } else if ($('#scroll-up').is(':hidden')) {
        $('#scroll-up').fadeIn();
    }
});

