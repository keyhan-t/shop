import { useState } from "react";

// قیمت رو به عدد فارسی با جداکننده‌ی هزارگان تبدیل می‌کنه
// مثلا 1499000 میشه ۱٬۴۹۹٬۰۰۰
function formatPrice(number) {
  return number.toLocaleString("fa-IR");
}

// یه کارت محصول.
// دو تا چیز از بیرون می‌گیره (بهشون میگن props):
//   product  = اطلاعات محصول (اسم، قیمت، عکس و ...)
//   onAdd    = تابعی که وقتی «افزودن به سبد» زده شد صدا زده میشه
function ProductCard({ product, onAdd }) {
  // آیا قلب (علاقه‌مندی) زده شده؟
  const [liked, setLiked] = useState(false);
  // آیا همین الان محصول به سبد اضافه شده؟ (برای نشون دادن تیک سبز)
  const [added, setAdded] = useState(false);

  // درصد تخفیف رو حساب می‌کنیم
  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100,
  );

  function handleAdd() {
    onAdd(product); // خود محصول را به سبد خرید اضافه می‌کنیم
    setAdded(true); // تیک رو نشون بده
    setTimeout(() => setAdded(false), 1400); // بعد از ۱.۴ ثانیه برگرده به حالت اول
  }

  return (
    <article className="group flex h-full flex-col rounded-3xl bg-white p-3 shadow-sm ring-1 ring-black/5 transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/20">
      {/* ---------- بخش عکس ---------- */}
      <div className="relative overflow-hidden rounded-2xl bg-[#f3f3f3]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-contain transition duration-700 ease-out group-hover:scale-110"
        />

        {/* برچسب درصد تخفیف */}
        <span className="absolute start-3 top-3 rounded-full bg-brand-dark px-3 py-1 text-sm font-bold text-white">
          {discount.toLocaleString("fa-IR")}٪ تخفیف
        </span>

        {/* دکمه‌ی قلب */}
        <button
          onClick={() => setLiked(!liked)}
          aria-label="افزودن به علاقه‌مندی‌ها"
          className="absolute end-3 top-3 grid size-10 place-items-center rounded-full bg-white/90 text-lg shadow backdrop-blur transition duration-300 hover:scale-110"
        >
          {/* key باعث میشه با هر بار تغییر، انیمیشن pop دوباره پخش بشه */}
          <i
            key={String(liked)}
            className={
              liked
                ? "bi bi-heart-fill pop text-rose-500"
                : "bi bi-heart text-ink"
            }
          ></i>
        </button>
      </div>

      {/* ---------- بخش متن و قیمت ---------- */}
      <div className="flex flex-1 flex-col gap-1 px-2 pb-2 pt-4">
        <span className="text-sm text-gray-500">{product.category}</span>
        <h3 className="text-base font-bold leading-7 text-ink">
          {product.name}
        </h3>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="flex flex-col">
            <del className="text-sm text-gray-400">
              {formatPrice(product.oldPrice)}
            </del>
            <span className="text-lg font-extrabold text-brand-dark">
              {formatPrice(product.price)}{" "}
              <small className="text-xs font-normal text-gray-500">تومان</small>
            </span>
          </div>

          {/* دکمه‌ی افزودن به سبد */}
          <button
            onClick={handleAdd}
            aria-label="افزودن به سبد خرید"
            className={`grid size-11 shrink-0 place-items-center rounded-full text-lg text-white transition duration-300 hover:scale-110 ${
              added ? "bg-brand" : "bg-ink hover:bg-brand-dark"
            }`}
          >
            <i
              key={String(added)}
              className={
                added ? "bi bi-check-lg pop" : "bi bi-cart-plus"
              }
            ></i>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
