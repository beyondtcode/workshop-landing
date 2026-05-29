import { Crown, MessageCircle, Presentation } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import SectionReveal from '../components/SectionReveal'

const topics = [
  {
    icon: Crown,
    title: 'אסטרטגיה',
    description:
      'מה מגייסים באמת מחפשים ממך בעידן ה-AI ואיך להתאים את עצמך לציפיות שלהם.',
  },
  {
    icon: MessageCircle,
    title: 'תקשורת',
    description:
      "איך לדבר ב'חוקית' בראיון, להפגין סמכות מקצועית ולענות נכון על שאלות מכשילות.",
  },
  {
    icon: Presentation,
    title: 'סימולציות חיות',
    description:
      'תרגול מעשי של שאלות אמת מראיונות, זיהוי וניהול טעויות קריטיות בזמן אמת.',
  },
]

export default function Topics() {
  return (
    <SectionReveal>
      <div className="flex flex-col gap-4">
        {topics.map((topic) => (
          <GlassCard key={topic.title} hover>
            <div className="flex flex-row-reverse items-start gap-4">
              <div className="shrink-0 rounded-xl bg-white/5 p-2.5 text-purple">
                <topic.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-white">{topic.title}</h2>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {topic.description}
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionReveal>
  )
}
