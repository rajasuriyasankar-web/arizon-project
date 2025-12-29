import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleBuyNow = (e) => {
        e.preventDefault();
        addToCart(product, 1);
    };

    return (
        <div className="card relative group">
            <Link to={`/product/${product.id}`} className="block relative h-full flex flex-col bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300">

                <div className="relative p-6 h-[180px] flex items-center justify-center bg-white">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain"
                    />

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 px-6 z-10">
                        {/* Quick View Button */}
                        <div className="w-full">
                            <button
                                className="w-full bg-[#CA9618] text-white py-2.5 rounded-[2px] font-bold uppercase text-[12px] hover:bg-[#b08215] flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                QUICK VIEW
                            </button>
                        </div>

                        {/* Buy Now & Compare Buttons */}
                        <div className="w-full flex gap-2">
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 bg-[#CA9618] text-white py-2.5 rounded-[2px] font-bold uppercase text-[12px] hover:bg-[#b08215]"
                            >
                                BUY NOW
                            </button>
                            <button
                                className="w-10 bg-[#CA9618] text-white rounded-[2px] flex items-center justify-center hover:bg-[#b08215]"
                                title="Compare"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-3 text-center flex-1 flex flex-col items-center justify-start">
                    <h3 className="text-[13px] font-bold text-[#1a2348] leading-tight line-clamp-3 mb-1 font-roboto-slab transition-colors">
                        {product.title}
                    </h3>
                    <p className="text-[12px] text-gray-500 mb-1 font-medium">Shell</p>
                    <div className="text-[15px] font-bold text-[#1a2348]">
                        ${product.price.toFixed(2)}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
