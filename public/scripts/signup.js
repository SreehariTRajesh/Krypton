var stateI=true;
var x=setInterval(function(){
    if(stateI==true){
        document.getElementById('title-content').setAttribute('style','color:#6600ff;transition:1s');
        stateI=false;
    }
    else if(stateI==false){
        document.getElementById('title-content').setAttribute('style','color:#ffffff;transition:1s');
        stateI=true;
    }
},1000);
var stateII=true;
var x=setInterval(function(){
    if(stateII==true){
        document.getElementById('signup-btn').setAttribute('style','color:#ff3366; border: 2px solid #ff3366;transition:1s')
        stateII=false;
    }
    else{
        document.getElementById('signup-btn').setAttribute('style','color:#6633ff;border: 2px solid #6633ff;transition:1s')
        stateII=true;
    }
},1000);
var btn=document.getElementById('signup-btn');
btn.addEventListener('click',function(e){
    document.getElementById('check-username').innerText=''
    document.getElementById('check-email').innerText=''
    document.getElementById('check-nickname').innerText=''
    document.getElementById('check-email').innerText=''
    document.getElementById('check-password').innerText=''
    document.getElementById('check-retype').innerText=''    
    var username=document.getElementById('user-name');
    var email=document.getElementById('email');
    var nickname=document.getElementById('nickname');
    var password=document.getElementById('password');
    var retype=document.getElementById('retype');
    flag=false;
    if(username.value==''){
        document.getElementById('check-username').innerText='⚠ Fields marked with * should not be left empty'
        flag==true;
        e.preventDefault();
    }
    if(email.value==''){
        document.getElementById('check-email').innerText='⚠ Fields marked with * should not be left empty'
        flag=true;
        e.preventDefault();
    }
    if(nickname.value==''){
        document.getElementById('check-nickname').innerText='⚠ Fields marked with * should not be left empty'
        flag=true;
        e.preventDefault();
    }
    if(email.value==''){
        document.getElementById('check-email').innerText='⚠ Fields marked with * should not be left empty'
        flag=true;
        e.preventDefault();
    }
    if(password.value==''){
        document.getElementById('check-password').innerText='⚠ Fields marked with * should not be left empty'
        flag=true;
        e.preventDefault();
    }
    if(retype.value==''){
        document.getElementById('check-retype').innerText='⚠ Fields marked with * should not be left empty'
        flag=true;
        e.preventDefault();
    }
    if(retype.value!=password.value && flag==false){
        document.getElementById('check-retype').innerText='⚠ Retyped password does not match with the original password'
        e.preventDefault();
    }
    document.getElementById('signup-btn').setAttribute('type','submit');
});
