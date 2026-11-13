"""Field builders for twilight-bundle.json (the same shapes the published bundles use)."""
import json, uuid

def T(id, label, value="", ml=True, fmt="text", req=False, mx=120, ph=""):
    f = {"id": id, "icon": "sicon-format-text-alt", "type": "string", "label": label, "format": fmt, "required": req, "maxLength": mx, "value": value, "placeholder": ph}
    if ml: f["multilanguage"] = True
    return f
def TA(id, label, value="", mx=300, ph=""): return T(id, label, value, fmt="textarea", mx=mx, ph=ph)
def IMG(id, label, value=""): return {"id": id, "icon": "sicon-image-landscape", "type": "string", "format": "image", "label": label, "required": False, "value": value}
def URL(id, label, value=""): return {"id": id, "icon": "sicon-link", "type": "string", "format": "url", "label": label, "required": False, "value": value, "placeholder": "https://"}
def COLOR(id, label, value=""): return {"id": id, "icon": "sicon-color-palette", "type": "string", "format": "color", "inputType": "color", "label": label, "required": False, "value": value}
def SW(id, label, v=False): return {"id": id, "icon": "sicon-toggle-off", "type": "boolean", "format": "switch", "label": label, "required": False, "value": v}
def NUM(id, label, v, mn, mx): return {"id": id, "icon": "sicon-hashtag", "type": "number", "format": "slider", "label": label, "required": False, "value": v, "minimum": mn, "maximum": mx}
def INT(id, label, v=0, req=False): return {"id": id, "icon": "sicon-hashtag", "type": "number", "format": "number", "label": label, "required": req, "value": v}
def DATE(id, label): return {"id": id, "icon": "sicon-calendar-time", "type": "string", "format": "datetime", "inputType": "date", "label": label, "required": False, "value": ""}
def RADIO(id, label, opts, sel=None):
    o = [{"label": l, "value": v, "key": str(v)} for v, l in opts]
    s = next((x for x in o if x["value"] == sel), o[0])
    return {"id": id, "icon": "sicon-list", "type": "items", "format": "radio-list", "label": label, "required": False, "options": o, "selected": [s]}
def PROD(id="products", label="المنتجات (اتركها فارغة ليختار العنصر تلقائياً من بيانات متجرك)", mn=0, mx=12, req=False):
    return {"id": id, "icon": "sicon-box", "type": "items", "label": label, "placeholder": "ابحث في منتجاتك...", "format": "dropdown-list", "source": "products", "options": [], "required": req, "selected": [], "searchable": True, "multichoice": True, "minLength": mn, "maxLength": mx}
def COLL(id, label, fields, value, mx=12, mn=0, item="عنصر"):
    return {"id": id, "icon": "sicon-list", "type": "collection", "format": "collection", "required": mn > 0, "minLength": mn, "maxLength": mx, "item_label": item, "label": label, "fields": fields, "value": value}

SOURCES = [("best_selling", "الأكثر مبيعاً"), ("latest", "الأحدث"), ("offers", "العروض"), ("top-rated", "الأعلى تقييماً")]
def SRC(auto="best_selling", limit=8, mx=24, label=None):
    """Smart product source: merchant picks, or automatic from store data, re-ranked by the shopper's behaviour."""
    return [PROD(mx=mx, label=label or "المنتجات (اتركها فارغة ليختار العنصر تلقائياً من بيانات متجرك)"),
            RADIO("auto_source", "🤖 المصدر التلقائي عند ترك المنتجات فارغة", SOURCES, auto),
            NUM("limit", "عدد المنتجات المعروضة", limit, 1, mx),
            SW("personalize", "🧠 رتّب المنتجات حسب سلوك الزائر (ما شاهده وأضافه)", True),
            SW("hide_oos", "إخفاء المنتجات النافدة", True)]
def HEAD(eyebrow="", title="", sub=""):
    return [T("eyebrow", "سطر علوي صغير", eyebrow, mx=40), T("title", "العنوان", title, mx=90), TA("subtitle", "الوصف", sub, mx=260), SW("s_show_head", "إظهار العنوان والوصف", True)]
THEMES = [("auto", "تلقائي (ألوان متجرك)"), ("light", "فاتح"), ("ivory", "عاجي فاخر"), ("dark", "داكن"), ("midnight", "ليلي ملكي"), ("glass", "زجاجي"), ("accent", "بلون المتجر")]
def DESIGN(theme="auto", anim="rise", align="start"):
    """Shared design system: 30 settings every component understands."""
    return [
        RADIO("s_theme", "🎨 نمط التصميم", THEMES, theme),
        COLOR("s_accent", "🎨 اللون الأساسي (فارغ = لون متجرك)"), COLOR("s_accent2", "🎨 اللون الثانوي"),
        COLOR("s_bg", "🎨 لون الخلفية"), COLOR("s_text", "🎨 لون النص"), COLOR("s_card", "🎨 لون البطاقات"),
        IMG("s_bg_image", "🖼️ صورة خلفية للقسم (اختياري)"), NUM("s_overlay", "🖼️ تعتيم صورة الخلفية (%)", 45, 0, 90),
        RADIO("s_pattern", "🖼️ زخرفة الخلفية", [("none", "بدون"), ("dots", "نقاط"), ("grid", "شبكة"), ("arabesque", "نجمة عربية"), ("waves", "أمواج")]),
        RADIO("s_font", "🔤 الخط", [("inherit", "خط المتجر"), ("tajawal", "تجوال"), ("cairo", "القاهرة"), ("almarai", "المراعي"), ("plex", "IBM Plex عربي"), ("messiri", "المسيري"), ("readex", "ريدكس"), ("kufi", "نوتو كوفي"), ("amiri", "أميري"), ("rubik", "روبيك")]),
        NUM("s_title_size", "🔤 حجم العنوان (px)", 38, 18, 72), NUM("s_text_size", "🔤 حجم النص (px)", 16, 12, 22),
        RADIO("s_align", "📐 محاذاة العنوان", [("start", "بداية السطر"), ("center", "في المنتصف"), ("end", "نهاية السطر")], align),
        RADIO("s_width", "📐 عرض المحتوى", [("narrow", "ضيق"), ("normal", "عادي"), ("wide", "عريض"), ("full", "كامل الشاشة")], "normal"),
        NUM("s_pad_top", "📐 المسافة العلوية (px)", 56, 0, 200), NUM("s_pad_bottom", "📐 المسافة السفلية (px)", 56, 0, 200),
        NUM("s_gap", "📐 المسافة بين العناصر (px)", 18, 4, 48), NUM("s_radius", "📐 استدارة الزوايا (px)", 22, 0, 48),
        NUM("s_shadow", "📐 عمق الظل (0-5)", 2, 0, 5), SW("s_border", "📐 إطار رفيع حول البطاقات"),
        RADIO("s_btn_style", "🔘 شكل الأزرار", [("pill", "كبسولة"), ("rounded", "مستدير"), ("square", "حاد"), ("outline", "إطار فقط"), ("underline", "خط سفلي")]),
        RADIO("s_anim", "✨ حركة الظهور", [("none", "بدون"), ("fade", "تلاشي"), ("rise", "صعود"), ("zoom", "تكبير"), ("blur", "ضبابي"), ("slide", "انزلاق")], anim),
        NUM("s_anim_ms", "✨ سرعة الحركة (ms)", 700, 150, 2000), SW("s_stagger", "✨ ظهور متتابع للعناصر", True),
        SW("s_hide_mobile", "📱 إخفاء على الجوال"), SW("s_hide_desktop", "🖥️ إخفاء على الكمبيوتر"),
        DATE("s_from", "🗓️ إظهار ابتداءً من (اختياري)"), DATE("s_to", "🗓️ إخفاء بعد (اختياري)"),
        T("s_anchor", "🔗 معرّف القسم للروابط الداخلية (مثلاً offers)", "", ml=False, mx=40),
        SW("s_hints", "💡 مساعد الإعداد داخل محرر الثيم (لا يراه العملاء)", True),
    ]
OCCS = [("ramadan", "رمضان"), ("eid_fitr", "عيد الفطر"), ("hajj", "عشر ذي الحجة"), ("arafah", "يوم عرفة"), ("eid_adha", "عيد الأضحى"), ("hijri_new_year", "رأس السنة الهجرية"),
        ("founding", "يوم التأسيس"), ("national", "اليوم الوطني"), ("white_friday", "الجمعة البيضاء"), ("payday", "موسم الرواتب"), ("citizen", "حساب المواطن"), ("mothers", "يوم الأم"),
        ("back_to_school", "العودة للمدارس"), ("summer", "الصيف"), ("winter", "الشتاء")]
SRCS = [("any", "أي مصدر"), ("snapchat", "سناب شات"), ("tiktok", "تيك توك"), ("instagram", "إنستقرام"), ("google", "قوقل"), ("x", "إكس"), ("whatsapp", "واتساب"), ("facebook", "فيسبوك"), ("youtube", "يوتيوب"), ("email", "البريد"), ("direct", "زيارة مباشرة"), ("other", "مصدر آخر")]
DAYPARTS = [("any", "أي وقت"), ("morning", "الصباح 5-11"), ("noon", "الظهر 11-3"), ("evening", "العصر 3-7"), ("night", "الليل 7-12"), ("late", "آخر الليل 12-5")]
DEVICES = [("any", "أي جهاز"), ("mobile", "جوال"), ("desktop", "كمبيوتر"), ("ios", "آيفون"), ("android", "أندرويد")]
VISITORS = [("any", "أي زائر"), ("new", "زائر جديد"), ("returning", "زائر عائد"), ("loyal", "زائر دائم (4 زيارات+)"), ("cart", "عنده منتجات في السلة")]

def count(fields):
    n = 0
    for f in fields:
        n += 1
        if f.get("type") == "collection": n += count(f["fields"])
    return n

def build(slug, name, desc, comps, repo_owner="fooz1980k-sudo"):
    U = lambda n: str(uuid.uuid5(uuid.NAMESPACE_URL, f"{slug}/{n}"))
    img = f"https://raw.githubusercontent.com/{repo_owner}/{slug}/main/previews/{{}}.jpg"
    for c in comps: c["key"] = U(c["name"]); c["image"] = img.format(c["name"])
    tpl_id = U("template")
    out = {"name": name, "description": desc,
           "author": {"name": "Khaled Alshamrani", "email": "fooz1980k@gmail.com", "url": f"https://github.com/{repo_owner}/{slug}"},
           "repository": f"https://github.com/{repo_owner}/{slug}", "components": comps, "author_email": "fooz1980k@gmail.com", "support_url": "https://smmlystore.com",
           "templates": [{"id": tpl_id, "path": f"templates.{slug}-template", "category_id": "", "primary_color": "", "thumbnail": "", "is_default": True}]}
    json.dump(out, open("twilight-bundle.json", "w"), ensure_ascii=False, indent=2)
    import os; os.makedirs("templates", exist_ok=True)
    tpl = {"id": tpl_id, "components": [dict(c) for c in comps]}
    json.dump(tpl, open(f"templates/{slug}-template.json", "w"), ensure_ascii=False, indent=2)
    stats = {c["name"]: count(c["fields"]) for c in comps}
    json.dump(stats, open("settings-count.json", "w"), ensure_ascii=False, indent=1)
    print(len(comps), "components", stats, "total", sum(stats.values()))

OFF = ["citizen", "summer", "winter", "hijri_new_year"]
def OCCSW(prefix_label="🗓️ "):
    return [SW(f"o_{k}", f"{prefix_label}{n}", k not in OFF) for k, n in OCCS]
def OCCCFG():
    return [RADIO("override", "🎛️ تحكم يدوي بالموسم", [("auto", "تلقائي (مستحسن)"), ("none", "إيقاف المواسم")] + OCCS),
            NUM("lead_days", "🧠 ابدأ «قرّب الموسم» قبل (أيام)", 14, 0, 45), DATE("preview_date", "🧪 جرّب تاريخاً (داخل المحرر فقط)"),
            NUM("pay_day", "💸 يوم الراتب في الشهر", 27, 1, 31), RADIO("pay_shift", "💸 إذا وافق الراتب الجمعة أو السبت", [("before", "يُقدَّم للخميس"), ("after", "يُؤخَّر للأحد"), ("none", "لا يتغير")]),
            DATE("school_date", "🎒 تاريخ أول يوم دراسي"), NUM("wf_days", "🏷️ أيام قبل الجمعة البيضاء", 7, 0, 21)]
