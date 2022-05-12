const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const app=express();
const socketio=require('socket.io');
const http=require('http');
const moment=require('moment')
const server=http.createServer(app);
const io=socketio(server);
const botName='General Zod'

mongoose.connect('mongodb://localhost/user_database');
let db=mongoose.connection;
//Check for db errors

db.on('error',function(err){
    console.log(err);
})
//Check connection
db.once('open',function(){
    console.log('Connected to MongoDB');
});

const modules=require('./models/user_data')
const userData=modules.userData;
const message=modules.message;
const meeting=modules.meeting;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
const FormatMessage=require('./utils/messages');
const {userJoin,getCurrentUser, userLeave,getRoomUsers}=require('./utils/users');
io.on('connection',socket=>{
    console.log('new websocket connection');
    socket.on('chatMessage',function({message,username}){
        io.emit('message',FormatMessage(username,message));
    });
    socket.on('joinRoom',function({username,room}){
        socket.join(room);
        const user=userJoin(socket.id,username,room);
        console.log(`socket id of ${user.username}:${user.id}`);
        socket.emit('message',FormatMessage(botName,'Welcome to krypton'));
        socket.broadcast.to(user.room).emit('message',FormatMessage(botName,`${user.username} has joined the chat`));
        
        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
        });
    });
    socket.on('disconnect',function(){
        const user=userLeave(socket.id);
        console.log(`${socket.id} has left the chat`);
        console.log(user);
        if(user){
            io.to(user.room).emit('message',FormatMessage(botName,`${user.username} has left the chat`));    
            io.to(user.room).emit('roomUsers',{
                room:user.room,
                users:getRoomUsers(user.room)
            });
        }
    });
});
app.get('/',function(req,res){
    res.render('index');
});
app.get('/login',function(req,res){
    res.render('login');
});
app.get('/sign-up',function(req,res){
    res.render('signup');
});
app.get('/access-denied',function(req,res){
    res.render('access_denied');
});
app.get('/:id/my-rooms',function(req,res){
    var id=req.params.id;
    userData.find({_id:mongoose.Types.ObjectId(id)},function(err,data){
        if(err){
            console.log(err);
        }
        else{
            console.log(data[0].meeting_list);
            res.render('my_rooms',{meeting_list:data[0].meeting_list,user_id:data[0]._id.toString(),nickname:data[0].nickname});
        }
    });
});
app.get('/:id/dashboard',function(req,res){
    var id=req.params.id;
    userData.find({_id:id},function(err,data){
        if(err){
            console.log(err);
        }
        else{
            console.log(id);
            res.render('dashboard',{user_id:id,messages:data[0].recieved_message_list});
        }
    });
})
app.get('/:id1&:id2/chat-room',function(req,res){
    var id1=req.params.id1;
    var id2=req.params.id2;
    console.log(id1);
    console.log(id2);
    userData.find({_id:id1},function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.render('chatroom',{user_id:id1,name:data[0].nickname,room:id2});
        }
    });
});
app.put('/:id1&:id2/delete-message',function(req,res){
    var id1=req.params.id1;
    var id2=req.params.id2;
    console.log(id1);
    console.log(id2);
    userData.findOneAndUpdate({_id:mongoose.Types.ObjectId(id1)},{$pull:{recieved_message_list:{_id:mongoose.Types.ObjectId(id2)}}},{new:true}).then((recieved_message_list)=>{
        console.log(recieved_message_list);
    }).catch((err)=>{
        console.log(err);
    });
    res.json(true);
});

app.put('/:id1&:id2/delete-meet',function(req,res){
    var id1=req.params.id1;
    var id2=req.params.id2;
    console.log(id1);
    console.log(id2);
    userData.findOneAndUpdate({_id:mongoose.Types.ObjectId(id1)},{$pull:{meeting_list:{_id:mongoose.Types.ObjectId(id2)}}},{new:true}).then((recieved_message_list)=>{
        console.log(recieved_message_list);
    }).catch((err)=>{
        console.log(err);
    });
    res.json(true);
});
app.get('/:id/profile',function(req,res){
    var id=req.params.id;
    userData.find({_id:id},function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.render('profile',{user:data[0]});
        }
    });
});
app.get('/:id/create-a-room',function(req,res){
    var id=req.params.id;
    userData.find({_id:id},function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.render('create_room',{user:data[0]});
        }
    });
});
app.get('/:id/use',function(req,res){
    res.render('use');
});
app.post('/:id/create-a-room',function(req,res){
    var id=req.params.id;
    var time=moment().format('h:mm a');
    var dt=new Date();
    var m=dt.getMonth()+1;
    var now=dt.getDate()+'/'+m+'/'+dt.getFullYear();
    var name=req.body.room_name;
    var att=req.body.att;
    var list=att.split(',');
    console.log(list);
    var meet=new meeting();
    meet.name=name;
    meet.attendees=list;
    meet.time=time;
    meet.date=now;
    userData.findOneAndUpdate({_id:id},{$push:{meeting_list:meet}},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log('Meeting saved successfully');
        }
    });

    userData.findOneAndUpdate({_id:id},{$push:{sent_message_list:meet}},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log('Meeting saved successfully');
        }
    });
    userData.find({_id:id},function(err,data){
        if(err){
            console.log(err);
        }  
        else{
            let msg=new message();
            msg.host=data[0].nickname;
            msg.name=name;
            msg.attendees=list;
            msg.time=time;
            msg.date=now;
            console.log(msg);
            for(var i=0;i<list.length;++i){
                userData.findOneAndUpdate({nickname:list[i]},{$push:{recieved_message_list:msg}},function(err){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log('Message saved successfully');
                    }
                });
            }
        }
    });
    res.redirect(`/${id}/dashboard`);
});
app.post('/sign-up',function(req,res){
    let article=new userData();
    article.username=req.body.username;
    article.email=req.body.email;
    article.nickname=req.body.nickname;
    article.bio=req.body.bio;
    article.password=req.body.password;
    article.save(function(err){
        if(err){
            console.log(err)
            return;
        }
        else{
            console.log('Article Saved Successfully');
            res.redirect('/');
        }
    });
});
app.post('/login',function(req,res){
    var user=req.body.user;
    var pw=req.body.pw;
    userData.find({username:user,password:pw},function(err,data){
        if(err){
            console.log(err);
        }
        else if(data.length!=0){
            console.log(data[0]._id);
            res.redirect(`/${data[0]._id.toString()}/dashboard`);
        }
        else{
            res.redirect('/access-denied');
        }
    });
});
server.listen(4000,()=>console.log('Server up and running on http://localhost:4000'));