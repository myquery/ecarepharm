import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { PHARMACY_CATEGORIES, getCategoryIcon } from '../data/categories';

export default function CategoryMenu({ onCategorySelect, selectedCategory }) {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubcategories, setExpandedSubcategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleSubcategory = (subcategory) => {
    setExpandedSubcategories(prev => ({
      ...prev,
      [subcategory]: !prev[subcategory]
    }));
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '1rem',
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        fontWeight: '600',
        fontSize: '1.125rem'
      }}>
        Shop by Category
      </div>
      
      <div style={{maxHeight: '500px', overflowY: 'auto'}}>
        <button
          onClick={() => onCategorySelect('All Products')}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            textAlign: 'left',
            border: 'none',
            backgroundColor: selectedCategory === 'All Products' ? '#f0fdf4' : 'white',
            color: selectedCategory === 'All Products' ? 'var(--color-primary)' : '#374151',
            cursor: 'pointer',
            borderBottom: '1px solid #f1f5f9',
            fontWeight: selectedCategory === 'All Products' ? '600' : '400'
          }}
        >
          🏪 All Products
        </button>

        {Object.entries(PHARMACY_CATEGORIES).map(([category, data]) => (
          <div key={category}>
            <button
              onClick={() => toggleCategory(category)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                textAlign: 'left',
                border: 'none',
                backgroundColor: 'white',
                color: '#374151',
                cursor: 'pointer',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: '500'
              }}
            >
              <span>
                {data.icon} {category}
              </span>
              {expandedCategories[category] ? 
                <ChevronDownIcon style={{width: '16px', height: '16px'}} /> : 
                <ChevronRightIcon style={{width: '16px', height: '16px'}} />
              }
            </button>
            
            {expandedCategories[category] && (
              <div style={{backgroundColor: '#f8fafc'}}>
                {Object.entries(data.subcategories).map(([subcategory, subData]) => (
                  <div key={subcategory}>
                    <button
                      onClick={() => toggleSubcategory(`${category}-${subcategory}`)}
                      style={{
                        width: '100%',
                        padding: '0.5rem 2rem',
                        textAlign: 'left',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#64748b',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{subcategory}</span>
                      {expandedSubcategories[`${category}-${subcategory}`] ? 
                        <ChevronDownIcon style={{width: '14px', height: '14px'}} /> : 
                        <ChevronRightIcon style={{width: '14px', height: '14px'}} />
                      }
                    </button>
                    
                    {expandedSubcategories[`${category}-${subcategory}`] && (
                      <div>
                        {subData.items.map((item) => (
                          <button
                            key={item}
                            onClick={() => onCategorySelect(item)}
                            style={{
                              width: '100%',
                              padding: '0.375rem 3rem',
                              textAlign: 'left',
                              border: 'none',
                              backgroundColor: selectedCategory === item ? '#f0fdf4' : 'transparent',
                              color: selectedCategory === item ? 'var(--color-primary)' : '#64748b',
                              cursor: 'pointer',
                              fontSize: '0.8125rem',
                              fontWeight: selectedCategory === item ? '600' : '400'
                            }}
                          >
                            • {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}