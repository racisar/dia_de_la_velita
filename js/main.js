import { createMsg, getUserData } from './database.js';
import { GoTo } from './views.js';

const GoStep2 = () => {
	GoTo('step2').then(() => {
		window.formMsg.addEventListener('submit', sendMsg, true);
	});
};

GoTo('step1'); // Para pruebas usar:  GoStep2()
// GoStep2();

window.encenderVela = () => GoStep2();

const sendMsg = (e) => {
	e.preventDefault();
	window.submitBtn.classList.add('disabled', 'loading');
	window.submitBtn.innerText = 'Enviando...';
	const fields = Object.fromEntries(new FormData(e.target));
	console.log(fields);
	createMsg(fields.name, fields.city, fields.message).then(() => {
		GoTo('step3').then(() => {
		});
	}).catch((err) => {
		alert('Ocurrió un error al enviar tu mensaje, intenta nuevamente.');
		console.log(err);
		window.submitBtn.classList.remove('disabled', 'loading');
		window.submitBtn.innerText = 'Enviar';
	});
};
