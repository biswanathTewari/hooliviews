import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import { makeServer } from './server'
import { GlobalProvider } from './context'

// Call make Server
makeServer()

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <Router>
        <App />
      </Router>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
