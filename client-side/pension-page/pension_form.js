const unid = document.getElementById("uid")
const email = document.getElementById("email")
const yes = document.getElementById("radio-yes")
const no = document.getElementById("radio-no")
const rank = document.getElementById("rank")
const service = document.getElementById("years")
const quantity = document.getElementById("number")
const fileInput = document.getElementById("myFileInput")
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

    const extension = fileInput.files[0].name.split('.').at(-1);
    if (extension !== 'docx' && extension !== 'doc' && extension !== 'pdf') {
        alert('Please upload DOCX, DOC or PDF files only');
        return false;
    }
    return true;
}
function checknumber(inputText){
    if(/^\d+$/.test(inputText)){
        return true;
    } else {
        alert('please enter number');
        return false;
    }
}

const submitPension = async() => {
    if (!checkblank() || !checknumber(service.value)) {
        return;
    }

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
    const formData = new FormData();
    const file = fileInput.files[0];
    formData.append('myFile', file);

    await fetch(`${domain}/pension/uploadDocument`, {
        method: 'POST',
        body: formData
    });
}