"use client"

import { useState } from "react"
import { Phone, MessageCircle, Mail, MapPin, Send, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 96275 06169",
    href: "tel:+919627506169",
    description: "Mon-Sat: 9AM - 7PM",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+91 96754 29092",
    href: "https://wa.me/919675429092",
    description: "Quick Response",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "Gautam121095@gmail.com",
    href: "mailto:Gautam121095@gmail.com",
    description: "We reply within 24 hours",
  },
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Construct WhatsApp message
    const message = `Hello GK Builders!%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0A%0AMessage: ${formData.message}`
    window.open(`https://wa.me/919675429092?text=${message}`, "_blank")
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            <span className="w-8 h-[2px] bg-primary" />
            Contact Us
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-pretty">
            {"Let's Build Something Great Together"}
          </h2>
          <p className="text-muted-foreground text-lg">
            Ready to start your project? Get in touch with us today for a free consultation and quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                      <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-1">{item.title}</h3>
                      <p className="text-primary font-medium mb-1">{item.value}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {item.description}
                      </p>
                    </div>
                  </a>
                </CardContent>
              </Card>
            ))}

            {/* Location Card */}
            <Card className="border-0 shadow-md bg-foreground text-background">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Visit Our Office</h3>
                    <p className="text-background/80">
                      Uttar Pradesh, India
                      <br />
                      Available for projects across North India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                Request a Free Quote
              </h3>
              <p className="text-muted-foreground mb-6">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Input
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    type="tel"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-12"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12"
                  />
                </div>
                <Textarea
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="resize-none"
                />
                <Button type="submit" size="lg" className="w-full">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message via WhatsApp
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By submitting this form, you agree to be contacted regarding your inquiry.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
