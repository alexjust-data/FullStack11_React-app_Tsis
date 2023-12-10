import { Routes, Route } from 'react-router-dom';
import Signup from './pages/auth/Signup/Signup';
import LoginPage from './pages/auth/LoginPage/LoginPage';
import WelcomePage from './pages/auth/WelcomePage/WelcomePage';
import AdvertsPage from './pages/adverts/AdvertsPage';
import AdvertPage from './pages/adverts/AdvertPage';
import NewAdvertPage from './pages/adverts/NewAdvertPage';
import Layout from './components/layout/Layout';
import RequireAuth from './pages/auth/components/RequireAuth';
import NotFoundPage from './pages/adverts/NotFoundPage';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adverts" element={<Layout />}>
          <Route index
            element={
              <RequireAuth>
                <AdvertsPage/>
              </RequireAuth>
            }
          />
          <Route
            path=":id"
            element={
              <RequireAuth>
                <AdvertPage/>
              </RequireAuth>
            }
          />
          <Route
            path="new"
            element={
              <RequireAuth>
                <NewAdvertPage/>
              </RequireAuth>
            }
          />
        </Route>
        {/* Ruta de NotFoundPage */}
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes>
    </div>
  );
}

export default App;

