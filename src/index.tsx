import { StrictMode } from 'react'
import { hydrate, render } from 'react-dom'

import 'css/global.css'

import App from 'App'
import reportWebVitals from 'reportWebVitals'

const rootElement = document.getElementById('root')

if (rootElement?.hasChildNodes()) {
  hydrate(<App />, rootElement)
} else {
  render(
    <StrictMode>
      <App />
    </StrictMode>,
    rootElement,
  )
}

reportWebVitals(console.debug)
