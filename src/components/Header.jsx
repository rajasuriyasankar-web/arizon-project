import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { fetchCategories } from '../utils/api';
import MiniCart from './MiniCart';

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const { getTotalItems, isMiniCartOpen, setIsMiniCartOpen } = useCart();
    const megaMenuRef = useRef(null);
    const miniCartRef = useRef(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const data = await fetchCategories();
        setCategories(data);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
                setShowMegaMenu(false);
            }
            if (miniCartRef.current && !miniCartRef.current.contains(event.target)) {
                setIsMiniCartOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsMiniCartOpen]);

    return (
        <>
            {/* Top Utility Bar - Hidden on mobile */}
            <div className="hidden md:block bg-black text-white" style={{ fontSize: '.875rem', fontWeight: 500 }}>
                <div className="container mx-auto px-4 py-2 flex justify-end items-center gap-6">
                    <Link to="/about" className="hover:text-orange transition-colors">About Us</Link>
                    <div className="flex items-center gap-1">
                        <span>Select Currency: CAD</span>
                    </div>
                    <Link to="/contact" className="hover:text-orange transition-colors flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Contact Us</span>
                    </Link>
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>CAN: 438 800 2858</span>
                    </div>
                </div>
            </div>

            {/* Mobile Call Us Bar */}
            <div className="md:hidden bg-[#1a2348] text-white py-2 px-4 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium">Call Us</span>
            </div>

            {/* Main Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
                    {/* Mobile: Hamburger + Logo + Cart */}
                    <div className="flex md:hidden items-center justify-between mb-3">
                        <button className="p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <Link to="/" className="flex-shrink-0">
                            <img
                                src="/assets/logo.png"
                                alt="Quality Bearings Online"
                                className="h-16 w-auto"
                            />
                        </Link>

                        <div className="relative" ref={miniCartRef}>
                            <button
                                onClick={() => setIsMiniCartOpen(!isMiniCartOpen)}
                                className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                            >
                                <div className="relative">
                                    <img src="/assets/icon_cart.png" alt="Cart" className="w-8 h-8 object-contain" />
                                    {getTotalItems() > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-navy text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                            {getTotalItems()}
                                        </span>
                                    )}
                                </div>
                                <span className="text-sm">Cart</span>
                            </button>
                            {isMiniCartOpen && (
                                <div className="absolute right-0 top-full mt-2 z-50">
                                    <MiniCart onClose={() => setIsMiniCartOpen(false)} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Desktop: Logo + Search + Actions */}
                    <div className="hidden md:flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0">
                            <img
                                src="/assets/logo.png"
                                alt="Quality Bearings Online"
                                className="h-24 w-auto"
                            />
                        </Link>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-lg mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by reference"
                                    className="w-full px-4 py-3 border border-gray-500 rounded text-sm focus:outline-none focus:border-navy"
                                />
                                <button
                                    type="button"
                                    className="absolute right-0 top-0 h-full px-5 bg-[#1a2348] text-white rounded-r hover:bg-[#2a3458] transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* User Actions */}
                        <div className="flex items-center gap-6">
                            {/* Sign In / Register */}
                            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                <svg className="w-11 h-11 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <div className="leading-tight text-left" style={{ fontFamily: '"Roboto Mono", "Roboto Mono Fallback"', fontSize: '1rem' }}>
                                    <p className="font-medium" style={{ color: '#1f2937', fontWeight: 500 }}>Sign In</p>
                                    <p style={{ color: '#1f2937', fontWeight: 400 }}>Register</p>
                                </div>
                            </Link>

                            {/* Recently Viewed */}
                            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                <svg className="w-11 h-11" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="20" y="15" width="60" height="70" rx="1" stroke="#6b7280" strokeWidth="5" fill="none"></rect>
                                    <rect x="27" y="25" width="8" height="8" rx="1" fill="#6b7280"></rect>
                                    <rect x="40" y="27" width="30" height="4" fill="#6b7280"></rect>
                                    <rect x="27" y="45" width="8" height="8" rx="1" fill="#6b7280"></rect>
                                    <rect x="40" y="47" width="30" height="4" fill="#6b7280"></rect>
                                    <rect x="27" y="65" width="8" height="8" rx="1" fill="#6b7280"></rect>
                                    <rect x="40" y="67" width="15" height="4" fill="#6b7280"></rect>
                                    <circle cx="80" cy="65" r="12" stroke="#6b7280" strokeWidth="4" fill="#ffffff"></circle>
                                    <line x1="80" y1="65" x2="80" y2="58" stroke="#6b7280" strokeWidth="2"></line>
                                    <line x1="80" y1="65" x2="87" y2="65" stroke="#6b7280" strokeWidth="2"></line>
                                </svg>
                                <div className="leading-tight text-left" style={{ fontFamily: '"Roboto Mono", "Roboto Mono Fallback"', fontSize: '1rem' }}>
                                    <p className="font-medium" style={{ color: '#1f2937', fontWeight: 500 }}>Recently</p>
                                    <p style={{ color: '#1f2937', fontWeight: 400 }}>Viewed</p>
                                </div>
                            </Link>

                            {/* Cart */}
                            <div className="relative" ref={miniCartRef}>
                                <button
                                    onClick={() => setIsMiniCartOpen(!isMiniCartOpen)}
                                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                                >
                                    <div className="relative">
                                        <img src="/assets/icon_cart.png" alt="Cart" className="w-11 h-11 object-contain" />
                                        {getTotalItems() > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-navy text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                                {getTotalItems()}
                                            </span>
                                        )}
                                    </div>
                                    <div className="leading-tight text-left" style={{ fontFamily: '"Roboto Mono", "Roboto Mono Fallback"', fontSize: '1rem' }}>
                                        <p className="font-medium" style={{ color: '#1f2937', fontWeight: 500 }}>Cart</p>
                                    </div>
                                </button>

                                {/* Mini Cart Dropdown */}
                                {isMiniCartOpen && (
                                    <div className="absolute right-0 top-full mt-2 animate-slide-down">
                                        <MiniCart onClose={() => setIsMiniCartOpen(false)} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    <div className="md:hidden">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by reference"
                                className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-navy"
                            />
                            <button
                                type="button"
                                className="absolute right-0 top-0 h-full px-4 bg-[#1a2348] text-white rounded-r"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Bar - Hidden on mobile */}
            <nav className="hidden md:block text-white" style={{ backgroundColor: '#1a2348' }}>
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-8 py-2.5" style={{ fontSize: '1rem' }}>
                        {/* Categories Mega Menu */}
                        <div className="relative" ref={megaMenuRef}>
                            <button
                                onMouseEnter={() => setShowMegaMenu(true)}
                                className="flex items-center gap-1 hover:text-orange transition-colors"
                                style={{ fontWeight: 700 }}
                            >
                                <span>Adhesives & Lubricants</span>
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {/* Mega Menu Dropdown */}
                            {showMegaMenu && (
                                <div
                                    onMouseLeave={() => setShowMegaMenu(false)}
                                    className="absolute left-0 top-full mt-0 bg-white text-gray-800 shadow-xl rounded-b-lg w-64 animate-slide-down"
                                >
                                    <div className="p-4">
                                        <h3 className="font-bold text-navy mb-3">Shop by Category</h3>
                                        <ul className="space-y-2">
                                            {categories.map((category) => (
                                                <li key={category}>
                                                    <Link
                                                        to={`/category/${category}`}
                                                        onClick={() => setShowMegaMenu(false)}
                                                        className="block px-3 py-2 rounded hover:bg-orange hover:text-white transition-colors capitalize"
                                                    >
                                                        {category}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Other Nav Links */}
                        <Link to="/brands" className="hover:text-orange transition-colors" style={{ fontWeight: 700 }}>Brands</Link>
                        <Link to="/ball-bearings" className="hover:text-orange transition-colors" style={{ fontWeight: 700 }}>Ball Bearings</Link>
                        <Link to="/roller-bearings" className="hover:text-orange transition-colors" style={{ fontWeight: 700 }}>Roller Bearings</Link>
                        <Link to="/housings" className="hover:text-orange transition-colors" style={{ fontWeight: 700 }}>Housings and Inserts</Link>
                        <Link to="/linear" className="hover:text-orange transition-colors" style={{ fontWeight: 700 }}>Linear</Link>
                        <Link to="/super-precision" className="hover:text-orange transition-colors" style={{ fontWeight: 700 }}>Super Precision</Link>
                        <Link to="/spherical-plains" className="hover:text-orange transition-colors" style={{ fontWeight: 700 }}>Spherical Plains</Link>
                        <Link to="/power-transmission" className="hover:text-orange transition-colors" style={{ fontWeight: 700 }}>Power Transmission</Link>
                        <Link to="/maintenance-tools" className="hover:text-orange transition-colors" style={{ fontWeight: 700 }}>Maintenance Tools</Link>
                        <Link to="/oil-seals" className="hover:text-orange transition-colors" style={{ fontWeight: 700 }}>Oil Seals</Link>
                    </div>
                </div>
            </nav>

            {/* Trust Badges - Hidden on mobile */}
            <div className="hidden md:block bg-gray-100 border-t-4 border-yellow-500 border-b border-gray-200">
                <div className="container mx-auto px-6 py-1">
                    <div className="flex items-center justify-between text-xs text-black">
                        {/* Free Delivery */}
                        <div className="flex items-center gap-3">
                            <img src="/assets/icon_handshake.png" alt="Free Delivery" className="w-8 h-8 object-contain" />
                            <div className="flex flex-col leading-tight">
                                <span className="font-bold text-sm">Free Delivery</span>
                                <span className="font-semibold text-gray-800">Over $500.00</span>
                            </div>
                        </div>

                        {/* DHL Delivery */}
                        <div className="flex items-center gap-3">
                            <img src="/assets/icon_delivery.png" alt="DHL Delivery" className="w-8 h-8 object-contain" />
                            <div className="flex flex-col leading-tight">
                                <span className="font-bold text-sm">1-3 Day DHL & UPS</span>
                                <span className="font-semibold text-gray-800">Delivery</span>
                            </div>
                        </div>

                        {/* Queen's Award */}
                        <div className="flex items-center gap-3">
                            <img src="/assets/icon_award.png" alt="Queen's Award" className="w-8 h-8 object-contain" />
                            <div className="flex flex-col leading-tight">
                                <span className="font-bold text-sm">Queen's Award For</span>
                                <span className="font-semibold text-gray-800">Enterprise Winners</span>
                            </div>
                        </div>

                        {/* ISO */}
                        <div className="flex items-center gap-3">
                            <img src="/assets/icon_iso.png" alt="ISO Certification" className="w-8 h-8 object-contain" />
                            <div className="flex flex-col leading-tight">
                                <span className="font-bold text-sm">ISO 9001 : 2015</span>
                                <span className="font-semibold text-gray-800">Cert. No.291342018</span>
                            </div>
                        </div>

                        {/* Feefo */}
                        <div className="flex items-center">
                            <div className="bg-yellow-400 px-3 py-1.5 rounded flex items-center gap-2">
                                <span className="font-bold text-black text-lg italic">feefo</span>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <svg key={i} className="w-3 h-3 text-black fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <div className="text-[10px] leading-tight flex flex-col items-start ml-1">
                                    <span className="font-bold">Service Rating</span>
                                    <span>124 reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
