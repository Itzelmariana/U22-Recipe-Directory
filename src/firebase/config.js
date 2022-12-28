import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCoHbMBP9kNXmZn2cNgBbsaE7cIj5B9U4Q',
  authDomain: 'cooking-directory-fa858.firebaseapp.com',
  projectId: 'cooking-directory-fa858',
  storageBucket: 'cooking-directory-fa858.appspot.com',
  messagingSenderId: '494822893024',
  appId: '1:494822893024:web:a63bd747a95df6e4667785',
};

// init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
