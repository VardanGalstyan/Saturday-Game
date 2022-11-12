import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';



function PrivateRoute({ user }) {

    return user !== null ? < Outlet /> : <Navigate to='login' />
}

export default PrivateRoute;
