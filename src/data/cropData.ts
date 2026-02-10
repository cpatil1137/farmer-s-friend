import { Language } from './translations';

export interface CropData {
  id: string;
  name: { en: string; mr: string };
  emoji: string;
  suitableSoils: string[];
  seasons: string[];
  waterRequirement: 'low' | 'medium' | 'high';
  yieldPerAcre: { min: number; max: number };
  costs: {
    seed: number;
    fertilizer: number;
    pesticide: number;
    irrigation: number;
    labor: number;
  };
  marketPrice: {
    current: number;
    average: number;
    trend: 'increasing' | 'stable' | 'decreasing';
    mandi: { en: string; mr: string };
  };
  description: { en: string; mr: string };
}

export interface District {
  id: string;
  name: { en: string; mr: string };
}

export const districts: District[] = [
  { id: 'pune', name: { en: 'Pune', mr: 'पुणे' } },
  { id: 'nashik', name: { en: 'Nashik', mr: 'नाशिक' } },
  { id: 'ahmednagar', name: { en: 'Ahmednagar', mr: 'अहमदनगर' } },
  { id: 'solapur', name: { en: 'Solapur', mr: 'सोलापूर' } },
  { id: 'kolhapur', name: { en: 'Kolhapur', mr: 'कोल्हापूर' } },
  { id: 'satara', name: { en: 'Satara', mr: 'सातारा' } },
  { id: 'sangli', name: { en: 'Sangli', mr: 'सांगली' } },
  { id: 'sambhajinagar', name: { en: 'Chh. Sambhajinagar', mr: 'छ. संभाजीनगर' } },
  { id: 'jalna', name: { en: 'Jalna', mr: 'जालना' } },
  { id: 'beed', name: { en: 'Beed', mr: 'बीड' } },
  { id: 'latur', name: { en: 'Latur', mr: 'लातूर' } },
  { id: 'osmanabad', name: { en: 'Dharashiv', mr: 'धाराशिव' } },
  { id: 'nagpur', name: { en: 'Nagpur', mr: 'नागपूर' } },
  { id: 'wardha', name: { en: 'Wardha', mr: 'वर्धा' } },
  { id: 'amravati', name: { en: 'Amravati', mr: 'अमरावती' } },
  { id: 'akola', name: { en: 'Akola', mr: 'अकोला' } },
  { id: 'yavatmal', name: { en: 'Yavatmal', mr: 'यवतमाळ' } },
  { id: 'buldhana', name: { en: 'Buldhana', mr: 'बुलडाणा' } },
  { id: 'nanded', name: { en: 'Nanded', mr: 'नांदेड' } },
  { id: 'parbhani', name: { en: 'Parbhani', mr: 'परभणी' } },
];

export const crops: CropData[] = [
  {
    id: 'soybean',
    name: { en: 'Soybean', mr: 'सोयाबीन' },
    emoji: '🫘',
    suitableSoils: ['black', 'alluvial'],
    seasons: ['kharif'],
    waterRequirement: 'medium',
    yieldPerAcre: { min: 6, max: 8 },
    costs: { seed: 2200, fertilizer: 3500, pesticide: 2000, irrigation: 1500, labor: 5000 },
    marketPrice: { current: 4800, average: 4500, trend: 'increasing', mandi: { en: 'Latur APMC', mr: 'लातूर APMC' } },
    description: { en: 'High-protein oilseed, excellent for black soil regions', mr: 'उच्च प्रथिनयुक्त तेलबिया, काळ्या मातीसाठी उत्कृष्ट' },
  },
  {
    id: 'cotton',
    name: { en: 'Cotton', mr: 'कापूस' },
    emoji: '☁️',
    suitableSoils: ['black', 'red'],
    seasons: ['kharif'],
    waterRequirement: 'medium',
    yieldPerAcre: { min: 6, max: 10 },
    costs: { seed: 2800, fertilizer: 4500, pesticide: 4000, irrigation: 3000, labor: 7000 },
    marketPrice: { current: 7200, average: 6800, trend: 'stable', mandi: { en: 'Jalgaon APMC', mr: 'जळगाव APMC' } },
    description: { en: 'Major cash crop, good returns with proper care', mr: 'प्रमुख नगदी पीक, योग्य काळजीने चांगला नफा' },
  },
  {
    id: 'rice',
    name: { en: 'Rice (Paddy)', mr: 'भात' },
    emoji: '🌾',
    suitableSoils: ['alluvial', 'clay'],
    seasons: ['kharif'],
    waterRequirement: 'high',
    yieldPerAcre: { min: 15, max: 20 },
    costs: { seed: 1800, fertilizer: 3000, pesticide: 1500, irrigation: 4000, labor: 6000 },
    marketPrice: { current: 2300, average: 2200, trend: 'stable', mandi: { en: 'Nagpur APMC', mr: 'नागपूर APMC' } },
    description: { en: 'Staple food crop, needs ample water supply', mr: 'मुख्य अन्नधान्य पीक, भरपूर पाणी लागते' },
  },
  {
    id: 'jowar',
    name: { en: 'Jowar (Sorghum)', mr: 'ज्वारी' },
    emoji: '🌿',
    suitableSoils: ['black', 'red'],
    seasons: ['kharif', 'rabi'],
    waterRequirement: 'low',
    yieldPerAcre: { min: 5, max: 8 },
    costs: { seed: 1200, fertilizer: 2500, pesticide: 1000, irrigation: 800, labor: 4000 },
    marketPrice: { current: 3400, average: 3200, trend: 'increasing', mandi: { en: 'Solapur APMC', mr: 'सोलापूर APMC' } },
    description: { en: 'Drought-resistant millet, grows in low water', mr: 'दुष्काळ सहन करणारे पीक, कमी पाण्यात येते' },
  },
  {
    id: 'bajra',
    name: { en: 'Bajra (Pearl Millet)', mr: 'बाजरी' },
    emoji: '🌾',
    suitableSoils: ['sandy', 'red'],
    seasons: ['kharif'],
    waterRequirement: 'low',
    yieldPerAcre: { min: 4, max: 6 },
    costs: { seed: 1000, fertilizer: 2000, pesticide: 800, irrigation: 500, labor: 3500 },
    marketPrice: { current: 2500, average: 2350, trend: 'stable', mandi: { en: 'Ahmednagar APMC', mr: 'अहमदनगर APMC' } },
    description: { en: 'Hardy crop for sandy soils with low rainfall', mr: 'वाळूच्या मातीत कमी पावसात येणारे पीक' },
  },
  {
    id: 'tur',
    name: { en: 'Tur Dal (Pigeon Pea)', mr: 'तूर' },
    emoji: '🫘',
    suitableSoils: ['black', 'red'],
    seasons: ['kharif'],
    waterRequirement: 'low',
    yieldPerAcre: { min: 4, max: 6 },
    costs: { seed: 2500, fertilizer: 2800, pesticide: 1500, irrigation: 1000, labor: 4500 },
    marketPrice: { current: 7500, average: 7000, trend: 'increasing', mandi: { en: 'Latur APMC', mr: 'लातूर APMC' } },
    description: { en: 'High-value pulse crop with good market demand', mr: 'चांगल्या बाजारभावाचे कडधान्य पीक' },
  },
  {
    id: 'sugarcane',
    name: { en: 'Sugarcane', mr: 'ऊस' },
    emoji: '🎋',
    suitableSoils: ['alluvial', 'black', 'clay'],
    seasons: ['kharif'],
    waterRequirement: 'high',
    yieldPerAcre: { min: 350, max: 450 },
    costs: { seed: 8000, fertilizer: 6000, pesticide: 3000, irrigation: 8000, labor: 12000 },
    marketPrice: { current: 315, average: 300, trend: 'stable', mandi: { en: 'Kolhapur Sugar Factory', mr: 'कोल्हापूर साखर कारखाना' } },
    description: { en: 'Perennial cash crop, needs heavy irrigation', mr: 'बहुवार्षिक नगदी पीक, जास्त पाणी लागते' },
  },
  {
    id: 'groundnut',
    name: { en: 'Groundnut', mr: 'भुईमूग' },
    emoji: '🥜',
    suitableSoils: ['sandy', 'red', 'laterite'],
    seasons: ['kharif'],
    waterRequirement: 'medium',
    yieldPerAcre: { min: 6, max: 9 },
    costs: { seed: 3500, fertilizer: 2500, pesticide: 1500, irrigation: 2000, labor: 5000 },
    marketPrice: { current: 6200, average: 5800, trend: 'increasing', mandi: { en: 'Sangli APMC', mr: 'सांगली APMC' } },
    description: { en: 'Oilseed crop with good returns on light soils', mr: 'हलक्या मातीत चांगला नफा देणारे तेलबिया पीक' },
  },
  {
    id: 'wheat',
    name: { en: 'Wheat', mr: 'गहू' },
    emoji: '🌾',
    suitableSoils: ['alluvial', 'black'],
    seasons: ['rabi'],
    waterRequirement: 'medium',
    yieldPerAcre: { min: 10, max: 14 },
    costs: { seed: 2000, fertilizer: 3500, pesticide: 1200, irrigation: 3000, labor: 5000 },
    marketPrice: { current: 2400, average: 2275, trend: 'stable', mandi: { en: 'Pune APMC', mr: 'पुणे APMC' } },
    description: { en: 'Major rabi food grain crop', mr: 'प्रमुख रब्बी अन्नधान्य पीक' },
  },
  {
    id: 'gram',
    name: { en: 'Gram (Chickpea)', mr: 'हरभरा' },
    emoji: '🫘',
    suitableSoils: ['black', 'red'],
    seasons: ['rabi'],
    waterRequirement: 'low',
    yieldPerAcre: { min: 5, max: 7 },
    costs: { seed: 2800, fertilizer: 2200, pesticide: 1500, irrigation: 1200, labor: 4000 },
    marketPrice: { current: 5600, average: 5400, trend: 'stable', mandi: { en: 'Latur APMC', mr: 'लातूर APMC' } },
    description: { en: 'Important rabi pulse, good for soil health', mr: 'महत्त्वाचे रब्बी कडधान्य, मातीच्या आरोग्यासाठी चांगले' },
  },
  {
    id: 'onion',
    name: { en: 'Onion', mr: 'कांदा' },
    emoji: '🧅',
    suitableSoils: ['alluvial', 'black'],
    seasons: ['rabi'],
    waterRequirement: 'medium',
    yieldPerAcre: { min: 60, max: 80 },
    costs: { seed: 4000, fertilizer: 5000, pesticide: 3000, irrigation: 4000, labor: 8000 },
    marketPrice: { current: 2500, average: 2000, trend: 'increasing', mandi: { en: 'Nashik APMC (Lasalgaon)', mr: 'नाशिक APMC (लासलगाव)' } },
    description: { en: 'High-value vegetable crop with volatile prices', mr: 'चढ-उतार भावाचे मूल्यवान भाजीपाला पीक' },
  },
  {
    id: 'sunflower',
    name: { en: 'Sunflower', mr: 'सूर्यफूल' },
    emoji: '🌻',
    suitableSoils: ['black', 'alluvial'],
    seasons: ['rabi'],
    waterRequirement: 'medium',
    yieldPerAcre: { min: 4, max: 6 },
    costs: { seed: 1800, fertilizer: 2500, pesticide: 1200, irrigation: 2000, labor: 4000 },
    marketPrice: { current: 6500, average: 6200, trend: 'stable', mandi: { en: 'Solapur APMC', mr: 'सोलापूर APMC' } },
    description: { en: 'Oilseed crop with moderate water needs', mr: 'मध्यम पाण्याची गरज असलेले तेलबिया पीक' },
  },
  {
    id: 'watermelon',
    name: { en: 'Watermelon', mr: 'कलिंगड' },
    emoji: '🍉',
    suitableSoils: ['sandy', 'alluvial'],
    seasons: ['zaid'],
    waterRequirement: 'medium',
    yieldPerAcre: { min: 80, max: 120 },
    costs: { seed: 3000, fertilizer: 3500, pesticide: 2000, irrigation: 4000, labor: 6000 },
    marketPrice: { current: 800, average: 700, trend: 'increasing', mandi: { en: 'Pune APMC', mr: 'पुणे APMC' } },
    description: { en: 'Profitable summer fruit crop', mr: 'नफा देणारे उन्हाळी फळ पीक' },
  },
  {
    id: 'moong',
    name: { en: 'Moong (Green Gram)', mr: 'मूग' },
    emoji: '🫛',
    suitableSoils: ['sandy', 'red', 'alluvial'],
    seasons: ['zaid', 'kharif'],
    waterRequirement: 'low',
    yieldPerAcre: { min: 3, max: 5 },
    costs: { seed: 2000, fertilizer: 1800, pesticide: 1000, irrigation: 1500, labor: 3500 },
    marketPrice: { current: 8200, average: 7800, trend: 'increasing', mandi: { en: 'Ahmednagar APMC', mr: 'अहमदनगर APMC' } },
    description: { en: 'Short-duration pulse with high market value', mr: 'कमी कालावधीचे उच्च बाजारभावाचे कडधान्य' },
  },
];

export interface GovernmentScheme {
  id: string;
  name: { en: string; mr: string };
  description: { en: string; mr: string };
  benefit: string;
  emoji: string;
  link: string;
}

export const governmentSchemes: GovernmentScheme[] = [
  {
    id: 'pm-kisan',
    name: { en: 'PM-KISAN', mr: 'पीएम-किसान' },
    description: {
      en: 'Direct income support of ₹6,000/year to farmer families in three installments',
      mr: 'शेतकरी कुटुंबांना तीन हप्त्यांत ₹6,000/वर्ष थेट उत्पन्न सहाय्य',
    },
    benefit: '₹6,000',
    emoji: '💰',
    link: 'https://pmkisan.gov.in/',
  },
  {
    id: 'fasal-bima',
    name: { en: 'PM Fasal Bima Yojana', mr: 'पीएम फसल बिमा योजना' },
    description: {
      en: 'Crop insurance scheme to protect farmers against crop loss due to natural calamities',
      mr: 'नैसर्गिक आपत्तींमुळे पीक नुकसानापासून शेतकऱ्यांचे संरक्षण करणारी पीक विमा योजना',
    },
    benefit: '2%',
    emoji: '🛡️',
    link: 'https://pmfby.gov.in/',
  },
  {
    id: 'soil-health',
    name: { en: 'Soil Health Card', mr: 'मृदा आरोग्य कार्ड' },
    description: {
      en: 'Free soil testing and nutrient recommendations for better crop yield',
      mr: 'चांगल्या पीक उत्पादनासाठी मोफत माती तपासणी आणि पोषक तत्व शिफारशी',
    },
    benefit: 'Free',
    emoji: '📋',
    link: 'https://soilhealth.dac.gov.in/',
  },
  {
    id: 'krishi-sinchai',
    name: { en: 'PM Krishi Sinchai Yojana', mr: 'पीएम कृषी सिंचन योजना' },
    description: {
      en: 'Subsidy on micro-irrigation systems like drip and sprinkler irrigation',
      mr: 'ठिबक आणि तुषार सिंचनासारख्या सूक्ष्म सिंचन प्रणालीवर अनुदान',
    },
    benefit: '55-80%',
    emoji: '💧',
    link: 'https://pmksy.gov.in/',
  },
  {
    id: 'nanaji-deshmukh',
    name: { en: 'Nanaji Deshmukh Krushi Sanjivani', mr: 'नानाजी देशमुख कृषी संजीवनी' },
    description: {
      en: 'Climate-resilient agriculture project for drought-prone areas of Maharashtra',
      mr: 'महाराष्ट्रातील दुष्काळग्रस्त भागांसाठी हवामान अनुकूल शेती प्रकल्प',
    },
    benefit: 'Various',
    emoji: '🌱',
    link: 'https://mahapocra.gov.in/',
  },
];

export function computeProfitLoss(crop: CropData) {
  const { seed, fertilizer, pesticide, irrigation, labor } = crop.costs;
  const totalCost = seed + fertilizer + pesticide + irrigation + labor;
  const avgYield = (crop.yieldPerAcre.min + crop.yieldPerAcre.max) / 2;
  const expectedIncome = avgYield * crop.marketPrice.current;
  const netProfit = expectedIncome - totalCost;
  const costPercentage = totalCost > 0 && expectedIncome > 0 ? Math.round((totalCost / expectedIncome) * 100) : 0;
  return { totalCost, avgYield, expectedIncome, netProfit, costPercentage };
}

export function getRecommendations(inputs: {
  soilType: string;
  season: string;
  waterAvailability: string;
}): CropData[] {
  return crops
    .filter(crop => {
      const soilMatch = crop.suitableSoils.includes(inputs.soilType);
      const seasonMatch = crop.seasons.includes(inputs.season);
      const waterMatch =
        inputs.waterAvailability === 'irrigation' || crop.waterRequirement !== 'high';
      return soilMatch && seasonMatch && waterMatch;
    })
    .sort((a, b) => computeProfitLoss(b).netProfit - computeProfitLoss(a).netProfit);
}

export function formatCurrency(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`;
}
