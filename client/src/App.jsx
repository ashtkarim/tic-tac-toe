import HomePage from './scenes/HomePage';
import LoginPage from './scenes/LoginPage';
import RegisterPage from './scenes/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import Arena from './scenes/Arena';
import PrivateRoute from './components/PrivatRoute';
import AsideNav from './scenes/AsideNav';
import { useState } from 'react';
import Profile from './scenes/profile';
import Leaderboard from "./components/leaderboard.jsx";
import LeaderboardPage from "./scenes/LeaderboardPage.jsx";
import Robot from './scenes/Robot.jsx';
import RandomGame from './scenes/RandomGame.jsx';

const App = () => {
  const [title, setTitle] = useState('Welcome to the Tic-Tac-Toe Game');

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
        <Route path="/leaderboard" element={<LeaderboardPage setTitle={setTitle} />} />
        <Route path="/play" element={<HomePage setTitle={setTitle} />} />
        {/*<Route path="/about" element={<About setTitle={setTitle} />} />*/}
        <Route path="/profile" element={<Profile setTitle={setTitle} />} />
        <Route path="/robot" element={<Robot setTitle={setTitle} />} />
        <Route path="/random" element={<RandomGame setTitle={setTitle} />} />

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
