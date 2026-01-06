
// Growth Report Data - Dec 1 to Dec 31, 2025
import { Tenant } from './types';

export const REPORT_DATA = {
    period: {
        en: "Dec 1, 2025 to Dec 31, 2025",
        ar: "١ ديسمبر ٢٠٢٥ إلى ٣١ ديسمبر ٢٠٢٥"
    },
    financials: {
        // From CSV Footer
        netCashCollected: 194971.00,
        mathwaaRevenue: 45003.15,
        mathwaaLTV: 446159.40,
        
        // Ad Performance
        revenueAttributedToAds: 20957.50,
        ltvAttributedToAds: 191309.50,
        
        // Spend
        marketingSpend: 21347, // Total (Media + Production) - Reduced by 1000 (Aqiq Photography)
        adSpend: 14997, // 9000 (TikTok) + 5997 (Meta) - Media Only
        
        // Calculated ROI: (Mathwaa Ad Revenue / Ad Spend) * 100
        // (20957.50 / 14997) * 100 = 139.7%
        roi: 140 
    },
    spendBreakdown: [
        { name_en: 'TikTok Ads', name_ar: 'إعلانات تيك توك', value: 9000, color: '#000000' },
        { name_en: 'Meta (FB/Insta)', name_ar: 'ميتا (فيسبوك/انستغرام)', value: 5997, color: '#1877F2' },
        { name_en: 'Video Production', name_ar: 'إنتاج الفيديو', value: 3500, color: '#8A6E99' },
        { name_en: 'Photography', name_ar: 'التصوير الفوتوغرافي', value: 1350, color: '#C98B8B' },
        { name_en: 'Content Editing', name_ar: 'تحرير المحتوى', value: 1500, color: '#6B7280' }
    ],
    // Aggregated from Tenant Data (Mathwaa Revenue Only)
    branchPerformance: [
        { name_en: 'Al Murooj 53', name_ar: 'المروج ٥٣', value: 11886, count: 23 },
        { name_en: 'Al Olaya 33', name_ar: 'العليا ٣٣', value: 7708, count: 6 },
        { name_en: 'Al Sulaymaniah 38', name_ar: 'السليمانية ٣٨', value: 4893, count: 4 },
        { name_en: 'King Faisal 1', name_ar: 'الملك فيصل ١', value: 4370, count: 2 },
        { name_en: 'Al Murooj 52', name_ar: 'المروج ٥٢', value: 2100, count: 4 },
    ],
    tenants: [
        { name: "سهيم العنزي", branch: "القيروان", unit: "room 151", source: "TikTok", duration: "شهر", rent: 3330, status: "Confirmed", cashCollected: 3330, mathwaaRevenue: 832.5 },
        { name: "محاسن شداد", branch: "العارض 37", unit: "room 178", source: "Instagram Ads", duration: "3 شهور", rent: 3420, status: "Confirmed", cashCollected: 3420, mathwaaRevenue: 1026 },
        { name: "Adil Ashraf", branch: "المروج 52", unit: "Studio 02", source: "Facebook Ads", duration: "شهري", rent: 2600, status: "Confirmed", cashCollected: 2600, mathwaaRevenue: 520 },
        { name: "متعب الصانع", branch: "المروج 52", unit: "Studio 07", source: "Bayut/Aqar", duration: "سنة", rent: 2600, status: "Confirmed", cashCollected: 2600, mathwaaRevenue: 520 },
        { name: "Ruba Qadi", branch: "العليا 33", unit: "Studio 022", source: "Airbnb", duration: "شهرين", rent: 5790, status: "Canceled", cashCollected: 0, mathwaaRevenue: 0 },
        { name: "في الدويخ", branch: "الملقا 14", unit: "room 77", source: "Word of Mouth", duration: "سنة", rent: 3200, status: "Confirmed", cashCollected: 3200, mathwaaRevenue: 640 },
        { name: "دلال الدوسري", branch: "الملقا 34", unit: "room 158", source: "Resident", duration: "سنة", rent: 7200, status: "Confirmed", cashCollected: 7200, mathwaaRevenue: 2160 },
        { name: "محمود العشماوي", branch: "المروج 53", unit: "Studio 25", source: "Facebook", duration: "سنة", rent: 2200, status: "Confirmed", cashCollected: 2200, mathwaaRevenue: 440 },
        { name: "باسم مصطفى", branch: "المروج 52", unit: "Studio 3", source: "Facebook", duration: "شهري", rent: 2400, status: "Confirmed", cashCollected: 2400, mathwaaRevenue: 480 },
        { name: "Hamza Waseem", branch: "المروج 53", unit: "Studio 13", source: "Bayut", duration: "سنة", rent: 2530, status: "Confirmed", cashCollected: 2530, mathwaaRevenue: 506 },
        { name: "Basit Ali Awan", branch: "المروج 53", unit: "Studio 3", source: "Referral", duration: "سنة", rent: 2640, status: "Confirmed", cashCollected: 2640, mathwaaRevenue: 528 },
        { name: "فاطمة الشيخ", branch: "المروج 53", unit: "Studio 011", source: "Instagram", duration: "سنة", rent: 2530, status: "Confirmed", cashCollected: 2530, mathwaaRevenue: 506 },
        { name: "حيدره ثابت", branch: "مثوى 53", unit: "Studio 20", source: "Facebook", duration: "شهر واحد", rent: 2420, status: "Confirmed", cashCollected: 2420, mathwaaRevenue: 484 },
        { name: "صقر الشمري", branch: "المروج 53", unit: "Studio 27", source: "Website", duration: "سنة", rent: 2200, status: "Confirmed", cashCollected: 2200, mathwaaRevenue: 440 },
        { name: "غزل السيسي", branch: "العقيق", unit: "Studio 1008", source: "Social Media", duration: "سنة", rent: 7000, status: "Pending", cashCollected: 0, mathwaaRevenue: 0 },
        { name: "اسلام جمعة", branch: "المروج 53", unit: "Studio 029", source: "Facebook", duration: "سنة", rent: 2200, status: "Confirmed", cashCollected: 2200, mathwaaRevenue: 440 },
        { name: "لورا الشهري", branch: "العارض 42", unit: "room 42", source: "Word of Mouth", duration: "أسبوع", rent: 548, status: "Confirmed", cashCollected: 548, mathwaaRevenue: 0 },
        { name: "Shijin G.", branch: "المروج 53", unit: "Studio 028", source: "Bayut", duration: "سنة", rent: 2420, status: "Confirmed", cashCollected: 2420, mathwaaRevenue: 484 },
        { name: "محمد دياب", branch: "المروج 53", unit: "Studio 32", source: "Bayut", duration: "سنة", rent: 2200, status: "Confirmed", cashCollected: 2200, mathwaaRevenue: 440 },
        { name: "خالد الخالد", branch: "المروج 53", unit: "1BR 26", source: "Walk-in", duration: "3 شهور", rent: 2860, status: "Confirmed", cashCollected: 2860, mathwaaRevenue: 572 },
        { name: "الهنوف الخيري", branch: "الملك فيصل 1", unit: "room 009", source: "Friend", duration: "سنة", rent: 3900, status: "Confirmed", cashCollected: 3900, mathwaaRevenue: 1170 },
        { name: "فرح العصيمي", branch: "العليا 33", unit: "2BR 3304", source: "TikTok", duration: "سنة", rent: 7390, status: "Confirmed", cashCollected: 7390, mathwaaRevenue: 1847.5 },
        { name: "لجين الهوسة", branch: "الياسمين 44", unit: "room 4401", source: "TikTok", duration: "سنة", rent: 3900, status: "Confirmed", cashCollected: 3900, mathwaaRevenue: 1170 },
        { name: "فاطمة بيومي", branch: "العارض 42", unit: "room B59", source: "TikTok", duration: "سنة", rent: 1850, status: "Pending", cashCollected: 0, mathwaaRevenue: 0 },
        { name: "Basel Bawab", branch: "العليا 33", unit: "1BR 3308", source: "Bayut", duration: "سنة", rent: 6380, status: "Confirmed", cashCollected: 6380, mathwaaRevenue: 1595 },
        { name: "إيمان محمد", branch: "المروج 53", unit: "Studio 012", source: "Instagram", duration: "سنة", rent: 2750, status: "Confirmed", cashCollected: 2750, mathwaaRevenue: 550 },
        { name: "عهود شلبي", branch: "المروج 53", unit: "Studio 022", source: "TikTok", duration: "شهرين", rent: 2420, status: "Canceled", cashCollected: 0, mathwaaRevenue: 0 },
        { name: "وافي الهاجري", branch: "المروج 53", unit: "Studio 9", source: "Bayut", duration: "سنة", rent: 2530, status: "Confirmed", cashCollected: 2530, mathwaaRevenue: 506 },
        { name: "عبدالكريم الملق", branch: "المروج 53", unit: "Studio 30", source: "Instagram Ads", duration: "سنة", rent: 2860, status: "Confirmed", cashCollected: 2860, mathwaaRevenue: 572 },
        { name: "مريم العنزي", branch: "اليرموك 24", unit: "room 121", source: "TikTok", duration: "سنة", rent: 3500, status: "Confirmed", cashCollected: 3500, mathwaaRevenue: 1050 }
    ] as Tenant[]
};

// Keep empty exports to prevent breaking other files if they are lazily imported somewhere
export const SCENARIOS = [];
export const FURNISHING_COST_PER_UNIT = 0;
export const MARKETING_VIDEOS = [];
export const COMPARISON_LINKS = {};
export const MABAAT_SHARE_PERCENTAGE = 0;
export const BRANCHES = [];
