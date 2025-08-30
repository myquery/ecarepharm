import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { Bars3Icon, HeartIcon, ShoppingBagIcon, PhoneIcon, TruckIcon, UserIcon } from '@heroicons/react/24/outline';
import { theme } from '../config/theme';
import AuthModal from './AuthModal';

export default function Header() {
  const { getCartCount, setIsCartOpen } = useCart();
  const { getWishlistCount } = useWishlist();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <header style={{backgroundColor: 'var(--color-secondary-dark)', color: 'var(--color-white)', padding: '1rem 0'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 1rem'}}>
        {/* Main Header Row */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <svg
              width={isMobile ? '32' : '40'}
              height={isMobile ? '32' : '40'}
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Circular background */}
              <circle cx="100" cy="100" r="95" fill="white" stroke="#e2e8f0" strokeWidth="2"/>
              
              {/* Medical cross */}
              <rect x="85" y="60" width="30" height="80" fill="var(--color-primary)" rx="4"/>
              <rect x="60" y="85" width="80" height="30" fill="var(--color-primary)" rx="4"/>
              
              {/* Pharmacy bottle */}
              <rect x="130" y="70" width="25" height="40" fill="var(--color-secondary)" rx="3"/>
              <rect x="132" y="65" width="21" height="8" fill="var(--color-secondary-dark)" rx="2"/>
              
              {/* Pills */}
              <circle cx="70" cy="130" r="8" fill="var(--color-accent-red)"/>
              <circle cx="85" cy="145" r="6" fill="var(--color-accent-orange)"/>
              <circle cx="115" cy="135" r="7" fill="var(--color-accent-purple)"/>
              
              {/* Text "eC" */}
              <text x="100" y="170" textAnchor="middle" fill="var(--color-secondary-dark)" fontSize="24" fontWeight="bold" fontFamily="Inter, sans-serif">eC</text>
            </svg>
            <div>
              <h1 style={{fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 'bold', margin: 0}}>eCare Pharmacy</h1>
              {!isMobile && <p style={{opacity: 0.9, margin: 0, fontSize: '0.875rem'}}>Quality Healthcare Solutions</p>}
            </div>
          </button>
          
          {/* Navigation Menu */}
          {!isMobile ? (
            <nav style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
              <a href="/" style={{color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', transition: 'opacity 0.3s'}} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Home</a>
              <a href="/store" style={{color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', transition: 'opacity 0.3s'}} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Store</a>
              <a href="/prescription-upload" style={{color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', transition: 'opacity 0.3s'}} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Prescription</a>
              <a href="/wholesale" style={{color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', transition: 'opacity 0.3s'}} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Wholesale</a>
              <a href="/logistics-partner" style={{color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', transition: 'opacity 0.3s'}} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Delivery</a>
            </nav>
          ) : (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <Bars3Icon className="w-7 h-7" />
            </button>
          )}
          
          <div style={{display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem'}}>
            {isAuthenticated ? (
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <span style={{color: 'white', fontSize: '0.875rem'}}>Hi, {user?.name}</span>
                <button
                  onClick={logout}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <UserIcon className="w-6 h-6" />
                {!isMobile && <span>Sign In</span>}
              </button>
            )}
            
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
              <HeartIcon className="w-6 h-6" />
              {!isMobile && <span>Wishlist</span>}
              {getWishlistCount() > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: 'var(--color-error)',
                  color: 'var(--color-white)',
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
              <ShoppingBagIcon className="w-6 h-6" />
              {!isMobile && <span>Cart</span>}
              {getCartCount() > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: 'var(--color-error)',
                  color: 'var(--color-white)',
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
        
        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <nav style={{display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '1rem'}}>
            <a href="/" style={{color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', padding: '0.5rem 0'}}>Home</a>
            <a href="/store" style={{color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', padding: '0.5rem 0'}}>Store</a>
            <a href="/prescription-upload" style={{color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', padding: '0.5rem 0'}}>Prescription</a>
            <a href="/wholesale" style={{color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', padding: '0.5rem 0'}}>Wholesale</a>
            <a href="/logistics-partner" style={{color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', padding: '0.5rem 0'}}>Delivery</a>
          </nav>
        )}
        
        {/* Contact Info Row */}
        {!isMobile && (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', fontSize: '0.875rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '1rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <PhoneIcon className="w-4 h-4" />
            <span>+234 (080) 123-4567-23</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <TruckIcon className="w-5 h-5" />
            <span>Fast Delivery</span>
          </div>
        </div>
        )}
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
}