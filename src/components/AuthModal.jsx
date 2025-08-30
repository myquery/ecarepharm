import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { XMarkIcon, UserIcon, EnvelopeIcon, LockClosedIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function AuthModal({ isOpen, onClose, mode: initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (mode === 'login') {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData);
      }

      if (result.success) {
        onClose();
        setFormData({ email: '', password: '', name: '', phone: '', address: '' });
      } else {
        alert(result.error || 'Authentication failed');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '2rem',
        width: '100%',
        maxWidth: '400px',
        margin: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-secondary-dark)', margin: 0}}>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <button onClick={onClose} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
            <XMarkIcon style={{width: '24px', height: '24px', color: '#64748b'}} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {mode === 'register' && (
              <>
                <div style={{position: 'relative'}}>
                  <UserIcon style={{position: 'absolute', left: '12px', top: '12px', width: '20px', height: '20px', color: '#64748b'}} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{width: '100%', padding: '12px 12px 12px 44px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                    required
                  />
                </div>
                <div style={{position: 'relative'}}>
                  <PhoneIcon style={{position: 'absolute', left: '12px', top: '12px', width: '20px', height: '20px', color: '#64748b'}} />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    style={{width: '100%', padding: '12px 12px 12px 44px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                    required
                  />
                </div>
                <div style={{position: 'relative'}}>
                  <MapPinIcon style={{position: 'absolute', left: '12px', top: '12px', width: '20px', height: '20px', color: '#64748b'}} />
                  <input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    style={{width: '100%', padding: '12px 12px 12px 44px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                    required
                  />
                </div>
              </>
            )}
            
            <div style={{position: 'relative'}}>
              <EnvelopeIcon style={{position: 'absolute', left: '12px', top: '12px', width: '20px', height: '20px', color: '#64748b'}} />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={{width: '100%', padding: '12px 12px 12px 44px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                required
              />
            </div>
            
            <div style={{position: 'relative'}}>
              <LockClosedIcon style={{position: 'absolute', left: '12px', top: '12px', width: '20px', height: '20px', color: '#64748b'}} />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                style={{width: '100%', padding: '12px 12px 12px 44px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '1rem'}}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
            </button>
          </div>
        </form>

        <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
          <p style={{color: '#64748b', fontSize: '0.875rem'}}>
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              style={{background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: '600'}}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}