import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const MiniCart = ({ onClose }) => {
    const { cartItems, removeFromCart, getCartTotal, getTotalItems } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="bg-white shadow-2xl rounded-lg w-96 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-xl">Shopping Cart</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className="text-center py-8 text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p>Your cart is empty</p>
                </div>
                <Link
                    to="/"
                    onClick={onClose}
                    className="block w-full text-center bg-navy text-white py-2 rounded hover:bg-navy-light transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-2xl rounded-lg w-96 max-h-[500px] flex flex-col font-sans">

            <div className="p-4 pb-2 border-b border-gray-100">
                <h3 className="font-bold text-base text-gray-900">Shopping Cart</h3>
            </div>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-4 space-y-4 py-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                        {/* Product Image */}
                        <Link to={`/product/${item.id}`} onClick={onClose} className="flex-shrink-0">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-16 object-contain rounded bg-white border border-gray-100"
                            />
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 mb-0.5 capitalize">{item.category}</p>
                            <Link
                                to={`/product/${item.id}`}
                                onClick={onClose}
                                className="text-sm font-semibold text-blue-600 hover:text-blue-800 line-clamp-2 mb-0.5 leading-tight"
                            >
                                {item.title}
                            </Link>
                            <p className="text-[10px] text-gray-400 mb-1">
                                SKU: {item.category.replace(/['\s]/g, '-').toLowerCase()}-{item.id}
                            </p>
                            <div className="text-sm font-normal text-gray-900">
                                {item.quantity} x <span className="font-bold">${item.price.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Delete Button */}
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors self-start"
                            title="Remove item"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            <div className="p-4 pt-3 flex gap-2 border-t border-gray-100 bg-gray-50/50">
                <button
                    onClick={onClose}
                    className="flex-1 bg-[#c9a227] text-white py-3 rounded font-bold hover:bg-[#b8900f] transition-colors uppercase text-sm tracking-wide"
                >
                    Checkout
                </button>
                <Link
                    to="/cart"
                    onClick={onClose}
                    className="flex-1 text-center border border-gray-300 text-gray-700 py-3 rounded font-bold hover:border-gray-400 hover:bg-gray-50 transition-colors uppercase text-sm tracking-wide flex items-center justify-center"
                >
                    View Cart
                </Link>
            </div>
        </div>
    );
};

export default MiniCart;
