import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TruckIcon, MapPinIcon, CurrencyDollarIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function LogisticsPartner() {
  const [activeTab, setActiveTab] = useState('available');
  const [partnerInfo, setPartnerInfo] = useState({
    name: 'John Delivery Services',
    phone: '+234 801 234 5678',
    vehicle: 'Motorcycle',
    rating: 4.8
  });

  // Mock orders data
  const [orders] = useState([
    {
      id: 'ORD-001',
      customer: 'Sarah Johnson',
      address: '15 Victoria Island, Lagos',
      distance: '3.2 km',
      deliveryFee: 1500,
      items: 3,
      paymentMethod: 'Cash',
      status: 'available',
      priority: 'urgent',
      estimatedTime: '25 mins'
    },
    {
      id: 'ORD-002', 
      customer: 'Michael Adebayo',
      address: '42 Ikeja GRA, Lagos',
      distance: '5.8 km',
      deliveryFee: 2000,
      items: 1,
      paymentMethod: 'Transfer',
      status: 'available',
      priority: 'normal',
      estimatedTime: '35 mins'
    },
    {
      id: 'ORD-003',
      customer: 'Grace Okafor',
      address: '8 Lekki Phase 1, Lagos',
      distance: '7.1 km',
      deliveryFee: 2500,
      items: 5,
      paymentMethod: 'Cash',
      status: 'accepted',
      priority: 'normal',
      estimatedTime: '40 mins'
    }
  ]);

  const [acceptedOrders, setAcceptedOrders] = useState(
    orders.filter(order => order.status === 'accepted')
  );
  const [availableOrders, setAvailableOrders] = useState(
    orders.filter(order => order.status === 'available')
  );

  const acceptOrder = (orderId) => {
    const order = availableOrders.find(o => o.id === orderId);
    if (order) {
      setAcceptedOrders(prev => [...prev, {...order, status: 'accepted'}]);
      setAvailableOrders(prev => prev.filter(o => o.id !== orderId));
      alert(`Order ${orderId} accepted! Customer will be notified.`);
    }
  };

  const completeDelivery = (orderId) => {
    setAcceptedOrders(prev => prev.filter(o => o.id !== orderId));
    alert(`Delivery completed for ${orderId}! Payment confirmed.`);
  };

  const OrderCard = ({ order, showActions = true }) => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      border: order.priority === 'urgent' ? '2px solid var(--color-accent-red)' : '1px solid #e2e8f0',
      marginBottom: '1rem'
    }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem'}}>
        <div>
          <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: 'var(--color-secondary-dark)', margin: '0 0 0.5rem 0'}}>
            {order.id}
          </h3>
          <p style={{color: '#64748b', margin: 0}}>{order.customer}</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          {order.priority === 'urgent' && (
            <span style={{
              backgroundColor: 'var(--color-accent-red)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: '600',
              padding: '0.25rem 0.5rem',
              borderRadius: '12px'
            }}>
              URGENT
            </span>
          )}
          <span style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '700',
            padding: '0.5rem 1rem',
            borderRadius: '12px'
          }}>
            ₦{order.deliveryFee.toLocaleString()}
          </span>
        </div>
      </div>

      <div style={{display: 'grid', gap: '0.75rem', marginBottom: '1.5rem'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <MapPinIcon style={{width: '16px', height: '16px', color: 'var(--color-primary)'}} />
          <span style={{fontSize: '0.875rem', color: '#374151'}}>{order.address}</span>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <TruckIcon style={{width: '16px', height: '16px', color: '#64748b'}} />
            <span style={{fontSize: '0.875rem', color: '#64748b'}}>{order.distance}</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <ClockIcon style={{width: '16px', height: '16px', color: '#64748b'}} />
            <span style={{fontSize: '0.875rem', color: '#64748b'}}>{order.estimatedTime}</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <CurrencyDollarIcon style={{width: '16px', height: '16px', color: '#64748b'}} />
            <span style={{fontSize: '0.875rem', color: '#64748b'}}>{order.paymentMethod}</span>
          </div>
        </div>
      </div>

      {showActions && (
        <div style={{display: 'flex', gap: '0.75rem'}}>
          {order.status === 'available' ? (
            <button
              onClick={() => acceptOrder(order.id)}
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Accept Order
            </button>
          ) : (
            <button
              onClick={() => completeDelivery(order.id)}
              style={{
                backgroundColor: 'var(--color-success)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Mark as Delivered
            </button>
          )}
          <button
            style={{
              backgroundColor: '#f8fafc',
              color: '#64748b',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Head>
        <title>Logistics Partner Dashboard - eCare Pharmacy</title>
      </Head>
      
      <div style={{minHeight: '100vh', backgroundColor: '#f8fafc'}}>
        <Header />
        
        <div style={{padding: '2rem 1.5rem'}}>
          <div style={{maxWidth: '1200px', margin: '0 auto'}}>
            
            {/* Partner Info Header */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <div>
                  <h1 style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-secondary-dark)', margin: '0 0 0.5rem 0'}}>
                    Logistics Dashboard
                  </h1>
                  <p style={{color: '#64748b', margin: 0}}>Welcome back, {partnerInfo.name}</p>
                </div>
                <div style={{textAlign: 'right'}}>
                  <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)'}}>
                    ⭐ {partnerInfo.rating}
                  </div>
                  <p style={{fontSize: '0.875rem', color: '#64748b', margin: 0}}>{partnerInfo.vehicle}</p>
                </div>
              </div>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div style={{textAlign: 'center', padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '12px'}}>
                  <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-secondary)'}}>
                    {availableOrders.length}
                  </div>
                  <p style={{color: '#64748b', margin: 0}}>Available Orders</p>
                </div>
                <div style={{textAlign: 'center', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '12px'}}>
                  <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)'}}>
                    {acceptedOrders.length}
                  </div>
                  <p style={{color: '#64748b', margin: 0}}>Active Deliveries</p>
                </div>
                <div style={{textAlign: 'center', padding: '1rem', backgroundColor: '#fefce8', borderRadius: '12px'}}>
                  <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-accent-orange)'}}>
                    ₦12,500
                  </div>
                  <p style={{color: '#64748b', margin: 0}}>Today's Earnings</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem'}}>
              <button
                onClick={() => setActiveTab('available')}
                style={{
                  backgroundColor: activeTab === 'available' ? 'var(--color-primary)' : 'white',
                  color: activeTab === 'available' ? 'white' : '#64748b',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Available Orders ({availableOrders.length})
              </button>
              <button
                onClick={() => setActiveTab('active')}
                style={{
                  backgroundColor: activeTab === 'active' ? 'var(--color-primary)' : 'white',
                  color: activeTab === 'active' ? 'white' : '#64748b',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Active Deliveries ({acceptedOrders.length})
              </button>
            </div>

            {/* Orders List */}
            <div>
              {activeTab === 'available' && (
                <div>
                  <h2 style={{fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '1.5rem'}}>
                    Available Orders
                  </h2>
                  {availableOrders.length > 0 ? (
                    availableOrders.map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))
                  ) : (
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '16px',
                      padding: '3rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}>
                      <TruckIcon style={{width: '48px', height: '48px', color: '#94a3b8', margin: '0 auto 1rem'}} />
                      <p style={{color: '#64748b', fontSize: '1.125rem'}}>No available orders at the moment</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'active' && (
                <div>
                  <h2 style={{fontSize: '1.5rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '1.5rem'}}>
                    Active Deliveries
                  </h2>
                  {acceptedOrders.length > 0 ? (
                    acceptedOrders.map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))
                  ) : (
                    <div style={{
                      backgroundColor: 'white',
                      borderRadius: '16px',
                      padding: '3rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}>
                      <CheckCircleIcon style={{width: '48px', height: '48px', color: '#94a3b8', margin: '0 auto 1rem'}} />
                      <p style={{color: '#64748b', fontSize: '1.125rem'}}>No active deliveries</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}