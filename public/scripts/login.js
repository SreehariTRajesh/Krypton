document.getElementById('login-btn').addEventListener('click',function(e){
    var t=true;
    if(document.getElementById('user').value==''){
        document.getElementById('check-user').innerText='⚠ Fields marked with * should not be left empty';
        t=false;
    }   
    if(document.getElementById('pw').value==''){
        document.getElementById('check-pw').innerText='⚠ Fields marked with * should not be left empty';
        t=false;
    }
    if(t==false){
        e.preventDefault();
    }
});
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
        document.getElementById('login-btn').setAttribute('style','color:#ff3366; border: 2px solid #ff3366;transition:1s');
        stateII=false;
    }
    else{
        document.getElementById('login-btn').setAttribute('style','color:#6633ff;border: 2px solid #6633ff;transition:1s');
        stateII=true;
    }
},1000);
