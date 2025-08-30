import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircleIcon, TruckIcon, ClockIcon } from '@heroicons/react/24/outline';
import { formatCurrency, convertPrice } from '../utils/currency';

export default function OrderConfirmation() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder));
    } else {
      setOrderDetails({
        orderId: 'EC-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        paymentStatus: 'completed',
        totals: { total: 44535 }
      });
    }
  }, []);

  if (!orderDetails) {
    return (
      <>
        <Head>
          <title>Order Confirmation - eCare Pharmacy</title>
        </Head>
        <div style={{minHeight: '100vh', backgroundColor: '#f8fafc'}}>
          <Header />
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh'}}>
            <div>Loading...</div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Order Confirmed - PharmaCare</title>
      </Head>

      <div style={{minHeight: '100vh', backgroundColor: '#f8fafc'}}>
        <Header />
        
        <div style={{padding: '3rem 1.5rem'}}>
          <div style={{maxWidth: '800px', margin: '0 auto'}}>
            <div style={{backgroundColor: 'white', borderRadius: '16px', padding: '3rem', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}>
              <CheckCircleIcon style={{width: '80px', height: '80px', color: '#059669', margin: '0 auto 1.5rem'}} />
              
              <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#059669', marginBottom: '1rem'}}>
                Order Confirmed!
              </h1>
              
              <p style={{color: '#64748b', marginBottom: '2rem', fontSize: '1.125rem'}}>
                Thank you for your order. We've received your payment and will process your order shortly.
              </p>
              
              <div style={{backgroundColor: '#f8fafc', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', textAlign: 'left'}}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '1rem'}}>Order Details</h3>
                
                <div style={{display: 'grid', gap: '0.75rem'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{fontWeight: '600', color: '#374151'}}>Order ID:</span>
                    <span style={{color: '#059669', fontWeight: '700'}}>{orderDetails.orderId}</span>
                  </div>
                  
                  {orderDetails.paymentReference && (
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <span style={{fontWeight: '600', color: '#374151'}}>Payment Reference:</span>
                      <span style={{color: '#374151', fontFamily: 'monospace'}}>{orderDetails.paymentReference}</span>
                    </div>
                  )}
                  
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{fontWeight: '600', color: '#374151'}}>Payment Status:</span>
                    <span style={{
                      color: orderDetails.paymentStatus === 'completed' ? '#059669' : '#f59e0b', 
                      fontWeight: '600', 
                      textTransform: 'capitalize'
                    }}>
                      {orderDetails.paymentStatus}
                    </span>
                  </div>
                  
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span style={{fontWeight: '600', color: '#374151'}}>Total Amount:</span>
                    <span style={{color: '#059669', fontWeight: '700', fontSize: '1.125rem'}}>
                      {formatCurrency(convertPrice(orderDetails.totals?.total || 0))}
                    </span>
                  </div>
                  
                  {orderDetails.delivery?.partner && (
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <span style={{fontWeight: '600', color: '#374151'}}>Delivery Partner:</span>
                      <span style={{color: '#374151', fontWeight: '600'}}>{orderDetails.delivery.partner.name}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#dbeafe', borderRadius: '12px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <TruckIcon style={{width: '24px', height: '24px', color: '#3b82f6'}} />
                  <span style={{color: '#1e40af', fontWeight: '600'}}>Preparing for delivery</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <ClockIcon style={{width: '24px', height: '24px', color: '#3b82f6'}} />
                  <span style={{color: '#1e40af', fontWeight: '600'}}>2-3 business days</span>
                </div>
              </div>
              
              <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                <button 
                  onClick={() => router.push('/')}
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Continue Shopping
                </button>
                <button 
                  onClick={() => window.print()}
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    backgroundColor: 'white',
                    color: '#3b82f6',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: '2px solid #3b82f6',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}