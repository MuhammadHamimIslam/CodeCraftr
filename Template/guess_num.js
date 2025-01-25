const minValue = document.querySelector('#min');
const maxValue = document.querySelector('#max');
const usersGuessedNumber = document.querySelector('#number');
const errMsg = document.querySelector('.err-msg');
const guessedNum = document.querySelector('.guessed-num');
const result = document.querySelector('.result');
const resultText = result.querySelector('p');

function guessNumber() {
	const minCeiled = Math.ceil(parseFloat(minValue.value));
	const maxFloored = Math.floor(parseFloat(maxValue.value));
	const usersNum = parseFloat(usersGuessedNumber.value);
  if (isNaN(maxFloored) || isNaN(minCeiled)) {
	errMsg.textContent = 'Value must be valid number!';
	return ;
	}
	
	if (minCeiled > maxFloored) {
	errMsg.textContent = "Minimum value can't be bigger than Maximum value!";
	return;
	}
if (isNaN(usersNum)) {
 errMsg.textContent = 'Enter a valid number';
 return;
}	
 errMsg.textContent = '';
result.classList.add('show');

const randomNum = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);

	if (usersNum == randomNum) {
	resultText.textContent = 'You nailed it!';
	}
	else resultText.textContent = 'Number not matched.Try again!';
	
}
function dissmissSect() {
	result.classList.remove('show');
}

document.querySelector('.guess-btn').addEventListener('click', guessNumber);
result.querySelector('button').addEventListener('click', dissmissSect);