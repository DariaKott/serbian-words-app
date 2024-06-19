
import './App.css'
import React from 'react';
import './assets/global.scss';
import { Header } from './assets/presentation/components/Header/index';
import { Footer } from './assets/presentation/components/Footer/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './assets/presentation/pages/HomePage/index';
import { TrainingPage } from './assets/presentation/pages/TrainingPage/index';
import { HowToLearnPage } from './assets/presentation/pages/HoToLearnPage/index';

function App() {
  return (
    <Router>
      <div className="app_wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/how-to-learn" element={<HowToLearnPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export { App };
