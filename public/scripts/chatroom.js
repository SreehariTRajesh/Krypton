const socket=io();
const msg=document.getElementById('msg');
const btn=document.getElementById('send-btn');
socket.emit('joinRoom',{username,room});
socket.on('message',function(message){
    outputMessage(message.text,message.username,message.time);
    document.querySelector('.message-area').scrollTop=document.querySelector('.message-area').scrollHeight;
});
btn.addEventListener('click',function(){
    const message=msg.value;
    socket.emit('chatMessage',{message,username});
    msg.value='';
    msg.focus();
});

socket.on('roomUsers',function({room,users}){
    displayRoom(room);
    displayUsers(users);
});
function outputMessage(message,username,time){
    var div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<div class='msg-details'><div class='username'><p>${username}</p></div><div class='time'><p>${time}</p></div></div><div class='msg-cont'><p>${message}</p></div>`  
    document.querySelector('.message-area').appendChild(div);
}
function displayRoom(room){
    document.getElementById('cont').innerText=room;
}
function displayUsers(users){
    document.querySelector('.user-list').innerHTML='';
    for(var i=0;i<users.length;++i){
        var div=document.createElement('p')
        div.setAttribute('style',"color:white;font-family:'Audiowide',cursive;color:whitesmoke;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;width:80%;margin-top:5px;margin-bottom:5px;position:relative;left:5%;");
        div.innerText=`🛸 ${users[i].username}`
        document.querySelector('.user-list').appendChild(div);    
    }
}