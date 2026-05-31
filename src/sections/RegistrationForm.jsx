import { useEffect, useRef, useState } from 'react'
import { Building2, Upload } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import GlowButton from '../components/GlowButton'
import RegistrationProgress from '../components/RegistrationProgress'
import SectionReveal from '../components/SectionReveal'
import { BANK_TRANSFER_DETAILS } from '../utils/registrationForm'
import {
  defaultQuestionMap,
  fetchMondayFormSchema,
  submitMondayRegistration,
  validatePaymentProof,
  validateRegistrationFields,
} from '../utils/mondayForm'

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
}

const fieldClass = (hasError) =>
  `w-full min-h-[56px] rounded-2xl border bg-black/35 px-4 py-3.5 text-lg text-white outline-none transition-[border-color,box-shadow] placeholder:text-muted/60 ${
    hasError
      ? 'border-red-400/70 ring-1 ring-red-400/30'
      : 'border-white/10 focus:border-purple focus:shadow-[0_0_0_3px_rgba(167,139,250,0.22)] focus:ring-1 focus:ring-purple/40'
  }`

function FormField({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2.5 block text-base font-semibold text-white sm:text-lg">
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

function BankDetailRow({ label, value, dir }) {
  return (
    <div className="border-b border-white/8 py-2.5 text-right last:border-b-0 sm:py-3">
      <span className="text-base font-medium text-muted sm:text-lg">{label}: </span>
      <span className="text-base font-bold text-white sm:text-lg" dir={dir}>
        {value}
      </span>
    </div>
  )
}

export default function RegistrationForm() {
  const [step, setStep] = useState(1)
  const [stepVisible, setStepVisible] = useState(true)
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [paymentProof, setPaymentProof] = useState(null)
  const [paymentProofError, setPaymentProofError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [questionMap, setQuestionMap] = useState(defaultQuestionMap)
  const [schemaReady, setSchemaReady] = useState(false)
  const fileInputRef = useRef(null)

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

  function transitionToStep(nextStep) {
    setStepVisible(false)
    window.setTimeout(() => {
      setStep(nextStep)
      setStepVisible(true)
    }, 280)
  }

  function goToPaymentStep() {
    transitionToStep(2)
  }

  function returnToRegistration() {
    setSubmitError('')
    setPaymentProofError('')
    transitionToStep(1)
  }

  function handleChange(field) {
    return (event) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
      setSubmitError('')
    }
  }

  function handleContinueToPayment(event) {
    event.preventDefault()
    setSubmitError('')

    const validationErrors = validateRegistrationFields(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    goToPaymentStep()
  }

  function handleProofChange(event) {
    const file = event.target.files?.[0] || null
    setPaymentProof(file)
    setPaymentProofError('')
    setSubmitError('')
  }

  async function handlePaymentSubmit(event) {
    event.preventDefault()
    setSubmitError('')

    const proofError = validatePaymentProof(paymentProof)
    if (proofError) {
      setPaymentProofError(proofError)
      return
    }

    setPaymentProofError('')
    setIsSubmitting(true)

    const submissionValues = {
      ...values,
      phone: values.phone.replace(/[^0-9]/g, ''),
      paymentProof,
    }

    try {
      await submitMondayRegistration(submissionValues, questionMap)
      setIsComplete(true)
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
          <h2 className="mb-3 text-center text-2xl font-extrabold text-neon sm:text-3xl">
            הרשמה לסדנה
          </h2>
          <p className="mb-8 text-center text-base text-muted sm:text-lg">
            מלאי את הפרטים, בצעי העברה בנקאית והעלי אסמכתא לסיום ההרשמה
          </p>

          <RegistrationProgress currentStep={isComplete ? 3 : step} />

          <div
            className={`transition-all duration-300 ease-out motion-reduce:transition-none ${
              stepVisible
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-2 opacity-0'
            }`}
          >
            {isComplete ? (
              <div
                key="success-step"
                className="registration-step-enter flex flex-col items-center gap-6 py-4 text-center sm:py-8"
              >
                <div className="max-w-md space-y-4">
                  <p className="text-2xl" aria-hidden="true">
                    ✓
                  </p>
                  <p className="text-xl font-semibold leading-relaxed text-white sm:text-2xl">
                    ההרשמה והאסמכתא נקלטו בהצלחה!
                  </p>
                  <p className="text-base leading-relaxed text-muted sm:text-lg">
                    נבדוק את התשלום ונאשר את מקומך בסדנה בהקדם.
                  </p>
                </div>
              </div>
            ) : step === 1 ? (
              <form
                key="registration-step"
                className="flex flex-col gap-5"
                onSubmit={handleContinueToPayment}
                noValidate
              >
                <p className="text-center text-base font-medium text-purple/90 sm:text-lg">
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
                  className="payment-proceed-btn mt-1 w-full text-xl"
                  disabled={!schemaReady}
                >
                  המשך לשלב התשלום
                </GlowButton>
              </form>
            ) : (
              <form
                key="payment-step"
                className="registration-step-enter flex flex-col gap-6"
                onSubmit={handlePaymentSubmit}
                noValidate
              >
                <p className="text-center text-base font-medium text-purple/90 sm:text-lg">
                  שלב 2 · תשלום
                </p>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-right sm:p-6">
                  <div className="mb-3 flex flex-row-reverse items-center gap-3">
                    <Building2 className="h-6 w-6 text-purple" strokeWidth={1.5} />
                    <h3 className="text-lg font-extrabold text-white sm:text-xl">
                      תשלום בהעברה בנקאית בלבד
                    </h3>
                  </div>
                  <p className="mb-3 text-base leading-relaxed text-muted sm:text-lg">
                    יש לבצע העברה בנקאית לפרטי החשבון הבאים.{' '}
                    <span className="text-purple/90">{BANK_TRANSFER_DETAILS.note}</span>
                  </p>
                  <div className="rounded-xl border border-white/8 bg-black/25 px-4 py-1">
                    <BankDetailRow label="סכום" value={BANK_TRANSFER_DETAILS.amount} />
                    <BankDetailRow label="בנק" value={BANK_TRANSFER_DETAILS.bankName} />
                    <BankDetailRow label="סניף" value={BANK_TRANSFER_DETAILS.branch} />
                    <BankDetailRow
                      label="מספר חשבון"
                      value={BANK_TRANSFER_DETAILS.accountNumber}
                      dir="ltr"
                    />
                    <BankDetailRow label="בעל החשבון" value={BANK_TRANSFER_DETAILS.beneficiary} />
                  </div>
                </div>

                <FormField
                  id="paymentProof"
                  label="העלאת אסמכתא לתשלום"
                  error={paymentProofError}
                >
                  <input
                    ref={fileInputRef}
                    id="paymentProof"
                    name="paymentProof"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/*"
                    onChange={handleProofChange}
                    className="sr-only"
                    aria-invalid={Boolean(paymentProofError)}
                    aria-describedby={
                      paymentProofError ? 'paymentProof-error' : undefined
                    }
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSubmitting}
                    className={`flex w-full flex-row-reverse items-center justify-between gap-4 rounded-2xl border bg-black/35 px-4 py-4 text-right transition-[border-color,box-shadow] ${
                      paymentProofError
                        ? 'border-red-400/70 ring-1 ring-red-400/30'
                        : 'border-white/10 hover:border-purple/40 focus-visible:border-purple focus-visible:shadow-[0_0_0_3px_rgba(167,139,250,0.22)] focus-visible:outline-none'
                    }`}
                  >
                    <Upload className="h-6 w-6 shrink-0 text-purple" strokeWidth={1.5} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-semibold text-white sm:text-lg">
                        {paymentProof ? paymentProof.name : 'בחרי קובץ אסמכתא'}
                      </span>
                      <span className="mt-1 block text-sm text-muted">
                        PDF או תמונה, עד 10MB
                      </span>
                    </span>
                  </button>
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
                  className="payment-proceed-btn w-full text-xl"
                  disabled={isSubmitting || !schemaReady}
                >
                  {isSubmitting ? 'שולחים את האסמכתא…' : 'שליחת אסמכתא וסיום ההרשמה'}
                </GlowButton>

                <button
                  type="button"
                  onClick={returnToRegistration}
                  disabled={isSubmitting}
                  className="text-sm text-muted underline-offset-4 transition-colors hover:text-purple hover:underline disabled:opacity-50"
                >
                  חזרה לשלב ההרשמה
                </button>
              </form>
            )}
          </div>
        </GlassCard>
      </SectionReveal>
    </section>
  )
}
