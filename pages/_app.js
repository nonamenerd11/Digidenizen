import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_ID}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_URI}
    >
      <div className="bg-slate-800 text-white min-h-[100vh]">
        <Header />
        <Component {...pageProps} />
      </div>
    </MoralisProvider>
  );
}

export default MyApp;
