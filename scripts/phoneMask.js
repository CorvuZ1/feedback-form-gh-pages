const phone = document.getElementById("form-phone");

phone.addEventListener("input", phoneMask);

function phoneMask() {
	const allNumbers = onlyNumbers(phone.value);
	let changedValue = "";

	if (["7"].indexOf(allNumbers[0]) == 0) {
		changedValue = "+7 ";
		if (allNumbers.length > 1) {
				changedValue += '(' + allNumbers.substring(1, 4);
		}
		if (allNumbers.length >= 5) {
				changedValue += ') ' + allNumbers.substring(4, 7);
		}
		if (allNumbers.length >= 8) {
				changedValue += '-' + allNumbers.substring(7, 9);
		}
		if (allNumbers.length >= 10) {
				changedValue += '-' + allNumbers.substring(9, 11);
		}
	} else {
		phone.value = "";
	}
	phone.value = changedValue;
}

function onlyNumbers(value) {
  return value.replace(/\D/g, '');
}
