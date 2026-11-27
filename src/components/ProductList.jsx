import ProductCard from "./ProductCard";
import { newProducts } from "../data/products";

// بخش «جدیدترین‌های پوشامن»
// onAddToCart = تابعی که از App میاد و عدد سبد خرید رو زیاد می‌کنه
function ProductList({ onAddToCart }) {
  return (
    <section id="products" className="wrapper pt-20 md:pt-28">
      {/* سرتیتر بخش */}
      <div className="reveal mb-10 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-ink md:text-4xl">
            جدیدترین‌های پوشامن
          </h2>
          <p className="mt-2 text-gray-600">
            تازه‌ترین محصولات کالکشن ۱۴۰۵
          </p>
        </div>
        <a
          href="#"
          className="group inline-flex shrink-0 items-center gap-2 font-bold text-brand-dark"
        >
          مشاهده همه
          <i className="bi bi-arrow-left transition-transform duration-300 group-hover:-translate-x-2"></i>
        </a>
      </div>

      {/* موبایل: لیست افقی قابل کشیدن / دسکتاپ: ۵ ستون */}
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-4 md:mx-0 md:px-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:py-0">
        {/* برای هر محصول داخل لیست، یه کارت می‌سازیم */}
        {newProducts.map((product, index) => (
          <div
            key={product.id}
            className="reveal reveal-scale w-[68%] shrink-0 snap-start sm:w-[42%] md:w-[31%] lg:w-auto"
            style={{ "--delay": `${index * 0.1}s` }}
          >
            <ProductCard product={product} onAdd={onAddToCart} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductList;
