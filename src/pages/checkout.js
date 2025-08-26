import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { formatCurrency } from '../utils/currency';

export default function Checkout() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/order-confirmation');
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

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

        <div style={{maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem'}}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem'}}>
            
            {/* Checkout Form */}
            <div style={{backgroundColor: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'}}>
              <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1.5rem'}}>
                Shipping Information
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    style={{padding: '0.75rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    style={{padding: '0.75rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                  />
                </div>
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{width: '100%', padding: '0.75rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', marginBottom: '1rem'}}
                />
                
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  style={{width: '100%', padding: '0.75rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', marginBottom: '1rem'}}
                />
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 120px', gap: '1rem', marginBottom: '2rem'}}>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    style={{padding: '0.75rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    style={{padding: '0.75rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                  />
                </div>

                <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem'}}>
                  Payment Information
                </h3>
                
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  style={{width: '100%', padding: '0.75rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', marginBottom: '1rem'}}
                />
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem'}}>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                    style={{padding: '0.75rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                    style={{padding: '0.75rem', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '25px',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '100%',
                    boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
                  }}
                >
                  Complete Order
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div style={{backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', height: 'fit-content'}}>
              <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem'}}>
                Order Summary
              </h3>
              
              <div style={{borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                  <span style={{color: '#64748b'}}>Subtotal</span>
                  <span style={{fontWeight: '600'}}>{formatCurrency(41235)}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                  <span style={{color: '#64748b'}}>Shipping</span>
                  <span style={{fontWeight: '600', color: '#059669'}}>Free</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                  <span style={{color: '#64748b'}}>Tax</span>
                  <span style={{fontWeight: '600'}}>{formatCurrency(3300)}</span>
                </div>
              </div>
              
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: 'bold', color: '#1e293b'}}>
                <span>Total</span>
                <span>{formatCurrency(44535)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}