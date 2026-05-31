/** Bank transfer details — update when account info is ready */
export const BANK_TRANSFER_DETAILS = {
  bankName: 'מזרחי טפחות',
  branch: '431',
  accountNumber: '464343',
  beneficiary: 'ביונד קוד בע"מ',
  amount: '350 ₪',
  note: 'יש לציין את שמך המלא בהערות להעברה',
}

export function scrollToRegistration() {
  document.getElementById('registration')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
