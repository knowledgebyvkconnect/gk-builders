import { Phone, MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 md:py-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-background/90">Trusted Since 2015</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-background leading-tight mb-6">
            <span className="text-balance">Building Dreams,</span>
            <br />
            <span className="text-primary">Crafting Excellence</span>
          </h1>

          <p className="text-lg md:text-xl text-background/80 max-w-xl mb-8 leading-relaxed">
            Quality Construction, Trusted Service. Transform your vision into reality with GK Builders - your partner for exceptional construction solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="text-base">
              <a href="tel:+919627506169">
                <Phone className="w-5 h-5 mr-2" />
                Call +91 96275 06169
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base bg-background/10 border-background/30 text-background hover:bg-background hover:text-foreground">
              <a href="https://wa.me/919675429092" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Us
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-background/20">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-background">10+</div>
              <div className="text-sm text-background/70">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-background">250+</div>
              <div className="text-sm text-background/70">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-background">100%</div>
              <div className="text-sm text-background/70">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-background/60">
        <span className="text-xs uppercase tracking-wider">Scroll Down</span>
        <ArrowRight className="w-4 h-4 rotate-90 animate-bounce" />
      </div>
    </section>
  )
}
