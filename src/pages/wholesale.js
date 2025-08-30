import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BuildingStorefrontIcon, UserGroupIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function Wholesale() {
  const [customerType, setCustomerType] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    businessType: '',
    licenseNumber: ''
  });

  const customerTypes = [
    { id: 'retail_pharmacy', name: 'Retail Pharmacy', discount: '15%' },
    { id: 'wholesale_pharmacy', name: 'Wholesale Pharmacy', discount: '25%' },
    { id: 'hospital', name: 'Hospital', discount: '20%' },
    { id: 'institution', name: 'Institution', discount: '18%' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Wholesale application submitted! We will review and contact you within 24 hours.');
  };

  return (
    <>
      <Head>
        <title>Wholesale Program - eCare Pharmacy</title>
      </Head>
      
      <div style={{minHeight: '100vh', backgroundColor: '#f8fafc'}}>
        <Header />
        
        <div style={{padding: '3rem 1.5rem'}}>
          <div style={{maxWidth: '1000px', margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-secondary-dark)', marginBottom: '1rem'}}>
                Wholesale Program
              </h1>
              <p style={{color: '#64748b', fontSize: '1.125rem'}}>
                Special pricing for healthcare professionals and institutions
              </p>
            </div>

            {/* Customer Types */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem'}}>
              {customerTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setCustomerType(type.id)}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    border: customerType === type.id ? '2px solid var(--color-primary)' : '1px solid #e2e8f0',
                    boxShadow: customerType === type.id ? '0 8px 20px rgba(16,185,129,0.15)' : '0 2px 8px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <BuildingStorefrontIcon style={{width: '32px', height: '32px', color: 'var(--color-primary)', marginBottom: '1rem'}} />
                  <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '0.5rem'}}>
                    {type.name}
                  </h3>
                  <p style={{color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 'bold'}}>
                    Up to {type.discount} off
                  </p>
                </div>
              ))}
            </div>

            {/* Application Form */}
            {customerType && (
              <div style={{backgroundColor: 'white', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}>
                <h2 style={{fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <UserGroupIcon style={{width: '24px', height: '24px'}} />
                  Wholesale Application
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div style={{display: 'grid', gap: '1.5rem'}}>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
                      <input
                        type="text"
                        placeholder="Business Name"
                        value={formData.businessName}
                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                        style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Contact Person"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                        style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                        required
                      />
                    </div>
                    
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                        required
                      />
                    </div>
                    
                    <textarea
                      placeholder="Business Address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', minHeight: '80px'}}
                      required
                    />
                    
                    <input
                      type="text"
                      placeholder="License/Registration Number"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                      style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                      required
                    />

                    <button
                      type="submit"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        padding: '1rem 2rem',
                        borderRadius: '12px',
                        border: 'none',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}