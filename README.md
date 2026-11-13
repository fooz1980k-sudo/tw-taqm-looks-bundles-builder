# طَقم — منسّق الإطلالات والباقات
**Taqm — Looks & Bundles Builder** — Twilight Component Bundle لمتاجر سلة (ثيم رائد وأي ثيم يدعم Twilight).

5 عناصر ترفع متوسط الطلب: ركّب طقمك بخانات ولوحة حية وخصم شرائح، يُشترى معاً بإضافات متناسقة السعر، «أي 3 بسعر» بتوفير حقيقي محسوب، «كل ما زدت وفّرت» بحاسبة شرائح، ومنسّق إطلالة بالسحب يحترم ميزانية العميل. الخصومات تُطبّق بكوبون سلة الذي تحدده.

5 components that lift order value: a set builder with slots, live board and tiered discount, bought-together add-ons with price harmony, any-N-for-X with real computed savings, quantity tier calculator, and a swipe outfit stylist that respects the shopper's budget. Discounts apply through your Salla coupon.

| العنصر | الوظيفة | عدد الإعدادات |
|---|---|---|
| `salla-taqm-builder` | ركّب طقمك | 52 |
| `salla-taqm-together` | يُشترى معاً | 46 |
| `salla-taqm-pick` | اختر أي عدد بسعر | 47 |
| `salla-taqm-tiers` | كل ما زدت وفّرت | 45 |
| `salla-taqm-outfit` | منسّق الإطلالة | 47 |

**مجموع الإعدادات: 237** — تشمل لكل عنصر 30 إعداد تصميم موحد (السمة، الألوان، الخط، المسافات، الحركة، الجدولة، الإخفاء حسب الجهاز، مساعد الإعداد داخل المحرر).

## ذكاء العناصر
- **للتاجر:** إذا تُركت المنتجات فارغة يختار العنصر تلقائياً من بيانات متجرك (الأكثر مبيعاً، الأحدث، العروض…) ويكتب نصوصاً جاهزة بالعربية والإنجليزية، مع مساعد إعداد يظهر داخل المحرر فقط.
- **للعميل:** ذاكرة على جهاز العميل فقط (localStorage) لما شاهده وأضافه، لترتيب الاقتراحات — بدون أي بيانات شخصية تُرسل.
- **بدون أرقام مزيفة:** المخزون والمبيعات والتقييمات والخصومات وتواريخ انتهاء العروض تُقرأ من بيانات سلة الحقيقية فقط، وما لا يتوفر لا يُعرض.

## التطوير
```bash
pnpm install
pnpm run build        # vite build — dist/<component>.js
pnpm run build:split  # كل عنصر في ملف مستقل
```
المعاينة المحلية بالبيانات التجريبية: `demo/index.html` (بيانات عينة فقط).

## صور
![00-cover-1600x1200.jpg](listing/00-cover-1600x1200.jpg)
![01-taqm-builder-1600x1200.jpg](listing/01-taqm-builder-1600x1200.jpg)
![02-taqm-together-1600x1200.jpg](listing/02-taqm-together-1600x1200.jpg)
![03-taqm-pick-1600x1200.jpg](listing/03-taqm-pick-1600x1200.jpg)
![04-taqm-tiers-1600x1200.jpg](listing/04-taqm-tiers-1600x1200.jpg)
![05-taqm-outfit-1600x1200.jpg](listing/05-taqm-outfit-1600x1200.jpg)
