import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
// import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    // console.log(email, password)
    fetch('http://127.0.0.1:3000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' // Optional: to accept JSON response
      },
      credentials: 'include',
      body: JSON.stringify({
          email, password
      })
    }).then((res) => {
      if (res.ok) {
        console.log('logged')
      } else {
        console.log('Wrong')
        setErrorMsg('UNAUTHORIZED')
      }
    }).catch(() => {
      console.log('error happend')
    })
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMsg && (
            <div id="msg__box" className="text-red-500 text-sm">
              {errorMsg}
            </div>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-600">
              Register here
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
