import SectionReveal from '../components/SectionReveal'

export default function Urgency() {
  return (
    <SectionReveal>
      <div className="py-2 text-center text-right">
        <p className="text-base leading-relaxed text-muted">
          אל תשארי מאחור. בואי לקבל את הכלים שיעבירו אותך את הראיון הבא!
        </p>
        <p className="urgency-highlight mt-4 text-xl font-bold text-white sm:text-2xl">
          מספר המקומות מוגבל. שרייני מקום עכשיו.
        </p>
      </div>
    </SectionReveal>
  )
}
