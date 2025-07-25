import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import './i18n'
import App from './App.tsx'
import { Toaster } from "sonner"
import { ThemeProvider } from './contexts/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="backlink-theme">
        <App />
        <Toaster richColors />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)