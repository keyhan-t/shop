# پوشامن | فروشگاه پوشاک مردانه

React + Vite + Tailwind CSS (راست‌چین و فارسی)

## اجرا

```bash
npm install
npm run dev
```

## ساختار پروژه

```
src/
├── App.jsx              ← کنار هم گذاشتن بخش‌ها + کد انیمیشن اسکرول + شمارنده‌ی سبد خرید
├── index.css            ← رنگ‌ها، فونت‌ها و همه‌ی انیمیشن‌ها (با توضیح)
├── data/products.js     ← لیست محصولات (اسم، قیمت، عکس) ← اینجا محصول اضافه کن
└── components/
    ├── Navbar.jsx       ← نوار بالا و منو (موبایل هم داره)
    ├── Hero.jsx         ← بخش اول صفحه
    ├── Marquee.jsx      ← نوار متنی متحرک
    ├── Features.jsx     ← مزیت‌ها (نور دنبال‌کننده‌ی موس)
    ├── ProductList.jsx  ← جدیدترین محصولات
    ├── ProductCard.jsx  ← کارت یک محصول
    ├── Off.jsx          ← شگفت‌انگیز + شمارش معکوس
    ├── Gallery.jsx      ← دسته‌بندی‌ها
    ├── Testimonials.jsx ← نظرات مشتریان (نمونه)
    ├── CountUp.jsx      ← عددی که از صفر بالا میره
    ├── Footer.jsx       ← فوتر + خبرنامه
    └── BackToTop.jsx    ← دکمه‌ی بازگشت به بالا
```

## چطور انیمیشن اسکرول به یه المنت بدم؟

به المنت کلاس `reveal` بده. مدل‌های دیگه: `reveal-scale`، `reveal-from-right`، `reveal-from-left`.
برای تاخیر: `style={{ "--delay": "0.2s" }}`

## قبل از انتشار حتما عوض کن

- نظرات مشتریان (`Testimonials.jsx`) و آمارشون
- آدرس، تلفن و ایمیل (`Footer.jsx`)
- عکس و اسم و قیمت محصولات (`data/products.js`)
