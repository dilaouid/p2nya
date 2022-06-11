$( document ).ready(function() {
    var username;
    
    $('#edit-profile').on('show.bs.modal', function (event) {
        username = $('#usernameEdit').text();
    });

    $('#edit-profile').on('hidden.bs.modal', function lol () {
        $('#usernameEdit').text(username);
    });

});