import Head from 'next/head';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatCurrency, convertPrice } from '../utils/currency';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
      <Head>
        <title>Wishlist - eCare Pharmacy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#ffffff', minHeight: '100vh'}}>
        <Header />
        
        {/* Breadcrumb */}
        <div style={{backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '1rem 0'}}>
          <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b'}}>
              <a href="/" style={{color: '#64748b', textDecoration: 'none'}}>Home</a>
              <span>/</span>
              <span style={{color: '#1e293b', fontWeight: '500'}}>Wishlist</span>
            </div>
          </div>
        </div>

        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem'}}>
          <div style={{marginBottom: '2rem'}}>
            <h1 style={{fontSize: '2rem', fontWeight: '700', color: '#1e293b', margin: '0 0 0.5rem 0'}}>
              My Wishlist
            </h1>
            <p style={{color: '#64748b', fontSize: '1rem', margin: 0}}>
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {wishlistItems.length === 0 ? (
            <div style={{textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#f8fafc', borderRadius: '12px'}}>
              <div style={{fontSize: '4rem', marginBottom: '1rem'}}>💝</div>
              <h2 style={{fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem'}}>
                Your wishlist is empty
              </h2>
              <p style={{color: '#64748b', marginBottom: '2rem'}}>
                Start adding products you love to keep track of them
              </p>
              <button
                onClick={() => window.location.href = '/'}
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
                Continue Shopping
              </button>
            </div>
          ) : (
            <div style={{backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden'}}>
              {/* Table Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr',
                gap: '1rem',
                padding: '1rem 1.5rem',
                backgroundColor: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                <div>Product</div>
                <div>Details</div>
                <div>Price</div>
                <div>Stock Status</div>
                <div>Action</div>
              </div>

              {/* Table Body */}
              {wishlistItems.map((product, index) => (
                <div key={product.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr',
                  gap: '1rem',
                  padding: '1.5rem',
                  alignItems: 'center',
                  borderBottom: index < wishlistItems.length - 1 ? '1px solid #e2e8f0' : 'none'
                }}>
                  {/* Product Image */}
                  <div style={{position: 'relative'}}>
                    <img
                      src={product.images.edges[0]?.node.url}
                      alt={product.title}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                      }}
                    />
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        backgroundColor: '#ef4444',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'white',
                        fontSize: '12px'
                      }}
                    >
                      ×
                    </button>
                  </div>

                  {/* Product Details */}
                  <div>
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#1e293b',
                      margin: '0 0 0.5rem 0',
                      lineHeight: '1.4'
                    }}>
                      {product.title}
                    </h3>
                    <p style={{
                      color: '#64748b',
                      fontSize: '0.875rem',
                      margin: 0,
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {product.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div style={{
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: '#059669'
                  }}>
                    {formatCurrency(convertPrice(product.priceRange.minVariantPrice.amount))}
                  </div>

                  {/* Stock Status */}
                  <div>
                    <span style={{
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      In Stock
                    </span>
                  </div>

                  {/* Action */}
                  <div>
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#2563eb';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#3b82f6';
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Footer />
      </div>
    </>
  );
}