from fields import *
TIERS = lambda val: COLL("tiers", "شرائح الخصم", [INT("min", "من عدد قطع"), NUM("pct", "نسبة الخصم %", 10, 1, 90)], val, mx=6, item="شريحة")
COUPON = lambda: T("coupon", "كود الكوبون/العرض الذي أنشأته في سلة (يُطبّق تلقائياً)", "", ml=False, mx=30)
builder = dict(title="طقم · ركّب طقمك", icon="sicon-layout-grid", name="taqm-builder", fields=HEAD("ركّب طقمك", "اختر قطعة من كل خانة… والباقي علينا", "") + [
    COLL("slots", "الخانات", [T("emoji", "رمز", "✨", ml=False, mx=4), T("name", "اسم الخانة", mx=30), SW("required", "مطلوبة", True), PROD(label="منتجات هذه الخانة", mn=1, mx=20)],
         [{"emoji": "🌹", "name": "العطر", "required": True}, {"emoji": "🔥", "name": "البخور", "required": False}, {"emoji": "🎁", "name": "التغليف", "required": False}], mx=6, item="خانة"),
    NUM("auto_slots", "🤖 عدد الخانات التلقائية من أقسام متجرك", 3, 2, 5), SW("preselect", "🧠 اختيار مسبق لأفضل قطعة متوفرة في كل خانة", True),
    TIERS([{"min": 2, "pct": 5}, {"min": 3, "pct": 10}]), COUPON(), SW("nudge", "🧠 تلميح «أضف قطعة وخذ خصم أعلى»", True), SW("board", "لوحة الطقم المتحركة", True),
    T("summary_title", "عنوان الملخص", "طقمك", mx=30), T("button", "نص الزر", "أضف الطقم للسلة", mx=30)] + SRC("best_selling", 12, 30)[:2] + [SW("personalize", "🧠 رتّب الخيارات حسب سلوك الزائر", True)] + DESIGN(theme="ivory"))
together = dict(title="طقم · يُشترى معاً", icon="sicon-plus-circle", name="taqm-together", fields=HEAD("يُشترى معاً", "كمّلها صح", "") + [
    PROD("main", "المنتج الأساسي (فارغ = الأكثر مبيعاً)", mx=1), PROD("addons", "الإضافات (فارغة = اقتراح ذكي)", mx=6), RADIO("auto_source", "مصدر المنتج الأساسي التلقائي", SOURCES), RADIO("addon_source", "مصدر الإضافات التلقائي", SOURCES),
    NUM("limit", "عدد الإضافات", 3, 1, 6), SW("harmony", "🧠 فضّل إضافات بسعر متناسق مع المنتج الأساسي", True), NUM("harmony_ratio", "🧠 سقف سعر الإضافة (% من الأساسي)", 60, 10, 150),
    SW("preselect", "تحديد الإضافات مسبقاً", True), NUM("discount", "خصم عند أخذ أكثر من قطعة (%)", 0, 0, 50), COUPON(), T("button", "نص الزر", "", mx=30), SW("personalize", "🧠 رتّب حسب سلوك الزائر", True)] + DESIGN(align="center"))
pick = dict(title="طقم · اختر أي عدد بسعر", icon="sicon-tag", name="taqm-pick", fields=HEAD("عرض الاختيار الحر", "", "") + SRC("best_selling", 12, 24) + [
    NUM("count", "عدد القطع في العرض", 3, 2, 8), INT("price", "سعر العرض الثابت (0 = استخدم النسبة)", 0), NUM("percent", "أو نسبة خصم %", 15, 0, 90), T("offer_label", "عنوان العرض (فارغ = تلقائي)", "", mx=60),
    COUPON(), T("button", "نص الزر", "أضف العرض للسلة", mx=30), NUM("cols", "أعمدة الكمبيوتر", 4, 2, 6), NUM("mcols", "أعمدة الجوال", 2, 1, 3)] + DESIGN())
tiers = dict(title="طقم · كل ما زدت وفّرت", icon="sicon-chart-line", name="taqm-tiers", fields=HEAD("كل ما زدت وفّرت", "", "") + [
    PROD("product", "المنتج (فارغ = الأكثر مبيعاً)", mx=1), RADIO("auto_source", "المصدر التلقائي", SOURCES),
    TIERS([{"min": 2, "pct": 5}, {"min": 3, "pct": 10}, {"min": 5, "pct": 15}]), COUPON(), NUM("start_qty", "الكمية الافتراضية", 1, 1, 10), NUM("max_qty", "أقصى كمية", 20, 2, 100),
    SW("nudge", "🧠 تلميح الشريحة التالية", True), SW("show_stock", "إظهار المخزون الفعلي", True), T("button", "نص الزر", "أضف للسلة", mx=30)] + DESIGN(theme="light"))
outfit = dict(title="طقم · منسّق الإطلالة", icon="sicon-shirt", name="taqm-outfit", fields=HEAD("منسّق الإطلالة", "", "") + [
    COLL("rows", "صفوف التنسيق (من الأعلى للأسفل)", [T("name", "اسم الصف", mx=30), PROD(label="منتجات الصف", mn=1, mx=20)], [{"name": "القطعة الأساسية"}, {"name": "الطبقة الثانية"}, {"name": "الإكسسوار"}], mx=5, item="صف"),
    INT("default_budget", "الميزانية الافتراضية (0 = تلقائي)", 0), SW("show_budget", "مؤشر الميزانية", True), NUM("row_height", "ارتفاع الصف (px)", 150, 90, 260),
    T("side_title", "العنوان الجانبي", "نسّقها على ذوقك", mx=50), TA("side_text", "النص الجانبي", "", mx=200), T("shuffle_text", "نص زر التنسيق العشوائي", "نسّق لي", mx=20), T("button", "نص زر الإضافة", "أضف التنسيق للسلة", mx=30), COUPON()] + SRC("best_selling", 30, 40)[:2] + DESIGN(theme="ivory"))
build("tw-taqm", {"ar": "طَقم — منسّق الإطلالات والباقات", "en": "Taqm — Looks & Bundles Builder"},
      {"ar": "5 عناصر ترفع متوسط الطلب: ركّب طقمك بخانات ولوحة حية وخصم شرائح، يُشترى معاً بإضافات متناسقة السعر، «أي 3 بسعر» بتوفير حقيقي محسوب، «كل ما زدت وفّرت» بحاسبة شرائح، ومنسّق إطلالة بالسحب يحترم ميزانية العميل. الخصومات تُطبّق بكوبون سلة الذي تحدده.",
       "en": "5 components that lift order value: a set builder with slots, live board and tiered discount, bought-together add-ons with price harmony, any-N-for-X with real computed savings, quantity tier calculator, and a swipe outfit stylist that respects the shopper's budget. Discounts apply through your Salla coupon."},
      [builder, together, pick, tiers, outfit])
