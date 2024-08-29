import HomePage from './scenes/HomePage';
import LoginPage from './scenes/LoginPage';
import RegisterPage from './scenes/RegisterPage';
import Arena from './scenes/Arena';
import PrivateRoute from './components/PrivatRoute.jsx';  // Make sure the file name is correct: "PrivateRoute"
import AsideNav from './scenes/AsideNav';
import About from './scenes/About';
import Profile from './scenes/Profile';
import LeaderboardPage from './scenes/LeaderboardPage';
import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

const App = () => {
  const [title, setTitle] = useState('Title');
  const location = useLocation();  // To get the current location
  const noAsideNavRoutes = [];

  const isNoAsideNavRoute = noAsideNavRoutes.includes(location.pathname);

  return (
      <>
        {!isNoAsideNavRoute && <AsideNav title={title}>  {/* Only render AsideNav for routes that are not in noAsideNavRoutes */}
          <Routes>
            <Route path="/" element={<HomePage setTitle={setTitle} />} />
            <Route path="/login" element={<LoginPage setTitle={setTitle} />}/>
            <Route path="/register" element={<RegisterPage setTitle={setTitle} />}/>
            <Route path="/leaderboard" element={<LeaderboardPage setTitle={setTitle} />} />
            <Route path="/profile" element={
              <PrivateRoute accessible={false}>
                <Profile setTitle={setTitle} />
              </PrivateRoute>

            }/>
            <Route path="/about" element={<About setTitle={setTitle} />} />
            <Route path="/arena" element={
              <PrivateRoute accessible={false}>
                <Arena setTitle={setTitle} />
              </PrivateRoute>
            } />
          </Routes>
        </AsideNav>}

        {/* Render these routes without the AsideNav */}
        {isNoAsideNavRoute && (
            <Routes>
              <Route path="/login" element={<LoginPage setTitle={setTitle} />} />
              <Route path="/register" element={<RegisterPage setTitle={setTitle} />} />
            </Routes>
        )}
      </>
  );
}

export default App;
