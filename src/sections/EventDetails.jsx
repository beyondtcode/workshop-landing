import { Calendar, CreditCard, MapPin } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import SectionReveal from '../components/SectionReveal'

const rows = [
  {
    icon: Calendar,
    label: 'מתי?',
    value: 'יום ראשון, כ״ב בסיוון (7/6/26) | 17:00-20:00',
  },
  {
    icon: MapPin,
    label: 'איפה?',
    value: 'יפו 224, התחנה המרכזית ירושלים (קומה 4)',
  },
  {
    icon: CreditCard,
    label: 'עלות',
    value: '350 ₪',
  },
]

export default function EventDetails() {
  return (
    <SectionReveal>
      <div className="flex flex-col gap-5">
        <div className="text-right">
          <p className="text-xl font-extrabold tracking-tight text-purple sm:text-2xl md:text-[1.65rem]">
            פרטי האירוע
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            מתי ואיפה
          </h2>
        </div>

        <GlassCard>
          <div className="flex flex-col">
            {rows.map((row, index) => (
              <div
                key={row.label}
                className={`flex flex-row-reverse items-start gap-4 py-5 sm:py-6 ${
                  index < rows.length - 1 ? 'border-b border-white/8' : ''
                }`}
              >
                <div className="shrink-0 rounded-xl bg-gradient-to-br from-purple/20 to-white/5 p-3 text-purple">
                  <row.icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1 text-right">
                  <p className="text-base font-medium text-muted sm:text-lg">
                    {row.label}
                  </p>
                  <p className="mt-1 text-lg font-bold text-white sm:text-xl">
                    {row.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </SectionReveal>
  )
}
