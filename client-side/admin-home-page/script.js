const domain = window.location.origin;
let UserIDs = [] 

fetch('https://example.com/users')
.then(response => response.json())
.then(data => {
	UserIDs = data.map(user => user.id)
	console.log(UserIDs)
	const userIdsList = document.getElementById('userIdsList')
	UserIDs.forEach(id => {
		const li = document.createElement('li')
		li.innertext = id
		userIdsList.appendChild(li)
	});
})
.catch(error => console.error(error));