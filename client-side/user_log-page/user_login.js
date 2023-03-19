const uemail = document.getElementById('uemail')
const upaw = document.getElementById('upaw')

function checkforblank(){

    if(uemail.value == ""){
        alert('please enter email');
        return false;
    }

    if(upaw.value == ""){
        alert('please enter password');
        return false;
    }

    if(upaw.value == 8){
        alert('password shuold be 8 charakters');
        return false;
    }

}