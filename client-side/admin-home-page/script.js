const body = document.querySelector('body');
const domain = window.location.origin;

fetch(`${domain}/adminHomepage/allUserIds`)
.then(response => response.json())
.then(data => {
	body.innerHTML = data.map(userId => {
		const onClickUrl = `${domain}/adminUser?userId=${userId}`;
		return `
			<a href="${onClickUrl}">
				<button>User ${userId}</button>
			</a>`;
	}).join("");
})
.catch(error => console.error(error));