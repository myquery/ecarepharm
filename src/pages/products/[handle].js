import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { formatCurrency, convertPrice } from '../../utils/currency';
import { useCart } from '../../context/CartContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getProduct, getAllProducts, formatShopifyProduct } from '../../lib/shopify';

export default function ProductDetail({ product, relatedProducts }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isMobile, setIsMobile] = useState(false);
  const { addToCart, getCartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>Loading... - eCare Pharmacy</title>
        </Head>
        <div style={{fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#ffffff', minHeight: '100vh'}}>
          <Header />
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh'}}>
            <div style={{textAlign: 'center'}}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f4f6',
                borderTop: '4px solid #3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem'
              }}></div>
              <p style={{color: '#64748b', fontSize: '1rem'}}>Loading product...</p>
            </div>
          </div>
          <Footer />
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Head>
          <title>Product Not Found - eCare Pharmacy</title>
        </Head>
        <div style={{fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#ffffff', minHeight: '100vh'}}>
          <Header />
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh'}}>
            <div style={{textAlign: 'center', padding: '2rem'}}>
              <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🔍</div>
              <h2 style={{fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem'}}>
                Product Not Found
              </h2>
              <p style={{color: '#64748b', marginBottom: '2rem'}}>
                The product you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={() => router.push('/')}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Back to Home
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const images = product.images || [product.image];

  return (
    <>
      <Head>
        <title>{product?.title || 'Product'} - eCare Pharmacy</title>
      </Head>

      <div style={{fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#ffffff', minHeight: '100vh'}}>
        <Header />

        {/* Breadcrumb */}
        <div style={{backgroundColor: '#f8fafc', padding: '1rem 0', borderBottom: '1px solid #e2e8f0'}}>
          <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b'}}>
              <span onClick={() => router.push('/')} style={{cursor: 'pointer', color: '#3b82f6'}}>Home</span>
              <span>/</span>
              <span onClick={() => router.push('/')} style={{cursor: 'pointer', color: '#3b82f6'}}>Products</span>
              <span>/</span>
              <span style={{color: '#1e293b', fontWeight: '500'}}>{product.title}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem'}}>
          <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '4rem'}}>
            
            {/* Image Gallery */}
            <div>
              <div style={{marginBottom: '1rem'}}>
                <img
                  src={images[selectedImage] || product.image}
                  alt={product.title}
                  style={{width: '100%', height: '500px', objectFit: 'cover', borderRadius: '12px', border: '1px solid #e2e8f0'}}
                />
              </div>
              <div style={{display: 'flex', gap: '0.75rem'}}>
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: selectedImage === index ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div style={{backgroundColor: '#dbeafe', color: '#1e40af', fontSize: '0.75rem', fontWeight: '600', padding: '0.5rem 1rem', borderRadius: '20px', display: 'inline-block', marginBottom: '1rem'}}>
                {product.category}
              </div>
              
              <h1 style={{fontSize: '2.25rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 1rem 0', lineHeight: '1.2'}}>
                {product.title}
              </h1>

              {/* Rating */}
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem'}}>
                <div style={{display: 'flex', gap: '2px'}}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{color: i < 4 ? '#fbbf24' : '#d1d5db', fontSize: '1.25rem'}}>★</span>
                  ))}
                </div>
                <span style={{fontSize: '0.875rem', color: '#64748b'}}>(24 reviews)</span>
              </div>

              {/* Price */}
              <div style={{marginBottom: '2rem'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem'}}>
                  <span style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#059669'}}>
                    {formatCurrency(convertPrice(product.price))}
                  </span>
                  <span style={{fontSize: '1.5rem', color: '#94a3b8', textDecoration: 'line-through'}}>
                    {formatCurrency(convertPrice(product.price) * 1.3)}
                  </span>
                </div>
                <p style={{fontSize: '0.875rem', color: '#059669', fontWeight: '500'}}>Save 23% on this item</p>
              </div>
              
              <div style={{backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #e2e8f0'}}>
                <p style={{color: '#64748b', fontSize: '1rem', lineHeight: '1.6', margin: 0}}>
                  {product.description}
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem'}}>
                <div style={{display: 'flex', alignItems: 'center', border: '2px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden'}}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{width: '48px', height: '48px', border: 'none', background: '#f8fafc', cursor: 'pointer', fontSize: '1.25rem', fontWeight: 'bold'}}
                  >
                    -
                  </button>
                  <span style={{fontSize: '1.125rem', fontWeight: '600', minWidth: '60px', textAlign: 'center', padding: '0 1rem'}}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{width: '48px', height: '48px', border: 'none', background: '#f8fafc', cursor: 'pointer', fontSize: '1.25rem', fontWeight: 'bold'}}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                    color: 'white',
                    padding: '0 2rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    flex: 1,
                    boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Add to Cart • {formatCurrency(convertPrice(product.price) * quantity)}
                </button>
              </div>

              {/* Product Features */}
              <div style={{borderTop: '1px solid #e2e8f0', paddingTop: '2rem'}}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem'}}>
                  Key Benefits
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                    <div style={{width: '8px', height: '8px', backgroundColor: '#059669', borderRadius: '50%'}}></div>
                    <span style={{fontSize: '0.875rem', color: '#64748b'}}>FDA Approved</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                    <div style={{width: '8px', height: '8px', backgroundColor: '#059669', borderRadius: '50%'}}></div>
                    <span style={{fontSize: '0.875rem', color: '#64748b'}}>Fast Acting</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                    <div style={{width: '8px', height: '8px', backgroundColor: '#059669', borderRadius: '50%'}}></div>
                    <span style={{fontSize: '0.875rem', color: '#64748b'}}>Safe for Daily Use</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                    <div style={{width: '8px', height: '8px', backgroundColor: '#059669', borderRadius: '50%'}}></div>
                    <span style={{fontSize: '0.875rem', color: '#64748b'}}>No Side Effects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div style={{marginTop: '4rem'}}>
            <div style={{borderBottom: '2px solid #f1f5f9', marginBottom: '2rem'}}>
              <div style={{display: 'flex', gap: '2rem'}}>
                <button 
                  onClick={() => setActiveTab('description')}
                  style={{
                    padding: '1rem 0', 
                    borderBottom: activeTab === 'description' ? '2px solid #3b82f6' : 'none', 
                    color: activeTab === 'description' ? '#3b82f6' : '#64748b', 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '1rem', 
                    fontWeight: '600', 
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}>
                  Description
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  style={{
                    padding: '1rem 0', 
                    borderBottom: activeTab === 'reviews' ? '2px solid #3b82f6' : 'none', 
                    color: activeTab === 'reviews' ? '#3b82f6' : '#64748b', 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '1rem', 
                    fontWeight: '600', 
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}>
                  Reviews (24)
                </button>
                <button 
                  onClick={() => setActiveTab('info')}
                  style={{
                    padding: '1rem 0', 
                    borderBottom: activeTab === 'info' ? '2px solid #3b82f6' : 'none', 
                    color: activeTab === 'info' ? '#3b82f6' : '#64748b', 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '1rem', 
                    fontWeight: '600', 
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}>
                  Additional Info
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div style={{marginBottom: '3rem'}}>
              {activeTab === 'description' && (
                <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: isMobile ? '2rem' : '3rem'}}>
                  <div>
                    <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem'}}>Product Description</h3>
                    <div style={{color: '#64748b', lineHeight: '1.7', fontSize: '1rem'}}>
                      <p style={{marginBottom: '1rem'}}>
                        This premium {product.title.toLowerCase()} is formulated with the highest quality ingredients to provide effective relief and support for your health needs. Our pharmaceutical-grade formula ensures maximum potency and safety.
                      </p>
                      <p style={{marginBottom: '1rem'}}>
                        Developed by leading healthcare professionals, this product undergoes rigorous testing to meet international quality standards. Each batch is carefully manufactured in our FDA-approved facilities.
                      </p>
                      <h4 style={{fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', margin: '1.5rem 0 0.75rem 0'}}>Key Ingredients:</h4>
                      <ul style={{paddingLeft: '1.5rem', marginBottom: '1rem'}}>
                        <li style={{marginBottom: '0.5rem'}}>Active pharmaceutical ingredient (API) - 500mg</li>
                        <li style={{marginBottom: '0.5rem'}}>Natural excipients for enhanced absorption</li>
                        <li style={{marginBottom: '0.5rem'}}>Stabilizers and preservatives (pharmaceutical grade)</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div style={{backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
                      <h4 style={{fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem'}}>Product Specifications</h4>
                      <div style={{fontSize: '0.875rem', color: '#64748b'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0'}}>
                          <span>Brand:</span>
                          <span style={{fontWeight: '500', color: '#1e293b'}}>PharmaCare</span>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0'}}>
                          <span>Category:</span>
                          <span style={{fontWeight: '500', color: '#1e293b'}}>{product.category}</span>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0'}}>
                          <span>Form:</span>
                          <span style={{fontWeight: '500', color: '#1e293b'}}>Tablets</span>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0'}}>
                          <span>Pack Size:</span>
                          <span style={{fontWeight: '500', color: '#1e293b'}}>30 Units</span>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                          <span>Expiry:</span>
                          <span style={{fontWeight: '500', color: '#1e293b'}}>2 Years</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '2rem'}}>Customer Reviews</h3>
                  <div style={{display: 'flex', gap: '3rem'}}>
                    <div style={{flex: 2}}>
                      {[1,2,3].map(i => (
                        <div key={i} style={{borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem', marginBottom: '1.5rem'}}>
                          <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem'}}>
                            <div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: '600', color: '#3b82f6'}}>
                              {['J','M','S'][i-1]}
                            </div>
                            <div>
                              <div style={{fontWeight: '600', color: '#1e293b'}}>{'John D.|Maria S.|Sarah K.'.split('|')[i-1]}</div>
                              <div style={{display: 'flex', gap: '2px', marginTop: '2px'}}>
                                {[...Array(5)].map((_, j) => (
                                  <span key={j} style={{color: j < [5,4,5][i-1] ? '#fbbf24' : '#d1d5db', fontSize: '0.875rem'}}>★</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <p style={{color: '#64748b', lineHeight: '1.6'}}>
                            {['Excellent product! Works exactly as described and arrived quickly. Highly recommend for anyone looking for quality healthcare products.','Good value for money. The product quality is solid and customer service was helpful when I had questions.','Very satisfied with this purchase. Fast shipping and the product exceeded my expectations. Will buy again.'][i-1]}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div style={{flex: 1}}>
                      <div style={{backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0'}}>
                        <h4 style={{fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem'}}>Rating Summary</h4>
                        <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                          <span style={{fontSize: '2rem', fontWeight: 'bold', color: '#1e293b'}}>4.6</span>
                          <div>
                            <div style={{display: 'flex', gap: '2px', marginBottom: '4px'}}>
                              {[...Array(5)].map((_, i) => (
                                <span key={i} style={{color: i < 4 ? '#fbbf24' : '#d1d5db', fontSize: '1rem'}}>★</span>
                              ))}
                            </div>
                            <div style={{fontSize: '0.875rem', color: '#64748b'}}>Based on 24 reviews</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'info' && (
                <div>
                  <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '2rem'}}>Additional Information</h3>
                  <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '3rem'}}>
                    <div>
                      <h4 style={{fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem'}}>Usage Instructions</h4>
                      <div style={{color: '#64748b', lineHeight: '1.6', marginBottom: '2rem'}}>
                        <p style={{marginBottom: '0.75rem'}}>• Take 1-2 tablets daily with water</p>
                        <p style={{marginBottom: '0.75rem'}}>• Best taken with meals to reduce stomach irritation</p>
                        <p style={{marginBottom: '0.75rem'}}>• Do not exceed recommended dosage</p>
                        <p>• Consult healthcare provider before use if pregnant or nursing</p>
                      </div>
                      <h4 style={{fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem'}}>Storage</h4>
                      <div style={{color: '#64748b', lineHeight: '1.6'}}>
                        <p style={{marginBottom: '0.75rem'}}>• Store in cool, dry place below 25°C</p>
                        <p style={{marginBottom: '0.75rem'}}>• Keep away from direct sunlight</p>
                        <p>• Keep out of reach of children</p>
                      </div>
                    </div>
                    <div>
                      <h4 style={{fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem'}}>Warnings & Precautions</h4>
                      <div style={{color: '#64748b', lineHeight: '1.6', marginBottom: '2rem'}}>
                        <p style={{marginBottom: '0.75rem'}}>• Not suitable for children under 12 years</p>
                        <p style={{marginBottom: '0.75rem'}}>• May cause drowsiness in some individuals</p>
                        <p style={{marginBottom: '0.75rem'}}>• Avoid alcohol consumption while taking this medication</p>
                        <p>• Discontinue use if adverse reactions occur</p>
                      </div>
                      <h4 style={{fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem'}}>Shipping Info</h4>
                      <div style={{color: '#64748b', lineHeight: '1.6'}}>
                        <p style={{marginBottom: '0.75rem'}}>• Free shipping on orders over ₦50,000</p>
                        <p style={{marginBottom: '0.75rem'}}>• Standard delivery: 2-3 business days</p>
                        <p>• Express delivery available</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div style={{marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #e2e8f0'}}>
            <h2 style={{fontSize: '2rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '2rem', textAlign: 'center'}}>Related Products</h2>
            <div style={{display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem'}}>
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid #f1f5f9'
                }}
                onClick={() => router.push(`/products/${relatedProduct.handle}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                }}>
                  <div style={{position: 'relative'}}>
                    <img
                      src={relatedProduct.image || '/placeholder.jpg'}
                      alt={relatedProduct.title}
                      style={{width: '100%', height: '200px', objectFit: 'cover'}}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      color: '#3b82f6',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      padding: '4px 8px',
                      borderRadius: '8px'
                    }}>
                      {relatedProduct.category}
                    </div>
                  </div>
                  <div style={{padding: '1.5rem'}}>
                    <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', margin: '0 0 0.5rem 0', lineHeight: '1.3'}}>
                      {relatedProduct.title}
                    </h3>
                    <p style={{color: '#64748b', fontSize: '0.875rem', margin: '0 0 1rem 0', lineHeight: '1.4'}}>
                      {relatedProduct.description.length > 60 ? relatedProduct.description.substring(0, 60) + '...' : relatedProduct.description}
                    </p>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                      <div style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#059669'}}>
                        {formatCurrency(convertPrice(relatedProduct.price))}
                      </div>
                      <button style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(relatedProduct);
                      }}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const products = await getAllProducts();
    const paths = products.map((product) => ({
      params: { handle: product.node.handle },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const productData = await getProduct(params.handle);
    
    if (!productData) {
      return {
        notFound: true,
      };
    }

    const product = formatShopifyProduct({ node: productData });
    
    // Get related products (same category)
    const allProducts = await getAllProducts();
    const relatedProducts = allProducts
      .map(formatShopifyProduct)
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    return {
      props: {
        product,
        relatedProducts,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true,
    };
  }
}