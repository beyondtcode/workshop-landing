import WorkshopIntro from './WorkshopIntro'

export default function Hero() {
  return (
    <header className="relative pt-4 pb-8 md:pt-6 md:pb-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 md:mb-10">
        <p
          dir="ltr"
          className="text-xl font-extrabold tracking-tight sm:text-2xl"
        >
          <span className="text-purple/70">[</span>
          <span className="text-white">beyond</span>
          <span className="text-purple/70">]</span>
          <span className="text-purple"> code</span>
        </p>
        <span className="rounded-full border border-purple/25 bg-purple/10 px-4 py-2 text-sm font-semibold leading-snug text-purple shadow-[0_0_24px_rgba(167,139,250,0.15)] sm:text-base">
          לנשים חרדיות בלבד
        </span>
      </div>

      <div className="mb-10 flex flex-col gap-8 md:mb-12 md:gap-10">
        <div className="max-w-3xl space-y-6 text-right">
          <h1 className="text-[clamp(2.125rem,7vw,3.75rem)] font-extrabold leading-[1.1] tracking-tight text-pretty">
            <span className="block text-white">
              עוברת את הראיון הבא שלך.
            </span>
            <span
              className="mt-2 block text-gradient-purple sm:mt-3"
              style={{ filter: 'drop-shadow(0 0 32px rgba(167, 139, 250, 0.4))' }}
            >
              נקודה.
            </span>
          </h1>

          <div className="space-y-4 border-r-2 border-purple/30 pr-5">
            <p className="text-lg leading-[1.7] text-white/92 text-pretty sm:text-xl md:text-[1.35rem] md:leading-relaxed">
              לקראת הראיון הראשון שלך? או מרגישה שאת ב&quot;לופ&quot; ראיונות
              שלא מתקדם?
            </p>
            <p className="text-xl font-bold leading-[1.5] text-neon text-pretty sm:text-2xl md:text-[1.65rem] md:leading-relaxed">
              בואי ללמוד את כללי המשחק!
            </p>
          </div>
        </div>
      </div>

      <WorkshopIntro />
    </header>
  )
}
