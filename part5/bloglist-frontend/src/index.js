import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { EnvironmentProvider } from './hooks/useEnvironment'

ReactDOM.createRoot(document.getElementById('root')).render(
  <EnvironmentProvider>
    <App />
  </EnvironmentProvider>
)
