export const dummyProducts = [
  {
    id: '1',
    handle: 'paracetamol-500mg',
    title: 'Paracetamol 500mg Tablets',
    description: 'Effective pain relief and fever reducer. Pack of 20 tablets. Suitable for adults and children over 12 years.',
    priceRange: {
      minVariantPrice: {
        amount: '8.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [{
        node: {
          url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop',
          altText: 'Paracetamol tablets'
        }
      }]
    },
    variants: {
      edges: [{
        node: {
          id: 'var1',
          availableForSale: true
        }
      }]
    },
    category: 'Pain Relief'
  },
  {
    id: '2',
    handle: 'vitamin-d3-1000iu',
    title: 'Vitamin D3 1000 IU Capsules',
    description: 'Essential vitamin D supplement for bone health and immune support. 60 capsules per bottle.',
    priceRange: {
      minVariantPrice: {
        amount: '15.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [{
        node: {
          url: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca6?w=400&h=400&fit=crop',
          altText: 'Vitamin D3 capsules'
        }
      }]
    },
    variants: {
      edges: [{
        node: {
          id: 'var2',
          availableForSale: true
        }
      }]
    },
    category: 'Vitamins'
  },
  {
    id: '3',
    handle: 'ibuprofen-400mg',
    title: 'Ibuprofen 400mg Tablets',
    description: 'Anti-inflammatory pain relief medication. Effective for headaches, muscle pain, and inflammation.',
    priceRange: {
      minVariantPrice: {
        amount: '12.50',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [{
        node: {
          url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop',
          altText: 'Ibuprofen tablets'
        }
      }]
    },
    variants: {
      edges: [{
        node: {
          id: 'var3',
          availableForSale: true
        }
      }]
    },
    category: 'Pain Relief'
  },
  {
    id: '4',
    handle: 'omega-3-fish-oil',
    title: 'Omega-3 Fish Oil Capsules',
    description: 'High-quality fish oil supplement rich in EPA and DHA. Supports heart and brain health.',
    priceRange: {
      minVariantPrice: {
        amount: '24.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [{
        node: {
          url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
          altText: 'Omega-3 fish oil capsules'
        }
      }]
    },
    variants: {
      edges: [{
        node: {
          id: 'var4',
          availableForSale: true
        }
      }]
    },
    category: 'Supplements'
  },
  {
    id: '5',
    handle: 'antiseptic-cream',
    title: 'Antiseptic Healing Cream',
    description: 'Topical antiseptic cream for minor cuts, scrapes, and burns. 50g tube with applicator.',
    priceRange: {
      minVariantPrice: {
        amount: '6.75',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [{
        node: {
          url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
          altText: 'Antiseptic cream tube'
        }
      }]
    },
    variants: {
      edges: [{
        node: {
          id: 'var5',
          availableForSale: true
        }
      }]
    },
    category: 'First Aid'
  },
  {
    id: '6',
    handle: 'multivitamin-tablets',
    title: 'Daily Multivitamin Tablets',
    description: 'Complete daily vitamin and mineral supplement. 30 tablets for one month supply.',
    priceRange: {
      minVariantPrice: {
        amount: '18.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [{
        node: {
          url: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca6?w=400&h=400&fit=crop',
          altText: 'Multivitamin tablets'
        }
      }]
    },
    variants: {
      edges: [{
        node: {
          id: 'var6',
          availableForSale: true
        }
      }]
    },
    category: 'Vitamins'
  },
  {
    id: '7',
    handle: 'cough-syrup',
    title: 'Honey & Lemon Cough Syrup',
    description: 'Natural cough suppressant with honey and lemon. Soothes throat irritation and reduces coughing.',
    priceRange: {
      minVariantPrice: {
        amount: '9.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [{
        node: {
          url: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop',
          altText: 'Cough syrup bottle'
        }
      }]
    },
    variants: {
      edges: [{
        node: {
          id: 'var7',
          availableForSale: true
        }
      }]
    },
    category: 'Cold & Flu'
  },
  {
    id: '8',
    handle: 'blood-pressure-monitor',
    title: 'Digital Blood Pressure Monitor',
    description: 'Accurate digital blood pressure monitor with large display. Includes carrying case and batteries.',
    priceRange: {
      minVariantPrice: {
        amount: '45.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [{
        node: {
          url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
          altText: 'Digital blood pressure monitor'
        }
      }]
    },
    variants: {
      edges: [{
        node: {
          id: 'var8',
          availableForSale: true
        }
      }]
    },
    category: 'Medical Devices'
  }
];

export const categories = [
  'All Products',
  'Pain Relief',
  'Vitamins',
  'Supplements',
  'First Aid',
  'Cold & Flu',
  'Medical Devices'
];