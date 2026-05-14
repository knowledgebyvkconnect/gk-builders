"use client"

import { useState, useRef, useEffect } from "react"
import { Star, Upload, X, User, Image as ImageIcon, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"

interface Review {
  id: string
  name: string
  rating: number
  comment: string
  image_url: string | null
  created_at: string
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return "Just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`
  return `${Math.floor(diffInSeconds / 2592000)} months ago`
}

export function CustomerReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
  })
  const [hoverRating, setHoverRating] = useState(0)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  // Fetch reviews from Supabase
  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching reviews:", error)
        return
      }

      setReviews(data || [])
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB")
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setImageFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.rating || !formData.comment) {
      alert("Please fill in all required fields")
      return
    }

    setSubmitting(true)

    try {
      let imageUrl: string | null = null

      // Upload image to Supabase Storage if exists
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("review-images")
          .upload(fileName, imageFile)

        if (uploadError) {
          console.error("Error uploading image:", uploadError)
          alert("Failed to upload image. Please try again.")
          setSubmitting(false)
          return
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("review-images")
          .getPublicUrl(fileName)
        
        imageUrl = urlData.publicUrl
      }

      // Insert review into database
      const { data: newReview, error: insertError } = await supabase
        .from("reviews")
        .insert({
          name: formData.name,
          rating: formData.rating,
          comment: formData.comment,
          image_url: imageUrl,
        })
        .select()
        .single()

      if (insertError) {
        console.error("Error inserting review:", insertError)
        alert("Failed to submit review. Please try again.")
        setSubmitting(false)
        return
      }

      // Add new review to the list
      setReviews([newReview, ...reviews])
      
      // Reset form
      setFormData({ name: "", rating: 0, comment: "" })
      setImagePreview(null)
      setImageFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("Failed to submit review. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const renderStars = (rating: number, interactive = false, size = "w-5 h-5") => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => setFormData({ ...formData, rating: star }) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
            className={interactive ? "cursor-pointer transition-transform hover:scale-110" : "cursor-default"}
            disabled={!interactive}
          >
            <Star
              className={`${size} ${
                star <= (interactive ? hoverRating || formData.rating : rating)
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted"
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <section id="reviews" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wider uppercase mb-4">
            <span className="w-8 h-[2px] bg-primary" />
            Customer Reviews
            <span className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-pretty">
            Share Your Experience
          </h2>
          <p className="text-muted-foreground text-lg">
            We value your feedback. Share your experience working with GK Builders and help others make informed decisions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Review Form */}
          <Card className="border-0 shadow-xl bg-card h-fit">
            <CardContent className="p-8">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                Write a Review
              </h3>
              <p className="text-muted-foreground mb-6">
                Share your thoughts about our services
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Name *
                  </label>
                  <Input
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12"
                    disabled={submitting}
                  />
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Rating *
                  </label>
                  <div className="flex items-center gap-3">
                    {renderStars(formData.rating, true, "w-8 h-8")}
                    {formData.rating > 0 && (
                      <span className="text-sm text-muted-foreground">
                        {formData.rating} of 5 stars
                      </span>
                    )}
                  </div>
                </div>

                {/* Comment Textarea */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Review *
                  </label>
                  <Textarea
                    placeholder="Tell us about your experience with GK Builders..."
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    rows={4}
                    required
                    className="resize-none"
                    disabled={submitting}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Upload Photo (Optional)
                  </label>
                  
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          disabled={submitting}
                          className="absolute top-1 right-1 w-6 h-6 bg-foreground/80 text-background rounded-full flex items-center justify-center hover:bg-foreground transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {imageFile?.name}
                      </p>
                    </div>
                  ) : (
                    <div
                      onClick={() => !submitting && fileInputRef.current?.click()}
                      className={`border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload an image
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={submitting}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Recent Reviews
              </h3>
              <span className="text-sm text-muted-foreground">
                {reviews.length} reviews
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : reviews.length === 0 ? (
              <Card className="border-0 shadow-md bg-card">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No reviews yet. Be the first to share your experience!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
                {reviews.map((review) => (
                  <Card key={review.id} className="border-0 shadow-md bg-card hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-primary" />
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h4 className="font-semibold text-foreground">
                                {review.name}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {getTimeAgo(review.created_at)}
                              </p>
                            </div>
                            {renderStars(review.rating, false, "w-4 h-4")}
                          </div>

                          {/* Comment */}
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {review.comment}
                          </p>

                          {/* Image Thumbnail */}
                          {review.image_url && (
                            <div className="mt-3">
                              <a 
                                href={review.image_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="relative w-20 h-20 rounded-lg overflow-hidden border border-border group cursor-pointer inline-block"
                              >
                                <img
                                  src={review.image_url}
                                  alt={`Photo by ${review.name}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                                  <ImageIcon className="w-5 h-5 text-background opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
