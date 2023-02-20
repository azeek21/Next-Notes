import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import '../styles/globals.css'
import {ThemeProvider} from 'styled-components'
import Head from 'next/head'

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
      <Head>
        <title>Learning NextJs</title>
        <meta name="description" content='All my walkthrough learning NextJs is here. Learn nextJs. NextJs walktrhough.' />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  )
}
