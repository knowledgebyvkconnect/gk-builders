import { Shield, Award, Clock, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Premium materials and expert craftsmanship in every project we undertake.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We respect your time with punctual project completion and milestone adherence.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Skilled professionals with years of experience in construction excellence.",
  },
]

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase mb-4">
              <span className="w-8 h-[2px] bg-primary" />
              About Us
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-pretty">
              Building Trust Through Quality Construction
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Founded by <span className="text-foreground font-semibold">Gautam Kumar</span>, GK Builders has been transforming spaces and building dreams for over a decade. Our commitment to excellence, integrity, and customer satisfaction has made us a trusted name in the construction industry.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From residential homes to commercial renovations, we bring the same level of dedication and expertise to every project. Our team of skilled professionals ensures that your vision is brought to life with precision and care.
            </p>

            {/* Founder Badge */}
            <div className="inline-flex items-center gap-4 bg-secondary rounded-2xl p-4">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                <Award className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Gautam Kumar</div>
                <div className="text-sm text-muted-foreground">Founder & Lead Contractor</div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Trust Indicator */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-muted-foreground">
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">200+</span> Happy Clients
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
