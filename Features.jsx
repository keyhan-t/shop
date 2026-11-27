// بخش «پوشامن، همراه شما در انتخابی بهتر»

// چهار مزیت. برای عوض کردن متن‌ها فقط همین لیست رو ویرایش کن.
const features = [
  {
    icon: "bi-patch-check-fill",
    title: "کیفیت انتخاب‌شده",
    text: "پارچه و دوخت هر محصول قبل از عرضه بررسی میشه.",
  },
  {
    icon: "bi-check-circle-fill",
    title: "دقیقا مثل عکس",
    text: "رنگ و فرم لباس همونیه که تو عکس‌ها می‌بینی.",
  },
  {
    icon: "bi-headset",
    title: "پشتیبانی کنار شما",
    text: "برای هر سوالی قبل و بعد از خرید جواب می‌دیم.",
  },
  {
    icon: "bi-shield-check",
    title: "پرداخت امن",
    text: "پرداخت از طریق درگاه معتبر بانکی انجام میشه.",
  },
];

function Features() {
  // وقتی موس روی باکس حرکت می‌کنه، مختصاتش رو تو دو تا متغیر CSS می‌ریزیم
  // و CSS (کلاس spotlight) یه نور دور موس نشون میده
  function handleMouseMove(event) {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - box.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - box.top}px`);
  }

  return (
    <section id="about" className="wrapper pt-20 md:pt-28">
      <div
        onMouseMove={handleMouseMove}
        className="spotlight reveal reveal-scale relative overflow-hidden rounded-[2.5rem] bg-brand-dark px-6 py-14 text-white md:px-12 md:py-16"
      >
        {/* تیتر */}
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black leading-snug md:text-4xl">
            پوشامن، همراه شما در انتخابی بهتر
          </h2>
          <p className="mt-4 text-lg leading-8">
            از انتخاب محصول تا تحویل سفارش، برای یک خرید ساده و مطمئن کنار شما
            هستیم
          </p>
        </div>

        {/* چهار مزیت */}
        <div className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="reveal reveal-scale group flex flex-col items-center gap-4 text-center"
              style={{ "--delay": `${0.15 + index * 0.12}s` }}
            >
              <span className="grid size-20 place-items-center rounded-3xl bg-white/15 text-4xl transition duration-500 group-hover:-translate-y-2 group-hover:rotate-6 group-hover:bg-white group-hover:text-brand-dark">
                <i className={`bi ${feature.icon}`}></i>
              </span>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="max-w-[16rem] leading-7">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
