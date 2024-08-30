import React, {FormEvent, useEffect, useState} from "react";
import { Link } from "react-router-dom";
// import './LoginPage.css';

function LoginPage({ setTitle }) {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setTitle('Sign in');
  }, [setTitle]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    // console.log(email, password)
    fetch('http://127.0.0.1:3000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Accept': 'application/json' // Optional: to accept JSON response
      },
      credentials: 'include',
      body: JSON.stringify({
        username, password
      })
    }).then((res) => {
      if (res.ok) {
        // console.log('logged');
        window.location.href = '/arena';
      } else {
        // console.log('Wrong')
        setErrorMsg('UNAUTHORIZED')
      }
    }).catch(() => {
      console.log('error happen')
    })
  };
  return (
    <div className="text-white bg-primary flex justify-center rounded-lg py-5">
      <div className="w-full max-w-md p-8 space-y-6 bg-primary rounded-lg shadow-md">
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
          {errorMsg && (
              <div id="msg__box" className="text-red-500 text-sm">
                {errorMsg}
              </div>
          )}
          <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-primaryLighter rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            First time?{' '}
            <Link to="/signup" className="text-blue-500 hover:text-blue-600">
              Create account
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
