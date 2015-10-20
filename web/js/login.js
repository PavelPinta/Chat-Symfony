$().ready(function () {

    // change to registration
    $('.tab-reg').click(function () {
        console.log('click reg')
        $(this).removeClass('passive').addClass('active');
        $('.tab-login').removeClass('active').addClass('passive');
        $('.window .title').css('background-color', '#ddf');
        $('.window .content').css('background-color', '#9d9');
        $('.window .submit').val('Sign Up');
    });

    // change to login
    $('.tab-login').click(function () {
        console.log('click login')
        $(this).removeClass('passive').addClass('active');
        $('.tab-reg').removeClass('active').addClass('passive');
        $('.window .title').css('background-color', '#9d9');
        $('.window .content').css('background-color', '#ddf');
        $('.window .submit').val('Sign In');
    });

    // auth & registration
    $('.submit').click(function () {
        if ($(this).val() == 'Sign Up') {
            var url = '/registration';
        } else {
            var url = '/auth';
        }
        var data = {
            login: $('#username').val(),
            pass: $('#password').val()
        };

        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            success: function (json) {
                if(json.response == 'busy'){
                    $('.img').html('Login is busy');
                } else {
                    $('.img').empty();
                }
                if(json.response == 'login'){
                    $('.img').html('Login true');
                } else {
                    $('.img').empty();
                }
            },
            error: function () {
                
            }
        });
    });


});

console.log('123');