import { useCart } from '../context/CartContext';
import { formatCurrency, convertPrice } from '../utils/currency';
import { useRouter } from 'next/router';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount, isCartOpen, setIsCartOpen } = useCart();
  const router = useRouter();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end'
    }}
    onClick={() => setIsCartOpen(false)}>
      <div style={{
        width: '400px',
        height: '100%',
        backgroundColor: 'white',
        boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', margin: 0}}>
            Shopping Cart ({getCartCount()})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              color: '#64748b',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div style={{flex: 1, overflowY: 'auto', padding: '1rem'}}>
          {cartItems.length === 0 ? (
            <div style={{textAlign: 'center', padding: '3rem 1rem', color: '#64748b'}}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🛒</div>
              <p style={{fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem'}}>Your cart is empty</p>
              <p style={{fontSize: '0.875rem'}}>Add some products to get started</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} style={{
                display: 'flex',
                gap: '1rem',
                padding: '1rem',
                borderBottom: '1px solid #f1f5f9',
                marginBottom: '1rem'
              }}>
                <img
                  src={item.images.edges[0]?.node.url}
                  alt={item.title}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}
                />
                <div style={{flex: 1}}>
                  <h3 style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    margin: '0 0 0.25rem 0',
                    lineHeight: '1.3'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    margin: '0 0 0.5rem 0'
                  }}>
                    {item.category}
                  </p>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '4px',
                          background: 'white',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        -
                      </button>
                      <span style={{fontSize: '0.875rem', fontWeight: '500', minWidth: '20px', textAlign: 'center'}}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '4px',
                          background: 'white',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        padding: '0.25rem'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#059669',
                    marginTop: '0.5rem'
                  }}>
                    {formatCurrency(convertPrice(item.priceRange.minVariantPrice.amount) * item.quantity)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{fontSize: '1.125rem', fontWeight: '600', color: '#1e293b'}}>
                Total:
              </span>
              <span style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#059669'}}>
                {formatCurrency(convertPrice(getCartTotal().toString()))}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}