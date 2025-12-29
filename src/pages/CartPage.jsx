import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, getTotalItems } = useCart();

    const incrementQuantity = (productId, currentQuantity) => {
        updateQuantity(productId, currentQuantity + 1);
    };

    const decrementQuantity = (productId, currentQuantity) => {
        if (currentQuantity > 1) {
            updateQuantity(productId, currentQuantity - 1);
        }
    };

    const handleQuantityChange = (productId, value) => {
        const quantity = parseInt(value);
        if (quantity > 0) {
            updateQuantity(productId, quantity);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4 py-12">
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-navy mb-4">Your Cart is Empty</h2>
                        <p className="text-gray-600 mb-6">Add some products to get started!</p>
                        <Link
                            to="/"
                            className="inline-block bg-[#d4a017] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#b8900f] transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 uppercase">
                        <Link to="/" className="hover:text-orange">HOME</Link>
                        <span>/</span>
                        <span className="text-navy font-semibold">YOUR CART</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-navy mb-8">
                    Your Cart ({getTotalItems()} items)
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Table */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Table Header */}
                            <div className="hidden md:grid bg-white border-b border-gray-200 px-4 py-4 grid-cols-12 gap-4 font-bold text-sm uppercase">
                                <div className="col-span-5">Item</div>
                                <div className="col-span-2 text-center">Unit Price</div>
                                <div className="col-span-3 text-center">Quantity</div>
                                <div className="col-span-2 text-right">Total</div>
                            </div>

                            {/* Cart Items */}
                            <div className="divide-y">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="px-4 py-4 flex flex-col md:grid md:grid-cols-12 gap-4 items-center hover:bg-gray-50 border-b md:border-none last:border-none">
                                        {/* Product Info */}
                                        <div className="w-full md:col-span-5 flex gap-4 items-center">
                                            <Link to={`/product/${item.id}`} className="flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-14 h-14 object-contain rounded border border-gray-200 bg-white p-1"
                                                />
                                            </Link>
                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    to={`/product/${item.id}`}
                                                    className="text-sm font-semibold text-navy hover:text-blue-600 line-clamp-2 font-roboto-slab"
                                                >
                                                    {item.title}
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Mobile Price Row */}
                                        <div className="w-full flex md:hidden justify-between items-center text-sm text-gray-600">
                                            <span>Price:</span>
                                            <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
                                        </div>

                                        {/* Unit Price (Desktop) */}
                                        <div className="hidden md:block col-span-2 text-center">
                                            <span className="text-sm font-medium text-gray-900">${item.price.toFixed(2)}</span>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="w-full md:col-span-3 flex justify-between md:justify-center items-center">
                                            <span className="md:hidden text-sm text-gray-600">Quantity:</span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => decrementQuantity(item.id, item.quantity)}
                                                    className="w-7 h-7 bg-[#CA9618] text-white rounded flex items-center justify-center hover:bg-[#b08215] transition-colors text-base font-medium pb-0.5"
                                                >
                                                    −
                                                </button>
                                                <span className="text-base font-medium text-navy w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => incrementQuantity(item.id, item.quantity)}
                                                    className="w-7 h-7 bg-[#CA9618] text-white rounded flex items-center justify-center hover:bg-[#b08215] transition-colors text-base font-medium pb-0.5"
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="w-7 h-7 text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center ml-2"
                                                    title="Remove item"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Mobile Total Row */}
                                        <div className="w-full flex md:hidden justify-between items-center border-t border-gray-100 pt-2 mt-2">
                                            <span className="font-bold text-gray-700">Total:</span>
                                            <span className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>

                                        {/* Total (Desktop) */}
                                        <div className="hidden md:block col-span-2 text-right">
                                            <span className="font-bold text-gray-900 text-sm">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cart Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-700">
                                    <span className="font-semibold">Subtotal:</span>
                                    <span className="font-bold">${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span className="font-semibold">Shipping:</span>
                                    <span className="text-green-600 font-semibold">Free Shipping</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between text-lg">
                                    <span className="font-bold">Grand Total:</span>
                                    <span className="font-bold text-navy">${getCartTotal().toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="w-full bg-[#CA9618] text-white py-3 rounded font-bold text-sm hover:bg-[#b08215] transition-colors mb-4 uppercase tracking-wide">
                                Checkout Now
                            </button>

                            <div className="text-center text-xs text-gray-600 mb-4">
                                <p className="mb-2">qualitybearingsonline.com is secure and your personal details are protected</p>
                            </div>

                            {/* Payment Badges */}
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                                <div className="text-gray-400 text-xs font-semibold">VISA</div>
                                <div className="text-gray-400 text-xs font-semibold">MasterCard</div>
                                <div className="text-gray-400 text-xs font-semibold">AMEX</div>
                                <div className="text-gray-400 text-xs font-semibold">PayPal</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
