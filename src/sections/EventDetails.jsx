import { Calendar, CreditCard, MapPin } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import SectionReveal from '../components/SectionReveal'

const rows = [
  {
    icon: Calendar,
    label: 'מתי',
    value: 'יום ראשון, כ״ב בסיוון | 17:00-20:00',
  },
  {
    icon: MapPin,
    label: 'איפה',
    value: 'יפו 224, התחנה המרכזית ירושלים (קומה 4)',
  },
  {
    icon: CreditCard,
    label: 'עלות',
    value: '350 ₪ בלבד',
  },
]

export default function EventDetails() {
  return (
    <SectionReveal>
      <GlassCard>
        <div className="flex flex-col">
          {rows.map((row, index) => (
            <div
              key={row.label}
              className={`flex flex-row-reverse items-start gap-3 py-4 ${
                index < rows.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <div className="shrink-0 rounded-lg bg-white/5 p-2 text-purple">
                <row.icon className="h-4 w-4" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1 text-right">
                <p className="text-sm text-muted">{row.label}</p>
                <p className="mt-0.5 text-base font-semibold text-white">
                  {row.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </SectionReveal>
  )
}
