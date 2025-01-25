const submitBtn = document.querySelector('.submit');
	const fName = document.querySelector('#f-name');
 const lName = document.querySelector('#l-name');
	const email = document.querySelector('#email');
	const phoneNum = document.querySelector('#phone-num');
	const address = document.querySelector('#address');
	const errMsg = document.querySelector('.err-msg');
	const userObjArray = [];
	
	
function submitTask(e) {
	
e.preventDefault();

if (!fName.value.trim() || !lName.value.trim() || !email.value.trim() || !phoneNum.value.trim() || !address.value.trim()) {
	errMsg.textContent = 'Please fill all feild!';
	return ;
} 
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
	errMsg.textContent = 'Please enter a valid email address!';
	return ;
}

errMsg.textContent = ' ';
const userObj = {};
userObj.fName = fName.value;
userObj.lName = lName.value;
userObj.email = email.value;
userObj.phoneNum = phoneNum.value;
userObj.address = address.value;
userObj.id = userObjArray.length + 1;
userObjArray.push(userObj);
	// clear the form feild
	fName.value = '';
	lName.value = '';
	email.value = '';
	phoneNum.value = '';
	address.value = '';
	document.querySelector('.output').style.display = 'flex';
}

submitBtn.addEventListener('click',submitTask);