
import { useEffect, useMemo, useState } from "react";
import BackToTop from "./components/BackToTop";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";
import Off from "./components/Off";
import ProductList from "./components/ProductList";
import Testimonials from "./components/Testimonials";

const money = (value) => Number(value || 0).toLocaleString("fa-IR");
const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

function App() {
  const [cart, setCart] = useState(() => read("poshamen_cart", []));
  const [user, setUser] = useState(() => read("poshamen_user", null));
  const [page, setPage] = useState("home");
  const [authMode, setAuthMode] = useState("login");
  const [notice, setNotice] = useState("");
  const [order, setOrder] = useState(null);

  useEffect(() => localStorage.setItem("poshamen_cart", JSON.stringify(cart)), [cart]);
  useEffect(() => {
    if (user) localStorage.setItem("poshamen_user", JSON.stringify(user));
    else localStorage.removeItem("poshamen_user");
  }, [user]);

  useEffect(() => {
    if (page !== "home") return;
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("show"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [page]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  function addToCart(product) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      return found
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }];
    });
    setNotice(`${product.name} به سبد خرید اضافه شد`);
    setTimeout(() => setNotice(""), 2200);
  }
  function changeQuantity(id, amount) {
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
  }
  function openAuth(mode = "login") { setAuthMode(mode); setPage("auth"); }
  function submitAuth(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const password = String(data.get("password") || "");
    if (!/^09\d{9}$/.test(phone)) return setNotice("شماره موبایل باید ۱۱ رقم و با 09 شروع شود");
    if (password.length < 6) return setNotice("رمز عبور باید حداقل ۶ کاراکتر باشد");
    if (authMode === "register" && name.length < 2) return setNotice("نام و نام خانوادگی را وارد کنید");
    setUser({ name: name || "کاربر پوشامن", phone });
    setNotice("با موفقیت وارد شدید");
    setPage("home");
  }
  function checkout(event) {
    event.preventDefault();
    if (!cart.length) return;
    if (!user) { setNotice("برای ادامه ابتدا وارد حساب کاربری شوید"); openAuth("login"); return; }
    const data = new FormData(event.currentTarget);
    const address = String(data.get("address") || "").trim();
    if (address.length < 10) return setNotice("آدرس کامل‌تری وارد کنید");
    setOrder({ id: `PS-${Date.now().toString().slice(-7)}`, items: cart, total, address, date: new Date().toLocaleString("fa-IR") });
    setPage("payment");
  }
  function payDemo() {
    // پرداخت نمایشی است و هیچ تراکنش بانکی واقعی انجام نمی‌شود.
    setCart([]);
    setPage("success");
  }

  return (
    <div dir="rtl">
      <Navbar cartCount={cartCount} user={user} onCart={() => setPage("cart")} onAuth={() => openAuth("login")} onHome={() => setPage("home")} />
      {notice && <div className="fixed bottom-5 left-5 z-[100] rounded-2xl bg-ink px-5 py-3 text-sm font-bold text-white shadow-xl">{notice}</div>}

      {page === "home" && <>
        <main>
          <Hero /><Marquee /><Features />
          <ProductList onAddToCart={addToCart} />
          <Off onAddToCart={addToCart} />
          <Gallery /><Testimonials />
        </main>
        <Footer /><BackToTop />
      </>}

      {page === "auth" && <main className="wrapper min-h-[70vh] py-16">
        <section className="mx-auto max-w-md rounded-3xl bg-white p-7 shadow-xl ring-1 ring-black/5 sm:p-10">
          <button onClick={() => setPage("home")} className="mb-6 text-sm text-brand-dark">← بازگشت به فروشگاه</button>
          <h1 className="text-3xl font-black text-ink">{authMode === "login" ? "ورود به حساب" : "ساخت حساب کاربری"}</h1>
          <p className="mb-7 mt-2 text-sm text-gray-500">برای پیگیری سفارش‌ها وارد حساب پوشامن شوید.</p>
          <div className="mb-6 grid grid-cols-2 rounded-xl bg-mist p-1">
            <button onClick={() => setAuthMode("login")} className={`rounded-lg py-3 text-sm font-bold ${authMode === "login" ? "bg-white shadow" : ""}`}>ورود</button>
            <button onClick={() => setAuthMode("register")} className={`rounded-lg py-3 text-sm font-bold ${authMode === "register" ? "bg-white shadow" : ""}`}>ثبت‌نام</button>
          </div>
          <form onSubmit={submitAuth} className="space-y-4">
            {authMode === "register" && <label className="block text-sm font-bold">نام و نام خانوادگی<input name="name" required minLength="2" className="form-field mt-2" placeholder="مثلاً علی رضایی" /></label>}
            <label className="block text-sm font-bold">شماره موبایل<input name="phone" required inputMode="numeric" pattern="09[0-9]{9}" maxLength="11" className="form-field mt-2" placeholder="09123456789" /></label>
            <label className="block text-sm font-bold">رمز عبور<input name="password" required minLength="6" type="password" className="form-field mt-2" placeholder="حداقل ۶ کاراکتر" /></label>
            <button className="w-full rounded-xl bg-brand-dark py-4 font-bold text-white transition hover:bg-ink">{authMode === "login" ? "ورود" : "ثبت‌نام"}</button>
          </form>
          <p className="mt-4 text-xs leading-6 text-gray-400">نسخه نمایشی: اطلاعات حساب فقط در همین مرورگر ذخیره می‌شود و احراز هویت سروری/پیامکی ندارد.</p>
        </section>
      </main>}

      {page === "cart" && <main className="wrapper min-h-[70vh] py-14">
        <div className="mb-8 flex items-center justify-between"><h1 className="text-3xl font-black text-ink">سبد خرید</h1><button onClick={() => setPage("home")} className="text-sm font-bold text-brand-dark">ادامه خرید ←</button></div>
        {!cart.length ? <div className="rounded-3xl bg-white p-12 text-center shadow-sm"><div className="mb-4 text-5xl">🛒</div><h2 className="text-xl font-bold">سبد خریدت خالیه</h2><p className="mt-2 text-gray-500">چند محصول جذاب به سبدت اضافه کن.</p><button onClick={() => setPage("home")} className="mt-6 rounded-xl bg-brand-dark px-7 py-3 font-bold text-white">رفتن به فروشگاه</button></div> :
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-3">{cart.map(item => <article key={item.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <img src={item.image} alt={item.name} className="size-24 rounded-xl bg-gray-50 object-contain" />
            <div className="min-w-0 flex-1"><h3 className="font-bold">{item.name}</h3><p className="mt-1 text-sm text-brand-dark">{money(item.price)} تومان</p><div className="mt-3 flex items-center gap-3"><button onClick={() => changeQuantity(item.id, -1)} className="qty-btn">−</button><b>{money(item.quantity)}</b><button onClick={() => changeQuantity(item.id, 1)} className="qty-btn">+</button></div></div>
            <button onClick={() => setCart(c => c.filter(x => x.id !== item.id))} className="text-sm text-rose-500">حذف</button>
          </article>)}</div>
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-lg font-black">خلاصه سفارش</h2><div className="my-5 flex justify-between text-sm"><span>تعداد کالا</span><b>{money(cartCount)}</b></div><div className="flex justify-between border-t pt-5"><b>مبلغ قابل پرداخت</b><strong className="text-brand-dark">{money(total)} تومان</strong></div><button onClick={() => user ? setPage("checkout") : openAuth("login")} className="mt-6 w-full rounded-xl bg-brand-dark py-4 font-bold text-white">ادامه و ثبت سفارش</button></aside>
        </div>}
      </main>}

      {page === "checkout" && <main className="wrapper min-h-[70vh] py-14"><section className="mx-auto max-w-2xl rounded-3xl bg-white p-7 shadow-lg sm:p-10"><button onClick={() => setPage("cart")} className="mb-6 text-sm text-brand-dark">← بازگشت به سبد</button><h1 className="mb-2 text-3xl font-black">اطلاعات ارسال</h1><p className="mb-7 text-sm text-gray-500">سفارش برای {user?.name} ثبت می‌شود.</p><form onSubmit={checkout} className="space-y-4"><label className="block text-sm font-bold">نام گیرنده<input className="form-field mt-2" required defaultValue={user?.name} /></label><label className="block text-sm font-bold">شماره تماس<input className="form-field mt-2" required defaultValue={user?.phone} /></label><label className="block text-sm font-bold">آدرس کامل<textarea name="address" required minLength="10" rows="4" className="form-field mt-2" placeholder="استان، شهر، خیابان، پلاک و واحد" /></label><div className="rounded-xl bg-mist p-4 text-sm">مبلغ سفارش: <b>{money(total)} تومان</b></div><button className="w-full rounded-xl bg-brand-dark py-4 font-bold text-white">ادامه به پرداخت آزمایشی</button></form></section></main>}

      {page === "payment" && order && <main className="wrapper min-h-[70vh] py-14"><section className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl"><div className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-amber-100 text-3xl">🔐</div><h1 className="text-2xl font-black">درگاه پرداخت آزمایشی</h1><p className="mt-2 text-sm text-gray-500">این صفحه شبیه‌سازی است؛ هیچ پولی جابه‌جا نمی‌شود.</p><div className="my-7 rounded-2xl bg-gray-50 p-5 text-right text-sm"><div className="mb-3 flex justify-between"><span>شماره سفارش</span><b>{order.id}</b></div><div className="flex justify-between"><span>مبلغ پرداخت</span><b className="text-brand-dark">{money(order.total)} تومان</b></div></div><div className="mb-6 rounded-xl border border-dashed p-4 text-xs leading-6 text-gray-500">درگاه تستی پوشامن · حالت شبیه‌سازی موفقیت پرداخت</div><button onClick={payDemo} className="w-full rounded-xl bg-emerald-600 py-4 font-bold text-white hover:bg-emerald-700">پرداخت آزمایشی موفق</button><button onClick={() => setPage("checkout")} className="mt-3 w-full py-3 text-sm text-gray-500">انصراف و بازگشت</button></section></main>}

      {page === "success" && order && <main className="wrapper min-h-[70vh] py-16"><section className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl"><div className="mx-auto mb-5 grid size-20 place-items-center rounded-full bg-emerald-100 text-4xl text-emerald-600">✓</div><h1 className="text-3xl font-black">پرداخت آزمایشی موفق بود!</h1><p className="mt-3 text-gray-500">سفارش {order.id} با موفقیت شبیه‌سازی شد.</p><p className="mt-2 text-sm text-gray-500">مبلغ: {money(order.total)} تومان</p><button onClick={() => { setOrder(null); setPage("home"); }} className="mt-8 rounded-xl bg-brand-dark px-8 py-4 font-bold text-white">بازگشت به فروشگاه</button></section></main>}
    </div>
  );
}
export default App;
