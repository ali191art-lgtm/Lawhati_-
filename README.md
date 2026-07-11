# Inkframe Studio

## الإطار المستخدم (Framework)
هذا المشروع مبني بـ **React** (مكونات وظيفية + Hooks، ملف JSX واحد رئيسي `src/App.jsx`) وليس Next.js.
تمت تهيئته هنا كمشروع **Vite** (أداة البناء/التطوير) — ليس JavaScript عادي بدون إطار، وليس HTML/CSS خام. الأيقونات من مكتبة `lucide-react`، ولا يُستخدم Tailwind؛ التنسيق كله inline styles + بعض CSS محقون داخل المكوّن.

## التشغيل محليًا
```bash
npm install
npm run dev
```

## البناء للإنتاج
```bash
npm install
npm run build
```
الناتج يكون في مجلد `dist/`.

## النشر على GitHub Pages
**الطريقة الأسهل (تلقائي):**
1. ارفع المشروع إلى مستودع GitHub جديد على فرع `main`.
2. من إعدادات المستودع: Settings → Pages → Source، اختر **GitHub Actions**.
3. عند كل push إلى `main`، سيقوم الووركفلو الموجود في `.github/workflows/deploy.yml` تلقائيًا ببناء المشروع ونشره.

**يدويًا:**
```bash
npm run build
# ثم ارفع محتوى مجلد dist إلى فرع gh-pages
```

## النشر على Netlify
1. اسحب مجلد المشروع كاملاً إلى Netlify (Drag & Drop) بعد تشغيل `npm run build`، وارفع مجلد `dist` فقط.
   أو
2. اربط المستودع مباشرة بـ Netlify واستخدم:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

## ملاحظة
`vite.config.js` يستخدم `base: "./"` (مسارات نسبية) حتى يعمل المشروع مباشرة على GitHub Pages أو Netlify دون أي تعديل إضافي.
