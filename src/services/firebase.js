import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyDqVUxdo4lFIzRKtECy9A1sJBNc1UyBWhQ',
	authDomain: 'examplework-5e311.firebaseapp.com',
	databaseURL: 'https://examplework-5e311.firebaseio.com',
	projectId: 'examplework-5e311',
	storageBucket: 'examplework-5e311.appspot.com',
	messagingSenderId: '633480798554'
};

firebase.initializeApp(firebaseConfig);

export default firebase;
