import SectionReveal from '../components/SectionReveal'

export default function Bonus() {
  return (
    <SectionReveal>
      <div>
        <div className="card-glow rounded-3xl border border-dashed border-neon/40 bg-gradient-to-br from-neon/[0.06] to-white/[0.02] p-6 shadow-[0_0_56px_rgba(200,245,66,0.14)] backdrop-blur-md md:p-8">
          <h2 className="text-2xl font-extrabold leading-snug text-white sm:text-3xl">
            שדרגי את יכולות הראיון שלך ב־100 ₪ בלבד
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg sm:leading-relaxed">
            מפגש אישי וממוקד עם יועצת ארגונית מוסמכת, הכולל משוב מקצועי, כלים
            פרקטיים לראיונות עבודה והמלצות מותאמות אישית - מה לחזק, מה לשפר
            ואיך להגיע מוכנה ובטוחה יותר לראיון הבא.
          </p>
          <p className="mt-5 text-base font-bold text-neon sm:text-lg">
            הטבה לנרשמים עד יום רביעי בלבד
          </p>
        </div>
      </div>
    </SectionReveal>
  )
}
