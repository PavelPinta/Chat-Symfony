$().ready(function () {
    $('#button-profile').click(function () {
        $('.modal-wrap').add('#profile').fadeIn(300);
    });
    $('#button-add-comment').click(function () {
        $('.modal-wrap').add('#new-msg').fadeIn(300);
        $('.submit.send-msg').val('Add');
        $('#new-msg-data label').text('Enter your comment:')
    });

    // close modal window
    $('.modal .title .close').add('.close-button').click(hideShowModalWindow);

    // send comment
    $('.send-msg').click(function () {
        if ($(this).val() == 'Add') {
            var data = {message: $("#new-msg textarea").val()};
            checkSendForm('/ajax/sendmsg', data);
        } else {
            var data = {message: $("#new-msg textarea").val(), id: $(this).attr('alt')};
            checkSendForm('/ajax/edit-msg', data);
        }
    });

    // edit profile
    $('.edit-profile').click(function () {
        console.log('edit-profile');
        checkSendForm();
    });

    // load messages
    loadMsgs();

    // shoe more
    $('#show-more').click(showMore);

    // edit my msg
    $('.content').delegate('.message span a', 'click', editMsg);

});

// functions

function editMsg() {

    var oldText = $(this).parent().children().first();
    var text = oldText.text();
    $('.modal-wrap').add('#new-msg').fadeIn(300);
    $('.submit.send-msg').val('Edit');
    $('.submit.send-msg').attr('alt', $(this).attr('id').split('-')[1]);
    $('#new-msg-data label').text('Edit comment:')
    $('#new-msg-data textarea').val(text);

    var data = {
        id: $(this).attr('id').split('-')[1],
        text: $(this).parent().children().eq(0).text()
    };
}

function showMore() {
    var last = $('.message').last().attr('id');
    loadMsgs(last, 'show_more');
}

function loadMsgs(id, action) {

    if (typeof (id) === typeof (undefined)) {
        var url = '/ajax/loadmsgs';
    } else if (typeof (action) === typeof (undefined)) {
        var url = '/ajax/loadmsgs/' + id + '/load-one';
    } else {
        var url = '/ajax/loadmsgs/' + id + '/show-more';
    }

    $.ajax({
        type: 'post',
        url: url,
        data: '',
        dataType: 'json',
        success: createDOMmsgs,
        error: function () {
            console.log('error load msgs');
        }
    });
    
}

function createDOMmsgs(data) {

    var userid = 1;
    var json = data.data;

    for (var i = 0; i < json.length; i++) {

        var time = json[i].create_at.date.split(' ');
        var msg = "<div class='message";
        msg += userid == json[i].userid ? ' my' : ' your';
        msg += "'id=msg-" + json[i].id + "><div><h3>" + json[i].userid + "</h3><p>" + time[1] + "</p></div><span><span class='text'>" + json[i].text + "</span>";

        if (userid == json[i].userid) {
            msg += "<a class='test' id='msg-" + json[i].id + "'>[edit]</a>";
        }

        msg += "</span></div><div class='clear'></div>";

        if (data.action == 'show-more') {
            $('#show-more').before(msg);
        } else {
            $('.content').prepend(msg);
        }

    }

}

function hideShowModalWindow() {

    $('.modal-wrap').add('.data').fadeOut(300);
    $('.modal textarea').val('');
    $('.modal .error').html('');
    $('input, textarea').css('border-color', '#aaa');

}

function checkSendForm(url, data) {

    var ta = $('.modal textarea');

    if (ta.val() == '') {
        $('.modal .error').html('Write a comment');
        ta.css('border-color', 'red');
    } else if (ta.val().length > 500) {
        $('.modal .error').html('Max length 500 letter');
        ta.css('border-color', 'red');
    } else {
        $('.modal .error').html('');
        ta.css('border-color', '#aaa').attr('disabled', 'disabled');
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            success: function (json) {
                ta.removeAttr('disabled');
                hideShowModalWindow();
                if (url == '/ajax/sendmsg')
                    loadMsgs($('.message').first().attr('id'));
                else {
                    $('#msg-' + json.id + ' .text').text(json.text);
                }
            },
            error: function () {
                $('.modal .error').html('Error upload comment');
                ta.removeAttr('disabled');
            }
        });
    }

}