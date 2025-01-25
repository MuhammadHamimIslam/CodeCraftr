// all variables
const LanguageMode = document.querySelectorAll('.tab-btn');
const LanguageContent = document.querySelectorAll('.editor-section');
const runBtn = document.querySelector('.run');
const htmlEditor = document.querySelector("#html-editor");
const cssEditor = document.querySelector("#css-editor");
const jsEditor = document.querySelector("#js-editor");
const resetBtn = document.querySelector('.reset');
const DarkToggle = document.querySelector('#dark-toggle');
const saveBtn = document.querySelector('.save');
const resultIframe = document.querySelector('.result-frame');
const fontSet = document.querySelector('#editor-font');
const fontSize = document.querySelector('#font-size');
const lineHeight = document.querySelector('#line-height');
const preview = document.querySelector('#live-preview');
const autoSave = document.querySelector('#auto-save');
const templateElm = document.querySelectorAll('input[name="temp"]');
const wrapText = document.querySelector('#text-wrap');
const library = document.querySelector('#library');
const errLib = document.querySelector('.err-lib');
const editor = [htmlEditor,cssEditor,jsEditor];
const libraries = [];
// -- All functions

// functionality for toggling language 
LanguageMode.forEach(btn => {
	btn.addEventListener('click',() => {
		LanguageMode.forEach(button => button.classList.remove('active-btn'));
		LanguageContent.forEach(elm => elm.classList.remove('active'));
		
		btn.classList.add('active-btn');
		document.getElementById(btn.dataset.tab).classList.add('active');
		
	})
})
// popup function 
function addPopup(elm, event, popup, addedClass) {
	elm.addEventListener(event, () => popup.classList.toggle(addedClass))
}
// run code
function runCode() {
    const iframeDoc = resultIframe.contentDocument || resultIframe.contentWindow.document;
    // Set the HTML content (structure, style, and script)
    iframeDoc.open();
    iframeDoc.write(`
    <!DOCTYPE html>
    <html>
    <head>
        <style>${cssEditor.textContent}</style>
        ${getLibraryTags()}
    </head>
    <body>
        ${htmlEditor.textContent}
    </body>
    <script>${jsEditor.textContent}</script>
    </html>
    `);
    iframeDoc.close();
}
// Helper function to generate library tags (script or link)
function getLibraryTags() {
    return libraries.map(lib => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = lib.trim();
        const libElement = tempDiv.firstChild;

        if (libElement.tagName === 'SCRIPT') {
            return libElement.outerHTML;  // Return the whole <script> tag
        } else if (libElement.tagName === 'LINK') {
            return libElement.outerHTML;  // Return the whole <link> tag
        }
        return '';  // In case it's neither a <script> nor a <link>
    }).join('');
}
// reset code
function resetCode() {
	editor.forEach(elm => elm.textContent = '');
const resultFrameDoc = resultIframe.contentDocument || resultIframe.contentWindow.document;
resultFrameDoc.open();
resultFrameDoc.close();
}
// save code function 
function saveCode() {
localStorage.setItem('htmlCode', htmlEditor.textContent);
localStorage.setItem('cssCode', cssEditor.textContent);
localStorage.setItem('jsCode', jsEditor.textContent);
}
// font family set
function setFonts() {
	const currentFont = editor[0].style.fontFamily;
	if (currentFont.includes(fontSet.value)) return;
	const fontLink = document.querySelector('#link-font');
fontLink.href = `https://fonts.googleapis.com/css2?family=${(fontSet.value).split(' ').join('+')}:wght@300..700&display=swap`;
editor.forEach(elm => {
	elm.style.fontFamily = `${fontSet.value}, monospace`;
})
}
// set font size
function setFontSize() {
	editor.forEach(elm => elm.style.fontSize = fontSize.value + 'px');
}
//set line height 
function setLineHeight() {
	editor.forEach(elm => elm.style.lineHeight = lineHeight.value + 'px');
}
// set live preview 
function livePreview () {
	if (preview.checked) {
editor.forEach(elm => elm.addEventListener('input', runCode));
	} else {
editor.forEach(elm => elm.removeEventListener('input', runCode));
	} ;
}
// set auto save
function saveAutomatically () {
	if (autoSave.checked) {
		editor.forEach(elm => elm.addEventListener('input', saveCode));
	} else {
editor.forEach(elm => elm.removeEventListener('input', saveCode));
	}
}
// load file using ajax
function addDataFromFile(url, itm) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onload = function () {
		if (this.status = 200) {
	itm.textContent = this.responseText;
		}
	}
	xhr.send();
}
// add functionality for adding templates
function addTemplate () {
	templateElm.forEach(elm => {
elm.addEventListener('change', () =>{
addDataFromFile(`Template/${elm.id}.html`,htmlEditor);
addDataFromFile(`Template/${elm.id}.css`, cssEditor);
addDataFromFile(`Template/${elm.id}.js`, jsEditor);
})
	})
	runCode();
}
// wrap the code in the editor 
function wrapCode() {
if (wrapText.checked) {
editor.forEach(elm => elm.style.textWrap = 'wrap');
} else {
	editor.forEach(elm => elm.style.textWrap = 'nowrap');
}
}
// Function to create and download a file
function downloadFile (content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
// function to add library 
function addLibrary() {
const libValue = library.value.trim();
	// Error handling
	if (libValue === '') {
		errLib.textContent = 'Enter a valid library or framework!';
		return;
	}
	if (
		!(libValue.startsWith('<script') && libValue.endsWith('</script>')) &&!(libValue.startsWith('<link') && libValue.endsWith('>'))) {
		errLib.textContent = 'Invalid format of library value! Please use <script> or <link>';
		return;
	}
	errLib.textContent = '';
	//prevent duplicate
	if (libraries.includes(libValue)) {
		errLib.textContent = 'This library is added already!';
		return;
	}
	// add library to the array 
	libraries.push(libValue);
	const libItm = document.createElement('div');
	const libP = document.createElement('p');
	const libBtn = document.createElement('button');
	libP.textContent = libValue;
	libBtn.textContent = '×';
	libBtn.classList.add('remove-btn', 'action-btn');
	libItm.appendChild(libP);
	libItm.appendChild(libBtn);
	document.querySelector('.added-lib').append(libItm);
	
	libBtn.addEventListener('click', () => removeLib(libItm, libValue));
	// clear error msg and library value
	errLib.textContent = '';
	library.value = '';
	runCode();
}
// function to remove library 
function removeLib(libItm, libValue) {
	const index = libraries.indexOf(libValue);
	if (index !== -1) {
		libraries.splice(index,1);
	}
	libItm.remove();
	runCode();
}
// find and replace function 
function findAndReplace() {
  const findValue = document.querySelector('#find').value;
  const replaceValue = document.querySelector('#replace').value;
  const errMsg = document.querySelector('.err-find-msg');
  if (findValue === '') {
       errMsg.textContent = "Value can't be empty!"
        return;
    }
    errMsg.textContent = '';
    editor.forEach((elm) => {
   const regex = new RegExp(findValue, 'g');
   elm.textContent = elm.textContent.replace(regex, replaceValue);
    });
}
//  -- All event listeners and function call--

// toggle more settings from the menu
addPopup(document.querySelector('.more-setting'), 'click', document.querySelector('.more-details'), 'show-flex');
// toggle editor settings
addPopup(document.querySelector('.editor-more-setting'), 'click', document.querySelector('.editor-settings'), 'show-flex');
// reset code
resetBtn.addEventListener('click',resetCode);
// run code
runBtn.addEventListener('click',runCode);
// functionality for toggling dark mode 
DarkToggle.addEventListener('change',() => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('dark-mode','enabled')
  }
  else {
  localStorage.setItem('dark-mode','disabled')
  }
})
// save code
saveBtn.addEventListener('click', saveCode);
// change font family on every font selected
fontSet.addEventListener('input', setFonts);
// change font size
fontSize.addEventListener('input', setFontSize);
// change line height 
lineHeight.addEventListener('input', setLineHeight);
// save dark mode, load code from the local storage 
document.addEventListener('DOMContentLoaded',() => {
  const DarkModeEnabled = localStorage.getItem('dark-mode') === 'enabled' ||  document.body.classList.contains('dark-mode');
  if (DarkModeEnabled) {
  document.body.classList.add('dark-mode');
  localStorage.setItem('dark-mode','enabled');
  DarkToggle.checked = true;
  } else {
    document.body.classList.remove('dark-mode');
    DarkToggle.checked = false;
 localStorage.setItem('dark-mode', 'disabled')
  }
  // load code from local storage 
 htmlEditor.textContent = localStorage.getItem('htmlCode');
 cssEditor.textContent = localStorage.getItem('cssCode');
 jsEditor.textContent = localStorage.getItem('jsCode');
 // run the local storage's code initially 
 runCode();
 // wrap text the initially 
 wrapCode();
});
// add live preview like live server 
preview.addEventListener('input', livePreview);
livePreview();
// adding auto save
autoSave.addEventListener('input', saveAutomatically);
// add template(popul)
addPopup(document.querySelector('.add-template'), 'click', document.querySelector('.template'), 'add-block');
// template adding function 
addTemplate();
// add text wrapping toggled for the editor 
wrapText.addEventListener('change', wrapCode)
// download the code 
document.querySelector('.download-btn').addEventListener('click', () => {
	  // Download each file
  downloadFile(htmlEditor.value, "index.html", "text/html");
  downloadFile(cssEditor.value, "styles.css", "text/css");
  downloadFile(jsEditor.value, "script.js", "application/javascript");
})
// library popup
addPopup(document.querySelector('.add-library'), 'click', document.querySelector('.library'), 'add-block');
// library adding functionality 
document.querySelector('.add-lib').addEventListener('click', addLibrary);
// find and replace div popup
addPopup(document.querySelector('.find-btn'), 'click', document.querySelector('.find-replace-div'), 'show-flex');
// find and replace functionality 
document.querySelector('.replace').addEventListener('click', findAndReplace);