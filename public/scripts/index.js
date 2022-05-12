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
        document.querySelector('.desc').setAttribute('style','background-image:linear-gradient(to right,#cc33ff,#9933ff,#6633ff);transition:background-image 3s;')
        stateII=false;
    }
    else if(stateII==false){
        document.querySelector('.desc').setAttribute('style','background-image:linear-gradient(to right,#6633ff,#9933ff,#cc33ff);transition:background-image 3s;')
        stateII=true;
    }
},3000);
