export const PHARMACY_CATEGORIES = {
  'Prescription Medicines': {
    icon: '💊',
    subcategories: {
      'Cardiovascular System': {
        items: ['Antihypertensives', 'Antiarrhythmics', 'Antianginals', 'Antilipidemics', 'Anticoagulants', 'Antiplatelet Agents', 'Heart Failure Drugs']
      },
      'Central Nervous System': {
        items: ['Analgesics', 'Antidepressants', 'Anxiolytics', 'Antipsychotics', 'Antiepileptics', 'Anti-Parkinson Drugs', 'Stimulants']
      },
      'Antimicrobial Agents': {
        items: ['Antibiotics', 'Antivirals', 'Antifungals', 'Antiparasitics', 'Antimalarials']
      },
      'Endocrine System': {
        items: ['Antidiabetic Agents', 'Thyroid Hormones', 'Corticosteroids', 'Sex Hormones']
      },
      'Gastrointestinal System': {
        items: ['Antacids', 'Antiulcer Agents', 'Antiemetics', 'Laxatives', 'Antidiarrheals']
      },
      'Respiratory System': {
        items: ['Bronchodilators', 'Anti-inflammatory', 'Antihistamines', 'Decongestants', 'Cough Suppressants']
      },
      'Musculoskeletal System': {
        items: ['NSAIDs', 'DMARDs', 'Muscle Relaxants', 'Anti-Gout Agents', 'Bisphosphonates']
      },
      'Oncology Drugs': {
        items: ['Chemotherapy Agents', 'Targeted Therapies', 'Immunotherapy', 'Hormonal Therapies']
      }
    }
  },
  'Over-the-Counter (OTC)': {
    icon: '🏪',
    subcategories: {
      'Pain Relief': {
        items: ['Paracetamol', 'Ibuprofen', 'Aspirin', 'Topical Pain Relief']
      },
      'Cold & Flu': {
        items: ['Cough Syrups', 'Throat Lozenges', 'Nasal Decongestants', 'Fever Reducers']
      },
      'Digestive Health': {
        items: ['Antacids', 'Anti-diarrheal', 'Laxatives', 'Probiotics']
      },
      'Allergy Relief': {
        items: ['Antihistamines', 'Eye Drops', 'Nasal Sprays']
      },
      'Vitamins & Supplements': {
        items: ['Multivitamins', 'Vitamin D', 'Calcium', 'Iron Supplements', 'Omega-3']
      }
    }
  },
  'Supermart/Daily Needs': {
    icon: '🛒',
    subcategories: {
      'Personal Care': {
        items: ['Toothpaste', 'Shampoo', 'Soap', 'Deodorants', 'Skincare']
      },
      'Baby Care': {
        items: ['Diapers', 'Baby Formula', 'Baby Food', 'Baby Lotions', 'Wipes']
      },
      'Feminine Care': {
        items: ['Sanitary Pads', 'Tampons', 'Intimate Wash', 'Pregnancy Tests']
      },
      'First Aid': {
        items: ['Bandages', 'Antiseptics', 'Thermometers', 'Cotton Wool', 'Plasters']
      },
      'Health Monitoring': {
        items: ['Blood Pressure Monitors', 'Glucometers', 'Pulse Oximeters', 'Weighing Scales']
      }
    }
  },
  'Hospital Supplies': {
    icon: '🏥',
    subcategories: {
      'Surgical Supplies': {
        items: ['Surgical Gloves', 'Syringes', 'Surgical Masks', 'Gauze', 'Surgical Instruments']
      },
      'Patient Care': {
        items: ['Hospital Beds', 'Wheelchairs', 'IV Stands', 'Patient Monitors', 'Oxygen Equipment']
      },
      'Infection Control': {
        items: ['Disinfectants', 'Hand Sanitizers', 'PPE Kits', 'Sterilization Equipment']
      },
      'Emergency Equipment': {
        items: ['Defibrillators', 'Ventilators', 'Emergency Kits', 'Crash Carts']
      }
    }
  },
  'Laboratory Supplies': {
    icon: '🔬',
    subcategories: {
      'Diagnostic Equipment': {
        items: ['Microscopes', 'Centrifuges', 'Analyzers', 'Spectrophotometers']
      },
      'Lab Consumables': {
        items: ['Test Tubes', 'Petri Dishes', 'Pipettes', 'Lab Gloves', 'Reagents']
      },
      'Sample Collection': {
        items: ['Blood Collection Tubes', 'Urine Containers', 'Swabs', 'Lancets']
      },
      'Lab Safety': {
        items: ['Safety Goggles', 'Lab Coats', 'Fume Hoods', 'Spill Kits']
      }
    }
  },
  'Medical Devices': {
    icon: '⚕️',
    subcategories: {
      'Diagnostic Devices': {
        items: ['Stethoscopes', 'Otoscopes', 'Ophthalmoscopes', 'Reflex Hammers']
      },
      'Monitoring Equipment': {
        items: ['ECG Machines', 'Holter Monitors', 'Pulse Oximeters', 'Blood Pressure Monitors']
      },
      'Therapeutic Devices': {
        items: ['Nebulizers', 'CPAP Machines', 'Insulin Pumps', 'Hearing Aids']
      },
      'Mobility Aids': {
        items: ['Crutches', 'Walking Frames', 'Wheelchairs', 'Mobility Scooters']
      }
    }
  }
};

export const getCategoryIcon = (category) => {
  return PHARMACY_CATEGORIES[category]?.icon || '📦';
};

export const getAllMainCategories = () => {
  return Object.keys(PHARMACY_CATEGORIES);
};

export const getSubcategories = (mainCategory) => {
  return PHARMACY_CATEGORIES[mainCategory]?.subcategories || {};
};

export const getAllSubcategoryItems = (mainCategory, subcategory) => {
  return PHARMACY_CATEGORIES[mainCategory]?.subcategories?.[subcategory]?.items || [];
};