import { StrictMode } from 'react'
import { hydrate, render } from 'react-dom'
import { RecoilRoot } from 'recoil'

import 'css/global.css'

import { Router } from 'Router'
import reportWebVitals from 'reportWebVitals'

const rootElement = document.getElementById('root')

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  )
}

if (rootElement?.hasChildNodes()) {
  hydrate(<App />, rootElement)
} else {
  render(
    <StrictMode>
      <App />
    </StrictMode>,
    rootElement
  )
}

reportWebVitals(console.debug)
