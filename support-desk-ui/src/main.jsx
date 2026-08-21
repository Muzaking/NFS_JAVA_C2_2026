import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// 1. Import BOTH of your providers here!
import { AuthProvider } from './context/AuthContext.jsx' 
import { TicketDataProvider } from './context/TicketDataContext.jsx' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 2. Wrap your App in BOTH providers */}
      <AuthProvider>
        <TicketDataProvider>
          <App />
        </TicketDataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)