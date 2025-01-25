// correct the statement below 
const accordionBtn = document.querySelectorAll('.accordion-btn');

function showAccordion() {
	this.classList.toggle('open');
	const accordionItm = document.getElementById(this.dataset.target).classList.toggle('accordion-open');
}

accordionBtn.forEach(button => button.addEventListener('click', showAccordion)
)