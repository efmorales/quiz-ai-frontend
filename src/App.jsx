import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz'
import Layout from './Layout'
import Register from './pages/Register';
import Login from './pages/Login';

function App() {

 const router = createBrowserRouter ([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/quiz",
        element: <Quiz />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      }
    ]

  }
 ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
