
import React from 'react';
import { Link } from "react-router-dom";
import { useState } from "react";
import Validation from './LoginValidation';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./App.css";
// import logo from "./assets/logo.png";

function Login() {
    const [values, setValues] = useState({
        email:'',
        password: ''
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors); // Update errors state

        
        setTimeout(() => {
            if (Object.values(errors).every(error => error === "")) {
                axios.post('http://localhost:8080/login', values)
                    .then(res => {
                        if (res.data === "ADMIN") {
                            navigate('/home');
                        }
                        else if(res.data==="USER"){
                            navigate('/user');
                        }
                        else {
                            alert("failure")
                        }
                    })
                    .catch(err => console.log(err));
            }
        }, 0);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">
                    Log in to your Account
                </h2>

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email address
                        </label>
                        <input
                            type="email" placeholder="Enter Email" onChange={handleInput} name="email"
                            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                        />
                        {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-900">
                            Choose Role
                        </label>
                        <select onChange={handleInput} name="role"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
                            <option value="bla">Select</option>
                            <option value="admin">Admin</option>
                            <option value="normaluser">Normal User</option>
                        </select>
                        {errors.role && <span className="text-sm text-red-500">{errors.role}</span>}
                    </div>

                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <a href="#" className="text-sm font-semibold text-indigo-500 hover:text-indigo-700">
                            Forgot password?
                        </a>
                    </div>
                    <input
                        type="password" placeholder="Enter password" onChange={handleInput} name="password"
                        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                    {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}

                    <button
                        type="submit"
                        className="w-full mt-4 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Log in
                    </button>
                </form>
                <div className="text-center mt-4">
                    <Link to="/register" className="text-blue-500 hover:underline ">Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;