import HomePage from './scenes/HomePage';
import LoginPage from './scenes/LoginPage';
import RegisterPage from './scenes/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import Arena from './scenes/Arena';
import PrivateRoute from './components/PrivatRoute';
import AsideNav from './scenes/AsideNav';
import About from './scenes/about';
import { useState } from 'react';
import Profile from './scenes/profile';

const App = () => {
  const [title, setTitle] = useState('Title');

  return (
    <AsideNav title={title}>
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />

        <Route path="/login" element={<LoginPage setTitle={setTitle} />} />
        <Route path="/register" element={<RegisterPage setTitle={setTitle} />} />
        <Route path="/leaderboard" element={<HomePage setTitle={setTitle} />} />
        <Route path="/play" element={<HomePage setTitle={setTitle} />} />
        <Route path="/about" element={<About setTitle={setTitle} />} />
        <Route path="/profile" element={<Profile setTitle={setTitle} />} />

        <Route path="/arena" element={
          <PrivateRoute accessible={false}>
            <Arena />
          </PrivateRoute>
        } />
      </Routes>
    </AsideNav>
  )
}

export default App;
