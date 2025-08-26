import { useState, useEffect } from 'react';
import Head from 'next/head';
import { dummyProducts, categories } from '../data/dummyProducts';
import { formatCurrency, convertPrice } from '../utils/currency';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const { addToCart, getCartCount, setIsCartOpen } = useCart();

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
      </Head>

      <div style={{fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', backgroundColor: '#f1f5f9'}}>
        {/* Header */}
        <header style={{backgroundColor: '#1e40af', color: 'white', padding: '1rem 0'}}>
          <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.75rem', borderRadius: '50%'}}>
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/>
                </svg>
              </div>
              <div>
                <h1 style={{fontSize: '2rem', fontWeight: 'bold', margin: 0}}>eCare Pharmacy</h1>
                <p style={{opacity: 0.9, margin: 0, fontSize: '0.875rem'}}>Quality Healthcare Solutions</p>
              </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '2rem', fontSize: '0.875rem'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <span>📞</span>
                <span>+243 (080) 123-4567-23</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <span>🚚</span>
                <span>Free Delivery</span>
              </div>
              <button
                onClick={() => setIsCartOpen(true)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                </svg>
                <span>Cart</span>
                {getCartCount() > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    minWidth: '18px',
                    textAlign: 'center'
                  }}>
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

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

        {/* Search & Categories */}
        <section style={{backgroundColor: 'white', padding: '2rem 1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
          <div style={{maxWidth: '1000px', margin: '0 auto'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem'}}>
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
              <h2 style={{fontSize: '2.25rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 0.5rem 0'}}>
                {searchQuery ? `"${searchQuery}"` : selectedCategory}
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
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.5)';
                }}>
                  
                  {/* Image Section */}
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

        {/* Footer */}
        <footer style={{backgroundColor: '#1e293b', color: 'white'}}>
          {/* Newsletter Section */}
          <div style={{backgroundColor: '#334155', padding: '3rem 1.5rem'}}>
            <div style={{maxWidth: '1200px', margin: '0 auto', textAlign: 'center'}}>
              <h3 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white'}}>Stay Updated</h3>
              <p style={{fontSize: '1.125rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto'}}>Subscribe to our newsletter for health tips, special offers, and the latest pharmacy updates</p>
              <div style={{display: 'flex', maxWidth: '500px', margin: '0 auto', gap: '1rem'}}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  style={{
                    flex: 1,
                    padding: '1rem 1.5rem',
                    borderRadius: '50px',
                    border: 'none',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                <button style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div style={{padding: '4rem 1.5rem 2rem'}}>
            <div style={{maxWidth: '1200px', margin: '0 auto'}}>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '3rem'}}>
                
                {/* Company Info */}
                <div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem'}}>
                    <div style={{backgroundColor: 'rgba(59,130,246,0.2)', padding: '0.75rem', borderRadius: '50%'}}>
                      <svg width="28" height="28" fill="#3b82f6" viewBox="0 0 24 24">
                        <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: 'white'}}>eCare Pharmacy</h3>
                      <p style={{fontSize: '0.875rem', opacity: 0.8, margin: 0}}>Quality Healthcare Solutions</p>
                    </div>
                  </div>
                  <p style={{opacity: 0.8, fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem'}}>Your trusted partner in health and wellness, providing quality medications, healthcare products, and professional consultation services across Nigeria.</p>
                  
                  {/* Social Links */}
                  <div style={{display: 'flex', gap: '1rem'}}>
                    {[
                      { icon: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z', label: 'Twitter' },
                      { icon: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z', label: 'Facebook' },
                      { icon: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z', label: 'Instagram' },
                      { icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', label: 'LinkedIn' }
                    ].map((social, index) => (
                      <button key={index} style={{
                        backgroundColor: 'rgba(59,130,246,0.1)',
                        border: '1px solid rgba(59,130,246,0.2)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#3b82f6';
                        e.target.style.borderColor = '#3b82f6';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(59,130,246,0.1)';
                        e.target.style.borderColor = 'rgba(59,130,246,0.2)';
                      }}>
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path d={social.icon}/>
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 style={{fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white'}}>Quick Links</h4>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                    {['About Us', 'Our Services', 'Health Blog', 'Prescription Upload', 'Store Locator', 'Career Opportunities'].map((link, index) => (
                      <a key={index} href="#" style={{
                        color: 'rgba(255,255,255,0.8)',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#3b82f6';
                        e.target.style.paddingLeft = '0.5rem';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'rgba(255,255,255,0.8)';
                        e.target.style.paddingLeft = '0';
                      }}>
                        <span>→</span> {link}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 style={{fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white'}}>Product Categories</h4>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                    {['Prescription Medicines', 'Over-the-Counter', 'Vitamins & Supplements', 'Personal Care', 'Medical Devices', 'Baby & Mother Care'].map((category, index) => (
                      <a key={index} href="#" style={{
                        color: 'rgba(255,255,255,0.8)',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#10b981';
                        e.target.style.paddingLeft = '0.5rem';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'rgba(255,255,255,0.8)';
                        e.target.style.paddingLeft = '0';
                      }}>
                        <span>•</span> {category}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact & Support */}
                <div>
                  <h4 style={{fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white'}}>Contact & Support</h4>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                      <div style={{backgroundColor: 'rgba(59,130,246,0.2)', padding: '0.5rem', borderRadius: '8px'}}>
                        <svg width="16" height="16" fill="#3b82f6" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                      <div>
                        <p style={{margin: 0, fontSize: '0.875rem', fontWeight: '600', color: 'white'}}>Phone Support</p>
                        <p style={{margin: 0, fontSize: '0.875rem', opacity: 0.8}}>+234 (080) 123-4567-23</p>
                      </div>
                    </div>
                    
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                      <div style={{backgroundColor: 'rgba(16,185,129,0.2)', padding: '0.5rem', borderRadius: '8px'}}>
                        <svg width="16" height="16" fill="#10b981" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </div>
                      <div>
                        <p style={{margin: 0, fontSize: '0.875rem', fontWeight: '600', color: 'white'}}>Email Support</p>
                        <p style={{margin: 0, fontSize: '0.875rem', opacity: 0.8}}>support@ecarepharmacy.ng</p>
                      </div>
                    </div>
                    
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                      <div style={{backgroundColor: 'rgba(245,158,11,0.2)', padding: '0.5rem', borderRadius: '8px'}}>
                        <svg width="16" height="16" fill="#f59e0b" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>
                      <div>
                        <p style={{margin: 0, fontSize: '0.875rem', fontWeight: '600', color: 'white'}}>Visit Our Store</p>
                        <p style={{margin: 0, fontSize: '0.875rem', opacity: 0.8}}>123 Health Plaza, Lagos, Nigeria</p>
                      </div>
                    </div>
                    
                    <div style={{marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(59,130,246,0.1)', borderRadius: '12px', border: '1px solid rgba(59,130,246,0.2)'}}>
                      <p style={{margin: 0, fontSize: '0.75rem', fontWeight: '600', color: '#3b82f6', marginBottom: '0.5rem'}}>24/7 Emergency Hotline</p>
                      <p style={{margin: 0, fontSize: '1rem', fontWeight: '700', color: 'white'}}>+234 (0) 800-PHARMACY</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div style={{borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
                  <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
                    {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Shipping Info', 'FAQ'].map((link, index) => (
                      <a key={index} href="#" style={{
                        color: 'rgba(255,255,255,0.6)',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                      onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}>
                        {link}
                      </a>
                    ))}
                  </div>
                  
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <span style={{fontSize: '0.875rem', opacity: 0.6}}>Secure payments powered by</span>
                    <div style={{display: 'flex', gap: '0.5rem'}}>
                      {['Visa', 'Mastercard', 'Paystack'].map((payment, index) => (
                        <div key={index} style={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {payment}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div style={{textAlign: 'center', fontSize: '0.875rem', opacity: 0.6, paddingTop: '1rem'}}>
                  © 2024 eCare Pharmacy. All rights reserved. | Licensed Pharmacy in Nigeria | Reg. No: PCN/2024/001
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}