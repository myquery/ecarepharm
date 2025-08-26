import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Header() {
  const { getCartCount, setIsCartOpen } = useCart();
  const { getWishlistCount } = useWishlist();

  return (
    <header style={{backgroundColor: '#1e40af', color: 'white', padding: '1rem 0'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 1rem'}}>
        {/* Main Header Row */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <div style={{backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '50%'}}>
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/>
              </svg>
            </div>
            <div>
              <h1 style={{fontSize: '2rem', fontWeight: 'bold', margin: 0}}>eCare Pharmacy</h1>
              <p style={{opacity: 0.9, margin: 0, fontSize: '0.875rem'}}>Quality Healthcare Solutions</p>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <nav style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
            <a href="/" style={{color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', transition: 'opacity 0.3s'}} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Home</a>
            <a href="/store" style={{color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', transition: 'opacity 0.3s'}} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Store</a>
            <a href="#" style={{color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', transition: 'opacity 0.3s'}} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>About</a>
            <a href="#" style={{color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', transition: 'opacity 0.3s'}} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Contact</a>
          </nav>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <button
              onClick={() => window.location.href = '/wishlist'}
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
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>Wishlist</span>
              {getWishlistCount() > 0 && (
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
                  {getWishlistCount()}
                </span>
              )}
            </button>
            
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
        
        {/* Contact Info Row */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', fontSize: '0.875rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '1rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <span>📞</span>
            <span>+234 (080) 123-4567-23</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <span>🚚</span>
            <span>Free Delivery</span>
          </div>
        </div>
      </div>
    </header>
  );
}