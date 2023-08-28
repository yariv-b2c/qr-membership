
const idFormEl = document.querySelector('.id-verification-form');
const idField = document.querySelector('.id-input');

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

function validateId() {
	if (!isValidIsraeliID(idField.value)) {
		idFormEl.classList.add('error');
	}

	return isValidIsraeliID(idField.value);
}

idField.addEventListener('focus', () => {
	idFormEl.classList.remove('error');
	idFormEl.reset();
})