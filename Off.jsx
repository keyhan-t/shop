import { useState, useEffect } from "react";
import icon from "../assets/icon.svg";
import ProductCard from "./ProductCard";
import { offerProducts } from "../data/products";

// مدت پیشنهاد: ۳ روز (به میلی‌ثانیه)
// نکته: الان شمارش از لحظه‌ی باز شدن صفحه شروع میشه. تو سایت واقعی
// بهتره یه تاریخ پایان ثابت بذاری.
const OFFER_DURATION = 3 * 24 * 60 * 60 * 1000;

function Off({ onAddToCart }) {
  // زمان باقی‌مانده (میلی‌ثانیه)
  const [remaining, setRemaining] = useState(OFFER_DURATION);

  useEffect(() => {
    // زمان پایان = الان + ۳ روز
    const deadline = Date.now() + OFFER_DURATION;

    // هر ثانیه یه بار، زمان باقی‌مانده رو دوباره حساب کن
    const id = setInterval(() => {
      const diff = deadline - Date.now();
      setRemaining(diff > 0 ? diff : 0);
    }, 1000);

    // وقتی کامپوننت حذف شد، تایمر رو متوقف کن
    return () => clearInterval(id);
  }, []);

  // تبدیل میلی‌ثانیه به روز و ساعت و دقیقه و ثانیه
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // عدد رو دو رقمی و فارسی می‌کنه: 5 میشه ۰۵
  function pad(number) {
    return number.toLocaleString("fa-IR", { minimumIntegerDigits: 2 });
  }

  const timeBoxes = [
    { label: "روز", value: days },
    { label: "ساعت", value: hours },
    { label: "دقیقه", value: minutes },
    { label: "ثانیه", value: seconds },
  ];

  return (
    <section className="wrapper pt-20 md:pt-28">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-ink p-6 text-white md:p-10 lg:flex lg:items-center lg:gap-10">
        {/* دایره‌های نورانی تزئینی */}
        <span className="pointer-events-none absolute -start-20 -top-20 size-72 rounded-full bg-brand/30 blur-3xl"></span>
        <span className="pointer-events-none absolute -bottom-24 -end-16 size-72 rounded-full bg-brand-light/20 blur-3xl"></span>

        {/* ---------- ستون راست: عنوان و شمارش معکوس ---------- */}
        <div className="reveal reveal-from-right relative flex flex-col items-center gap-6 pb-8 text-center lg:w-[32%] lg:pb-0">
          <img src={icon} alt="" className="wiggle w-24" />
          <h2 className="font-display text-5xl md:text-6xl">شگفت‌انگیز</h2>
          <p className="text-white/80">تخفیف‌های ویژه فقط تا پایان زمان</p>

          {/* شمارش معکوس */}
          <div className="flex gap-2.5">
            {timeBoxes.map((box) => (
              <div key={box.label} className="flex flex-col items-center gap-2">
                <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-xl bg-white text-2xl font-black text-ink sm:h-16 sm:w-16 sm:text-3xl">
                  {/* با هر تغییر عدد، key عوض میشه و انیمیشن tick دوباره پخش میشه */}
                  <span key={box.value} className="tick">
                    {pad(box.value)}
                  </span>
                </span>
                <span className="text-xs text-white/80">{box.label}</span>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-light px-8 font-bold text-ink transition duration-300 hover:-translate-y-1 hover:bg-white"
          >
            مشاهده همه
            <i className="bi bi-arrow-left"></i>
          </a>
        </div>

        {/* ---------- ستون چپ: محصولات ---------- */}
        <div className="no-scrollbar relative -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 py-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:py-0 lg:w-[68%]">
          {offerProducts.map((product, index) => (
            <div
              key={product.id}
              className="reveal reveal-from-left w-[72%] shrink-0 snap-start sm:w-auto"
              style={{ "--delay": `${0.1 + index * 0.12}s` }}
            >
              <ProductCard product={product} onAdd={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Off;
