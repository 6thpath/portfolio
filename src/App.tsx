import { ReactComponent as Logo } from './logo.svg'

import './App.css'

var App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" />
        <p className="p-[20px]">
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
