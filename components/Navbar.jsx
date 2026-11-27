
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
const links = [
  { title: "دسته‌بندی محصولات", href: "#gallery" },
  { title: "فروشگاه", href: "#products" },
  { title: "تماس با ما", href: "#contact" },
  { title: "درباره ما", href: "#about" },
];
const iconButton = "relative grid size-10 place-items-center rounded-full bg-mist text-lg text-brand-dark transition duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:text-white";
function Navbar({ cartCount = 0, user, onCart, onAuth, onHome }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <>
    <div className="relative overflow-hidden bg-brand-dark py-2 text-center text-sm font-medium text-white"><span className="shine pointer-events-none absolute inset-0" /><span className="relative">✦ کالکشن جدید ۱۴۰۵ رسید</span></div>
    <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/90 shadow-lg shadow-black/5 backdrop-blur-xl" : "bg-white/70 backdrop-blur-md"}`}>
      <nav className={`wrapper grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}>
        <div className="justify-self-start"><ul className="hidden items-center gap-7 xl:flex">{links.map(link => <li key={link.title}><a href={link.href} className="link-underline relative block py-2 font-medium text-ink hover:text-brand-dark">{link.title}</a></li>)}</ul><button onClick={() => setMenuOpen(!menuOpen)} aria-label="منو" className={`${iconButton} xl:hidden`}><i className={menuOpen ? "bi bi-x-lg" : "bi bi-list"} /></button></div>
        <button onClick={onHome} className="group flex items-center gap-3"><span className="font-display text-3xl text-ink">پوشامن</span><img src={logo} alt="لوگوی پوشامن" className="size-11 transition duration-500 group-hover:-rotate-12 group-hover:scale-110" /></button>
        <div className="flex items-center gap-2 justify-self-end sm:gap-3">
          <button onClick={onAuth} className="hidden h-10 items-center rounded-full bg-brand-dark px-5 text-sm font-bold text-white transition hover:bg-ink sm:inline-flex">{user ? user.name : "ورود / ثبت‌نام"}</button>
          <button onClick={onCart} aria-label="سبد خرید" className={iconButton}><i className="bi bi-cart3" />{cartCount > 0 && <span className="pop absolute -end-1 -top-1 grid size-5 place-items-center rounded-full bg-rose-500 text-[11px] font-bold text-white">{cartCount.toLocaleString("fa-IR")}</span>}</button>
        </div>
      </nav>
      {menuOpen && <div className="slide-down border-t border-black/5 bg-white/95 xl:hidden"><ul className="wrapper flex flex-col py-3">{links.map(link => <li key={link.title}><a href={link.href} onClick={() => setMenuOpen(false)} className="block border-b border-black/5 py-4 font-medium text-ink">{link.title}</a></li>)}<li className="pt-4"><button onClick={() => { setMenuOpen(false); onAuth(); }} className="h-11 w-full rounded-full bg-brand-dark font-bold text-white">{user ? user.name : "ورود / ثبت‌نام"}</button></li></ul></div>}
    </header>
  </>;
}
export default Navbar;
