import { MessageCircle, Search, Users } from 'lucide-react'

const outcomes = [
  {
    num: '01',
    title: 'לדבר את הערך שלך',
    description:
      'איך להפוך את הידע שלך לתשובה שקולעת בידיוק למה שהמראיין מחפש.',
    icon: MessageCircle,
  },
  {
    num: '02',
    title: 'לפצח את שאלות המראיין',
    description:
      'איך לזהות מה מסתתר מאחורי השאלות בראיון ולענות בביטחון ובדיוק.',
    icon: Search,
  },
  {
    num: '03',
    title: "להתאמן על 'רטוב'",
    description:
      'סימולציות חיות כדי שתגיעי לראיון הבא שלך מוכנה.',
    icon: Users,
  },
]

export default function WorkshopIntro() {
  return (
    <section
      aria-labelledby="workshop-intro-heading"
      className="relative"
    >
      <div className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-br from-purple/50 via-neon/20 to-purple-deep/40 opacity-80 blur-sm" aria-hidden />
      <div className="card-glow relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-gradient-to-br from-white/[0.08] via-purple-deep/[0.06] to-bg/90 p-6 backdrop-blur-xl sm:p-8 md:p-9">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.18),transparent_70%)]"
          aria-hidden
        />

        <div className="relative space-y-7 text-right md:space-y-8">
          <p className="text-lg leading-[1.75] text-white/90 text-pretty sm:text-xl sm:leading-relaxed md:text-[1.35rem]">
            <span className="font-semibold text-white">
              את יודעת את העבודה,
            </span>{' '}
            אבל בראיון את מרגישה שאת לא מצליחה להעביר את המסר ולהראות להם מי
            את באמת?
          </p>

          <div className="space-y-4">
            <p
              id="workshop-intro-heading"
              className="text-2xl font-extrabold leading-snug tracking-tight text-pretty sm:text-3xl md:text-[2rem]"
            >
              <span className="text-gradient-purple">
                הסדנה הזו היא בית ספר לראיונות שחיפשת.
              </span>
            </p>

            <div className="flex flex-wrap justify-end gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-neon/35 bg-neon/10 px-4 py-2 text-sm font-bold text-neon shadow-[0_0_28px_rgba(200,245,66,0.12)] sm:text-base">
                <span className="h-2 w-2 rounded-full bg-neon shadow-[0_0_8px_rgba(200,245,66,0.8)]" aria-hidden />
                100% פרקטיקה
              </span>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-muted sm:text-base">
                0% תיאוריה
              </span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-7 md:pt-8">
            <p className="mb-5 text-xl font-extrabold tracking-tight text-purple sm:text-2xl md:text-[1.65rem]">
              בסדנה נלמד איך
            </p>

            <ul className="flex flex-col gap-4">
              {outcomes.map((item) => (
                <li key={item.num}>
                  <article className="group flex flex-row-reverse items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-[border-color,background-color,transform] duration-300 hover:border-purple/25 hover:bg-white/[0.05] sm:gap-5 sm:p-5">
                    <div className="flex shrink-0 flex-col items-center gap-2">
                      <span className="text-[0.65rem] font-bold tracking-widest text-purple/70">
                        {item.num}
                      </span>
                      <div className="rounded-xl bg-gradient-to-br from-purple/25 to-purple-deep/10 p-3 text-purple shadow-[0_0_20px_rgba(167,139,250,0.15)] transition-shadow duration-300 group-hover:shadow-[0_0_28px_rgba(167,139,250,0.25)]">
                        <item.icon
                          className="h-6 w-6 sm:h-7 sm:w-7"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <h3 className="text-lg font-extrabold text-white sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
