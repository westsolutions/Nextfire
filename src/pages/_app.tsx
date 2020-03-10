import React from "react";
import { FirebaseAppProvider } from "reactfire";
import "@firebase/auth";
import { Provider } from "react-redux";
import store from "../redux/store";
import { firebaseConfig } from "../../firebaseConfig";
import "../styles/main.scss";

export default function App({ Component, pageProps }) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </FirebaseAppProvider>
  );
}
