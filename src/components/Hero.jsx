import { useEffect, useRef } from "react";
import header from "../assets/header.jpg";
import hodi from "../assets/hodi.png";

// تیتر اصلی. بعدش به کلمه‌هاش تقسیمش می‌کنیم تا هر کلمه جدا انیمیشن بگیره
const headline = "استایلی که کیفیت و راحتی را معنا می‌کند";

// سه تا مزیت زیر دکمه‌ها
const perks = [
  { icon: "bi-truck", text: "ارسال سریع" },
  { icon: "bi-shield-check", text: "پرداخت امن" },
  { icon: "bi-tags", text: "مناسب‌ترین قیمت" },
];

function Hero() {
  // به عنصر عکس دسترسی می‌گیریم تا موقع اسکرول کمی تکونش بدیم
  const photoRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      // هر چقدر پایین‌تر بریم، عکس یه ذره آروم‌تر از بقیه‌ی صفحه حرکت می‌کنه (پارالاکس)
      photoRef.current.style.transform = `translateY(${window.scrollY * 0.07}px)`;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // جمله رو با فاصله می‌شکنیم: ["استایلی", "که", "کیفیت", ...]
  const words = headline.split(" ");

  return (
    <header className="wrapper grid items-center gap-14 pb-16 pt-10 lg:grid-cols-2 lg:gap-8 lg:py-16">
      {/* ================= متن‌ها ================= */}
      <div className="flex flex-col items-start gap-6">
        {/* برچسب کالکشن جدید با نقطه‌ی چشمک‌زن */}
        <span
          className="fade-up inline-flex items-center gap-2.5 rounded-full bg-mist px-4 py-2 text-sm font-bold text-brand-dark"
          style={{ "--delay": "0.1s" }}
        >
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75"></span>
            <span className="relative inline-flex size-2.5 rounded-full bg-brand"></span>
          </span>
          کالکشن جدید ۱۴۰۵
        </span>

        {/* تیتر: هر کلمه با کمی تاخیر نسبت به قبلی میاد بالا */}
        <h1 className="text-[2.1rem] font-black leading-[1.5] text-ink sm:text-5xl sm:leading-[1.5] xl:text-6xl xl:leading-[1.5]">
          {words.map((word, index) => (
            <span key={index} className="word-mask me-[0.28em]">
              <span
                className="word"
                style={{ "--delay": `${0.25 + index * 0.08}s` }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="fade-up max-w-xl text-lg leading-8 text-gray-600"
          style={{ "--delay": "0.9s" }}
        >
          طراحی‌شده برای مردانی که در انتخاب لباس به جزئیات و دوخت اهمیت
          می‌دهند.
        </p>

        {/* دکمه‌ها */}
        <div
          className="fade-up flex flex-wrap gap-4"
          style={{ "--delay": "1.05s" }}
        >
          <a
            href="#products"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-dark px-7 text-base font-bold text-white shadow-lg shadow-brand/30 transition duration-300 hover:-translate-y-1 hover:bg-ink hover:shadow-xl hover:shadow-ink/30"
          >
            <i className="bi bi-shop"></i>
            مشاهده و خرید کالکشن
          </a>
          <a
            href="#about"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-brand-dark px-7 text-base font-bold text-brand-dark transition duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:text-white"
          >
            <i className="bi bi-people-fill"></i>
            درباره پوشامن
          </a>
        </div>

        {/* مزیت‌ها */}
        <ul
          className="fade-up mt-2 flex flex-wrap gap-x-8 gap-y-4"
          style={{ "--delay": "1.2s" }}
        >
          {perks.map((perk) => (
            <li key={perk.text} className="group flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-mist text-xl text-brand-dark transition duration-300 group-hover:rotate-12 group-hover:bg-brand-dark group-hover:text-white">
                <i className={`bi ${perk.icon}`}></i>
              </span>
              <span className="font-bold text-ink">{perk.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ================= عکس ================= */}
      <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
        {/* بلوک فیروزه‌ای پشت عکس */}
        <div
          className="photo-wipe absolute -end-4 top-8 size-full rounded-[2.5rem] bg-brand sm:-end-5"
          style={{ "--delay": "0s" }}
        ></div>

        {/* این div موقع اسکرول تکون می‌خوره */}
        <div ref={photoRef} className="relative will-change-transform">
          <div
            className="photo-wipe overflow-hidden rounded-[2.5rem] bg-sand shadow-2xl shadow-ink/20"
            style={{ "--delay": "0.25s" }}
          >
            <img
              src={header}
              alt="مدل با ست سویشرت و شلوار پوشامن"
              width="628"
              height="680"
              className="photo-settle h-auto w-full"
            />
          </div>

          {/* کارت محصول شناور روی عکس */}
          <a
            href="#products"
            className="fade-up absolute -bottom-7 -start-3 sm:-start-6"
            style={{ "--delay": "1.5s" }}
          >
            <div className="float flex items-center gap-3 rounded-2xl bg-white p-3 pe-5 shadow-xl ring-1 ring-black/5 transition duration-300 hover:scale-105">
              <img
                src={hodi}
                alt=""
                className="size-16 rounded-xl bg-[#f3f3f3] object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">محصول ویژه</span>
                <span className="font-bold text-ink">هودی بیسیک</span>
                <span className="text-sm font-bold text-brand-dark">
                  ۱٬۴۹۹٬۰۰۰ تومان
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Hero;
