
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SimulatedReCAPTCHA from '../../src/components/primeraParte';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SimulatedReCAPTCHA />} />
        <Route path="/recaptcha" element={<SimulatedReCAPTCHA />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
