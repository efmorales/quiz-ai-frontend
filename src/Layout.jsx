import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './redux/usersSlice';
import philosophyBG from './pages/philosophyBG.png'

const Layout = () => {

  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {

    dispatch(logoutUser());
    navigate("/login");

  }

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">

            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-white font-bold text-2xl">Philosofinder AI</Link>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-end">
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">

                  {/* Conditionally render Login, Register, and Logout buttons. If I'm logged in, then the login and register buttons should not be rendered, and the logout button should appear and if clicked, it should trigger the logoutUser action. When state.isLoggedIn is 'false' the Login and Register buttons should appear again, but not the Logout button. */}
                  {isLoggedIn ? (
                    <>
                      <Link to="/quiz" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Quiz</Link>
                      <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Log in</Link>
                      <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
                    </>
                  )}

                </div>
              </div>
            </div>

          </div>
        </div>
      </nav>

      <main className="flex-grow"
        style={{
          backgroundImage: `url(${philosophyBG}), linear-gradient(to right, #3b82f6, #9333ea)`, // Image over gradient
          backgroundSize: 'cover', // Cover the viewport
          backgroundPosition: 'center', // Center the image
        }}>
        <Outlet />
      </main>

      <footer className="bg-gray-800 w-full py-8">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <p className="text-center text-white text-sm">Enzo Morales, 2023</p>
        </div>
      </footer>
    </div>




  )


};

export default Layout;