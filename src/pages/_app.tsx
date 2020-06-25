import React from 'react';
import { FirebaseAppProvider } from 'reactfire';
import '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import { firebaseConfig } from '../../firebaseConfig';
import '../styles/main.scss';

export default function App({ Component, pageProps }) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Component {...pageProps} />
    </FirebaseAppProvider>
  );
}
