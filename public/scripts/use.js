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

var stateII=0;
var x=setInterval(function(){
    if(stateII==0){
        document.getElementById('friends').setAttribute('style','color: #ff3366;transition:1s');
        document.getElementById('rooms').setAttribute('style','color:#33ff66;transition:1s');
        document.getElementById('prof').setAttribute('style','color:#6633ff;transition:1s');
        stateII=1;
    }
    else if(stateII==1){
        document.getElementById('friends').setAttribute('style','color: #6633ff;transition:1s');
        document.getElementById('rooms').setAttribute('style','color:#ff3366;transition:1s');
        document.getElementById('prof').setAttribute('style','color:#33ff66;transition:1s');
        stateII=2;
    }
    else if(stateII==2){
        document.getElementById('friends').setAttribute('style','color: #33ff66;transition:1s');
        document.getElementById('rooms').setAttribute('style','color:#6633ff;transition:1s');
        document.getElementById('prof').setAttribute('style','color:#ff3366;transition:1s');
        stateII=0;
    }
},1000);
