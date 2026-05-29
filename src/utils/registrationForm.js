/** Replace with your company payment URL when ready */
export const PAYMENT_URL = 'https://www.paypal.com'

export function scrollToRegistration() {
  document.getElementById('registration')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
