let mongoose=require('mongoose');
//User Schema
let messageSchema=mongoose.Schema({
    host:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    attendees:{
        type:Array,
        default:new Array()
    },
    time:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
});
let meetingSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    attendees:{
        type:Array,
        default:new Array()
    },
    time:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
});
let UserSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    nickname:{
        type:String,
        required:true
    },
    bio:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    friend_list:{
        type:Array,
        default:new Array()
    },
    meeting_list:{
        type:Array,
        default:new Array()
    },
    sent_message_list:{
        type:Array,
        default:new Array()
    },
    recieved_message_list:{
        type:Array,
        default:new Array()    
    }
});

const userData=mongoose.model('userData',UserSchema);
const message=mongoose.model('message',messageSchema);
const meeting=mongoose.model('meeting',meetingSchema);
module.exports={
        userData:userData,
        message:message,
        meeting:meeting
};
