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
import LeaderboardPage from "./scenes/LeaderboardPage.jsx";
import Robot from './scenes/Robot.jsx';

const App = () => {
  const [title, setTitle] = useState('Welcome to the Tic-Tac-Toe Game');

  const noAsideNavRoutes = ['/login', '/register'];
  return (
    <>
      <AsideNav title={title}>
        <Routes>
          <Route path="/" element={<HomePage setTitle={setTitle} />} />
          <Route path="/signin" element={<LoginPage setTitle={setTitle} />} />
          <Route path="/signup" element={<RegisterPage setTitle={setTitle} />} />
          <Route path="/robot" element={<Robot setTitle={setTitle} />} />
          <Route path="/leaderboard" element={<LeaderboardPage setTitle={setTitle} />} />
          <Route path="/profile" element={
            <PrivateRoute accessible={false}>
              <Profile setTitle={setTitle}/>
            </PrivateRoute>
          } />
          <Route path="/about" element={<About setTitle={setTitle} />} />
          <Route path="/arena" element={
            <PrivateRoute accessible={false}>
              <Arena setTitle={setTitle} />
            </PrivateRoute>
          } />
        </Routes>
      </AsideNav>
    </>

  )
}

export default App;
