import { useState, useEffect } from 'react';
import { TruckIcon, ClockIcon, StarIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function DeliverySelection({ customerAddress, onSelectDelivery }) {
  const [availablePartners, setAvailablePartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const area = customerAddress?.split(',')[1]?.trim() || 'Lagos';
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3001'}/api/delivery/available/${area}`);
        const data = await response.json();
        
        const partnersWithEstimates = data.partners.map(partner => ({
          ...partner,
          id: partner.id,
          fee: partner.delivery_fee,
          deliveryTime: getEstimatedTime(partner.vehicle),
          distance: getRandomDistance(),
          completedDeliveries: partner.completed_deliveries
        }));
        
        setAvailablePartners(partnersWithEstimates);
      } catch (error) {
        console.error('Error fetching partners:', error);
        const fallbackPartners = [
          {
            id: 'partner-1',
            name: 'John Express',
            rating: 4.8,
            deliveryTime: '20-30 mins',
            fee: 1500,
            vehicle: 'Motorcycle',
            distance: '2.3 km',
            completedDeliveries: 245,
            avatar: '👨🦱'
          },
          {
            id: 'partner-2', 
            name: 'Sarah Quick',
            rating: 4.9,
            deliveryTime: '25-35 mins',
            fee: 1800,
            vehicle: 'Car',
            distance: '3.1 km',
            completedDeliveries: 189,
            avatar: '👩🦰'
          }
        ];
        setAvailablePartners(fallbackPartners);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(fetchPartners, 1500);
  }, [customerAddress]);

  const getEstimatedTime = (vehicle) => {
    const times = {
      'motorcycle': '15-25 mins',
      'bicycle': '20-30 mins', 
      'car': '25-35 mins',
      'van': '30-40 mins'
    };
    return times[vehicle] || '20-30 mins';
  };

  const getRandomDistance = () => {
    return `${(Math.random() * 3 + 1).toFixed(1)} km`;
  };

  const handleSelectPartner = (partner) => {
    setSelectedPartner(partner);
    onSelectDelivery(partner);
  };

  if (loading) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        textAlign: 'center'
      }}>
        <TruckIcon style={{width: '48px', height: '48px', color: 'var(--color-primary)', margin: '0 auto 1rem'}} />
        <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-secondary-dark)', marginBottom: '0.5rem'}}>
          Finding Available Delivery Partners
        </h3>
        <p style={{color: '#64748b', margin: 0}}>Please wait while we locate partners in your area...</p>
        <div style={{
          width: '100%',
          height: '4px',
          backgroundColor: '#f1f5f9',
          borderRadius: '2px',
          marginTop: '1rem',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '30%',
            height: '100%',
            backgroundColor: 'var(--color-primary)',
            borderRadius: '2px',
            animation: 'loading 2s ease-in-out infinite'
          }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem'}}>
        <TruckIcon style={{width: '20px', height: '20px', color: 'var(--color-primary)'}} />
        <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-secondary-dark)', margin: 0}}>
          Choose Delivery Partner
        </h3>
      </div>

      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px'}}>
        <MapPinIcon style={{width: '16px', height: '16px', color: '#64748b'}} />
        <span style={{fontSize: '0.875rem', color: '#64748b'}}>
          Delivering to: {customerAddress || 'Your Location'}
        </span>
      </div>

      <div style={{display: 'grid', gap: '1rem'}}>
        {availablePartners.map((partner) => (
          <div
            key={partner.id}
            onClick={() => handleSelectPartner(partner)}
            style={{
              border: selectedPartner?.id === partner.id ? '2px solid var(--color-primary)' : '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: selectedPartner?.id === partner.id ? '#f0fdf4' : 'white'
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem'
                }}>
                  {partner.avatar}
                </div>
                <div>
                  <h4 style={{fontSize: '1rem', fontWeight: '600', color: 'var(--color-secondary-dark)', margin: '0 0 0.25rem 0'}}>
                    {partner.name}
                  </h4>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                      <StarIcon style={{width: '14px', height: '14px', color: '#f59e0b', fill: '#f59e0b'}} />
                      <span style={{fontSize: '0.875rem', color: '#64748b'}}>{partner.rating}</span>
                    </div>
                    <span style={{fontSize: '0.75rem', color: '#94a3b8'}}>•</span>
                    <span style={{fontSize: '0.875rem', color: '#64748b'}}>{partner.completedDeliveries} deliveries</span>
                  </div>
                </div>
              </div>
              <div style={{textAlign: 'right'}}>
                <div style={{fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-primary)'}}>
                  ₦{partner.fee.toLocaleString()}
                </div>
                <div style={{fontSize: '0.75rem', color: '#64748b'}}>
                  {partner.vehicle}
                </div>
              </div>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem', color: '#64748b'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <ClockIcon style={{width: '14px', height: '14px'}} />
                <span>{partner.deliveryTime}</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <MapPinIcon style={{width: '14px', height: '14px'}} />
                <span>{partner.distance} away</span>
              </div>
            </div>

            {selectedPartner?.id === partner.id && (
              <div style={{
                marginTop: '0.75rem',
                padding: '0.75rem',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                ✓ Selected - {partner.name} will deliver your order
              </div>
            )}
          </div>
        ))}
      </div>

      {availablePartners.length === 0 && !loading && (
        <div style={{textAlign: 'center', padding: '2rem', color: '#64748b'}}>
          <TruckIcon style={{width: '48px', height: '48px', margin: '0 auto 1rem', opacity: 0.5}} />
          <p>No delivery partners available in your area right now.</p>
          <p style={{fontSize: '0.875rem'}}>Please try again in a few minutes.</p>
        </div>
      )}
    </div>
  );
}