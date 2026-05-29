import Container from './components/Container'
import GlowButton from './components/GlowButton'
import PageShell from './components/PageShell'
import AboutLecturer from './sections/AboutLecturer'
import Bonus from './sections/Bonus'
import EventDetails from './sections/EventDetails'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import RegistrationForm from './sections/RegistrationForm'
import Topics from './sections/Topics'
import Urgency from './sections/Urgency'
import { scrollToRegistration } from './utils/registrationForm'

function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-bg/90 p-4 backdrop-blur-md md:hidden">
      <GlowButton
        variant="submit"
        className="w-full"
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
      <Container className="flex flex-col gap-16 py-8 pb-24 md:gap-20 md:py-12 md:pb-12">
        <Hero />
        <Topics />
        <AboutLecturer />
        <EventDetails />
        <Bonus />
        <Urgency />
        <RegistrationForm />
        <Footer />
      </Container>
      <StickyMobileCta />
    </PageShell>
  )
}
