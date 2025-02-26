import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AppWrapper } from '../context/state';
import ReactGA from "react-ga4";

/* Google Analytics */
if (process.env.GA4_TRACKING){
  if (process.env.GA4_TRACKING.includes("G-")){
    ReactGA.initialize(process.env.GA4_TRACKING);
  }
}

/* App Wrapper */
export default function App({ Component, pageProps }: AppProps) {
  return (
    // We use the AppWrapper to support global variables via useContext
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}
