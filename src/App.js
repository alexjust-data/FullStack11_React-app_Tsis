import { Routes, Route } from 'react-router-dom';
import Signup from './pages/auth/Signup/Signup';
import LoginPage from './pages/auth/LoginPage/LoginPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Other routes... */}
      </Routes>
    </div>
  );
}

export default App;

