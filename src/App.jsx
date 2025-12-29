import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

function App() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/category/:category" element={<ProductListingPage />} />
                    <Route path="/brands" element={<ProductListingPage category="brands" />} />
                    <Route path="/ball-bearings" element={<ProductListingPage category="ball-bearings" />} />
                    <Route path="/roller-bearings" element={<ProductListingPage category="roller-bearings" />} />
                    <Route path="/housings" element={<ProductListingPage category="housings" />} />
                    <Route path="/linear" element={<ProductListingPage category="linear" />} />
                    <Route path="/super-precision" element={<ProductListingPage category="super-precision" />} />
                    <Route path="/spherical-plains" element={<ProductListingPage category="spherical-plains" />} />
                    <Route path="/power-transmission" element={<ProductListingPage category="power-transmission" />} />
                    <Route path="/maintenance-tools" element={<ProductListingPage category="maintenance-tools" />} />
                    <Route path="/oil-seals" element={<ProductListingPage category="oil-seals" />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
