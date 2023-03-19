const uid = document.getElementById("number")
const quantity = document.getElementById("number")
const gname = document.getElementById("gname")
const NIC = document.getElementById("NIC")

function checkblank(){
    if(uid.value == ""){
        alert('please enter user id');
        return false;
    }

    if(quantity.value == ""){
        alert('please enter loan amount');
        return false;
    }

    if(gname.value == ""){
        alert('please enter user granter name');
        return false;
    }
    if(NIC.value == ""){
        alert('please enter granter NIC');
        return false;
    }
}