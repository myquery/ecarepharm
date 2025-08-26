import { useState, useEffect } from 'react';
import { searchProducts } from '../lib/shopify';

export default function ProductSearch() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const results = await searchProducts(searchQuery);
      setProducts(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query) handleSearch(query);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search medications, health products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && <div className="text-center">Searching...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            {product.images.edges[0] && (
              <img
                src={product.images.edges[0].node.url}
                alt={product.images.edges[0].node.altText || product.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-green-600">
                ${product.priceRange.minVariantPrice.amount}
              </span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}