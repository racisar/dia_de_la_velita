import { loadViewFile } from './files.js';
const View = (textView) => {
	window.app.innerHTML = textView;
};

class PageState {
	constructor () {
		this.currentState = View('');
		this.change = state => { this.currentState = state; };
	}
}

const page = new PageState();

export const GoTo = (viewName) => {
	return new Promise((resolve, reject) => {
		loadViewFile(viewName).then((res) => {
			if (document.startViewTransition)
				document.startViewTransition(() => {
					resolve(page.change(View(res)));
				});
			else
				resolve(page.change(View(res)));
		});
	});
};
