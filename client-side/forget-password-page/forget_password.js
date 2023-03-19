const newpw = document.getElementById("newpw")
const cmpw = document.getElementById('cmpw')
const digit = document.getElementById('digit')

function checkblank(){
    if(newpw.value != cmpw.value)
    alert('New password and the comfirm password does not match')

    if(digit.value == "")
    alert('Enter the digit number that you got from email')
}
