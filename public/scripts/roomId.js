$(document).ready(function(){
    $('#join-room').on('click',function(e){
        $target=$(e.target);
        console.log($target.attr('room-id'));
        window.location.replace('/chat-room');
    });
});