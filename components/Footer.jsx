import { useState } from "react";
import logo from "../assets/logo.png";

const shopLinks = ["هودی", "دورس", "بلوز", "تیشرت", "ست مردانه"];
const helpLinks = [
  "پیگیری سفارش",
  "راهنمای انتخاب سایز",
  "شرایط بازگشت کالا",
  "سوالات متداول",
];
const socials = [
  { icon: "bi-instagram", label: "اینستاگرام", href: "#" },
  { icon: "bi-telegram", label: "تلگرام", href: "#" },
  { icon: "bi-whatsapp", label: "واتساپ", href: "#" },
];

function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
    setEmail("");
  }

  return (
    <footer
      id="contact"
      className="relative mt-24 overflow-hidden rounded-t-[2.5rem] bg-ink text-white md:mt-32"
    >
      <div className="wrapper pt-16">
        <div className="reveal flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-black leading-snug md:text-3xl">
              از کالکشن‌ها و تخفیف‌های جدید زودتر باخبر شو
            </h2>
            <p className="mt-3 text-white/70">
              ایمیلت رو بنویس؛ فقط خبرهای مهم رو برات می‌فرستیم.
            </p>
          </div>

          {sent ? (
            <p className="pop flex items-center gap-3 rounded-full bg-white/10 px-6 py-4 font-bold">
              <i className="bi bi-check-circle-fill text-xl text-brand-light"></i>
              ممنون! ایمیلت ثبت شد.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md items-center gap-2 rounded-full bg-white/10 p-1.5 ring-1 ring-white/15 transition focus-within:ring-2 focus-within:ring-brand-light"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ایمیل شما"
                aria-label="ایمیل شما"
                className="min-w-0 flex-1 bg-transparent px-4 text-white placeholder:text-white/50 focus:outline-none"
              />
              <button className="rounded-full bg-brand-light px-6 py-3 font-bold text-ink transition duration-300 hover:bg-white">
                عضویت
              </button>
            </form>
          )}
        </div>
        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          {/* درباره‌ی برند */}
          <div className="reveal">
            <a href="#" className="flex w-fit items-center gap-3">
              <span className="font-display text-4xl">پوشامن</span>
              <img src={logo} alt="" className="size-12" />
            </a>
            <p className="mt-5 max-w-sm leading-8 text-white/70">
              پوشامن، فروشگاه پوشاک مردانه برای کسایی که کیفیت، دوخت و راحتی رو
              کنار هم می‌خوان.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid size-11 place-items-center rounded-full bg-white/10 text-xl transition duration-300 hover:-translate-y-1.5 hover:bg-brand-light hover:text-ink"
                >
                  <i className={`bi ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
          <div className="reveal" style={{ "--delay": "0.1s" }}>
            <h3 className="mb-5 text-lg font-bold">فروشگاه</h3>
            <ul className="flex flex-col gap-3 text-white/70">
              {shopLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#products"
                    className="inline-block transition duration-300 hover:-translate-x-1.5 hover:text-brand-light"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal" style={{ "--delay": "0.2s" }}>
            <h3 className="mb-5 text-lg font-bold">راهنمای مشتری</h3>
            <ul className="flex flex-col gap-3 text-white/70">
              {helpLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="inline-block transition duration-300 hover:-translate-x-1.5 hover:text-brand-light"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal" style={{ "--delay": "0.3s" }}>
            <h3 className="mb-5 text-lg font-bold">تماس با ما</h3>
            <ul className="flex flex-col gap-4 text-white/70">
              <li className="flex gap-3">
                <i className="bi bi-geo-alt text-xl text-brand-light"></i>
               مریوان ، شهرک زیبا
              </li>
              <li className="flex gap-3">
                <i className="bi bi-telephone text-xl text-brand-light"></i>
                <a
                  href="tel:02112345678"
                  className="transition-colors hover:text-white"
                >
                  09927139614
                </a>
              </li>
              <li className="flex gap-3">
                <i className="bi bi-envelope text-xl text-brand-light"></i>
                <a
                  href="mailto:info@example.com"
                  className="transition-colors hover:text-white"
                >
                  kayhan@gamil.com
                </a>
              </li>
              <li className="flex gap-3">
                <i className="bi bi-clock text-xl text-brand-light"></i>
                شنبه تا پنجشنبه، ۹ تا ۱۸
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-sm text-white/60 md:flex-row">
          <p>© ۱۴۰۵ پوشامن. تمامی حقوق محفوظ است.</p>
          <p>
            <a href="#" className="transition-colors hover:text-white">
              قوانین و مقررات
            </a>
            <span className="mx-3" aria-hidden="true">
              |
            </span>
            <a href="#" className="transition-colors hover:text-white">
              حریم خصوصی
            </a>
          </p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="reveal pointer-events-none select-none overflow-hidden text-center"
      >
        <span className="giant-text block pb-2 font-display text-[24vw] leading-[1.35] lg:text-[16rem]">
          پوشامن
        </span>
      </div>
    </footer>
  );
}

export default Footer;
