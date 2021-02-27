import React from 'react'
import { ChallengeContextProvider } from '../contexts/ChallengesContext'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChallengeContextProvider>
      <Component {...pageProps} />
    </ChallengeContextProvider>
  )
}

export default MyApp
