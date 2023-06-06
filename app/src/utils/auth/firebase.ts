import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';

const clientCredentials = {
    apiKey: 'AIzaSyBwOf0oaWdXFKZr1lb9MBJv4dt3TFb8BFU',
    authDomain: 'calorie-counter-e7126.firebaseapp.com',
    projectId: 'calorie-counter-e7126',
    storageBucket: 'calorie-counter-e7126.appspot.com',
    messagingSenderId: '427089496064',
    appId: '1:427089496064:web:63e067e4ac9f16b1d5b0e5',
    measurementId: 'G-6BEFRW5WHN'
};

const app = initializeApp(clientCredentials);

export const auth = getAuth(app);
export default app