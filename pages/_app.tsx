import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AppWrapper } from '../context/state';

// export default function App({ Component, pageProps }: AppProps) {
//   const [rows, setRows] = React.useState(rows_init);
//   return (
//     <Component 
//       {...pageProps} 
//       diffuserRows = {rows}
//       setDiffuserRows = {setRows}
//     />
//   );
// }

export default function App({ Component, pageProps }: AppProps) {
  return (
    // We use the AppWrapper to support global variables via useContext
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}
