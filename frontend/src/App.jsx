// App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminHomePage from './pages/AdminHomePage';
import AdminRegister from './pages/AdminRegister';
import ManagePurchases from './components/ManagePurchases';
import ManageCrew from './components/ManageCrew';
import PurchaseDetails from './components/PurchaseDetails';
import Auth from './components/Auth';
import logoName from './assets/logoName.svg';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <Auth>
            <AdminHomePage />
          </Auth>
        }
      />
      <Route
        path="/admin/register"
        element={
          <Auth>
            <AdminRegister />
          </Auth>
        }
      />
      <Route
        path="/admin/purchases"
        element={
          <Auth>
            <ManagePurchases />
          </Auth>
        }
      />
      <Route
        path="/admin/purchases/:id"
        element={
          <Auth>
            <PurchaseDetails />
          </Auth>
        }
      />
      <Route
        path="/admin/crew"
        element={
          <Auth>
            <ManageCrew />
          </Auth>
        }
      />
    </Routes>
  );
}

function Home() {
  return (
    <>
      <div>
        <div className='flex-center'>
          <a>
            <img src={logoName} className="logo" alt="Remind logo" />
          </a>
        </div>
      </div>
      <div className="card">
        <Link to="/login">
          <button className="btn-buynow-popular">
            Adm Login
          </button>
        </Link>
      </div>
      <p className="read-the-docs">
        Área dedicada a Administradores do Sistema.
      </p>
    </>
  );
}

export default App;
