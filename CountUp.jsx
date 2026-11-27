import { useEffect, useRef, useState } from "react";

// یه عدد که وقتی به صفحه رسید از صفر شروع می‌کنه به بالا رفتن تا عدد نهایی.
//   end      = عدد نهایی
//   decimals = تعداد رقم اعشار (مثلا 1 برای ۴٫۸)
//   suffix   = متنی که بعد از عدد میاد (مثلا ٪ یا +)
function CountUp({ end, decimals = 0, suffix = "" }) {
  const [value, setValue] = useState(0); // عددی که الان نشون داده میشه
  const ref = useRef(null); // به خود عنصر دسترسی پیدا می‌کنیم

  useEffect(() => {
    let frameId;

    // IntersectionObserver خبر میده کی عنصر وارد صفحه شد
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return; // هنوز دیده نشده
        observer.disconnect(); // فقط یک بار اجرا بشه

        // اگه کاربر انیمیشن نمی‌خواد، مستقیم عدد نهایی رو نشون بده
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setValue(end);
          return;
        }

        const duration = 1800; // مدت انیمیشن (میلی‌ثانیه)
        const startTime = performance.now();

        function step(now) {
          // progress عددیه بین 0 تا 1 (چقدر از زمان گذشته)
          const progress = Math.min((now - startTime) / duration, 1);
          // این فرمول باعث میشه آخر شمارش آروم‌تر بشه
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(end * eased);
          if (progress < 1) {
            frameId = requestAnimationFrame(step); // فریم بعدی
          }
        }
        frameId = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );

    observer.observe(ref.current);

    // وقتی کامپوننت از صفحه رفت همه‌چیز رو تمیز کن
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [end]);

  return (
    <span ref={ref}>
      {value.toLocaleString("fa-IR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default CountUp;
