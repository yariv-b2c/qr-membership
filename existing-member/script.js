
const emailFormEl = document.querySelector('.email-form');
const emailField = document.querySelector('.email-input');

// https://www.scaler.com/topics/email-validation-in-javascript/
function isValidEmail(email) {
	var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	console.log(regex.test(email));
	return regex.test(email);
  }

function validateEmail() {
	if (!isValidEmail(emailField.value)) {
		emailFormEl.classList.add('error');
	}

	return isValidEmail(emailField.value);
}

emailField.addEventListener('focus', () => {
	emailFormEl.classList.remove('error');
	emailFormEl.reset();
})