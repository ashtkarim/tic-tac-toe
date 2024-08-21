import HomePage from './scenes/HomePage'
import LoginPage from './scenes/LoginPage'
import RegisterPage from './scenes/RegisterPage'
import { Routes, Route } from 'react-router-dom'
import Arena from './scenes/Arena'
import PrivateRoute from './components/PrivatRoute'


function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
            } />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

          <Route path="/arena" element={
            <PrivateRoute accessible={false}>
              <Arena />
            </PrivateRoute>
            } />
      </Routes>
    </>
  )
}

export default App
