// نوار متنی که بی‌نهایت می‌چرخه (بین بخش اول و بخش مزیت‌ها)

const items = [
  { icon: "bi-stars", text: "کالکشن جدید ۱۴۰۵ رسید" },
  { icon: "bi-truck", text: "ارسال سریع" },
  { icon: "bi-shield-check", text: "پرداخت امن" },
  { icon: "bi-patch-check-fill", text: "کیفیت انتخاب‌شده" },
  { icon: "bi-tags", text: "مناسب‌ترین قیمت" },
  { icon: "bi-headset", text: "پشتیبانی کنار شما" },
];

function Marquee() {
  // لیست رو دو بار پشت هم می‌ذاریم تا از عرض صفحه بلندتر بشه
  const oneGroup = [...items, ...items];

  return (
    <div className="marquee overflow-hidden bg-ink py-4 text-white" aria-hidden="true">
      {/* مسیر متحرک: دقیقا دو تا گروه یکسان داره تا حلقه بدون پرش باشه */}
      <div className="marquee-track">
        {[1, 2].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {oneGroup.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 px-8 text-lg font-bold"
              >
                <i className={`bi ${item.icon} text-xl text-brand-light`}></i>
                <span className="whitespace-nowrap">{item.text}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
