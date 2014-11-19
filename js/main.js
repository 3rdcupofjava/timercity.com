$(document).ready(function(){

    $('#sign_up a').on('click', function(){

        var parent = $(this).parent();
        if(parent.hasClass('active')){
            parent.removeClass('active');
            $('#registration_sorry').hide();
        }
        else{
            parent.addClass('active')
                .siblings().removeClass('active');
            $('#registration_sorry').show();
        }
        $('#registration_form').hide();

    });

    $('#log_in a').on('click', function(){

        var parent = $(this).parent();
        if(parent.hasClass('active')){
            parent.removeClass('active');
            $('#registration_form').hide();
        }
        else{
            parent.addClass('active')
                .siblings().removeClass('active');
            $('#registration_form').show();
            $('#button_request').hide();
            $('#button_log_in').show();
        }
        $('#registration_sorry').hide();

        $('#password').show();
        $('#why').hide();

    });

    $('#early_registration').on('click', function(){

        $('#registration_sorry').toggle();
        $('#registration_form').show();

        $('#button_log_in').hide();
        $('#button_request').show();

        $('#password').hide();
        $('#why').show();

    });

    $('#button_register').on('click', function(){
        $('#registration_form')
            .attr('action', '/yaam/public/register');
    });
    
    ui();

});

function sorry(){

}
function login(){

}
function request(){

}