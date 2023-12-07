import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js';
import { getDatabase, set, ref, onValue, child, push, update, remove } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js';
import { loadCredentials } from './files.js';

let firebaseConfig = {};
let database = {};
let app = {};
let existDatabase = false;

const getDB = function () {
	// console.log('------------------- >  getDB < ---------------------------');
	return new Promise((resolve, reject) => {
		if (existDatabase)
			resolve(database);
		else {
			existDatabase = true;
			loadCredentials().then((res) => {
				firebaseConfig = res;
				app = initializeApp(firebaseConfig);
				database = getDatabase(app);
				resolve(database);
			});
		}
	});
};

export function getUserData () {
	// return true;
	return new Promise((resolve, reject) => {
		getDB().then((db) => {
			const starCountRef = ref(db, '/users');
			onValue(starCountRef, (snapshot) => {
				resolve(snapshot.val());
			}, {
				onlyOnce: false
			});
		}).catch((e) => reject(new Error('error getDB: ' + e)));
	});
}

export function getMsgs () {
	// return true;
	return new Promise((resolve, reject) => {
		getDB().then((db) => {
			const starCountRef = ref(db, '/messages');
			onValue(starCountRef, (snapshot) => {
				resolve(Object.values(snapshot.val()));
			}, {
				onlyOnce: false
			});
		}).catch((e) => reject(new Error('error getDB: ' + e)));
	});
}

export function updateScore (userId, newScore) {
	return new Promise((resolve, reject) => {
		getDB().then((db) => {
			const updates = {};
			updates['/users/' + userId + '/score'] = newScore;
			update(ref(db), updates).then(() => {
				resolve('Updated!! ');
			});
		}).catch((e) => reject(new Error('error getDB: ' + e)));
	});
}

export function DeleteUser (userId) {
	return new Promise((resolve, reject) => {
		getDB().then((db) => {
			set(ref(db, 'users/' + userId), null).then((res) => resolve('DELETED!!'));
		}).catch((e) => reject(new Error('error getDB: ' + e)));
	});
}

export function createUserData (userId, email, name, company, acceptAssesment, mailBox) {
	return new Promise((resolve, reject) => {
		getDB().then((db) => {
			set(ref(db, 'users/' + userId), {
				username: name,
				email,
				company,
				acceptAssesment,
				mailBox,
				score: 0
			}).then((res) => resolve('writted'));
		}).catch((e) => reject(new Error('error getDB: ' + e)));
	});
}
export function createMsg (name, city, message) {
	return new Promise((resolve, reject) => {
		getDB().then((db) => {
			set(ref(db, 'messages/' + name.replace(/[^a-zA-Z]/gm, '') + '-' + Date.now().toString()), {
				name,
				city,
				message,
				createdAt: Date.now()
			}).then((res) => resolve('writted'));
		}).catch((e) => reject(new Error('error getDB: ' + e)));
	});
}

// export {createUserData }
