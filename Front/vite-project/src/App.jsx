import { Cars } from './composants/Cars/Car.jsx';
import { Inscription } from './composants/Inscription/Inscription.jsx';
import { Connexion } from './composants/Connexion/Connexion.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export function App() {
  return (
    <Router>
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/voitures" element={<Cars />} />
        </Routes>
    </Router>
  )
}