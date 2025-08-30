import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { formatCurrency, convertPrice } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import DeliverySelection from '../components/DeliverySelection';
import AuthModal from '../components/AuthModal';
import { initializePayment, generatePaymentReference } from '../utils/paystack';

export default function Checkout() {
  const router = useRouter();
  const { cartItems, getCartTotal, getCartCount, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: user?.address || '',
    city: '',
    zipCode: '',
    phone: user?.phone || ''
  });
  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [selectedDeliveryPartner, setSelectedDeliveryPartner] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    setProcessing(true);

    try {
      const orderData = {
        orderId: 'ORDER_' + Date.now(),
        items: cartItems,
        customer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}`
        },
        delivery: {
          option: deliveryOption,
          partner: selectedDeliveryPartner,
          fee: deliveryFee
        },
        totals: {
          subtotal,
          deliveryFee,
          tax,
          total
        }
      };

      if (paymentMethod === 'paystack') {
        const paymentData = {
          email: formData.email,
          amount: total,
          reference: generatePaymentReference(),
          customerName: `${formData.firstName} ${formData.lastName}`,
          orderId: orderData.orderId
        };

        const paymentResult = await initializePayment(paymentData);
        
        if (paymentResult.success) {
          // Store order data for confirmation page
          localStorage.setItem('lastOrder', JSON.stringify({
            ...orderData,
            paymentReference: paymentResult.reference,
            paymentStatus: 'completed'
          }));
          
          clearCart();
          router.push('/order-confirmation');
        }
      } else {
        // Handle other payment methods
        localStorage.setItem('lastOrder', JSON.stringify({
          ...orderData,
          paymentStatus: 'pending'
        }));
        
        clearCart();
        router.push('/order-confirmation');
      }
    } catch (error) {
      alert(error.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const subtotal = getCartTotal();
  const deliveryFee = deliveryOption === 'pickup' ? 0 : (selectedDeliveryPartner?.fee || 2000);
  const tax = subtotal * 0.075;
  const total = subtotal + deliveryFee + tax;

  if (cartItems.length === 0) {
    return (
      <div style={{fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{textAlign: 'center', padding: '2rem'}}>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem'}}>Your cart is empty</h2>
          <button onClick={() => router.push('/')} style={{backgroundColor: '#3b82f6', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer'}}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout - PharmaCare</title>
      </Head>

      <div style={{fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh'}}>
        <header style={{backgroundColor: '#1e40af', color: 'white', padding: '1rem 0'}}>
          <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <button onClick={() => router.back()} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}>
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"/>
              </svg>
            </button>
            <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', margin: 0}}>Checkout</h1>
          </div>
        </header>

        <div style={{maxWidth: '1000px', margin: '0 auto', padding: isMobile ? '1rem' : '2rem 1.5rem'}}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
            '@media (min-width: 768px)': {
              gridTemplateColumns: '1fr 350px'
            }
          }} className="checkout-grid">
            
            {/* Checkout Form */}
            <div>
              <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', marginBottom: '1.5rem'}}>
                <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1.5rem'}}>
                  Contact Information
                </h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{width: '100%', padding: '0.875rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', marginBottom: '1rem', outline: 'none', transition: 'border-color 0.2s'}}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Delivery Options */}
              <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', marginBottom: '1.5rem'}}>
                <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1.5rem'}}>
                  Delivery Options
                </h2>
                
                <div style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem'}}>
                  <button
                    type="button"
                    onClick={() => setDeliveryOption('delivery')}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      border: deliveryOption === 'delivery' ? '2px solid var(--color-primary)' : '2px solid #e2e8f0',
                      borderRadius: '8px',
                      background: deliveryOption === 'delivery' ? '#f0fdf4' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>🚚</span>
                    <span style={{fontWeight: '500'}}>Home Delivery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryOption('pickup')}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      border: deliveryOption === 'pickup' ? '2px solid var(--color-primary)' : '2px solid #e2e8f0',
                      borderRadius: '8px',
                      background: deliveryOption === 'pickup' ? '#f0fdf4' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>🏪</span>
                    <span style={{fontWeight: '500'}}>Store Pickup</span>
                  </button>
                </div>
                
                {deliveryOption === 'pickup' && (
                  <div style={{padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
                    <h4 style={{fontSize: '1rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '0.5rem'}}>Pickup Location</h4>
                    <p style={{color: '#64748b', fontSize: '0.875rem', margin: 0}}>eCare Pharmacy Main Store<br/>123 Health Plaza, Victoria Island, Lagos</p>
                    <p style={{color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: '600', marginTop: '0.5rem'}}>Ready in 30 minutes • FREE</p>
                  </div>
                )}
              </div>

              <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', marginBottom: '1.5rem'}}>
                <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1.5rem'}}>
                  {deliveryOption === 'delivery' ? 'Delivery Address' : 'Contact Information'}
                </h2>
                
                <div className="form-row" style={{marginBottom: '1rem'}}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    style={{padding: '0.875rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s'}}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    style={{padding: '0.875rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s'}}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
                
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  style={{width: '100%', padding: '0.875rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', marginBottom: '1rem', outline: 'none', transition: 'border-color 0.2s'}}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
                
                <div className="city-zip-row">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    style={{padding: '0.875rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s'}}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    style={{padding: '0.875rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s'}}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
              </div>

              {/* Delivery Partner Selection */}
              {deliveryOption === 'delivery' && (
                <div style={{marginBottom: '1.5rem'}}>
                  <DeliverySelection 
                    customerAddress={formData.address ? `${formData.address}, ${formData.city}` : 'Your delivery location'}
                    onSelectDelivery={setSelectedDeliveryPartner}
                  />
                </div>
              )}

              <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9'}}>
                <h2 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1.5rem'}}>
                  Payment Method
                </h2>
                
                <div className="payment-methods" style={{marginBottom: '1.5rem'}}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paystack')}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      border: paymentMethod === 'paystack' ? '2px solid #3b82f6' : '2px solid #e2e8f0',
                      borderRadius: '8px',
                      background: paymentMethod === 'paystack' ? '#f0f9ff' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>💳</span>
                    <span style={{fontWeight: '500'}}>Paystack</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      border: paymentMethod === 'transfer' ? '2px solid #3b82f6' : '2px solid #e2e8f0',
                      borderRadius: '8px',
                      background: paymentMethod === 'transfer' ? '#f0f9ff' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>🏦</span>
                    <span style={{fontWeight: '500'}}>Bank Transfer</span>
                  </button>
                </div>

                {paymentMethod === 'paystack' && (
                  <div style={{padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '1rem'}}>
                    <p style={{margin: 0, fontSize: '0.875rem', color: '#64748b'}}>
                      You will be redirected to Paystack to complete your payment securely.
                      Accepted: Visa, Mastercard, Verve, Bank Transfer, USSD
                    </p>
                  </div>
                )}
                
                {paymentMethod === 'transfer' && (
                  <div style={{padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '1rem'}}>
                    <p style={{margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#64748b', fontWeight: '600'}}>Bank Transfer Details:</p>
                    <p style={{margin: 0, fontSize: '0.875rem', color: '#64748b'}}>Account: 1234567890 | Bank: GTBank | Name: eCare Pharmacy Ltd</p>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={processing || (!isAuthenticated && !isAuthModalOpen)}
                  style={{
                    background: processing ? '#94a3b8' : 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: processing ? 'not-allowed' : 'pointer',
                    width: '100%',
                    boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => !processing && (e.target.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => !processing && (e.target.style.transform = 'translateY(0)')}
                >
                  {processing ? 'Processing...' : (!isAuthenticated ? 'Sign In to Complete Order' : `Complete Order • ${formatCurrency(convertPrice(total.toString()))}`)}
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div style={{backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', height: 'fit-content'}}>
              <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1.5rem'}}>
                Order Summary ({getCartCount()} items)
              </h3>
              
              <div style={{marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto'}}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{display: 'flex', gap: '0.75rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9'}}>
                    <img
                      src={item.image || item.images?.edges?.[0]?.node?.url || '/placeholder.jpg'}
                      alt={item.title}
                      style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0'}}
                    />
                    <div style={{flex: 1}}>
                      <h4 style={{fontSize: '0.875rem', fontWeight: '500', color: '#1e293b', margin: '0 0 0.25rem 0', lineHeight: '1.3'}}>
                        {item.title}
                      </h4>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span style={{fontSize: '0.75rem', color: '#64748b'}}>Qty: {item.quantity}</span>
                        <span style={{fontSize: '0.875rem', fontWeight: '600', color: '#059669'}}>
                          {formatCurrency(convertPrice(item.price || item.priceRange?.minVariantPrice?.amount || 0) * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{borderTop: '1px solid #f1f5f9', paddingTop: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                  <span style={{color: '#64748b'}}>Subtotal</span>
                  <span style={{fontWeight: '600'}}>{formatCurrency(convertPrice(subtotal.toString()))}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                  <span style={{color: '#64748b'}}>
                    {deliveryOption === 'pickup' ? 'Pickup' : 'Delivery'}
                    {selectedDeliveryPartner && ` (${selectedDeliveryPartner.name})`}
                  </span>
                  <span style={{fontWeight: '600', color: deliveryFee === 0 ? '#059669' : '#1e293b'}}>
                    {deliveryFee === 0 ? 'Free' : formatCurrency(deliveryFee)}
                  </span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
                  <span style={{color: '#64748b'}}>Tax (7.5%)</span>
                  <span style={{fontWeight: '600'}}>{formatCurrency(convertPrice(tax.toString()))}</span>
                </div>
                
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', paddingTop: '1rem', borderTop: '2px solid #f1f5f9'}}>
                  <span>Total</span>
                  <span style={{color: '#059669'}}>{formatCurrency(convertPrice(total.toString()))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </div>
      
      <style jsx>{`
        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        @media (min-width: 768px) {
          .checkout-grid {
            grid-template-columns: 1fr 350px;
          }
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        @media (min-width: 768px) {
          .form-row {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        .city-zip-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        @media (min-width: 768px) {
          .city-zip-row {
            grid-template-columns: 1fr 120px;
          }
        }
        
        .payment-methods {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        @media (min-width: 768px) {
          .payment-methods {
            flex-direction: row;
          }
        }
        
        .card-details {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        @media (min-width: 768px) {
          .card-details {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </>
  );
}