import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.tsx'
import ConfigView from './pages/ConfigView.tsx'
import ProtectedRoutes from './pages/ProtectedRoutes.tsx';
import ConfigCreate from './pages/ConfigCreate.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoutes/>,
    children: [
      {
        path: '/',
        element: <ConfigView/>
      },
      {
        path: '/create',
        element: <ConfigCreate/>
      },
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
