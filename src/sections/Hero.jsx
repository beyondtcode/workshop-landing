import GlowButton from '../components/GlowButton'
import { scrollToRegistration } from '../utils/registrationForm'

export default function Hero() {
  return (
    <header className="relative pt-8 pb-6 md:pt-12 md:pb-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <p
          dir="ltr"
          className="text-lg font-bold tracking-tight sm:text-xl"
        >
          <span className="text-purple/70">[</span>
          <span className="text-white">beyond</span>
          <span className="text-purple/70">]</span>
          <span className="text-purple"> code</span>
        </p>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs leading-snug text-muted">
          לנשים חרדיות בלבד
        </span>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        <div className="space-y-4">
          <h1 className="text-[clamp(1.75rem,5.5vw,3rem)] font-extrabold leading-[1.2] tracking-tight">
            <span className="block text-white">
              עוברות את הראיון הבא שלך.
            </span>
            <span
              className="mt-2 block text-purple"
              style={{ textShadow: '0 0 40px rgba(167, 139, 250, 0.35)' }}
            >
              נקדה.
            </span>
          </h1>

          <p className="text-lg font-semibold leading-relaxed text-neon md:text-xl">
            בואי ללמוד את כללי המשחק!
          </p>
        </div>

        <p className="text-base leading-relaxed text-muted md:text-lg">
          סדנת ראיונות טכנולוגיים אסטרטגית: הכנה מעשית ופרקטית (100%
          Hands-on).
        </p>

        <div className="pt-1 sm:pt-2">
          <GlowButton
            variant="primary"
            onClick={scrollToRegistration}
            className="w-full sm:w-auto sm:min-w-[220px]"
          >
            אני רוצה להירשם
          </GlowButton>
        </div>
      </div>
    </header>
  )
}
