import { useEffect, useState } from 'react'
import GlassCard from '../components/GlassCard'
import GlowButton from '../components/GlowButton'
import RegistrationProgress from '../components/RegistrationProgress'
import SectionReveal from '../components/SectionReveal'
import { PAYMENT_URL } from '../utils/registrationForm'
import {
  defaultQuestionMap,
  fetchMondayFormSchema,
  submitMondayRegistration,
  validateRegistrationFields,
} from '../utils/mondayForm'

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
}

const fieldClass = (hasError) =>
  `w-full min-h-[52px] rounded-xl border bg-black/35 px-4 py-3.5 text-base text-white outline-none transition-[border-color,box-shadow] placeholder:text-muted/60 ${
    hasError
      ? 'border-red-400/70 ring-1 ring-red-400/30'
      : 'border-white/10 focus:border-purple focus:shadow-[0_0_0_3px_rgba(167,139,250,0.22)] focus:ring-1 focus:ring-purple/40'
  }`

function FormField({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-300" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default function RegistrationForm() {
  const [step, setStep] = useState(1)
  const [stepVisible, setStepVisible] = useState(true)
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [questionMap, setQuestionMap] = useState(defaultQuestionMap)
  const [schemaReady, setSchemaReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadSchema() {
      const discovered = await fetchMondayFormSchema()
      if (!cancelled && discovered) {
        setQuestionMap(discovered)
      }
      if (!cancelled) setSchemaReady(true)
    }

    loadSchema()
    return () => {
      cancelled = true
    }
  }, [])

  function goToPaymentStep() {
    setStepVisible(false)
    window.setTimeout(() => {
      setStep(2)
      setStepVisible(true)
    }, 280)
  }

  function returnToRegistration() {
    setStepVisible(false)
    window.setTimeout(() => {
      setStep(1)
      setStepVisible(true)
    }, 280)
  }

  function handleChange(field) {
    return (event) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
      setSubmitError('')
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitError('')

    const validationErrors = validateRegistrationFields(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      await submitMondayRegistration(values, questionMap)
      goToPaymentStep()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'אירעה שגיאה בשליחה. נסי שוב.'
      if (message.toLowerCase().includes('failed to fetch')) {
        setSubmitError(
          'לא ניתן להתחבר לשרת ההרשמה. ודאי ששרת הפיתוח (npm run dev) פעיל.',
        )
      } else if (message.includes('MONDAY_API_TOKEN')) {
        setSubmitError(
          'שליחה לטופס מאנדיי דורשת הגדרת MONDAY_API_TOKEN ו-MONDAY_BOARD_ID בקובץ .env (ראי .env.example).',
        )
      } else {
        setSubmitError(message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="registration" className="scroll-mt-6">
      <SectionReveal>
        <GlassCard className="overflow-hidden">
          <h2 className="mb-2 text-center text-xl font-bold text-neon sm:text-2xl">
            הרשמה לסדנה
          </h2>
          <p className="mb-6 text-center text-sm text-muted sm:text-base">
            מלאי את הפרטים ולאחר מכן השלימי את התשלום לשריון המקום
          </p>

          <RegistrationProgress currentStep={step} />

          <div
            className={`transition-all duration-300 ease-out motion-reduce:transition-none ${
              stepVisible
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-2 opacity-0'
            }`}
          >
            {step === 1 ? (
              <form
                key="registration-step"
                className="flex flex-col gap-5"
                onSubmit={handleSubmit}
                noValidate
              >
                <p className="text-center text-sm text-purple/90">
                  שלב 1 · מילוי פרטים
                </p>

                <FormField
                  id="fullName"
                  label="שם מלא"
                  error={errors.fullName}
                >
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={values.fullName}
                    onChange={handleChange('fullName')}
                    className={fieldClass(Boolean(errors.fullName))}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={
                      errors.fullName ? 'fullName-error' : undefined
                    }
                    disabled={isSubmitting}
                    placeholder="השם המלא שלך"
                  />
                </FormField>

                <FormField id="email" label="אימייל" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange('email')}
                    className={fieldClass(Boolean(errors.email))}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    disabled={isSubmitting}
                    placeholder="name@example.com"
                    dir="ltr"
                  />
                </FormField>

                <FormField id="phone" label="טלפון" error={errors.phone}>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={handleChange('phone')}
                    className={fieldClass(Boolean(errors.phone))}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    disabled={isSubmitting}
                    placeholder="050-0000000"
                    dir="ltr"
                  />
                </FormField>

                {submitError ? (
                  <p
                    className="rounded-xl border border-red-400/30 bg-red-950/40 px-4 py-3 text-center text-sm text-red-200"
                    role="alert"
                  >
                    {submitError}
                  </p>
                ) : null}

                <GlowButton
                  variant="submit"
                  type="submit"
                  className="payment-proceed-btn mt-1 w-full text-lg"
                  disabled={isSubmitting || !schemaReady}
                >
                  {isSubmitting ? 'שולחים את הפרטים…' : 'המשך לשלב התשלום'}
                </GlowButton>
              </form>
            ) : (
              <div
                key="payment-step"
                className="registration-step-enter flex flex-col items-center gap-8 py-4 text-center sm:py-8"
              >
                <div className="max-w-md space-y-4">
                  <p className="text-2xl" aria-hidden="true">
                    ✓
                  </p>
                  <p className="text-lg font-semibold leading-relaxed text-white sm:text-xl">
                    הפרטים נקלטו בהצלחה! כעת יש להשלים את התשלום כדי לשריין את
                    מקומך בסדנה.
                  </p>
                </div>
                <a
                  href={PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="payment-secure-btn inline-flex w-full max-w-md items-center justify-center rounded-xl px-6 py-4 text-base font-bold text-white sm:text-lg"
                >
                  מעבר לתשלום מאובטח
                </a>
                <button
                  type="button"
                  onClick={returnToRegistration}
                  className="text-sm text-muted underline-offset-4 transition-colors hover:text-purple hover:underline"
                >
                  חזרה לשלב ההרשמה
                </button>
              </div>
            )}
          </div>
        </GlassCard>
      </SectionReveal>
    </section>
  )
}
