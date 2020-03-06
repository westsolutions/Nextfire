import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import config from "../../firebaseConfig.json";

if (!firebase?.apps.length) firebase.initializeApp(config);

export default firebase;
