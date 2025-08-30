import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TruckIcon, UserIcon, PhoneIcon, MapPinIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function LogisticsSignup() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    vehicleType: '',
    licenseNumber: '',
    bankAccount: '',
    bankName: '',
    accountName: '',
    emergencyContact: '',
    workingAreas: []
  });

  const vehicleTypes = [
    { id: 'motorcycle', name: 'Motorcycle', icon: '🏍️' },
    { id: 'bicycle', name: 'Bicycle', icon: '🚲' },
    { id: 'car', name: 'Car', icon: '🚗' },
    { id: 'van', name: 'Van', icon: '🚐' }
  ];

  const lagosAreas = [
    'Victoria Island', 'Ikoyi', 'Lekki', 'Ajah', 'Ikeja', 'Surulere', 
    'Yaba', 'Lagos Island', 'Apapa', 'Festac', 'Alaba', 'Oshodi'
  ];

  const handleAreaToggle = (area) => {
    setFormData(prev => ({
      ...prev,
      workingAreas: prev.workingAreas.includes(area)
        ? prev.workingAreas.filter(a => a !== area)
        : [...prev.workingAreas, area]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted successfully! We will review and contact you within 48 hours.');
  };

  return (
    <>
      <Head>
        <title>Join as Logistics Partner - eCare Pharmacy</title>
      </Head>
      
      <div style={{minHeight: '100vh', backgroundColor: '#f8fafc'}}>
        <Header />
        
        <div style={{padding: '3rem 1.5rem'}}>
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            
            {/* Header */}
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <TruckIcon style={{width: '64px', height: '64px', color: 'var(--color-primary)', margin: '0 auto 1rem'}} />
              <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-secondary-dark)', marginBottom: '1rem'}}>
                Become a Logistics Partner
              </h1>
              <p style={{color: '#64748b', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto'}}>
                Join our delivery network and earn money by delivering healthcare products to customers across Lagos
              </p>
            </div>

            {/* Benefits */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              <div style={{backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
                <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>💰</div>
                <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '0.5rem'}}>
                  Flexible Earnings
                </h3>
                <p style={{color: '#64748b', fontSize: '0.875rem', margin: 0}}>
                  Earn ₦1,500 - ₦3,000 per delivery
                </p>
              </div>
              
              <div style={{backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
                <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>⏰</div>
                <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '0.5rem'}}>
                  Flexible Hours
                </h3>
                <p style={{color: '#64748b', fontSize: '0.875rem', margin: 0}}>
                  Work when you want, choose your orders
                </p>
              </div>
              
              <div style={{backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
                <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>🚀</div>
                <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '0.5rem'}}>
                  Quick Payments
                </h3>
                <p style={{color: '#64748b', fontSize: '0.875rem', margin: 0}}>
                  Get paid instantly after delivery
                </p>
              </div>
            </div>

            {/* Application Form */}
            <div style={{backgroundColor: 'white', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}>
              <h2 style={{fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '1.5rem'}}>
                Application Form
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div style={{display: 'grid', gap: '1.5rem'}}>
                  
                  {/* Personal Information */}
                  <div>
                    <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <UserIcon style={{width: '20px', height: '20px'}} />
                      Personal Information
                    </h3>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
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
                        placeholder="Emergency Contact"
                        value={formData.emergencyContact}
                        onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                        style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                        required
                      />
                    </div>
                    <textarea
                      placeholder="Home Address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', minHeight: '80px', marginTop: '1rem', width: '100%'}}
                      required
                    />
                  </div>

                  {/* Vehicle Information */}
                  <div>
                    <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <TruckIcon style={{width: '20px', height: '20px'}} />
                      Vehicle Information
                    </h3>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '1rem'}}>
                      {vehicleTypes.map((vehicle) => (
                        <div
                          key={vehicle.id}
                          onClick={() => setFormData({...formData, vehicleType: vehicle.id})}
                          style={{
                            backgroundColor: formData.vehicleType === vehicle.id ? 'var(--color-primary)' : 'white',
                            color: formData.vehicleType === vehicle.id ? 'white' : '#374151',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '1rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <div style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>{vehicle.icon}</div>
                          <div style={{fontSize: '0.875rem', fontWeight: '500'}}>{vehicle.name}</div>
                        </div>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Driver's License Number"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                      style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem', width: '100%'}}
                      required
                    />
                  </div>

                  {/* Working Areas */}
                  <div>
                    <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <MapPinIcon style={{width: '20px', height: '20px'}} />
                      Preferred Working Areas
                    </h3>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem'}}>
                      {lagosAreas.map((area) => (
                        <label
                          key={area}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem',
                            backgroundColor: formData.workingAreas.includes(area) ? '#f0fdf4' : 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.875rem'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.workingAreas.includes(area)}
                            onChange={() => handleAreaToggle(area)}
                            style={{margin: 0}}
                          />
                          {area}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Banking Information */}
                  <div>
                    <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <DocumentTextIcon style={{width: '20px', height: '20px'}} />
                      Banking Information
                    </h3>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
                      <input
                        type="text"
                        placeholder="Bank Name"
                        value={formData.bankName}
                        onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                        style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Account Number"
                        value={formData.bankAccount}
                        onChange={(e) => setFormData({...formData, bankAccount: e.target.value})}
                        style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Account Name"
                        value={formData.accountName}
                        onChange={(e) => setFormData({...formData, accountName: e.target.value})}
                        style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                        required
                      />
                    </div>
                  </div>

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
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}