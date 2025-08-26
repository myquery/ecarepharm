import { useState, useEffect } from 'react';
import Head from 'next/head';
import { dummyProducts, categories } from '../data/dummyProducts';
import { formatCurrency, convertPrice } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const { addToCart, getCartCount, setIsCartOpen } = useCart();
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
        <title>eCare Pharmacy - Quality Healthcare Solutions</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>

      <div style={{fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', backgroundColor: '#f1f5f9'}}>
        <Header />

        {/* Hero Banner */}
        <section style={{
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%)',
          color: 'white',
          padding: '4rem 1.5rem',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          {/* Background Image */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1
          }}></div>
          
          <div style={{maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center'}}>
            <div>
              <h2 style={{fontSize: '3.5rem', fontWeight: 'bold', margin: '0 0 1.5rem 0', lineHeight: '1.1'}}>
                Your Health, Our Priority
              </h2>
              <p style={{fontSize: '1.25rem', opacity: 0.95, margin: '0 0 2.5rem 0', lineHeight: '1.6'}}>
                Discover quality medications and healthcare products with professional consultation from certified pharmacists
              </p>
              <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                <button style={{
                  backgroundColor: 'white',
                  color: '#1e40af',
                  padding: '1rem 2rem',
                  borderRadius: '25px',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                }}>
                  Shop Now
                </button>
                <button style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '25px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.target.style.borderColor = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                }}>
                  Learn More
                </button>
              </div>
            </div>
            
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '20px',
                padding: '2rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', textAlign: 'center'}}>
                  <div>
                    <div style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>500+</div>
                    <div style={{fontSize: '0.875rem', opacity: 0.9}}>Products</div>
                  </div>
                  <div>
                    <div style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>24/7</div>
                    <div style={{fontSize: '0.875rem', opacity: 0.9}}>Support</div>
                  </div>
                  <div>
                    <div style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>10k+</div>
                    <div style={{fontSize: '0.875rem', opacity: 0.9}}>Customers</div>
                  </div>
                  <div>
                    <div style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>99%</div>
                    <div style={{fontSize: '0.875rem', opacity: 0.9}}>Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Offers */}
        <section style={{padding: '3rem 1.5rem', backgroundColor: '#f8fafc'}}>
          <div style={{maxWidth: '1300px', margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2.5rem'}}>
              <h2 style={{fontSize: '2.25rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 0.5rem 0'}}>
                Special Offers
              </h2>
              <p style={{color: '#64748b', fontSize: '1.125rem', margin: 0}}>Limited time deals on essential healthcare products</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '24px',
              height: '400px'
            }}>
              {/* Main Featured Offer */}
              <div style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                display: 'flex'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <div style={{padding: '3rem', color: 'white', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2}}>
                  <div style={{position: 'absolute', top: '2rem', right: '2rem', backgroundColor: '#ef4444', padding: '0.75rem 1.5rem', borderRadius: '25px', fontSize: '1rem', fontWeight: '700'}}>
                    50% OFF
                  </div>
                  <h3 style={{fontSize: '3rem', fontWeight: 'bold', margin: '0 0 1rem 0', lineHeight: '1.1'}}>Mega Health Sale</h3>
                  <p style={{opacity: 0.9, margin: '0 0 2rem 0', fontSize: '1.25rem', maxWidth: '400px'}}>Get up to 50% off on premium healthcare products and medications</p>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem'}}>
                    <span style={{fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'line-through', opacity: 0.7}}>₦85,000</span>
                    <span style={{fontSize: '2.5rem', fontWeight: 'bold'}}>₦42,500</span>
                  </div>
                  <button style={{
                    backgroundColor: 'white',
                    color: '#1e40af',
                    padding: '1rem 2rem',
                    borderRadius: '25px',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    width: 'fit-content',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.stopPropagation();
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}>
                    Shop Now
                  </button>
                </div>
                <div style={{position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', opacity: 0.3}}>
                  <img
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop"
                    alt="Healthcare products"
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                  />
                </div>
              </div>

              {/* Side Offers */}
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                {/* Small Offer 1 */}
                <div style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '20px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  flex: 1,
                  overflow: 'hidden',
                  display: 'flex'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                  <div style={{padding: '1.5rem', color: 'white', flex: 1, zIndex: 2}}>
                    <div style={{position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.5rem 0.75rem', borderRadius: '15px', fontSize: '0.75rem', fontWeight: '700'}}>
                      FREE SHIP
                    </div>
                    <h4 style={{fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 0.5rem 0'}}>Vitamin Bundle</h4>
                    <p style={{opacity: 0.9, margin: '0 0 1rem 0', fontSize: '0.875rem'}}>Complete vitamin pack</p>
                    <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>₦28,500</div>
                  </div>
                  <div style={{position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', width: '80px', height: '80px', opacity: 0.2}}>
                    <img
                      src="https://images.unsplash.com/photo-1550572017-edd951aa8ca6?w=200&h=200&fit=crop"
                      alt="Vitamins"
                      style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}}
                    />
                  </div>
                </div>

                {/* Small Offer 2 */}
                <div style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  borderRadius: '20px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  flex: 1,
                  overflow: 'hidden',
                  display: 'flex'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                  <div style={{padding: '1.5rem', color: 'white', flex: 1, zIndex: 2}}>
                    <div style={{position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.5rem 0.75rem', borderRadius: '15px', fontSize: '0.75rem', fontWeight: '700'}}>
                      BUY 2 GET 1
                    </div>
                    <h4 style={{fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 0.5rem 0'}}>First Aid Kit</h4>
                    <p style={{opacity: 0.9, margin: '0 0 1rem 0', fontSize: '0.875rem'}}>Essential supplies</p>
                    <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>₦15,750</div>
                  </div>
                  <div style={{position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', width: '80px', height: '80px', opacity: 0.2}}>
                    <img
                      src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=200&h=200&fit=crop"
                      alt="First aid kit"
                      style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search */}
        <section style={{backgroundColor: 'white', padding: '2rem 1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
          <div style={{maxWidth: '1000px', margin: '0 auto'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <div style={{position: 'relative', width: '100%', maxWidth: '500px'}}>
                <input
                  type="text"
                  placeholder="Search for medicines, health products..."
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
            </div>
          </div>
        </section>

        {/* Categories */}
        <section style={{padding: '2rem 0', backgroundColor: '#f8fafc'}}>
          <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
              <h2 style={{fontSize: '1.75rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 0.5rem 0'}}>
                Shop by Category
              </h2>
              <p style={{color: '#64748b', fontSize: '1rem', margin: 0}}>Find the right products for your health needs</p>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem',
              scrollbarWidth: 'thin',
              scrollbarColor: '#cbd5e1 #f1f5f9',
              justifyContent: 'center'
            }}>
              {categories.filter(cat => cat !== 'All Products').map((category) => {
                const categoryImages = {
                  'Pain Relief': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
                  'Vitamins': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
                  'Supplements': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
                  'First Aid': 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop',
                  'Personal Care': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
                  'Baby Care': 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop'
                };
                
                return (
                  <div
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: selectedCategory === category ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                      boxShadow: selectedCategory === category ? '0 8px 25px rgba(59,130,246,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
                      minWidth: '140px',
                      flexShrink: 0,
                      transform: selectedCategory === category ? 'translateY(-2px)' : 'translateY(0)'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== category) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== category) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                      }
                    }}
                  >
                    <div style={{
                      position: 'relative',
                      height: '100px',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={categoryImages[category]}
                        alt={category}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                      {selectedCategory === category && (
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(135deg, rgba(59,130,246,0.8) 0%, rgba(29,78,216,0.8) 100%)'
                        }} />
                      )}
                    </div>
                    <div style={{
                      padding: '1rem 0.75rem',
                      textAlign: 'center'
                    }}>
                      <h3 style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: selectedCategory === category ? '#3b82f6' : '#1e293b',
                        margin: 0,
                        lineHeight: '1.2'
                      }}>
                        {category}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products */}
        <section style={{padding: '2rem 1.5rem'}}>
          <div style={{maxWidth: '1300px', margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <h2 style={{fontSize: '2.25rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 0.5rem 0'}}>
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
                  
                  {/* Image Section */}
                  <div style={{position: 'relative', overflow: 'hidden', height: '240px', group: true}}>
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
                    
                    {/* Overlay Actions */}
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
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          if (!isInWishlist(product.id)) {
                            e.target.style.backgroundColor = '#ef4444';
                            e.target.style.color = 'white';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.stopPropagation();
                          if (!isInWishlist(product.id)) {
                            e.target.style.backgroundColor = 'rgba(255,255,255,0.95)';
                            e.target.style.color = '#64748b';
                          }
                        }}
                      >
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to compare logic
                        }}
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.95)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          e.target.style.backgroundColor = '#3b82f6';
                          e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.stopPropagation();
                          e.target.style.backgroundColor = 'rgba(255,255,255,0.95)';
                          e.target.style.color = '#64748b';
                        }}
                      >
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div style={{padding: '24px'}}>
                    <div style={{marginBottom: '16px'}}>
                      <h3 style={{
                        fontSize: '1.125rem', 
                        fontWeight: '700', 
                        color: '#0f172a', 
                        margin: '0 0 8px 0', 
                        lineHeight: '1.4',
                        letterSpacing: '-0.025em'
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
                    
                    {/* Price and Action Section */}
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
                          lineHeight: '1.2',
                          letterSpacing: '-0.025em'
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
                        minWidth: '100px',
                        letterSpacing: '0.025em'
                      }}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 20px rgba(59,130,246,0.35)';
                      }}
                      onMouseLeave={(e) => {
                        e.stopPropagation();
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 14px rgba(59,130,246,0.25)';
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