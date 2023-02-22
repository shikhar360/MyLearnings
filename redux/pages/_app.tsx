import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
