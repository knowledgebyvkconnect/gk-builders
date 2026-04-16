"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Rajesh Sharma",
    role: "Homeowner, Lucknow",
    content:
      "GK Builders transformed our dream home into reality. The attention to detail and quality of work exceeded our expectations. Gautam ji and his team were professional throughout the project.",
    rating: 5,
  },
  {
    name: "Priya Gupta",
    role: "Business Owner, Kanpur",
    content:
      "Excellent renovation work on our office space. They completed the project on time and within budget. The team was responsive and accommodating to our needs. Highly recommended!",
    rating: 5,
  },
  {
    name: "Amit Verma",
    role: "Property Developer, Varanasi",
    content:
      "I have worked with many contractors, but GK Builders stands out for their integrity and quality. Their marble and tile work is exceptional. Will definitely hire them again.",
    rating: 5,
  },
  {
    name: "Sunita Devi",
    role: "Homeowner, Agra",
    content:
      "The painting and plastering work done by GK Builders was flawless. They used premium materials and the finish is beautiful. Very satisfied with their service.",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            <span className="w-8 h-[2px] bg-primary" />
            Testimonials
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-pretty">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg">
            {"Don't just take our word for it. Here's what our satisfied clients have to say about working with GK Builders."}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-card">
            <CardContent className="p-8 md:p-12">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-primary" />
                </div>
              </div>

              <p className="text-xl md:text-2xl text-center text-foreground leading-relaxed mb-8">
                {`"${testimonials[currentIndex].content}"`}
              </p>

              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <div className="text-center">
                <div className="font-semibold text-lg text-foreground">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-muted-foreground">{testimonials[currentIndex].role}</div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
