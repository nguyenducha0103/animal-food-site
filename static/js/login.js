$(document).ready( function() {
    $("#message").hide();
});

$("#login-btn").on("click", function() {
    let username = $("#username").val()
    let password = $("#password").val()

    let form_data = new FormData()
    form_data.append('username', username)
    form_data.append('password', password)
    let url = 'http://127.0.0.1:9000/login'

    $.ajax({
        type: "POST",
        processData: false,
        cache: false,
        contentType: false,
        data: form_data,
        url: url,
        success: function (res) {
            if (res==1){
                console.log('vao dashboard')
            location.href = '/template/dashboard.html'
            }
            else{
                $("#message").show();
            }
        }
    });
});
