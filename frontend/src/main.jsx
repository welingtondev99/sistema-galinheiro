import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import NewPassword from './pages/NewPassword.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>, // Sua página principal (Home)
  },
  {
    path: "register",
    element: <Register/>,
  },
  {
    path: "recuperar-senha",
    element: <ResetPassword/>,
  },
  {
    path: "redefinir-senha",
    element: <NewPassword/>,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
