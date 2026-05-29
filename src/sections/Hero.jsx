import GlowButton from '../components/GlowButton'
import { openRegistrationForm } from '../utils/registrationForm'

export default function Hero() {
  return (
    <header className="relative pt-8 pb-4 md:pt-12">
      <div className="mb-10 flex items-start justify-between gap-4">
        <div className="leading-tight">
          <p className="text-sm text-muted">
            <span className="text-purple/70">[</span>
            <span className="font-semibold text-white">beyond</span>
            <span className="text-purple/70">]</span>
          </p>
          <p className="text-2xl font-bold tracking-tight text-purple">code</p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">
          לנשים חרדיות בלבד
        </span>
      </div>

      <h1 className="text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">
        עוברות את הראיון הבא שלך.{' '}
        <span
          className="text-purple"
          style={{ textShadow: '0 0 40px rgba(167, 139, 250, 0.35)' }}
        >
          נקדה.
        </span>
      </h1>

      <p className="mt-4 text-lg font-semibold text-neon">
        בואי ללמוד את כללי המשחק!
      </p>

      <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
        סדנת ראיונות טכנולוגיים אסטרטגית: הכנה מעשית ופרקטית (100% Hands-on).
      </p>

      <div className="mt-8">
        <GlowButton variant="primary" onClick={openRegistrationForm}>
          אני רוצה להירשם
        </GlowButton>
      </div>
    </header>
  )
}
