const API_URL = "api";
const AUTH_URL = "";

let ACCESS_TOKEN = undefined;
let ACCESS_METHOD = undefined;

var webAuth = new auth0.WebAuth({
	domain: 'zazos79.eu.auth0.com',
	clientID: 'oK5mF-XcFLaJhduCW6Ai8w_HxjBtOlcd',
	responseType: 'token id_token',
	audience: 'https://zazos79.eu.auth0.com/userinfo',
	scope: 'openid',
	redirectUri: window.location.href
});

const headlineBtn = document.querySelector("#headline");
const secretBtn = document.querySelector("#secret");
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");

headlineBtn.addEventListener("click", () => {
	fetch(`${API_URL}/books`).then(resp => {
		return resp.text();
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
		headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
	}
	if(ACCESS_METHOD) {
		headers['access-method'] = ACCESS_METHOD;
	}
	fetch(`${API_URL}/books`, {
		method: "POST",
		headers,
		body: JSON.stringify({ name: 'Book1' }),
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
			ACCESS_METHOD = 'login';
			data = `Access Token: ${data.access_token}`;
			localStorage.setItem('access_token', ACCESS_TOKEN);
			UIUpdate.loggedIn();
		}
		UIUpdate.alertBox(data);
	});
});

loginAuth0Btn.addEventListener("click", (event) => {
	webAuth.authorize();
});

window.addEventListener("DOMContentLoaded", () => {
	webAuth.parseHash(function (err, authResult) {
		if (authResult && authResult.accessToken) {
			window.location.hash = '';
			ACCESS_TOKEN = authResult.idToken;
			ACCESS_METHOD = 'auth0';
			localStorage.setItem('access_token', ACCESS_TOKEN);
			UIUpdate.loggedIn();
			data = `Access Token: ${ACCESS_TOKEN}`;
			UIUpdate.alertBox(data);
		}
	});
});

