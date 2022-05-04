import React, { Suspense } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";

import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import MovieDetail from './views/MovieDetail/MovieDetail';
import FavoritePage from './views/FavoritePage/FavoritePage';

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