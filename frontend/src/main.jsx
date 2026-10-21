import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Register from './pages/Register.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import NewPassword from './pages/NewPassword.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import FirstAccess from './pages/dashboard/FirstAccess.jsx';
import ProtectedRoute from './pages/dashboard/ProtectedRoute.jsx';
import EmBreve from './pages/dashboard/EmBreve.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
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
  {
  element: <ProtectedRoute/>,
  children: [
    { path: "dashboard", element: <Dashboard/> },
    { path: "primeiro-acesso", element: <FirstAccess/> },
    // dentro de children:
    { path: "registro-diario", element: <EmBreve/> },
    { path: "estoque-ovos", element: <EmBreve/> },
    { path: "financeiro", element: <EmBreve/> },
    { path: "financeiro/venda", element: <EmBreve/> },
    { path: "financeiro/despesa", element: <EmBreve/> },
    { path: "racao", element: <EmBreve/> },
    { path: "racao/compra", element: <EmBreve/> },
    { path: "lotes", element: <EmBreve/> },
    { path: "saude", element: <EmBreve/> },
  ],
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
