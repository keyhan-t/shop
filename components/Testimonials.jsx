import CountUp from "./CountUp";

const reviews = [
  {
    name: "کیهان تخت روان",
    city: "مریوان",
    product: "هودی",
    rating: 5,
    text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،",
  },
  {
    name: "کیهان تخت روان",
    city: "مریوان",
    product: "ست مردانه",
    rating: 5,
    text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،",
  },
  {
    name: "کیهان تخت روان",
    city: "مریوان",
    product: "تیشرت",
    rating: 4,
    text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،",
  },
  {
    name: "کیهان تخت روان",
    city: "مریوان",
    product: "دورس",
    rating: 5,
    text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،",
  },
  {
    name: "کیهان تخت روان",
    city: "مریوان",
    product: "بلوز",
    rating: 5,
    text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،",
  },
  {
    name: "کیهان تخت روان",
    city: "مریوان",
    product: "هودی",
    rating: 4,
    text: " لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،",
  },
];

// عددهای بالای بخش (آمار نمونه، با عدد واقعی خودت عوضشون کن)
const stats = [
  { end: 4.8, decimals: 1, suffix: "", label: "میانگین امتیاز از ۵" },
  { end: 2400, decimals: 0, suffix: "+", label: "نظر ثبت‌شده" },
  { end: 96, decimals: 0, suffix: "٪", label: "پیشنهاد به دوستان" },
];

// رنگ دایره‌ی اول اسم هر نفر
const avatarColors = [
  "bg-brand-dark",
  "bg-ink",
  "bg-teal-700",
  "bg-cyan-800",
  "bg-sky-800",
  "bg-emerald-800",
];

function Testimonials() {
  return (
    <section id="reviews" className="mt-20 bg-sand py-20 md:mt-28 md:py-28">
      <div className="wrapper">
        {/* ---------- سرتیتر و آمار ---------- */}
        <div className="mb-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="reveal max-w-xl">
            <h2 className="text-2xl font-black text-ink md:text-4xl">
              نظر مشتریان پوشامن
            </h2>
            <p className="mt-3 text-lg leading-8 text-gray-600">
              تجربه‌ی کسایی که قبلا از ما خرید کردن، به قلم خودشون.
            </p>
          </div>

          <div
            className="reveal flex gap-8 sm:gap-12"
            style={{ "--delay": "0.15s" }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-3xl font-black text-brand-dark sm:text-4xl">
                  <CountUp
                    end={stat.end}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                  />
                </span>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- کارت نظرها ---------- */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <figure
              key={review.name}
              className="reveal reveal-scale"
              style={{ "--delay": `${(index % 3) * 0.12}s` }}
            >
              <div className="group relative flex h-full flex-col gap-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/15">
                {/* آیکون نقل‌قول گوشه‌ی کارت */}
                <i className="bi bi-quote absolute end-5 top-3 text-6xl text-mist transition-colors duration-500 group-hover:text-brand/30"></i>

                {/* ستاره‌ها: به تعداد rating ستاره‌ی زرد، بقیه خاکستری */}
                <div
                  className="relative flex gap-1 text-lg"
                  aria-label={`امتیاز ${review.rating} از ۵`}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={
                        star <= review.rating
                          ? "bi bi-star-fill text-amber-400"
                          : "bi bi-star text-gray-300"
                      }
                    ></i>
                  ))}
                </div>

                <blockquote className="relative leading-8 text-gray-700">
                  {review.text}
                </blockquote>

                <figcaption className="mt-auto flex items-center gap-3 border-t border-gray-100 pt-5">
                  {/* اولین حرف اسم داخل دایره */}
                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-full text-lg font-bold text-white ${
                      avatarColors[index % avatarColors.length]
                    }`}
                  >
                    {review.name[0]}
                  </span>
                  <span className="flex flex-1 flex-col">
                    <strong className="text-ink">{review.name}</strong>
                    <span className="text-sm text-gray-500">{review.city}</span>
                  </span>
                  <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-brand-dark">
                    {review.product}
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
