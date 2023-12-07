import { getMsgs } from './database.js';
const totalTime = 12000;
let allMessages = [];
let currentMsg = -1;
let idNewMsg = -1;
const audio = new Audio('../Data/newMsj.mpeg');
getMessages();

function animMsg () {
	window.idMsj.classList.toggle('AnimacionEntradaMensaje');
	setTimeout(() => {
		window.idMsj.classList.toggle('AnimacionEntradaMensaje');
		window.idMsj.classList.toggle('AnimacionSalidaMensaje');
		nextMsg();
	}, totalTime - 1000);
	setTimeout(() => {
		window.idMsj.classList.toggle('AnimacionSalidaMensaje');
		animMsg();
	}, totalTime);
	window.idMsj.hidden = false;
};

function nextMsg () {
	currentMsg = (currentMsg + 1) % allMessages.length;
	currentMsg = idNewMsg >= 0 ? idNewMsg : currentMsg;
	console.log(currentMsg);
	setMessage(currentMsg);
	idNewMsg = -1;
};

function getMessages () {
	getMsgs().then((res) => {
		console.log('total', res.length);
		if (res.length !== allMessages.length && currentMsg >= 0) {
			idNewMsg = allMessages.length;
			audio.play();
		}
		/* sort by date */
		allMessages = res.sort((a, b) => a.createdAt - b.createdAt);
		if (currentMsg < 0) {
			nextMsg();
			setTimeout(() => animMsg(), 1000);
		}
	});
	setTimeout(() => getMessages(), 2 * totalTime);
};

function setMessage (id) {
	if (id < 0) return;
	setTimeout(() => {
		window.idUsername.innerHTML = allMessages[id].name;
		window.idCity.innerHTML = allMessages[id].city;
		window.idTextMsj.innerHTML = allMessages[id].message;
	}, 1000);
}
