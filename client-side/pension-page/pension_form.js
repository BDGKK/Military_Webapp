const unid = document.getElementById("uid")
const email = document.getElementById("email")
const yes = document.getElementById("radio-yes")
const no = document.getElementById("radio-no")
const rank = document.getElementById("rank")
const service = document.getElementById("years")
const quantity = document.getElementById("number")
const file = document.getElementById("file")
const text = document.getElementById("comment")
const gname = document.getElementById("gname")
const grelation = document.getElementById("grelationship")


function checkblank(){

	if(email.value == ""){
        alert('please enter email');
        return false;
    }

	if(rank.value == ""){
        alert('please enter rank');
        return false;
    }

	if(text.value == ""){
        alert('please enter a comment');
        return false;
    }
    if(gname.value == ""){
        alert('please enter a granter name');
        return false;
    }

    if(grelation.value == ""){
        alert('please enter a granter relation')
        return false;
    }
}

function checknumber(inputText){
    if(/^\d+$/.test(inputText.value)){
        console.log('only digits');
    }else{
        alert('please enter number');
    }
}


  



