import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from "./App.jsx";
import './index.css'
import { AuthProvider } from './components/AuthProvider.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
  // </StrictMode>,
)
