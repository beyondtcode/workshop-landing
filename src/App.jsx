import Container from './components/Container'
import GlowButton from './components/GlowButton'
import PageShell from './components/PageShell'
import AboutLecturer from './sections/AboutLecturer'
import Bonus from './sections/Bonus'
import EventDetails from './sections/EventDetails'
import Hero from './sections/Hero'
import RegistrationForm from './sections/RegistrationForm'
import Urgency from './sections/Urgency'
import { scrollToRegistration } from './utils/registrationForm'

function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-bg/95 p-4 backdrop-blur-lg md:hidden">
      <GlowButton
        variant="submit"
        className="w-full text-lg"
        onClick={scrollToRegistration}
      >
        להרשמה מהירה
      </GlowButton>
    </div>
  )
}

export default function App() {
  return (
    <PageShell>
      <Container className="flex flex-col gap-20 py-10 pb-28 md:gap-24 md:py-14 md:pb-14">
        <Hero />
        <AboutLecturer />
        <EventDetails />
        <Bonus />
        <Urgency />
        <RegistrationForm />
      </Container>
      <StickyMobileCta />
    </PageShell>
  )
}
