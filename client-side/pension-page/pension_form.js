const unid = document.getElementById("uid")
const email = document.getElementById("email")
const yes = document.getElementById("radio-yes")
const no = document.getElementById("radio-no")
const rank = document.getElementById("rank")
const service = document.getElementById("years")
const quantity = document.getElementById("number")
const fileInput = document.getElementById("file")
const text = document.getElementById("comment")
const gname = document.getElementById("gname")
const grelation = document.getElementById("grelationship")

const domain = window.location.origin;

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

// `${domain}/profile/${userId}` => The fetch URL to get user profile data

// Activate this function when submit button is clicked
const submitPension = async() => {
    // Replace these data with the real totalAmount, renewDate and userId
    const pensionInfo = {
        totalAmount: 1234,
        renewDate: "2024-02-27", // Date format: YYYY-MM-DD
        userId: "1"
    }
    
    const infoResponse = await fetch(`${domain}/pension/pensionInfo`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(pensionInfo)
    });

    // Submit the pension document
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('myFile');
    const documentResponse = await fetch(`${domain}/pension/fileUpload`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: formData
    });

    if (infoResponse.ok) {
        alert("Successfully Submitted");
    }
}