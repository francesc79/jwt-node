const API_URL = "api";
const AUTH_URL = "";

let ACCESS_TOKEN = undefined;

const headlineBtn = document.querySelector("#headline");
const secretBtn = document.querySelector("#secret");
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");

headlineBtn.addEventListener("click", () => {
	fetch(`${API_URL}/books`).then(resp => {
		return resp.text() ;
	}).then(data => {
		UIUpdate.alertBox(data);
	});
});

secretBtn.addEventListener("click", (event) => {
	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',		
	};
	if (ACCESS_TOKEN) {
		headers['Authorization'] =  `Bearer ${ACCESS_TOKEN}`;
	}
	fetch(`${API_URL}/books`, { 
		method: "POST",
		headers,
		body: JSON.stringify({name: 'Book1'}),
	}).then(resp => {
		UIUpdate.updateResp(resp.status);
		return resp.text();
	}).then(data => {
		UIUpdate.alertBox(data);
	});
});

logoutBtn.addEventListener("click", (event) => {
	ACCESS_TOKEN = undefined;
	UIUpdate.loggedOut();
});

loginBtn.addEventListener("click", (event) => {
	fetch(`${AUTH_URL}/api/auth`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "accept": "application/json",
      },
      body: JSON.stringify(UIUpdate.getEmailPassword())
    }).then(resp => {
    	UIUpdate.updateResp(resp.status);
    	if (resp.status == 200) {
    		return resp.json();
    	} else {
    		return resp.text();
    	}
	}).then(data => {
		if (data.access_token) {
			ACCESS_TOKEN = data.access_token;
			data = `Access Token: ${data.access_token}`;
			UIUpdate.loggedIn();
		}
		UIUpdate.alertBox(data);
	});
});