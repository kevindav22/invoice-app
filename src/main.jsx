import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css';
import InvoicePage from './pages/invoice/InvoicePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InvoicePage />
  </StrictMode>,
)
