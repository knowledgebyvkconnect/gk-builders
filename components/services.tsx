import { Home, Hammer, Grid3X3, Paintbrush, Zap, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Home,
    title: "House Construction",
    description: "Complete residential construction from foundation to finishing, built to last generations.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: Hammer,
    title: "Renovation Work",
    description: "Transform your existing space with expert renovation and remodeling services.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: Grid3X3,
    title: "Tiles & Marble Work",
    description: "Premium tile installation and marble work for floors, walls, and countertops.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: Paintbrush,
    title: "Painting & Plaster",
    description: "Professional painting and plastering services for a flawless finish.",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: Zap,
    title: "Electrical Work",
    description: "Safe and reliable electrical installations, repairs, and upgrades.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            <span className="w-8 h-[2px] bg-primary" />
            Our Services
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-pretty">
            Comprehensive Construction Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            From groundbreaking to grand opening, we deliver end-to-end construction services tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${service.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Button variant="ghost" className="p-0 h-auto text-primary hover:text-accent font-semibold group/btn">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <a href="#contact">
              Get a Free Quote
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
