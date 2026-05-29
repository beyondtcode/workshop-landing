import GlassCard from '../components/GlassCard'
import SectionReveal from '../components/SectionReveal'

export default function AboutLecturer() {
  return (
    <SectionReveal>
      <GlassCard className="border-r-2 border-r-neon/60">
        <h2 className="text-xl font-bold text-white">
          בהנחיית מירלי רוטשטיין
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted">
          יועצת ארגונית ומנכ״לית Beyond Code. בעלת מעל 25 שנות ניסיון מעשי
          באבחון, הכשרה וגיוס הון אנושי לתעשיית ההייטק.
        </p>
      </GlassCard>
    </SectionReveal>
  )
}
