import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {ThemeProvider} from 'styled-components'

const theme = {
  colors: {
    primary: "white",
    secondary: "purple"
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}> 
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
