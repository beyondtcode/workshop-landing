import { Mail } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import SectionReveal from '../components/SectionReveal'

export default function Footer() {
  return (
    <SectionReveal>
      <GlassCard className="py-4">
        <p className="text-sm text-muted">לפרטים והרשמה נוספת:</p>
        <a
          href="mailto:mirly@beyondtcode.com"
          className="mt-2 inline-flex flex-row-reverse items-center gap-2 text-base text-white transition-colors hover:text-purple"
        >
          <Mail className="h-4 w-4 shrink-0 text-purple" strokeWidth={1.5} />
          mirly@beyondtcode.com
        </a>
      </GlassCard>
    </SectionReveal>
  )
}
