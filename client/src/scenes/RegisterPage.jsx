import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage({ setTitle }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    setTitle('Sign up');
  }, [setTitle]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match !!!');
      return;
    }

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    fetch('http://127.0.0.1:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
        .then(response => {if (response.ok) {
          // Registration successful, redirect to login page
          navigate('/signin');
        } else {
          throw new Error('Registration failed');
        }})
        .then(data => console.log('Registration result:', data))
        .catch(error => {
          console.error('Registration failed:', error);
          setErrorMsg('Failed to register. Please try again.');
        });
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
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-secondary bg-primaryLight rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
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
              <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
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
              <Link to="/signin" className="text-blue-500 hover:text-blue-600">
                Login here
              </Link>.
            </p>
          </div>
        </div>
      </div>
  );
}

export default RegisterPage;
