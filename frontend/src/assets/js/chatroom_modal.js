$( document ).ready(function() {
    $('#usernameEdit').on('keydown paste', function(event) {
        if($(this).text().length === 17 && event.keyCode != 8) { 
          event.preventDefault();
        }
    });
});