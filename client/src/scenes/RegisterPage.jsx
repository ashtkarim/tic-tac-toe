import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage({ setTitle }) {
  setTitle('Sign up');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match !!!')
      return;
    }
    setErrorMsg('');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    fetch('http://127.0.0.1:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json' // Optional: to accept JSON response
      },
      body: JSON.stringify({
        username, email, password
      })
    })
  };

  return (
    <div className="text-white bg-primary flex justify-center rounded-lg py-5">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium">Username</label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-secondary bg-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-secondary bg-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-secondary bg-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            className="w-full px-4 py-2 text-white bg-primaryLighter rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 "
          >
            Register
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Login here
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
