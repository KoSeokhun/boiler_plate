import './App.css';
import React, { Suspense } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
import MovieDetail from './components/views/MovieDetail/MovieDetail';
import FavoritePage from './components/views/FavoritePage/FavoritePage';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Router>
        <NavBar />
        <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80vh)' }}>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/movie/:movieId" element={<MovieDetail />} />
            <Route exact path="/favorite" element={<FavoritePage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </Suspense >
  );
}

export default App;