import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Portfolio } from "@/components/portfolio"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

// --- YE SECTION GOOGLE SEARCH CONSOLE KI PROBLEM SOLVE KAREGA ---
export const metadata = {
  title: 'GK Builders - Quality Building Materials',
  description: 'Building materials supplier in Sharjah and Dubai.',
  alternates: {
    canonical: 'https://www.gkbuilders.services/',
  },
}
// -----------------------------------------------------------

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
