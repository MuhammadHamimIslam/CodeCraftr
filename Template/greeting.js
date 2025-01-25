const greeting = document.querySelector('.greeting');

const greetingTxt = greeting.textContent;
greeting.textContent = '';

const word = greetingTxt.split('');
let curr = 0;
function reveal () {
 if (word.length > curr) {
	greeting.textContent += greetingTxt[curr];
	curr++;
} else {
	clearInterval(int);
}
}

const int =  setInterval(reveal, 200);