import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes: React.FC = () => {
  const token = localStorage.getItem('token')
   const expiry = localStorage.getItem('expiry');

  if (!token || !expiry || new Date().getTime() > Number(expiry)) {
    localStorage.removeItem('token');
    localStorage.removeItem('expiry');
    return <Navigate to="/login" />;
  }

  return (
    <main>
      <h1 className='text-center py-4 bg-dark text-light'>Kibana Test Task</h1>
      <Outlet></Outlet>
    </main>
  );
}

export default ProtectedRoutes