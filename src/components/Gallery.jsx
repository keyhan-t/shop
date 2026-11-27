import Rectangle3 from "../assets/Rectangle3.png";
import Rectangle4 from "../assets/Rectangle4.png";
import Rectangle5 from "../assets/Rectangle5.png";
import Rectangle6 from "../assets/Rectangle6.png";
import Rectangle7 from "../assets/Rectangle7.png";

const tiles = [
  {
    title: "هودی",
    image: Rectangle5,
    tags: ["استایل کژوال", "روزمره"],
  },
  {
    title: "دورس",
    image: Rectangle4,
    tags: ["استایل مینیمال", "بیسیک و شیک"],
    extra: "",
  },
  {
    title: "بلوز",
    image: Rectangle7,
    tags: ["سبک و خوش‌فرم", "خوش‌پوش و راحت"],
    extra: "",
  },
  {
    title: "تیشرت",
    image: Rectangle6,
    tags: ["بیسیک روزانه", "خنک و راحت"],
    extra: "",
  },
  {
    title: "ست مردانه پوشامن",
    image: Rectangle3,
    tags: ["استایل آماده", "راحت و هماهنگ"],
    extra: "col-span-2 !aspect-[3/4] lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:!aspect-auto",
  },
];

function Gallery() {
  return (
    <section id="gallery" className="wrapper pt-20 md:pt-28">
      <div className="reveal mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-2xl font-black text-ink md:text-4xl">
          دسته‌بندی محصولات
        </h2>
        <p className="mt-3 text-lg leading-8 text-gray-600">
          از هودی و بلوز تا ست کامل مردانه؛ استایل خودت رو پیدا کن.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {tiles.map((tile, index) => (
          <div
            key={tile.title}
            className={`reveal reveal-scale relative aspect-[411/440] ${tile.extra}`}
            style={{ "--delay": `${index * 0.1}s` }}
          >
            <a
              href="#products"
              className="group absolute inset-0 block overflow-hidden rounded-[1.75rem] bg-gray-200"
            >
              <img
                src={tile.image}
                alt={tile.title}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/30 to-transparent p-4 pt-20 sm:p-5 sm:pt-24">
                <h3 className="mb-3 text-lg font-bold text-white sm:text-xl">
                  {tile.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tile.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/25 px-3 py-1 text-xs text-white backdrop-blur-md transition duration-300 group-hover:bg-white group-hover:text-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="absolute end-4 top-4 grid size-11 -translate-y-3 place-items-center rounded-full bg-white text-lg text-ink opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <i className="bi bi-arrow-up-left"></i>
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
