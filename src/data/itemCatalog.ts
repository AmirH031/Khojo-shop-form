import { ProductTemplate, MenuTemplate, ServiceTemplate, ServiceDetails } from '../types/Item';

// Product Catalog (Grocery & Electronics)
export const productCatalog: ProductTemplate[] = [
  // Groceries
  {
    name: 'Maggi 2-Minute Noodles',
    hindi_name: 'मैगी नूडल्स',
    category: 'Groceries',
    brand_name: 'Maggi',
    typical_price_range: '12-25',
    common_varieties: ['Masala', 'Chicken', 'Atta', 'Vegetable'],
    typical_packs: 5
  },
  {
    name: 'Tata Salt',
    hindi_name: 'टाटा नमक',
    category: 'Groceries',
    brand_name: 'Tata',
    typical_price_range: '18-45',
    common_varieties: ['Iodized', 'Rock Salt', 'Low Sodium'],
    typical_packs: 4
  },
  {
    name: 'Basmati Rice',
    hindi_name: 'बासमती चावल',
    category: 'Groceries',
    brand_name: 'India Gate',
    typical_price_range: '150-400',
    common_varieties: ['Traditional', 'Aged', 'Sella'],
    typical_packs: 4
  },
  {
    name: 'Sunflower Oil',
    hindi_name: 'सूरजमुखी तेल',
    category: 'Groceries',
    brand_name: 'Fortune',
    typical_price_range: '120-250',
    common_varieties: ['Refined', 'Cold Pressed'],
    typical_packs: 4
  },
  {
    name: 'Turmeric Powder',
    hindi_name: 'हल्दी पाउडर',
    category: 'Groceries',
    brand_name: 'Everest',
    typical_price_range: '25-80',
    common_varieties: ['Pure', 'Organic'],
    typical_packs: 5
  },

  // Electronics
  {
    name: 'LED Bulb',
    hindi_name: 'एलईडी बल्ब',
    category: 'Electronics',
    brand_name: 'Philips',
    typical_price_range: '150-500',
    common_varieties: ['9W', '12W', '15W', '20W'],
    typical_packs: 6
  },
  {
    name: 'Mobile Charger',
    hindi_name: 'मोबाइल चार्जर',
    category: 'Electronics',
    brand_name: 'Samsung',
    typical_price_range: '300-800',
    common_varieties: ['Type-C', 'Micro USB', 'Lightning'],
    typical_packs: 3
  },
  {
    name: 'Power Bank',
    hindi_name: 'पावर बैंक',
    category: 'Electronics',
    brand_name: 'Mi',
    typical_price_range: '800-2500',
    common_varieties: ['10000mAh', '20000mAh', '5000mAh'],
    typical_packs: 4
  },

  // Health & Beauty
  {
    name: 'Shampoo',
    hindi_name: 'शैम्पू',
    category: 'Health & Beauty',
    brand_name: 'Head & Shoulders',
    typical_price_range: '75-450',
    common_varieties: ['Anti-Dandruff', 'Herbal', 'For Dry Hair'],
    typical_packs: 5
  },
  {
    name: 'Toothpaste',
    hindi_name: 'टूथपेस्ट',
    category: 'Health & Beauty',
    brand_name: 'Colgate',
    typical_price_range: '35-180',
    common_varieties: ['Whitening', 'Herbal', 'Sensitive'],
    typical_packs: 5
  }
];

// Menu Catalog (Restaurant Items)
export const menuCatalog: MenuTemplate[] = [
  // Indian Main Course
  {
    name: 'Butter Chicken',
    hindi_name: 'बटर चिकन',
    category: 'Main Course',
    description: 'Creamy tomato-based chicken curry',
    typical_price: '280',
    common_varieties: ['Mild', 'Medium Spicy', 'Extra Spicy'],
    unit: 'plate'
  },
  {
    name: 'Dal Makhani',
    hindi_name: 'दाल मखनी',
    category: 'Main Course',
    description: 'Rich and creamy black lentil curry',
    typical_price: '220',
    common_varieties: ['Regular', 'Extra Creamy'],
    unit: 'bowl'
  },
  {
    name: 'Biryani',
    hindi_name: 'बिरयानी',
    category: 'Main Course',
    description: 'Fragrant rice dish with meat or vegetables',
    typical_price: '350',
    common_varieties: ['Chicken', 'Mutton', 'Veg', 'Paneer'],
    unit: 'plate'
  },
  {
    name: 'Naan',
    hindi_name: 'नान',
    category: 'Bread',
    description: 'Soft leavened flatbread',
    typical_price: '45',
    common_varieties: ['Plain', 'Butter', 'Garlic', 'Cheese'],
    unit: 'piece'
  },

  // Chinese
  {
    name: 'Fried Rice',
    hindi_name: 'फ्राइड राइस',
    category: 'Chinese',
    description: 'Stir-fried rice with vegetables and choice of protein',
    typical_price: '180',
    common_varieties: ['Veg', 'Chicken', 'Egg', 'Mixed'],
    unit: 'plate'
  },
  {
    name: 'Chow Mein',
    hindi_name: 'चाऊ मीन',
    category: 'Chinese',
    description: 'Stir-fried noodles with vegetables',
    typical_price: '160',
    common_varieties: ['Veg', 'Chicken', 'Mixed'],
    unit: 'plate'
  },

  // Beverages
  {
    name: 'Lassi',
    hindi_name: 'लस्सी',
    category: 'Beverages',
    description: 'Traditional yogurt-based drink',
    typical_price: '80',
    common_varieties: ['Sweet', 'Salted', 'Mango', 'Rose'],
    unit: 'glass'
  },
  {
    name: 'Fresh Lime Soda',
    hindi_name: 'फ्रेश लाइम सोडा',
    category: 'Beverages',
    description: 'Refreshing lime and soda water drink',
    typical_price: '60',
    common_varieties: ['Sweet', 'Salted', 'Masala'],
    unit: 'glass'
  },

  // Desserts
  {
    name: 'Gulab Jamun',
    hindi_name: 'गुलाब जामुन',
    category: 'Desserts',
    description: 'Sweet milk dumplings in sugar syrup',
    typical_price: '120',
    common_varieties: ['Regular', 'Kala Jamun'],
    unit: 'serving'
  },
  {
    name: 'Ice Cream',
    hindi_name: 'आइस क्रीम',
    category: 'Desserts',
    description: 'Frozen dessert in various flavors',
    typical_price: '100',
    common_varieties: ['Vanilla', 'Chocolate', 'Strawberry', 'Kulfi'],
    unit: 'scoop'
  }
];

// Service Catalog
export const serviceCatalog: ServiceTemplate[] = [
  // Repair Services
  {
    name: 'Mobile Phone Repair',
    description: 'Professional mobile phone repair and maintenance services',
    category: 'Repair Services',
    highlights: ['Screen Replacement', 'Battery Change', 'Water Damage Repair'],
    tags: ['mobile', 'repair', 'smartphone', 'android', 'iphone'],
    typical_price_range: '500-3000',
    serviceDetails: {
      duration: '1-3 hours',
      priceRange: '500-3000',
      serviceCategory: 'Repair Services',
      serviceName: 'Mobile Phone Repair',
      description: ['Screen replacement and repair', 'Battery replacement', 'Charging port repair', 'Water damage treatment'],
      features: ['Free diagnosis', 'Genuine parts', '30-day warranty', 'Quick service'],
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        timeSlots: ['9:00-12:00', '12:00-15:00', '15:00-18:00']
      }
    }
  },
  {
    name: 'Laptop Repair',
    description: 'Complete laptop repair and upgrade services',
    category: 'Repair Services',
    highlights: ['Hardware Repair', 'Software Installation', 'Data Recovery'],
    tags: ['laptop', 'computer', 'repair', 'upgrade', 'data recovery'],
    typical_price_range: '800-5000',
    serviceDetails: {
      duration: '2-24 hours',
      priceRange: '800-5000',
      serviceCategory: 'Repair Services',
      serviceName: 'Laptop Repair',
      description: ['Hardware diagnostics and repair', 'Operating system installation', 'Virus removal', 'Data backup and recovery'],
      features: ['Free pickup and delivery', 'Data security guaranteed', '90-day warranty', 'Expert technicians'],
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        timeSlots: ['9:00-12:00', '12:00-15:00', '15:00-18:00']
      }
    }
  },

  // Beauty & Wellness
  {
    name: 'Hair Cut & Styling',
    description: 'Professional hair cutting and styling services',
    category: 'Beauty & Wellness',
    highlights: ['Modern Cuts', 'Hair Styling', 'Beard Trimming'],
    tags: ['haircut', 'styling', 'salon', 'grooming', 'beard'],
    typical_price_range: '150-800',
    serviceDetails: {
      duration: '30-90 minutes',
      priceRange: '150-800',
      serviceCategory: 'Beauty & Wellness',
      serviceName: 'Hair Cut & Styling',
      description: ['Professional hair cutting', 'Hair styling and setting', 'Beard trimming and shaping', 'Hair wash and conditioning'],
      features: ['Experienced stylists', 'Premium products', 'Hygienic environment', 'Latest trends'],
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        timeSlots: ['9:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-21:00']
      }
    }
  },
  {
    name: 'Facial Treatment',
    description: 'Rejuvenating facial treatments for all skin types',
    category: 'Beauty & Wellness',
    highlights: ['Deep Cleansing', 'Anti-Aging', 'Skin Brightening'],
    tags: ['facial', 'skincare', 'beauty', 'cleansing', 'anti-aging'],
    typical_price_range: '800-2500',
    serviceDetails: {
      duration: '60-90 minutes',
      priceRange: '800-2500',
      serviceCategory: 'Beauty & Wellness',
      serviceName: 'Facial Treatment',
      description: ['Deep pore cleansing', 'Exfoliation and scrubbing', 'Face mask application', 'Moisturizing and protection'],
      features: ['Natural products', 'Customized treatments', 'Relaxing environment', 'Skin analysis'],
      availability: {
        days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        timeSlots: ['9:00-12:00', '12:00-15:00', '15:00-18:00']
      }
    }
  },

  // Home Services
  {
    name: 'House Cleaning',
    description: 'Professional home cleaning and maintenance services',
    category: 'Home Services',
    highlights: ['Deep Cleaning', 'Regular Maintenance', 'Sanitization'],
    tags: ['cleaning', 'housekeeping', 'sanitization', 'maintenance'],
    typical_price_range: '500-2000',
    serviceDetails: {
      duration: '2-6 hours',
      priceRange: '500-2000',
      serviceCategory: 'Home Services',
      serviceName: 'House Cleaning',
      description: ['Complete house cleaning', 'Kitchen and bathroom deep cleaning', 'Floor mopping and vacuuming', 'Dusting and organizing'],
      features: ['Trained staff', 'Eco-friendly products', 'Flexible timing', 'Satisfaction guaranteed'],
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        timeSlots: ['9:00-12:00', '12:00-15:00', '15:00-18:00']
      }
    }
  },
  {
    name: 'Plumbing Services',
    description: 'Complete plumbing installation and repair services',
    category: 'Home Services',
    highlights: ['Pipe Repair', 'Fixture Installation', 'Emergency Service'],
    tags: ['plumbing', 'repair', 'installation', 'emergency', 'pipes'],
    typical_price_range: '300-1500',
    serviceDetails: {
      duration: '1-4 hours',
      priceRange: '300-1500',
      serviceCategory: 'Home Services',
      serviceName: 'Plumbing Services',
      description: ['Pipe repair and replacement', 'Tap and fixture installation', 'Drainage cleaning', 'Water heater services'],
      features: ['24/7 emergency service', 'Licensed plumbers', 'Quality materials', 'Transparent pricing'],
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        timeSlots: ['9:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-21:00']
      }
    }
  },

  // Professional Services
  {
    name: 'Tax Consultation',
    description: 'Professional tax planning and filing services',
    category: 'Professional Services',
    highlights: ['Tax Filing', 'GST Registration', 'Financial Planning'],
    tags: ['tax', 'gst', 'accounting', 'financial', 'consultation'],
    typical_price_range: '1000-5000',
    serviceDetails: {
      duration: '1-2 hours',
      priceRange: '1000-5000',
      serviceCategory: 'Professional Services',
      serviceName: 'Tax Consultation',
      description: ['Income tax return filing', 'GST registration and filing', 'Tax planning and advice', 'Financial consultation'],
      features: ['Certified professionals', 'Online and offline service', 'Document pickup', 'Follow-up support'],
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        timeSlots: ['9:00-12:00', '12:00-15:00', '15:00-18:00']
      }
    }
  },

  // Educational Services
  {
    name: 'Home Tuition',
    description: 'Personalized home tutoring for all subjects and grades',
    category: 'Educational Services',
    highlights: ['All Subjects', 'Exam Preparation', 'Flexible Schedule'],
    tags: ['tuition', 'education', 'teaching', 'exam', 'homework'],
    typical_price_range: '500-1500',
    serviceDetails: {
      duration: '1-2 hours',
      priceRange: '500-1500',
      serviceCategory: 'Educational Services',
      serviceName: 'Home Tuition',
      description: ['Subject-wise tutoring', 'Exam preparation', 'Homework assistance', 'Concept clarification'],
      features: ['Qualified teachers', 'Personalized attention', 'Progress tracking', 'Flexible timings'],
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        timeSlots: ['9:00-12:00', '15:00-18:00', '18:00-21:00']
      }
    }
  }
];