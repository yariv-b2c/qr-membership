const membershipFormEl = document.querySelector('.membership-form');

const idFieldEl = document.querySelector('.id-input');
const emailFieldEl = document.querySelector('.email-input');
const phoneFieldEl = document.querySelector('.phone-input');
const dateFieldEl = document.querySelector('.date-input')

const idErrorEl = document.querySelector('.id-error');
const emailErrorEl = document.querySelector('.email-error');
const phoneErrorEl = document.querySelector('.phone-error');

const termsToggleEl = document.querySelector('#terms-toggle');
const termsToggleLabelEl = document.querySelector('label[for="terms-toggle"]');
const termsErrorEl = document.querySelector('.terms-error');

// https://www.scaler.com/topics/email-validation-in-javascript/
function isValidEmail(email) {
	const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	return regex.test(email);
}

// https://gist.github.com/freak4pc/6802be89d019bca57756a675d761c5a8
function isValidIsraeliID(id) {
	var id = String(id).trim();
	if (id.length > 9 || id.length < 5 || isNaN(id)) return false;

	// Pad string with zeros up to 9 digits
	id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

	return Array
		.from(id, Number)
		.reduce((counter, digit, i) => {
			const step = digit * ((i % 2) + 1);
			return counter + (step > 9 ? step - 9 : step);
		}) % 10 === 0;
}

// https://www.regextester.com/104924
function isValidIsraeliMobilePhone(phone) {
	const regex = /^[0][5][0|2|3|4|5|9]{1}[-]{0,1}[0-9]{7}$/;
	return regex.test(phone);
}

function isFieldDataValid() {

	const id = idFieldEl.value;
	const email = emailFieldEl.value;
	const phone = phoneFieldEl.value;

	if (!isValidIsraeliID(id)) {
		idErrorEl.classList.remove('hidden');
		idFieldEl.classList.add('input-error');
		return false;
	}

	if (!isValidEmail(email)) {
		emailErrorEl.classList.remove('hidden');
		emailFieldEl.classList.add('input-error');
		return false;
	}

	if (!isValidIsraeliMobilePhone(phone)) {
		phoneErrorEl.classList.remove('hidden');
		phoneFieldEl.classList.add('input-error');
		return false;
	}

	if (!termsToggleEl.checked) {
		termsErrorEl.classList.remove('hidden');
		termsToggleLabelEl.classList.add('input-error');
		return false;
	}

	return true;
}

dateFieldEl.addEventListener('focus', () => dateFieldEl.type='date');

membershipFormEl.addEventListener('submit', (e) => {
	e.preventDefault();
	isFieldDataValid() ? membershipFormEl.submit() : false;
});

idFieldEl.addEventListener('focus', () => {
	idErrorEl.classList.add('hidden');
	idFieldEl.classList.remove('input-error');
	idFieldEl.value = '';
});

emailFieldEl.addEventListener('focus', () => {
	emailErrorEl.classList.add('hidden');
	emailFieldEl.classList.remove('input-error');
	emailFieldEl.value = '';
});

phoneFieldEl.addEventListener('focus', () => {
	phoneErrorEl.classList.add('hidden');
	phoneFieldEl.classList.remove('input-error');
	phoneFieldEl.value = '';
});

termsToggleLabelEl.addEventListener('click', () => {
	termsErrorEl.classList.add('hidden');
	termsToggleLabelEl.classList.remove('input-error');
});