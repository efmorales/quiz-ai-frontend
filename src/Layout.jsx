import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="p-6 bg-blue-600 text-white">
        <ul className="flex space-x-4">

          <Link to="/">Home</Link>

          <Link to="/quiz">Quiz</Link>

          <Link to="/login">Login</Link>

          <Link to="/register">Register</Link>

        </ul>
      </nav>
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;