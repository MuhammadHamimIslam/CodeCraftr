const h1Elm = document.querySelector('h1');

function blink() {
	h1Elm.classList.toggle('blink');
}

setInterval(blink, 500);