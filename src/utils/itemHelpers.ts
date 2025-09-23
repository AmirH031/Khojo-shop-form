// Hindi name mappings for common items
const hindiNameMap: Record<string, string> = {
  // Basic groceries
  'maggi': 'मैगी',
  'noodles': 'नूडल्स',
  'pepsi': 'पेप्सी',
  'cola': 'कोला',
  'water': 'पानी',
  'mineral water': 'मिनरल वाटर',
  'salt': 'नमक',
  'sugar': 'चीनी',
  'tea': 'चाय',
  'coffee': 'कॉफी',
  'milk': 'दूध',
  'butter': 'मक्खन',
  'oil': 'तेल',
  'rice': 'चावल',
  'wheat': 'गेहूं',
  'flour': 'आटा',
  'dal': 'दाल',
  'onion': 'प्याज',
  'potato': 'आलू',
  'tomato': 'टमाटर',
  
  // Spices
  'turmeric': 'हल्दी',
  'chili': 'मिर्च',
  'cumin': 'जीरा',
  'coriander': 'धनिया',
  'mustard': 'सरसों',
  'fenugreek': 'मेथी',
  'cardamom': 'इलायची',
  'cinnamon': 'दालचीनी',
  'cloves': 'लौंग',
  'bay leaves': 'तेज पत्ता',
  
  // Personal care
  'soap': 'साबुन',
  'shampoo': 'शैम्पू',
  'toothpaste': 'टूथपेस्ट',
  'cream': 'क्रीम',
  'lotion': 'लोशन',
  
  // Household
  'detergent': 'डिटर्जेंट',
  'cleaner': 'क्लीनर',
  'brush': 'ब्रश',
  'broom': 'झाड़ू',
  'bucket': 'बाल्टी',
  
  // Food items
  'biscuit': 'बिस्कुत',
  'namkeen': 'नमकीन',
  'chips': 'चिप्स',
  'mixture': 'मिक्चर',
  'jaggery': 'गुड़',
  'ghee': 'घी',
  'paneer': 'पनीर',
  'yogurt': 'दही',
  'pickle': 'अचार',
  'papad': 'पापड़',
  
  // Menu items
  'chicken': 'चिकन',
  'mutton': 'मटन',
  'fish': 'मछली',
  'biryani': 'बिरयानी',
  'curry': 'करी',
  'dal': 'दाल',
  'roti': 'रोटी',
  'naan': 'नान',
  'paratha': 'पराठा',
  'samosa': 'समोसा',
  'dosa': 'डोसा',
  'idli': 'इडली',
  'vada': 'वड़ा',
  'lassi': 'लस्सी',
  'chai': 'चाय',
  'kulfi': 'कुल्फी',
  'gulab jamun': 'गुलाब जामुन',
  'rasgulla': 'रसगुल्ला',
  
  // Electronics
  'mobile': 'मोबाइल',
  'phone': 'फोन',
  'charger': 'चार्जर',
  'battery': 'बैटरी',
  'headphone': 'हेडफोन',
  'speaker': 'स्पीकर',
  'cable': 'केबल',
  'adapter': 'एडाप्टर',
  'power bank': 'पावर बैंक',
  'memory card': 'मेमोरी कार्ड',
  
  // Services
  'repair': 'मरम्मत',
  'service': 'सेवा',
  'cleaning': 'सफाई',
  'maintenance': 'रखरखाव',
  'installation': 'स्थापना',
  'consultation': 'सलाह',
  'treatment': 'उपचार',
  'therapy': 'चिकित्सा',
  'massage': 'मालिश',
  'facial': 'फेशियल',
  'haircut': 'बाल कटाना',
  'styling': 'स्टाइलिंग',
  'tuition': 'ट्यूशन',
  'teaching': 'शिक्षण',
  'training': 'प्रशिक्षण',
  
  // Common words
  'fresh': 'ताज़ा',
  'organic': 'जैविक',
  'natural': 'प्राकृतिक',
  'pure': 'शुद्ध',
  'premium': 'प्रीमियम',
  'special': 'विशेष',
  'deluxe': 'डीलक्स',
  'home': 'घर',
  'professional': 'पेशेवर',
  'expert': 'विशेषज्ञ',
  'quality': 'गुणवत्ता',
  'best': 'सर्वोत्तम',
  'good': 'अच्छा',
  'new': 'नया',
  'old': 'पुराना',
  'big': 'बड़ा',
  'small': 'छोटा',
  'hot': 'गर्म',
  'cold': 'ठंडा',
  'sweet': 'मीठा',
  'spicy': 'तीखा'
};

export const getHindiName = (englishName: string): string => {
  if (!englishName) return '';
  
  const lowerName = englishName.toLowerCase();
  
  // Direct mapping
  if (hindiNameMap[lowerName]) {
    return hindiNameMap[lowerName];
  }
  
  // Partial matching - find the best match
  let bestMatch = '';
  let maxMatchLength = 0;
  
  for (const [english, hindi] of Object.entries(hindiNameMap)) {
    if (lowerName.includes(english) && english.length > maxMatchLength) {
      bestMatch = hindi;
      maxMatchLength = english.length;
    }
  }
  
  return bestMatch;
};