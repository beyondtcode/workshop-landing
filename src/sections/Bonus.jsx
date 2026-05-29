import SectionReveal from '../components/SectionReveal'

export default function Bonus() {
  return (
    <SectionReveal>
      <div className="relative mt-2">
        <span className="absolute -top-3 right-4 z-10 rounded-full border border-neon/40 bg-bg px-3 py-1 text-xs font-medium text-neon">
          הטבה לנרשמות מראש
        </span>
        <div
          className="rounded-2xl border border-dashed border-neon/35 bg-white/[0.03] p-5 shadow-[0_0_40px_rgba(200,245,66,0.12)] backdrop-blur-sm md:p-6"
        >
          <h2 className="pt-2 text-xl font-bold text-white">
            מפגש משוב אסטרטגי אישי (1:1)
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Bonus מיוחד לנרשמות עד יום שני הקרוב: מפגש זום אישי עם יועצת
            ארגונית, ממוקדת לאבחון מקצועי וסימולציה פרטנית.
          </p>
          <p className="mt-4 text-lg font-bold text-neon">ב-100 ₪ בלבד!</p>
        </div>
      </div>
    </SectionReveal>
  )
}
