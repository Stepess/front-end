window.onload = function() {
	var login = document.getElementById("login");
	var password = document.getElementById("password");
	var loginRegExp = "^(?=[A-Za-zА-ЯЁа-яё0-9-_.]*[A-Za-zА-ЯЁа-яё][A-Za-zА-ЯЁа-яё0-9-_.]*)[A-Za-zА-ЯЁа-яё0-9-_.]{4,20}@([A-Za-zА-ЯЁа-яё]{2,5}\.)+[A-Za-zА-ЯЁа-яё-]{2,3}$";
	var passCaseRegExp = "^((?=.*[a-z])(?=.*[A-Z])).{8,20}$";
	var passAdditionalChar = "^(?=.*[0-9#$]).{8,20}$";

	var loginHandler = function() {
		var errorMessage = "";
		if (!login.value.match(loginRegExp)) {
			errorMessage += "Login must have length in arrenge (4,20) and contains at least one letter";
		}
		login.setCustomValidity(errorMessage);
	};

	var passwordHandler = function() {
		var errorMessage = "";
		var value = password.value;
		if (value.length < 8 || value.length > 20) {
			errorMessage += "password must have length in arrenge (4,20)";
		}
		if (!value.match(passCaseRegExp)) {
			errorMessage += "password must contain at least one upper case letter and one lower case letter";
		}
		if (!value.match(passAdditionalChar)) {
			errorMessage += "password must contain at least one digit or special symbol (#$)";
		}
		password.setCustomValidity(errorMessage);
	};

	login.addEventListener("blur", loginHandler);
	password.addEventListener("blur", passwordHandler);
}