import React from "react";
import { Provider } from "react-redux";
import { FirebaseAppProvider } from "reactfire";
import store from "../redux/store";
import "../styles/main.scss";
import firebaseConfig from "../../firebaseConfig.json";
import "@firebase/auth";

export default function App({ Component, pageProps }) {
  // static async getInitialProps({ Component, ctx }) {
  //   let pageProps = {};

  //   ctx.reduxStore = store;

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }

  //   return { pageProps };
  // }

  // componentDidMount() {
  // fetchUser()(store.dispatch);
  // }
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </FirebaseAppProvider>
  );
}
