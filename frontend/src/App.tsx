import { Route, Routes } from 'react-router-dom';
import Footer from './components/common/Footer';
import Header from './components/common/Header';

import CartPage from './pages/CartPage';
import Catalog from './pages/Catalog';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Register from './pages/Register';

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}