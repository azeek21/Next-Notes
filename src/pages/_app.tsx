import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ThemeProvider} from 'styled-components'

const theme = {
  colors: {
    primary: "white",
    secondary: "purple"
  }
}

export default function App({ Component, pageProps }: any) {

    if (Component.getLayout) {
      return Component.getLayout(<Component {...pageProps} />)
    }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  )
}
