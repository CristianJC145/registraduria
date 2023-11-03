import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './shared/contexts/AuthContext';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/theme/index.scss'
import '../src/shared/plugins/fortawesome.plugin'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)

