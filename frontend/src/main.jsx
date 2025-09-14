import { createRoot } from 'react-dom/client'
import { UserProvider } from './contexts/UserContext';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <UserProvider>
      <App/>
  </UserProvider>

)
