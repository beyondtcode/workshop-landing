import SectionReveal from '../components/SectionReveal'

export default function Urgency() {
  return (
    <SectionReveal>
      <div className="card-glow rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-8 text-center text-right backdrop-blur-sm sm:px-8 sm:py-10">
        <p className="text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
          אל תשארי מאחור. בואי לקבל את הכלים שיעבירו אותך את הראיון הבא!
        </p>
        <p className="urgency-highlight mt-5 text-2xl font-extrabold text-white sm:text-3xl md:text-[2rem]">
          מספר המקומות מוגבל (עד 20 משתתפות).
        </p>
      </div>
    </SectionReveal>
  )
}
