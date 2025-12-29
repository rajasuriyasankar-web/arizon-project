import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts, fetchProductsByCategory } from '../utils/api';
import ProductCard from '../components/ProductCard';

const ProductListingPage = () => {
    const { category } = useParams();

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isBrandOpen, setIsBrandOpen] = useState(true);
    const [columns, setColumns] = useState(4);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isPerPageOpen, setIsPerPageOpen] = useState(false);
    const [sortBy, setSortBy] = useState('Best selling items');
    const [itemsPerPage, setItemsPerPage] = useState(40);

    useEffect(() => {
        loadProducts();
    }, [category]);

    useEffect(() => {
        filterProducts();
    }, [products, selectedCategory]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            let data;
            if (category) {
                data = await fetchProductsByCategory(category);
                setSelectedCategory(category);
            } else {
                data = await fetchProducts();
            }

            setProducts(data);
        } catch (err) {
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const filterProducts = () => {
        let filtered = [...products];

        setFilteredProducts(filtered);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="card animate-pulse">
                            <div className="bg-gray-200 h-64"></div>
                            <div className="p-4 space-y-3">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700">{error}</p>
                    <button
                        onClick={loadProducts}
                        className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <a href="/" className="hover:text-orange">Home</a>
                        <span>/</span>
                        {category ? (
                            <>
                                <span>Categories</span>
                                <span>/</span>
                                <span className="text-navy font-semibold capitalize">{category}</span>
                            </>
                        ) : (
                            <span className="text-navy font-semibold">All Products</span>
                        )}
                    </div>
                </div>
            </div>



            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-64 w-full flex-shrink-0 space-y-8">
                        {/* Can't Find Product CTA */}
                        {category !== undefined && (
                            <div className="bg-[#bda031] p-5 rounded-sm text-white">
                                <h3 className="text-xl font-bold leading-tight font-roboto-slab">
                                    Can't Find The Product You Are Looking For?
                                </h3>
                            </div>
                        )}

                        {/* Brand Filter - Accordion Style */}
                        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-5">
                            <div
                                className="flex items-center justify-between cursor-pointer group mb-4 select-none"
                                onClick={() => setIsBrandOpen(!isBrandOpen)}
                            >
                                <h3 className="font-roboto-slab font-bold text-[14px] text-[#546e7a] tracking-widest uppercase">Brand</h3>
                                <svg
                                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isBrandOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {isBrandOpen && (
                                <div className="space-y-3 mb-6 transition-all duration-300 ease-in-out">
                                    {[
                                        { name: 'Dow Corning', count: 20 },
                                        { name: 'Kluber', count: 1275 },
                                        { name: 'Loctite', count: 131 },
                                        { name: 'Molykote', count: 51 },
                                        { name: 'Shell', count: 501 },
                                        { name: 'SKF', count: 165 },
                                        { name: 'Skydrol', count: 5 }
                                    ].map((brand) => (
                                        <label key={brand.name} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="peer appearance-none w-5 h-5 border border-gray-300 rounded-[4px] checked:bg-[#CA9618] checked:border-[#CA9618] transition-colors bg-white hover:border-[#CA9618]"
                                                />
                                                <svg className="absolute w-3.5 h-3.5 text-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-[14px] font-roboto-slab text-[#333] group-hover:text-[#CA9618] transition-colors">
                                                {brand.name} <span className="text-gray-400 font-normal">({brand.count})</span>
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            <button className="w-full bg-[#CA9618] text-white font-roboto-slab font-bold py-3 rounded-[3px] text-sm tracking-wide hover:bg-[#b08215] transition-colors uppercase shadow-sm">
                                Reset Filters
                            </button>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-1">
                        {/* Top Bar Controls */}
                        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 bg-white py-2 select-none relative z-20">
                            {/* Sort Dropdown */}
                            <div className="relative">
                                <div
                                    className="border border-gray-200 rounded-sm px-4 py-2 bg-white cursor-pointer hover:border-gray-300 transition-colors flex items-center justify-between min-w-[180px]"
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                >
                                    <span className="text-xs font-bold text-[#333] tracking-wide">
                                        {sortBy}
                                    </span>
                                    <svg className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {isSortOpen && (
                                    <div className="absolute top-full left-0 mt-1 w-[200px] bg-white border border-gray-100 rounded-sm shadow-xl py-2 z-30">
                                        <div className="flex justify-end px-2 mb-1">
                                            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[6px] border-b-gray-200"></div>
                                        </div>
                                        <ul className="text-[13px] text-gray-500">
                                            {[
                                                'Featured items', 'Newest items', 'Best selling items',
                                                'A to Z', 'Z to A', 'By review',
                                                'Price: ascending', 'Price: descending', 'Relevance'
                                            ].map((item) => (
                                                <li
                                                    key={item}
                                                    className={`px-4 py-1.5 hover:bg-gray-50 cursor-pointer ${item === sortBy ? 'text-black font-semibold' : ''}`}
                                                    onClick={() => {
                                                        setSortBy(item);
                                                        setIsSortOpen(false);
                                                    }}
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex justify-end px-2 mt-1">
                                            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-gray-200"></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-8">
                                {/* Columns Selector */}
                                <div className="flex items-center gap-3 text-xs font-bold text-[#333]">
                                    <span className="text-gray-600">Columns:</span>
                                    <div className="flex gap-1.5">
                                        {[2, 3, 4, 5].map(num => (
                                            <button
                                                key={num}
                                                onClick={() => setColumns(num)}
                                                className={`w-6 h-6 flex items-center justify-center border text-xs font-bold transition-colors ${num === columns ? 'border-[#bda031] text-[#bda031]' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Products Per Page */}
                                <div className="flex items-center gap-3 text-xs font-bold text-[#333] relative">
                                    <span className="text-gray-600">Products Per Page:</span>
                                    <div
                                        className="border border-gray-200 rounded-sm px-2 py-1 flex items-center gap-2 cursor-pointer hover:border-gray-300 transition-colors min-w-[50px] justify-between relative"
                                        onClick={() => setIsPerPageOpen(!isPerPageOpen)}
                                    >
                                        {itemsPerPage}
                                        <svg className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isPerPageOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>

                                        {isPerPageOpen && (
                                            <div className="absolute top-full right-0 mt-1 w-full bg-white border border-gray-300 shadow-lg z-30 min-w-[60px]">
                                                <ul>
                                                    {[8, 12, 20, 26, 40].map((num) => (
                                                        <li
                                                            key={num}
                                                            className={`px-3 py-1.5 cursor-pointer text-center ${num === itemsPerPage ? 'bg-[#1976D2] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setItemsPerPage(num);
                                                                setIsPerPageOpen(false);
                                                            }}
                                                        >
                                                            {num}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {filteredProducts.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                <p className="text-gray-600 text-lg">No products found</p>
                                <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
                            </div>
                        ) : (
                            <div className={`grid gap-6 ${columns === 5 ? 'grid-cols-2 lg:grid-cols-5' :
                                columns === 4 ? 'grid-cols-2 lg:grid-cols-4' :
                                    columns === 3 ? 'grid-cols-2 lg:grid-cols-3' :
                                        'grid-cols-2'
                                }`}>
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProductListingPage;
