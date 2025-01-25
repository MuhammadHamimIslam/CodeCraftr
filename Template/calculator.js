const outputDiv = document.querySelector('.output');
const display = document.querySelector('.display p');
let displayValue = '';

function appendToDisplay(num) {
	displayValue += num;
	display.innerText = displayValue;
}

function Delete() {
	display.innerText = '';
	outputDiv.innerText = '';
	displayValue = '';
}

function calculate() {
	try {
		const sanitizedValue = displayValue.replace(/÷/g, '/').replace(/×/g, '*');
		const result = evaluateExpression(sanitizedValue);
		outputDiv.innerText = result;
	} catch (error) {
		outputDiv.innerText = 'Error';
	}
}

function evaluateExpression(expression) {
	const tokens = expression.match(/(\d+(\.\d+)?|[+\-*/])/g); // Tokenize numbers and operators
	if (!tokens) throw new Error("Invalid Expression");
	const operatorPrecedence = {
		'+': 1,
		'-': 1,
		'*': 2,
		'/': 2
	};

	const values = [];
	const operators = [];
	
	function applyOperator() {
		const operator = operators.pop();
		const b = values.pop();
		const a = values.pop();

		switch (operator) {
			case '+':
				values.push(a + b);
				break;
			case '-':
				values.push(a - b);
				break;
			case '*':
				values.push(a * b);
				break;
			case '/':
				if (b === 0) throw new Error("Division by zero");
				values.push(a / b);
				break;
			default:
				throw new Error(`Unknown operator: ${operator}`);
		}
	}

	for (const token of tokens) {
		if (!isNaN(token)) {
			values.push(parseFloat(token));
		} else {
			while (
				operators.length > 0 &&
				operatorPrecedence[operators[operators.length - 1]] >= operatorPrecedence[token]
			) {
				applyOperator();
			}
			operators.push(token);
		}
	}

	while (operators.length > 0) {
		applyOperator();
	}

	return values.pop();
}

function removeLast () {
 
}


document.querySelector('.equal-btn').addEventListener('click', calculate);