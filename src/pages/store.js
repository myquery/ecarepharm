import { useState, useEffect } from 'react';
import Head from 'next/head';
import { dummyProducts, categories } from '../data/dummyProducts';
import { formatCurrency, convertPrice } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Store() {
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    let filtered = dummyProducts;
    if (selectedCategory !== 'All Products') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <Head>
        <title>Store - eCare Pharmacy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', backgroundColor: '#f1f5f9'}}>
        <Header />

        {/* Breadcrumb */}
        <div style={{backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '1rem 0'}}>
          <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b'}}>
              <a href="/" style={{color: '#64748b', textDecoration: 'none'}}>Home</a>
              <span>/</span>
              <span style={{color: '#1e293b', fontWeight: '500'}}>Store</span>
            </div>
          </div>
        </div>

        {/* Store Header */}
        <section style={{backgroundColor: 'white', padding: '2rem 1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
          <div style={{maxWidth: '1200px', margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
              <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 0.5rem 0'}}>
                Our Store
              </h1>
              <p style={{color: '#64748b', fontSize: '1.125rem', margin: 0}}>Browse our complete collection of healthcare products</p>
            </div>

            {/* Search and Filter */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center'}}>
              <div style={{position: 'relative', width: '100%', maxWidth: '500px'}}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '50px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 4px 12px rgba(59,130,246,0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                />
                <svg style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b'}} width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem'}}>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '25px',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      border: selectedCategory === category ? 'none' : '2px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      backgroundColor: selectedCategory === category ? '#3b82f6' : 'white',
                      color: selectedCategory === category ? 'white' : '#475569',
                      boxShadow: selectedCategory === category ? '0 4px 12px rgba(59,130,246,0.3)' : '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section style={{padding: '3rem 1.5rem'}}>
          <div style={{maxWidth: '1300px', margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <h2 style={{fontSize: '2rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 0.5rem 0'}}>
                {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory}
              </h2>
              <p style={{color: '#64748b', fontSize: '1.125rem', margin: 0}}>{filteredProducts.length} products found</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px'
            }}>
              {filteredProducts.map((product) => (
                <div key={product.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  position: 'relative'
                }}
                onClick={() => window.location.href = `/products/${product.handle}`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.2)';
                  const overlayActions = e.currentTarget.querySelector('.overlay-actions');
                  if (overlayActions) {
                    overlayActions.style.opacity = '1';
                    overlayActions.style.transform = 'translateX(0)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.5)';
                  const overlayActions = e.currentTarget.querySelector('.overlay-actions');
                  if (overlayActions) {
                    overlayActions.style.opacity = '0';
                    overlayActions.style.transform = 'translateX(10px)';
                  }
                }}>
                  
                  <div style={{position: 'relative', overflow: 'hidden', height: '240px'}}>
                    <img
                      src={product.images.edges[0]?.node.url}
                      alt={product.title}
                      style={{
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        transition: 'transform 0.6s ease'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      color: '#3b82f6',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      padding: '6px 12px',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(59,130,246,0.1)'
                    }}>
                      {product.category}
                    </div>
                    
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      opacity: 0,
                      transform: 'translateX(10px)',
                      transition: 'all 0.3s ease'
                    }} className="overlay-actions">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isInWishlist(product.id)) {
                            removeFromWishlist(product.id);
                          } else {
                            addToWishlist(product);
                          }
                        }}
                        style={{
                          backgroundColor: isInWishlist(product.id) ? '#ef4444' : 'rgba(255,255,255,0.95)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          color: isInWishlist(product.id) ? 'white' : '#64748b'
                        }}
                      >
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div style={{padding: '24px'}}>
                    <div style={{marginBottom: '16px'}}>
                      <h3 style={{
                        fontSize: '1.125rem', 
                        fontWeight: '700', 
                        color: '#0f172a', 
                        margin: '0 0 8px 0', 
                        lineHeight: '1.4'
                      }}>
                        {product.title}
                      </h3>
                      <p style={{
                        color: '#64748b', 
                        fontSize: '0.875rem', 
                        margin: 0, 
                        lineHeight: '1.5', 
                        height: '42px', 
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {product.description}
                      </p>
                    </div>
                    
                    <div style={{
                      display: 'flex', 
                      alignItems: 'flex-end', 
                      justifyContent: 'space-between',
                      gap: '16px'
                    }}>
                      <div style={{flex: 1}}>
                        <div style={{
                          fontSize: '1.5rem', 
                          fontWeight: '800', 
                          color: '#059669',
                          lineHeight: '1.2'
                        }}>
                          {formatCurrency(convertPrice(product.priceRange.minVariantPrice.amount))}
                        </div>
                        <div style={{
                          fontSize: '0.75rem', 
                          color: '#94a3b8',
                          fontWeight: '500',
                          marginTop: '2px'
                        }}>
                          Per unit
                        </div>
                      </div>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        color: 'white',
                        padding: '12px 20px',
                        borderRadius: '16px',
                        border: 'none',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 14px rgba(59,130,246,0.25)',
                        minWidth: '100px'
                      }}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}