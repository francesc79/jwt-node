let UIUpdate = {};

UIUpdate.loggedIn = function(token) {
  UIUpdate.alertBox(`Just logged in<br>Token:<br>${localStorage.getItem("access_token")}`);
  loginModalBtn.classList.add("d-none");
  logoutBtn.classList.remove("d-none");
};

UIUpdate.loggedOut = function() {
  localStorage.removeItem("access_token");
  loginModalBtn.classList.remove("d-none");
  logoutBtn.classList.add("d-none");
};

UIUpdate.routeChange = function() {
  if (document.querySelector(".navbar-nav li.active")) {
    document.querySelector(".navbar-nav li.active").classList.remove("active");
  }
  document.querySelector(".navbar [data-route='#" + window.location.hash.replace("#", "") + "']").classList.add("active");
};

UIUpdate.updateResp = function(status) {
  const resp = document.querySelector("#response");
  resp.innerHTML = `RESPONSE STATUS ${status}`;
};

UIUpdate.alertBox = function(message) {
  const alertBox = document.querySelector(".alert");
  alertBox.innerHTML = message;
};

UIUpdate.getEmailPassword = function() {
  return {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value
  }
};

window.addEventListener("hashchange", UIUpdate.routeChange);