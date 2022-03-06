import { StrictMode } from 'react'
import { render } from 'react-dom'

import 'css/global.css'

import App from 'App'
import reportWebVitals from 'reportWebVitals'

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
)

reportWebVitals(console.debug)
