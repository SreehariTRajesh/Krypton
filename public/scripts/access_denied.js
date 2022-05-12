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
        document.getElementById('deny-access').setAttribute('style','color:#ff3399;transition:1s;')
        stateII=false;
    }
    else{
        document.getElementById('deny-access').setAttribute('style','color:#ffffff;transition:1s;')
        stateII=true;    
    }
},1000);
