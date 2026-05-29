import { useState } from 'react'
import GlassCard from '../components/GlassCard'
import GlowButton from '../components/GlowButton'
import SectionReveal from '../components/SectionReveal'
import { openRegistrationForm } from '../utils/registrationForm'

const fields = [
  { id: 'name', label: 'שם מלא', type: 'text', autoComplete: 'name' },
  { id: 'email', label: 'כתובת מייל', type: 'email', autoComplete: 'email' },
  { id: 'phone', label: 'טלפון', type: 'tel', autoComplete: 'tel' },
]

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    openRegistrationForm()
    setSubmitted(true)
  }

  return (
    <section id="registration">
      <SectionReveal>
        <GlassCard>
          <h2 className="mb-6 text-xl font-bold text-neon">הרשמה מהירה לסדנה</h2>
          {submitted ? (
            <div className="py-8 text-center">
              <p className="text-xl font-bold text-neon">נרשמת בהצלחה ✓</p>
              <p className="mt-3 text-base text-muted">ניצור איתך קשר בקרוב</p>
            </div>
          ) : (
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="mb-1.5 block text-sm text-muted"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    required
                    className="w-full min-h-[48px] rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-base text-white outline-none transition-colors focus:border-purple focus:ring-1 focus:ring-purple/40"
                  />
                </div>
              ))}
              <GlowButton variant="submit" type="submit" className="mt-2">
                להמשך הרשמה
              </GlowButton>
            </form>
          )}
        </GlassCard>
      </SectionReveal>
    </section>
  )
}
