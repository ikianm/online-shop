import React from 'react';
import Index from './Pages/Index/Index';
import Home from './pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';

const routes = [
    { path: '/', element: <Index /> },
    { path: '/home', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/dashboard', element: <Dashboard /> },
];

export default routes;