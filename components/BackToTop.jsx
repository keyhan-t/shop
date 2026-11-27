import { useEffect, useState } from "react";

// محیط دایره (شعاع ۲۲): برای کشیدن حلقه‌ی پیشرفت اسکرول
const CIRCLE_LENGTH = 2 * Math.PI * 22;

// دکمه‌ی گرد پایین صفحه که نشون میده چقدر اسکرول کردی و با کلیک می‌بره بالا
function BackToTop() {
  const [progress, setProgress] = useState(0); // عددی بین 0 (بالا) تا 1 (ته صفحه)

  useEffect(() => {
    function onScroll() {
      // چقدر میشه اسکرول کرد = ارتفاع کل صفحه - ارتفاع پنجره
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // بعد از ۸ درصد اسکرول دکمه ظاهر میشه
  const visible = progress > 0.08;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="بازگشت به بالای صفحه"
      className={`fixed bottom-6 end-6 z-50 grid size-14 place-items-center rounded-full bg-white shadow-xl shadow-black/15 transition-all duration-500 hover:-translate-y-1 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      {/* حلقه‌ی پیشرفت اسکرول */}
      <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="22" fill="none" stroke="#e3f4f3" strokeWidth="3" />
        <circle
          cx="25"
          cy="25"
          r="22"
          fill="none"
          stroke="#0ea5a8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCLE_LENGTH}
          strokeDashoffset={CIRCLE_LENGTH * (1 - progress)}
        />
      </svg>
      <i className="bi bi-arrow-up relative text-xl text-ink"></i>
    </button>
  );
}

export default BackToTop;
