const users=[];

function userJoin(id,username,room){
    const user={id,username,room};
    console.log(user);
    users.push(user);
    return user;
}

function getCurrentUser(id){
    return user.find(user=>user.id==id)
}
function userLeave(id){
    const index=users.findIndex(user => user.id===id)
    return users.splice(index,1)[0];
}
function getRoomUsers(room){
    return users.filter(user =>user.room===room);
}
module.exports={
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};