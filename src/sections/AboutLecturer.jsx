import { Mail } from 'lucide-react'
import SectionReveal from '../components/SectionReveal'

const LECTURER_EMAIL = 'mirly@beyondtcode.com'

export default function AboutLecturer() {
  return (
    <SectionReveal>
      <section aria-labelledby="lecturer-heading" className="scroll-mt-6">
        <div className="flex flex-col gap-6 text-right md:gap-8">
          <div>
            <p className="section-eyebrow">המרצה:</p>
            <h2
              id="lecturer-heading"
              className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              מירלי רוטשטיין
            </h2>
          </div>

          <p className="text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
            יועצת ארגונית ומנכ״לית Beyond Code. בעלת 25 שנות ניסיון מעשי
            באבחון, הכשרה וגיוס הון אנושי לתעשיית ההייטק.
          </p>

          <div className="card-glow rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 backdrop-blur-sm sm:px-6 sm:py-5">
            <p className="text-base font-medium text-muted sm:text-lg">
              ליצירת קשר:
            </p>
            <a
              href={`mailto:${LECTURER_EMAIL}`}
              className="mt-2 inline-flex flex-row-reverse items-center gap-2.5 text-lg font-semibold text-white transition-colors hover:text-purple sm:text-xl"
            >
              <Mail
                className="h-5 w-5 shrink-0 text-purple"
                strokeWidth={1.5}
                aria-hidden
              />
              <span dir="ltr">{LECTURER_EMAIL}</span>
            </a>
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}
