const API_BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products from the API
 */
export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

/**
 * Fetch a single product by ID
 */
export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        return await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

/**
 * Fetch all categories
 */
export const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

/**
 * Fetch products by category
 */
export const fetchProductsByCategory = async (category) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
        if (!response.ok) throw new Error('Failed to fetch products by category');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
};
