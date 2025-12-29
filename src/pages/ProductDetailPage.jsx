import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../utils/api';
import { useCart } from '../hooks/useCart';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [addedToCart, setAddedToCart] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (err) {
                setError('Failed to load product. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        }
    };

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="animate-pulse flex gap-8">
                    <div className="flex-1 bg-gray-200 h-96 rounded"></div>
                    <div className="flex-1 space-y-4">
                        <div className="h-8 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-12 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-32 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-700">{error || 'Product not found'}</p>
                    <Link to="/" className="mt-4 inline-block bg-navy text-white px-6 py-2 rounded hover:bg-navy-light">
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-[11px] text-[#999] font-medium tracking-wide uppercase">
                        <Link to="/" className="hover:text-[#CA9618]">HOME</Link>
                        <span>/</span>
                        <Link to={`/category/${product.category}`} className="hover:text-[#CA9618]">ADHESIVES & LUBRICANTS</Link>
                        <span>/</span>
                        <span className="hover:text-[#CA9618] cursor-pointer">SHELL LUBRICANTS</span>
                        <span>/</span>
                        <span className="hover:text-[#CA9618] cursor-pointer">GADUS</span>
                        <span>/</span>
                        <span className="text-[#999]">{product.title}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Product Main Section */}
                <div className="bg-white rounded-sm border border-gray-200 p-8 mb-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Product Image */}
                        <div className="flex items-center justify-center p-8">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="max-h-[500px] w-auto object-contain"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="pt-2">
                            {/* Brand Name */}
                            <div className="text-[11px] text-[#999] font-bold tracking-widest uppercase mb-2">SHELL</div>

                            {/* Product Title */}
                            <h1 className="text-[28px] font-bold text-[#333] font-roboto-slab leading-tight mb-2">{product.title}</h1>

                            {/* SKU & Availability */}
                            <div className="space-y-1 mb-3">
                                <div className="text-[14px] text-[#333] font-bold">
                                    SKU: <span className="font-normal text-[#666]">gadus-s2-v100-2-400g-shell</span>
                                </div>
                                <div className="text-[14px] text-[#333] font-bold flex items-center gap-2">
                                    AVAILABILITY: <span className="font-normal text-[#666]">IN STOCK</span>
                                    <span className="bg-[#2ecc71] text-white text-[10px] px-1 py-0.5 rounded-[1px]">✓</span>
                                </div>
                            </div>

                            {/* Bulk Pricing Link */}
                            <div className="mb-4">
                                <span className="text-[14px] font-bold text-[#333]">BULK PRICING: </span>
                                <a href="#" className="text-[14px] text-[#0066c0] underline hover:text-[#CA9618]">Click Here to Enquire</a>
                            </div>

                            {/* Price */}
                            <div className="text-[32px] font-bold text-[#1a2348] font-roboto-slab mb-4">
                                ${product.price.toFixed(2)}
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-4">
                                <div className="flex items-center border border-gray-300 rounded-[2px] w-fit">
                                    <button
                                        onClick={decrementQuantity}
                                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#CA9618] hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-xl">-</span>
                                    </button>
                                    <input
                                        type="text"
                                        value={quantity}
                                        readOnly
                                        className="w-12 h-10 text-center text-gray-700 text-sm focus:outline-none bg-white border-x border-gray-100"
                                    />
                                    <button
                                        onClick={incrementQuantity}
                                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#CA9618] hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-xl">+</span>
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart / Buy Now Button */}
                            <button
                                onClick={handleAddToCart}
                                className="bg-[#CA9618] text-white min-w-[200px] py-3 rounded-[3px] font-bold text-[14px] uppercase tracking-wide hover:bg-[#b08215] transition-colors mb-6 shadow-sm"
                            >
                                {addedToCart ? 'ADDED TO CART!' : 'BUY NOW'}
                            </button>

                            {/* Feefo Rating Placeholder */}
                            <div className="mb-4">
                                <img src="/assets/feefo-rating.png" alt="Feefo Product Rating - 6 reviews" className="h-8" />
                            </div>

                            {/* Payment Icons */}
                            <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all">
                                {/* Using text placeholders or generic SVGs for standard payment icons if specific assets aren't available, or simple divs representing them */}
                                <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                                <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold">MC</div>
                                <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold">AMEX</div>
                                <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold">PAYPAL</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section - Kept for content but styled simpler */}
                <div className="bg-white rounded-sm border border-gray-200 mb-8">
                    {/* Tab Headers */}
                    <div className="flex border-b border-gray-300 bg-[#f5f5f5]">
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`py-3 px-6 font-bold text-[14px] tracking-wide transition-colors ${activeTab === 'description'
                                ? 'bg-white text-black border-b-2 border-b-white relative -mb-[2px]'
                                : 'bg-[#f5f5f5] text-[#666] hover:bg-[#e8e8e8]'
                                }`}
                        >
                            Description
                        </button>
                        <button
                            onClick={() => setActiveTab('technical')}
                            className={`py-3 px-6 font-bold text-[14px] tracking-wide transition-colors ${activeTab === 'technical'
                                ? 'bg-white text-black border-b-2 border-b-white relative -mb-[2px]'
                                : 'bg-[#f5f5f5] text-[#666] hover:bg-[#e8e8e8]'
                                }`}
                        >
                            Technical Data
                        </button>
                        <button
                            onClick={() => setActiveTab('bulk')}
                            className={`py-3 px-6 font-bold text-[14px] tracking-wide transition-colors ${activeTab === 'bulk'
                                ? 'bg-white text-black border-b-2 border-b-white relative -mb-[2px]'
                                : 'bg-[#f5f5f5] text-[#666] hover:bg-[#e8e8e8]'
                                }`}
                        >
                            Bulk Pricing
                        </button>
                        <button
                            onClick={() => setActiveTab('delivery')}
                            className={`py-3 px-6 font-bold text-[14px] tracking-wide transition-colors ${activeTab === 'delivery'
                                ? 'bg-white text-black border-b-2 border-b-white relative -mb-[2px]'
                                : 'bg-[#f5f5f5] text-[#666] hover:bg-[#e8e8e8]'
                                }`}
                        >
                            Delivery Information
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`py-3 px-6 font-bold text-[14px] tracking-wide transition-colors ${activeTab === 'reviews'
                                ? 'bg-white text-black border-b-2 border-b-white relative -mb-[2px]'
                                : 'bg-[#f5f5f5] text-[#666] hover:bg-[#e8e8e8]'
                                }`}
                        >
                            Reviews
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-8 bg-white">
                        {activeTab === 'description' && (
                            <div>
                                <h2 className="text-[24px] font-bold mb-6 text-black border-b-2 border-b-[#CA9618] pb-3">Description</h2>

                                <p className="text-base text-gray-700 leading-relaxed mb-6">
                                    At Quality Bearings Online, we are committed to providing the finest lubrication solutions for industrial machinery. Shell Gadus S2 V100 2 is a premium high performance multipurpose grease which is designed to deliver exceptional protection and longevity for your equipment. This grease is based on a lithium hydroxystearate soap thickener and fortified with antioxidant, anti-wear and anti-rust additives. Also available in 18kg, 50kg and 180kg drum.
                                </p>

                                <h3 className="text-[18px] font-bold mb-4 text-black">Key Features</h3>

                                <div className="space-y-5">
                                    <div>
                                        <h4 className="text-[15px] font-bold mb-2 text-black">Advanced Lubrication Technology</h4>
                                        <p className="text-base text-gray-700 leading-relaxed">
                                            Shell Gadus S2 V100 2 is formulated with advanced additives and premium base oils, engineered to provide outstanding lubrication performance. This multipurpose grease guarantees exceptional results even under extreme conditions. The ideal choice for demanding industrial workplaces.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-[15px] font-bold mb-2 text-black">Exceptional Wear Protection</h4>
                                        <p className="text-base text-gray-700 leading-relaxed">
                                            The Shell Gadus S2 V100 2 400g is a trusted product by professionals worldwide, offering superior wear protection to prolong the lifespan of your bearings whilst reducing maintenance costs for your machinery.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-[15px] font-bold mb-2 text-black">Vibration Resistance</h4>
                                        <p className="text-base text-gray-700 leading-relaxed">
                                            With excellent vibration resistance properties, Shell Gadus S2 V100 2 provides reliable lubrication even in applications where vibrations occur. Additionally, the Gadus S2 V100 2 gives no leakage even in repeated shock-loaded bearings.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-[15px] font-bold mb-2 text-black">High Temperature Performance</h4>
                                        <p className="text-base text-gray-700 leading-relaxed">
                                            Designed to withstand high temperatures, this grease maintains its performance characteristics even in extreme heat, ensuring consistent lubrication and protection for your equipment.
                                        </p>
                                    </div>
                                </div>

                                {/* Product Information Section */}
                                <div className="mt-8">
                                    <h3 className="text-[24px] font-bold mb-6 text-black border-b-2 border-b-[#CA9618] pb-3">Product Information</h3>

                                    <div className="space-y-4">
                                        {/* Brand */}
                                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                            <span className="text-sm font-bold text-black uppercase">BRAND:</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-700">SHELL</span>
                                                {/* Shell Logo Placeholder - you can replace with actual logo */}
                                                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">S</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* SKU */}
                                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                            <span className="text-sm font-bold text-black uppercase">SKU:</span>
                                            <span className="text-sm text-gray-700">GADUS-S2-V100-2-400G-SHELL</span>
                                        </div>

                                        {/* Availability */}
                                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                            <span className="text-sm font-bold text-black uppercase">AVAILABILITY:</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-700">IN STOCK</span>
                                                <span className="bg-[#2ecc71] text-white text-xs px-1.5 py-0.5 rounded-sm">✓</span>
                                            </div>
                                        </div>

                                        {/* Weight */}
                                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                            <span className="text-sm font-bold text-black uppercase">WEIGHT:</span>
                                            <span className="text-sm text-gray-700">0.4 KG</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'technical' && (
                            <div>
                                <h2 className="text-[20px] font-bold mb-6 text-[#333] border-b border-gray-200 pb-3">Technical Data</h2>
                                <table className="w-full text-[13px]">
                                    <tbody>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-3 font-bold w-1/3 text-[#333]">Category</td>
                                            <td className="py-3 capitalize text-gray-700">{product.category}</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-3 font-bold text-[#333]">SKU</td>
                                            <td className="py-3 text-gray-700">gadus-s2-v100-2-400g-shell</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-3 font-bold text-[#333]">NLGI Grade</td>
                                            <td className="py-3 text-gray-700">2</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-3 font-bold text-[#333]">Thickener Type</td>
                                            <td className="py-3 text-gray-700">Lithium Hydroxystearate</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-3 font-bold text-[#333]">Base Oil</td>
                                            <td className="py-3 text-gray-700">Mineral</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'bulk' && (
                            <div>
                                <h2 className="text-[20px] font-bold mb-6 text-[#333] border-b border-gray-200 pb-3">Bulk Pricing</h2>
                                <p className="text-base text-gray-700 leading-relaxed mb-4">
                                    We offer competitive bulk pricing for large orders. Please contact our sales team for a customized quote based on your requirements.
                                </p>
                                <a href="#" className="inline-block bg-[#CA9618] text-white px-6 py-3 rounded-[3px] font-bold text-[13px] uppercase tracking-wide hover:bg-[#b08215] transition-colors">
                                    Request Bulk Quote
                                </a>
                            </div>
                        )}

                        {activeTab === 'delivery' && (
                            <div>
                                <h2 className="text-[20px] font-bold mb-6 text-[#333] border-b border-gray-200 pb-3">Delivery Information</h2>
                                <div className="space-y-4 text-base text-gray-700">
                                    <p><strong className="text-[#333]">Standard Delivery:</strong> 3-5 business days</p>
                                    <p><strong className="text-[#333]">Express Delivery:</strong> 1-2 business days (additional charges apply)</p>
                                    <p><strong className="text-[#333]">Free Shipping:</strong> On orders over $100</p>
                                    <p className="leading-relaxed">
                                        All orders are carefully packaged to ensure safe delivery. You will receive a tracking number once your order has been dispatched.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div>
                                <h2 className="text-[20px] font-bold mb-6 text-[#333] border-b border-gray-200 pb-3">Customer Reviews</h2>
                                <div className="text-center py-12 text-gray-500 text-[13px]">
                                    <p>No reviews yet. Be the first to review this product!</p>
                                    <button className="mt-4 bg-[#CA9618] text-white px-6 py-2 rounded-[3px] font-bold text-[13px] uppercase tracking-wide hover:bg-[#b08215] transition-colors">
                                        Write a Review
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
