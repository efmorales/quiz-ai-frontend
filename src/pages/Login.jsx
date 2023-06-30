// With this component we will implement the login form using Axios to make the request to the API, TailwindCSS for the styles and Redux to manage the state of the application.

// We will use the useSelector hook to access the state of the application and the useDispatch hook to dispatch the action that will update the state of the application.

// We will use the useNavigate hook to navigate to the home page after the user has logged in successfully.

// We will use the Axios library to make the request to the API.

// We will use the TailwindCSS library to style the form.

// We will use the loginUser action to update the state of the application.

// We will use the handleSubmit method of the react-hook-form library to handle the form submission.

// We will use the errors object of the react-hook-form library to display the error messages.

// We will not use any type of oAuth to authenticate the user. We will use the email and password to authenticate the user.

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/usersSlice";
import { useForm } from "react-hook-form";

function Login() {

    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        dispatch(loginUser(data));
        
        

        navigate("/");
    }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white w-96 rounded-lg shadow-xl">
        <div className="py-12 px-16">
          <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="sr-only">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Your email"
                className="bg-gray-100 border-2 w-full p-4 rounded-lg"
                {...register("email", { required: true })} />
              {errors.email && <span className="text-red-500">
                This field is required
              </span>}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="sr-only">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Choose a password"
                className="bg-gray-100 border-2 w-full p-4 rounded-lg"
                {...register("password", { required: true })} />
              {errors.password && <span className="text-red-500">
                This field is required
              </span>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold text-lg">
              Login
            </button>
          </form>
          <div className="flex justify-between items-center mt-4">
            <span>Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></span>
            <span><Link to="/forgot-password" className="text-blue-500">Forgot Password?</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login