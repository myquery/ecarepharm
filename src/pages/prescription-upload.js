import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import { CloudArrowUpIcon, DocumentTextIcon, UserIcon, PhoneIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function PrescriptionUpload() {
  const { user, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientSex: '',
    doctorName: '',
    doctorPhone: '',
    doctorEmail: '',
    prescriptionFile: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      // Mock API call - replace with actual endpoint
      const prescriptionData = {
        ...formData,
        customerId: user.id,
        customerEmail: user.email,
        uploadedAt: new Date().toISOString()
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Prescription uploaded successfully! Our pharmacists will review it within 2 hours and contact you.');
      
      // Reset form
      setFormData({
        patientName: '',
        patientAge: '',
        patientSex: '',
        doctorName: '',
        doctorPhone: '',
        doctorEmail: '',
        prescriptionFile: null
      });
    } catch (error) {
      alert('Failed to upload prescription. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Upload Prescription - eCare Pharmacy</title>
      </Head>
      
      <div style={{minHeight: '100vh', backgroundColor: '#f8fafc'}}>
        <Header />
        
        <div style={{padding: '3rem 1.5rem'}}>
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-secondary-dark)', marginBottom: '1rem'}}>
                Upload Prescription
              </h1>
              <p style={{color: '#64748b', fontSize: '1.125rem'}}>
                Upload your prescription for professional verification and fulfillment
              </p>
            </div>

            {!isAuthenticated && (
              <div style={{
                backgroundColor: '#fef3c7',
                border: '1px solid #f59e0b',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <ExclamationTriangleIcon style={{width: '24px', height: '24px', color: '#f59e0b'}} />
                <div>
                  <p style={{margin: 0, color: '#92400e', fontWeight: '600'}}>Account Required</p>
                  <p style={{margin: 0, color: '#92400e', fontSize: '0.875rem'}}>Please sign in or create an account to upload prescriptions</p>
                </div>
              </div>
            )}

            <div style={{backgroundColor: 'white', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}>
              <form onSubmit={handleSubmit}>
                <div style={{display: 'grid', gap: '1.5rem'}}>
                  
                  {/* Patient Information */}
                  <div>
                    <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <UserIcon style={{width: '20px', height: '20px'}} />
                      Patient Information
                    </h3>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                      <input
                        type="text"
                        placeholder="Patient Name"
                        value={formData.patientName}
                        onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                        style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                        required
                      />
                      <input
                        type="number"
                        placeholder="Age"
                        value={formData.patientAge}
                        onChange={(e) => setFormData({...formData, patientAge: e.target.value})}
                        style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                        required
                      />
                      <select
                        value={formData.patientSex}
                        onChange={(e) => setFormData({...formData, patientSex: e.target.value})}
                        style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                        required
                      >
                        <option value="">Select Sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  {/* Doctor Information */}
                  <div>
                    <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <PhoneIcon style={{width: '20px', height: '20px'}} />
                      Doctor Information
                    </h3>
                    <div style={{display: 'grid', gap: '1rem'}}>
                      <input
                        type="text"
                        placeholder="Doctor Name"
                        value={formData.doctorName}
                        onChange={(e) => setFormData({...formData, doctorName: e.target.value})}
                        style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                        required
                      />
                      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                        <input
                          type="tel"
                          placeholder="Doctor Phone"
                          value={formData.doctorPhone}
                          onChange={(e) => setFormData({...formData, doctorPhone: e.target.value})}
                          style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                          required
                        />
                        <input
                          type="email"
                          placeholder="Doctor Email"
                          value={formData.doctorEmail}
                          onChange={(e) => setFormData({...formData, doctorEmail: e.target.value})}
                          style={{padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <DocumentTextIcon style={{width: '20px', height: '20px'}} />
                      Prescription Document
                    </h3>
                    <div style={{
                      border: '2px dashed #e2e8f0',
                      borderRadius: '12px',
                      padding: '2rem',
                      textAlign: 'center',
                      backgroundColor: '#f8fafc'
                    }}>
                      <CloudArrowUpIcon style={{width: '48px', height: '48px', color: 'var(--color-primary)', margin: '0 auto 1rem'}} />
                      <p style={{marginBottom: '1rem', color: '#64748b'}}>
                        Upload prescription image or PDF
                      </p>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setFormData({...formData, prescriptionFile: e.target.files[0]})}
                        style={{marginBottom: '1rem'}}
                        required
                      />
                      <p style={{fontSize: '0.875rem', color: '#94a3b8'}}>
                        Supported formats: JPG, PNG, PDF (Max 5MB)
                      </p>
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
                    Upload Prescription
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
        
        <Footer />
      </div>
    </>
  );
}