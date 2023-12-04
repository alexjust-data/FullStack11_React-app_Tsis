import { Routes, Route } from 'react-router-dom';
import Signup from './pages/auth/Signup/Signup';
import LoginPage from './pages/auth/LoginPage/LoginPage';
import WelcomePage from './pages/auth/WelcomePage/WelcomePage';
import AdvertsPage from './pages/adverts/AdvertsPage';
import RequireAuth from './pages/auth/components/RequireAuth';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/adverts"
          element={
            <RequireAuth>
              <AdvertsPage/>
              {/*<Route path="/" element={<Navigate to="/adverts />} />*/}
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

