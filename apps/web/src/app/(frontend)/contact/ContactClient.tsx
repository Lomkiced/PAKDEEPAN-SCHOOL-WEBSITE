"use client"

import * as React from "react"
import { FadeIn, StaggerContainer, StaggerItem } from "@pakdeepan/ui"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Phone, EnvelopeSimple, MapPin, LinkedinLogo, InstagramLogo, FacebookLogo, YoutubeLogo, ArrowRight, PaperPlaneRight } from "@phosphor-icons/react"
import { cn } from "@pakdeepan/ui/src/utils/cn"
import { submitInquiry } from "@/actions/contact"

const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  interest: z.string().min(1, "Please select an area of interest"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to the privacy policy",
  }),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactClientProps {
  siteSettings: any;
  dict: any;
  locale: string;
}

export default function ContactClient({ siteSettings, dict, locale }: ContactClientProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      interest: "early_years"
    }
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    // Call Next.js Server Action
    const result = await submitInquiry(data)
    
    setIsSubmitting(false)
    
    if (result.success) {
      setIsSuccess(true)
      reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } else {
      // In a real app, you might want to show a toast error here
      console.error(result.error)
      alert(result.error)
    }
  }

  // Extract contact details from CMS or use fallbacks
  const contact = siteSettings?.contact || {}
  const phone = contact.phone || "+1 (555) 123-4567"
  const email = contact.email || "admissions@pakdeepan.edu"
  const address = contact.address || "1200 Education Drive\nInnovation District, 1201"
  const mapsUrl = contact.mapsUrl || "https://maps.google.com"
  const mapsImage = contact.mapsImage?.url || "https://lh3.googleusercontent.com/aida-public/AB6AXuDFXW_lT6hQ8N1L0n_M0z1d2R2rP0pWv5qYxT4H-H1pQ1cM2lXU2eP3QhA8Q3T-WvV-QyZ9J5pZ2T3n1Z4QZ2rF2g3QZ2T3n1Z4QZ2rF2g3QZ2T3n1Z4QZ2rF2g3QZ2T3n1Z4Q"
  
  const officeDays = siteSettings?.officeHours?.days || "Monday – Friday"
  const officeHoursTime = siteSettings?.officeHours?.hours || "8:00 AM – 4:00 PM (Local Time)"

  const social = siteSettings?.social || {}

  return (
    <div className="flex flex-col relative min-h-screen">
      <main className="flex-grow pt-[120px] pb-20 space-y-16">
        
        {/* Page Header */}
        <section className="max-w-[1120px] mx-auto px-5 md:px-20 text-center">
          <FadeIn direction="up">
            <h1 className="font-display-lg text-[40px] md:text-[56px] text-primary mb-4 tracking-tight">
              Connect With Us
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              We welcome your inquiries and look forward to discussing how Pakdeepan Kindergarten School can be part of your family's educational journey.
            </p>
          </FadeIn>
        </section>

        {/* Bento Grid Layout */}
        <section className="max-w-[1120px] mx-auto px-5 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar: Contact Info & Map */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <FadeIn direction="right" delay={0.1}>
                {/* Info Card */}
                <div className="bg-surface-container-lowest rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-8 flex flex-col gap-8 border border-outline-variant/30">
                  <div>
                    <h3 className="font-headline-sm text-[24px] text-secondary mb-2 tracking-tight">Admissions Office</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Available {officeDays}<br/>
                      {officeHoursTime}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-6">
                    <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-4 group">
                      <Phone size={24} className="text-primary/70 group-hover:text-primary transition-colors" />
                      <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">
                        {phone}
                      </span>
                    </a>
                    <a href={`mailto:${email}`} className="flex items-center gap-4 group">
                      <EnvelopeSimple size={24} className="text-primary/70 group-hover:text-primary transition-colors" />
                      <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors truncate">
                        {email}
                      </span>
                    </a>
                    <div className="flex items-start gap-4">
                      <MapPin size={24} className="text-primary/70 mt-1 shrink-0" />
                      <span className="font-body-md text-body-md text-on-surface whitespace-pre-wrap">
                        {address}
                      </span>
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="pt-6 border-t border-outline-variant/20 flex gap-4">
                    {social.linkedin && (
                      <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all shadow-sm hover:shadow-md">
                        <LinkedinLogo size={20} />
                      </a>
                    )}
                    {social.instagram && (
                      <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all shadow-sm hover:shadow-md">
                        <InstagramLogo size={20} />
                      </a>
                    )}
                    {social.facebook && (
                      <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all shadow-sm hover:shadow-md">
                        <FacebookLogo size={20} />
                      </a>
                    )}
                    {social.youtube && (
                      <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all shadow-sm hover:shadow-md">
                        <YoutubeLogo size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </FadeIn>

              {/* Minimalist Map Card */}
              <FadeIn direction="right" delay={0.2}>
                <div className="bg-surface-container-lowest rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden border border-outline-variant/30 h-64 relative group cursor-pointer" onClick={() => window.open(mapsUrl, '_blank')}>
                  {mapsImage ? (
                    <img 
                      src={mapsImage} 
                      alt="Map Location" 
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-surface-container flex items-center justify-center">
                      <MapPin size={48} className="text-outline" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/40 to-transparent flex items-end p-6">
                    <span className="font-label-caps text-label-caps flex items-center gap-2 text-primary group-hover:text-secondary transition-colors">
                      View on Maps <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Form Container */}
            <div className="lg:col-span-8">
              <FadeIn direction="up" delay={0.3}>
                <div className="bg-surface rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] p-8 md:p-12 border border-outline-variant/20 h-full relative overflow-hidden">
                  
                  {/* Subtle background decoration */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 rounded-bl-full -z-10 blur-3xl pointer-events-none"></div>
                  
                  <h2 className="font-headline-md text-headline-md text-on-surface mb-8">Send a Message</h2>
                  
                  {isSuccess ? (
                    <div className="flex flex-col items-center justify-center text-center h-full min-h-[300px] animate-in fade-in zoom-in duration-500">
                      <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center text-primary mb-6">
                        <PaperPlaneRight size={32} weight="fill" />
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Message Sent Successfully!</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                        Thank you for reaching out. Our admissions team will review your inquiry and get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="font-label-caps text-label-caps text-on-surface-variant">First Name</label>
                          <input 
                            {...register("firstName")}
                            placeholder="e.g. Eleanor"
                            className={cn(
                              "w-full bg-surface-container-lowest border rounded-lg px-4 py-3 font-body-md text-on-surface outline-none transition-all",
                              "focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-outline",
                              errors.firstName ? "border-error focus:border-error focus:ring-error/20" : "border-outline-variant/50"
                            )}
                          />
                          {errors.firstName && <p className="text-error text-xs">{errors.firstName.message}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <label className="font-label-caps text-label-caps text-on-surface-variant">Last Name</label>
                          <input 
                            {...register("lastName")}
                            placeholder="e.g. Vance"
                            className={cn(
                              "w-full bg-surface-container-lowest border rounded-lg px-4 py-3 font-body-md text-on-surface outline-none transition-all",
                              "focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-outline",
                              errors.lastName ? "border-error focus:border-error focus:ring-error/20" : "border-outline-variant/50"
                            )}
                          />
                          {errors.lastName && <p className="text-error text-xs">{errors.lastName.message}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-label-caps text-label-caps text-on-surface-variant">Email Address</label>
                        <input 
                          {...register("email")}
                          placeholder="eleanor@example.com"
                          className={cn(
                            "w-full bg-surface-container-lowest border rounded-lg px-4 py-3 font-body-md text-on-surface outline-none transition-all",
                            "focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-outline",
                            errors.email ? "border-error focus:border-error focus:ring-error/20" : "border-outline-variant/50"
                          )}
                        />
                        {errors.email && <p className="text-error text-xs">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="font-label-caps text-label-caps text-on-surface-variant">Area of Interest</label>
                        <select 
                          {...register("interest")}
                          className={cn(
                            "w-full bg-surface-container-lowest border rounded-lg px-4 py-3 font-body-md text-on-surface outline-none transition-all appearance-none cursor-pointer",
                            "focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-outline",
                            errors.interest ? "border-error focus:border-error focus:ring-error/20" : "border-outline-variant/50"
                          )}
                        >
                          <option value="early_years">Admissions - Early Years (Toddler/Pre-K)</option>
                          <option value="kindergarten">Admissions - Kindergarten</option>
                          <option value="tour">Schedule a Campus Tour</option>
                          <option value="careers">Careers & Teaching</option>
                          <option value="other">Other Inquiry</option>
                        </select>
                        {errors.interest && <p className="text-error text-xs">{errors.interest.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="font-label-caps text-label-caps text-on-surface-variant">Your Message</label>
                        <textarea 
                          {...register("message")}
                          rows={4}
                          placeholder="How can we help you?"
                          className={cn(
                            "w-full bg-surface-container-lowest border rounded-lg px-4 py-3 font-body-md text-on-surface outline-none transition-all resize-y",
                            "focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-outline",
                            errors.message ? "border-error focus:border-error focus:ring-error/20" : "border-outline-variant/50"
                          )}
                        />
                        {errors.message && <p className="text-error text-xs">{errors.message.message}</p>}
                      </div>

                      <div className="pt-2 flex items-start gap-3">
                        <input 
                          type="checkbox"
                          {...register("consent")}
                          id="consent"
                          className="mt-1 w-4 h-4 rounded border-outline-variant/50 text-primary focus:ring-primary cursor-pointer accent-primary"
                        />
                        <label htmlFor="consent" className="font-body-md text-on-surface-variant text-sm cursor-pointer select-none">
                          I agree to the <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and consent to being contacted regarding my inquiry.
                        </label>
                      </div>
                      {errors.consent && <p className="text-error text-xs pl-7">{errors.consent.message}</p>}

                      <div className="pt-4 border-t border-outline-variant/20 flex justify-end">
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-caps text-label-caps flex items-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-70 shadow-sm hover:shadow-md cursor-pointer"
                        >
                          {isSubmitting ? "Sending..." : "Submit Inquiry"}
                          {!isSubmitting && <ArrowRight size={16} />}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </FadeIn>
            </div>

          </div>
        </section>

      </main>
    </div>
  )
}
