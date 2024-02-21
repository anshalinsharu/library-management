
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Validation from "./RegisterValidation"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./App.css";
// import logo from "./assets/logo.png";


function Register() {
    const [values, setValues] = useState({
        name: '',
        email:'',
        password: '',
        role: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        
        if (errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8080/register', values)
                .then(res => {
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
    }, [errors]);

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">
            Register your Account
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
                <input
                    type="text" placeholder="Enter name" name="name" onChange={handleInput}
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
                {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email Address</label>
                <input
                    type="email" placeholder="Enter email" name="email" onChange={handleInput}
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
                {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
            </div>

            <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-900">Choose Role</label>
                <select onChange={handleInput} name="role"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
                    <option value="bla">Select</option>
                    <option value="admin">Admin</option>
                    <option value="normaluser">Normal User</option>
                </select>
                {errors.role && <span className="text-sm text-red-500">{errors.role}</span>}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                <input
                    type="password" placeholder="Enter password" name="password" onChange={handleInput}
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
                {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full mt-4 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    Register
                </button>
            </div>
        </form>
        <div className="text-center mt-2">
            <Link to="/" className="text-blue-500 hover:underline">Log In</Link>
        </div>
    </div>
</div>

    );
}

export default Register;