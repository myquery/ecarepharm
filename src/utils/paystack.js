// Paystack integration utilities
export const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_dummy_key_for_demo';

export const initializePayment = (paymentData) => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Paystack can only be initialized in browser'));
      return;
    }

    // Load Paystack script if not already loaded
    if (!window.PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.onload = () => initPayment();
      script.onerror = () => reject(new Error('Failed to load Paystack'));
      document.head.appendChild(script);
    } else {
      initPayment();
    }

    function initPayment() {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: paymentData.email,
        amount: paymentData.amount * 100, // Convert to kobo
        currency: 'NGN',
        ref: paymentData.reference,
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: paymentData.customerName
            },
            {
              display_name: "Order ID",
              variable_name: "order_id", 
              value: paymentData.orderId
            }
          ]
        },
        callback: function(response) {
          resolve({
            success: true,
            reference: response.reference,
            message: 'Payment successful'
          });
        },
        onClose: function() {
          reject({
            success: false,
            message: 'Payment cancelled by user'
          });
        }
      });
      
      handler.openIframe();
    }
  });
};

export const generatePaymentReference = () => {
  return 'ecare_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

export const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount);
};