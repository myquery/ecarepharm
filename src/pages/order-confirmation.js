import { useRouter } from 'next/router';
import Head from 'next/head';
import { formatCurrency } from '../utils/currency';

export default function OrderConfirmation() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Order Confirmed - PharmaCare</title>
      </Head>

      <div style={{fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh'}}>
        <header style={{backgroundColor: '#1e40af', color: 'white', padding: '1rem 0'}}>
          <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem'}}>
            <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', margin: 0}}>PharmaCare</h1>
          </div>
        </header>

        <div style={{maxWidth: '600px', margin: '0 auto', padding: '4rem 1.5rem', textAlign: 'center'}}>
          <div style={{backgroundColor: 'white', borderRadius: '16px', padding: '3rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'}}>
            
            <div style={{backgroundColor: '#dcfce7', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto'}}>
              <svg width="40" height="40" fill="#059669" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>

            <h1 style={{fontSize: '2rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '1rem'}}>
              Order Confirmed!
            </h1>
            
            <p style={{color: '#64748b', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: '1.6'}}>
              Thank you for your order. We've received your payment and will process your order shortly.
            </p>

            <div style={{backgroundColor: '#f8fafc', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left'}}>
              <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem'}}>
                Order Details
              </h3>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                <span style={{color: '#64748b'}}>Order Number:</span>
                <span style={{fontWeight: '600'}}>#PC-2024-001</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                <span style={{color: '#64748b'}}>Total:</span>
                <span style={{fontWeight: '600'}}>{formatCurrency(44535)}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{color: '#64748b'}}>Estimated Delivery:</span>
                <span style={{fontWeight: '600'}}>2-3 business days</span>
              </div>
            </div>

            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
              <button
                onClick={() => router.push('/')}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '25px',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(59,130,246,0.3)'
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}