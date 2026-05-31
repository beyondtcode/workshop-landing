const steps = [
  { id: 1, label: 'שלב 1: הרשמה' },
  { id: 2, label: 'שלב 2: תשלום' },
]

export default function RegistrationProgress({ currentStep }) {
  return (
    <nav aria-label="התקדמות הרשמה" className="mb-8">
      <ol className="flex items-center justify-center gap-0">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id
          const isComplete = currentStep > step.id

          return (
            <li key={step.id} className="flex items-center">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-purple-deep text-white shadow-[0_0_20px_rgba(167,139,250,0.45)] ring-2 ring-purple/50'
                      : isComplete
                        ? 'bg-neon/20 text-neon ring-1 ring-neon/40'
                        : 'bg-white/5 text-muted ring-1 ring-white/10'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isComplete ? '✓' : step.id}
                </span>
                <span
                  className={`text-base font-semibold transition-colors duration-300 sm:text-lg ${
                    isActive ? 'text-white' : isComplete ? 'text-neon' : 'text-muted'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className="mx-3 h-px w-10 sm:mx-5 sm:w-16"
                  aria-hidden="true"
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      currentStep > 1
                        ? 'bg-gradient-to-l from-purple-deep to-neon/60'
                        : 'bg-white/10'
                    }`}
                  />
                </div>
              )}
            </li>
          )
        })}
      </ol>
      <p className="mt-4 text-center text-sm text-muted sm:text-base">
        שלב {currentStep} מתוך 2
      </p>
    </nav>
  )
}
