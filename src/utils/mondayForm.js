/** Short code from https://wkf.ms/4uCYfL8 — resolved to full token server-side in dev */
export const MONDAY_FORM_TOKEN = import.meta.env.VITE_MONDAY_FORM_TOKEN || '4uCYfL8'

/** Dev: Vite middleware (server-side, no CORS). Prod: set VITE_MONDAY_SUBMIT_URL to your backend. */
export const MONDAY_SUBMIT_URL =
  import.meta.env.VITE_MONDAY_SUBMIT_URL || '/api/monday/submit'

const FORM_SCHEMA_URL =
  import.meta.env.VITE_MONDAY_SCHEMA_URL ||
  `/api/monday/schema?token=${encodeURIComponent(MONDAY_FORM_TOKEN)}`

export const MONDAY_QUESTION_IDS = {
  name: import.meta.env.VITE_MONDAY_QUESTION_NAME || '',
  email: import.meta.env.VITE_MONDAY_QUESTION_EMAIL || '',
  phone: import.meta.env.VITE_MONDAY_QUESTION_PHONE || '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[\d\s\-+()]{7,20}$/

export function validateRegistrationFields({ fullName, email, phone }) {
  const errors = {}

  const name = fullName.trim()
  if (!name) {
    errors.fullName = 'נא למלא שם מלא'
  }

  const emailValue = email.trim()
  if (!emailValue) {
    errors.email = 'נא למלא כתובת אימייל'
  } else if (!EMAIL_PATTERN.test(emailValue)) {
    errors.email = 'כתובת האימייל אינה תקינה'
  }

  const phoneValue = phone.trim()
  if (!phoneValue) {
    errors.phone = 'נא למלא מספר טלפון'
  } else if (!PHONE_PATTERN.test(phoneValue)) {
    errors.phone = 'מספר הטלפון אינו תקין'
  }

  return errors
}

function getTimezoneOffsetMinutes() {
  return -new Date().getTimezoneOffset()
}

function normalizePhoneDigits(phone) {
  return phone.replace(/\D/g, '')
}

function resolveQuestionMap(questions = [], mapFromServer = null) {
  if (mapFromServer?.name) {
    return {
      name: MONDAY_QUESTION_IDS.name || mapFromServer.name,
      email: MONDAY_QUESTION_IDS.email || mapFromServer.email,
      phone: MONDAY_QUESTION_IDS.phone || mapFromServer.phone,
    }
  }

  const visible = questions.filter(
    (q) => q.visible !== false && q.type !== 'PAGE_BLOCK',
  )
  const byType = (type) => visible.find((q) => q.type === type)?.id

  return {
    name: MONDAY_QUESTION_IDS.name || byType('Name') || 'name',
    email: MONDAY_QUESTION_IDS.email || byType('Email'),
    phone: MONDAY_QUESTION_IDS.phone || byType('Phone'),
  }
}

export async function fetchMondayFormSchema() {
  try {
    const response = await fetch(FORM_SCHEMA_URL, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) return null

    const questions = data?.questions || []
    const map = resolveQuestionMap(questions, data?.map)

    if (!map.name) return null
    return map
  } catch {
    return null
  }
}

function buildAnswers({ fullName, email, phone }, questionMap) {
  const answers = [
    {
      question_id: questionMap.name,
      name: fullName.trim(),
    },
  ]

  if (questionMap.email) {
    answers.push({
      question_id: questionMap.email,
      email: email.trim(),
    })
  }

  if (questionMap.phone) {
    const digits = normalizePhoneDigits(phone)
    answers.push({
      question_id: questionMap.phone,
      phone: {
        phone: digits,
        country_short_name: 'IL',
      },
    })
  }

  return answers
}

export async function submitMondayRegistration(
  { fullName, email, phone },
  questionMap,
) {
  if (!questionMap?.name) {
    throw new Error('לא ניתן לטעון את מבנה הטופס. נסי שוב בעוד רגע.')
  }

  const payload = {
    form_token: MONDAY_FORM_TOKEN,
    form_timezone_offset: getTimezoneOffsetMinutes(),
    answers: buildAnswers({ fullName, email, phone }, questionMap),
    fullName,
    email,
    phone,
  }

  const response = await fetch(MONDAY_SUBMIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  let body = null
  try {
    body = await response.json()
  } catch {
    body = null
  }

  if (!response.ok) {
    const message =
      body?.error_message ||
      body?.message ||
      body?.error ||
      body?.results?.[0]?.body?.message ||
      'שליחת הטופס נכשלה. נסי שוב.'
    throw new Error(
      typeof message === 'string' ? message : 'שליחת הטופס נכשלה.',
    )
  }

  if (body?.failed) {
    throw new Error(
      'לא הצלחנו לשלוח לטופס מאנדיי. בדקי את מזהי השאלות ב-.env או את חיבור הרשת.',
    )
  }

  if (body?.errors?.length) {
    throw new Error(body.errors[0]?.message || 'שליחת הטופס נכשלה.')
  }

  return body
}

/** Fallback IDs from live form (https://wkf.ms/4uCYfL8) when schema fetch fails */
export const defaultQuestionMap = {
  name: MONDAY_QUESTION_IDS.name || 'name',
  email: MONDAY_QUESTION_IDS.email || 'emailh699gboe',
  phone: MONDAY_QUESTION_IDS.phone || 'phoneafm25cvv',
}
