"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CalendarBlank, CheckCircle } from "@phosphor-icons/react"
import { FadeIn, StaggerContainer, StaggerItem } from "@pakdeepan/ui"
import { formatTHB } from "@/utils/currency"
import { submitAdmissionInquiry } from "@/actions/admissions"

// Form Validation Schema
const inquirySchema = z.object({
  parentName: z.string().min(2, "Parent/Guardian name is required"),
  email: z.string().email("Please enter a valid email address"),
  childName: z.string().min(2, "Child's name is required"),
  grade: z.string().min(1, "Please select a grade"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to the privacy policy"
  }),
})

type InquiryFormValues = z.infer<typeof inquirySchema>

interface AdmissionsClientProps {
  programs: any[];
  dict: any;
  locale: string;
}

export default function AdmissionsClient({ programs, dict, locale }: AdmissionsClientProps) {
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [serverError, setServerError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
  })

  const onSubmit = async (data: InquiryFormValues) => {
    setServerError(null)
    const result = await submitAdmissionInquiry(data)
    
    if (result.success) {
      setIsSubmitted(true)
      reset()
    } else {
      setServerError(result.error || "An unexpected error occurred.")
    }
  }

  return (
    <div className="flex flex-col relative">
      <main className="flex-grow pt-[120px] pb-20">
        
        {/* Hero Section */}
        <section className="max-w-[1120px] mx-auto px-5 md:px-20 mb-20">
          <FadeIn direction="up" className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-secondary-container/30 text-on-secondary-container font-label-caps text-label-caps rounded-full mb-6">
              Join Our Community
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
              Admissions & Enrollment
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Join a community dedicated to excellence, inquiry, and holistic growth. Begin your journey with Pakdeepan Kindergarten School today.
            </p>
          </FadeIn>
        </section>

        {/* Stepper */}
        <section className="max-w-[1120px] mx-auto px-5 md:px-20 mb-20">
          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-6 left-12 right-12 h-[2px] bg-surface-variant z-0"></div>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {[
                { step: 1, title: "Inquiry", desc: "Submit your initial details to connect with our admissions team.", active: true },
                { step: 2, title: "School Tour", desc: "Experience our campus and meet our dedicated educators.", active: false },
                { step: 3, title: "Assessment", desc: "A gentle evaluation to ensure we meet your child's needs.", active: false },
                { step: 4, title: "Enrollment", desc: "Finalize documentation and prepare for the academic year.", active: false },
              ].map((item, idx) => (
                <StaggerItem key={idx}>
                  <div className="bg-surface rounded-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-center flex flex-col items-center relative z-10 hover:-translate-y-1 transition-transform duration-300">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display-lg text-headline-sm mb-4 border-4 border-surface shadow-sm ${item.active ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant'}`}>
                      {item.step}
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-2">{item.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm">{item.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Tuition Fees Table */}
        <section className="max-w-[1120px] mx-auto px-5 md:px-20 mb-20">
          <FadeIn direction="up">
            <h2 className="font-headline-md text-headline-md text-primary mb-6 text-center md:text-left">{dict.finance?.tuitionAndFees || "Tuition & Fees"}</h2>
            <div className="bg-surface rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden border border-outline-variant/30">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead className="bg-surface-container-low font-label-caps text-label-caps text-on-surface">
                    <tr>
                      <th className="p-4 border-b border-outline-variant/30">Program</th>
                      <th className="p-4 border-b border-outline-variant/30 text-right">Tuition Fee ({dict.finance?.currencySymbol || "฿"})</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-md text-body-md text-on-surface-variant">
                    {programs.length > 0 ? programs.map((program) => (
                      <tr key={program.id} className="hover:bg-surface-container-lowest transition-colors border-b border-outline-variant/10">
                        <td className="p-4">
                          <span className="block font-semibold text-on-surface">{program.title}</span>
                          <span className="text-sm opacity-80">
                            {program.level === 'kindergarten' && "Ages 2-5"}
                            {program.level === 'primary' && "Grades 1-6"}
                            {program.level === 'secondary' && "Grades 7-12"}
                            {program.level === 'english-program' && "EP"}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="font-semibold text-primary">{formatTHB(program.tuitionFee)}</span>
                          <span className="text-sm ml-1">
                            / {program.billingInterval === 'term' ? (dict.finance?.perTerm || "term") : 
                               program.billingInterval === 'year' ? (dict.finance?.perYear || "year") : 
                               (dict.finance?.perMonth || "month")}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr className="hover:bg-surface-container-lowest transition-colors">
                        <td colSpan={2} className="p-8 text-center text-on-surface-variant">
                          No tuition data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Form Section */}
        <section className="max-w-3xl mx-auto px-5 md:px-0 mb-20" id="inquiry">
          <FadeIn direction="up">
            <div className="bg-surface rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-8 md:p-12 border border-outline-variant/20">
              
              {isSubmitted ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <div className="w-20 h-20 bg-tertiary-container rounded-full flex items-center justify-center text-on-tertiary-container mb-6">
                    <CheckCircle size={48} weight="fill" />
                  </div>
                  <h2 className="font-headline-md text-headline-md text-primary mb-4">Inquiry Received</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md mx-auto">
                    Thank you for your interest in Pakdeepan Kindergarten School. Our admissions team will review your details and contact you shortly.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-surface-container-high text-on-surface hover:bg-surface-container-highest px-6 py-2 rounded-full transition-colors font-label-caps text-label-caps cursor-pointer"
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-headline-md text-headline-md text-primary mb-3 text-center">Inquiry Form</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-8 text-center max-w-lg mx-auto">
                    Please provide your details below, and our admissions team will contact you shortly to guide you through the next steps.
                  </p>
                  
                  {serverError && (
                    <div className="mb-6 p-4 bg-error/10 text-error rounded-md text-sm">
                      {serverError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      <div className="flex flex-col gap-2">
                        <label className="font-label-caps text-label-caps text-on-surface">Parent/Guardian Name</label>
                        <input 
                          {...register("parentName")}
                          className={`w-full rounded-md border ${errors.parentName ? 'border-error' : 'border-outline/30'} focus:border-secondary focus:ring-1 focus:ring-secondary bg-surface-bright text-on-surface p-3 outline-none transition-colors`} 
                          placeholder="Jane Doe" 
                          type="text"
                        />
                        {errors.parentName && <span className="text-error text-xs">{errors.parentName.message}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="font-label-caps text-label-caps text-on-surface">Email Address</label>
                        <input 
                          {...register("email")}
                          className={`w-full rounded-md border ${errors.email ? 'border-error' : 'border-outline/30'} focus:border-secondary focus:ring-1 focus:ring-secondary bg-surface-bright text-on-surface p-3 outline-none transition-colors`} 
                          placeholder="jane@example.com" 
                          type="email"
                        />
                        {errors.email && <span className="text-error text-xs">{errors.email.message}</span>}
                      </div>

                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      <div className="flex flex-col gap-2">
                        <label className="font-label-caps text-label-caps text-on-surface">Child's Name</label>
                        <input 
                          {...register("childName")}
                          className={`w-full rounded-md border ${errors.childName ? 'border-error' : 'border-outline/30'} focus:border-secondary focus:ring-1 focus:ring-secondary bg-surface-bright text-on-surface p-3 outline-none transition-colors`} 
                          placeholder="John Doe" 
                          type="text"
                        />
                        {errors.childName && <span className="text-error text-xs">{errors.childName.message}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="font-label-caps text-label-caps text-on-surface">Child's Age / Expected Grade</label>
                        <select 
                          {...register("grade")}
                          className={`w-full rounded-md border ${errors.grade ? 'border-error' : 'border-outline/30'} focus:border-secondary focus:ring-1 focus:ring-secondary bg-surface-bright text-on-surface p-3 outline-none transition-colors cursor-pointer`}
                        >
                          <option value="">Select Grade...</option>
                          {programs.map((program) => (
                            <option key={program.id} value={program.id}>{program.title}</option>
                          ))}
                          {programs.length === 0 && (
                            <>
                              <option value="pre-k">Pre-K (3-4 yrs)</option>
                              <option value="kindergarten">Kindergarten (5-6 yrs)</option>
                              <option value="lower-primary">Lower Primary (7-10 yrs)</option>
                            </>
                          )}
                        </select>
                        {errors.grade && <span className="text-error text-xs">{errors.grade.message}</span>}
                      </div>

                    </div>

                    <div className="flex flex-col gap-2 mt-6">
                      <div className="flex items-start gap-3">
                        <input 
                          {...register("consent")}
                          className="mt-1 w-4 h-4 text-secondary border-outline/50 rounded focus:ring-secondary cursor-pointer" 
                          id="consent" 
                          type="checkbox"
                        />
                        <label className="font-body-md text-body-md text-on-surface-variant text-sm cursor-pointer" htmlFor="consent">
                          I consent to Pakdeepan Kindergarten School collecting and processing my data for admissions purposes in accordance with the Privacy Policy.
                        </label>
                      </div>
                      {errors.consent && <span className="text-error text-xs">{errors.consent.message}</span>}
                    </div>

                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-on-primary font-label-caps text-label-caps py-4 rounded-full hover:opacity-90 transition-opacity mt-8 shadow-md disabled:opacity-50 disabled:cursor-not-allowed" 
                      type="submit"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </FadeIn>
        </section>
      </main>

      {/* Floating CTA */}
      <button className="fixed bottom-6 right-6 md:bottom-12 md:right-12 bg-secondary text-on-secondary shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-full px-6 py-4 flex items-center gap-2 hover:opacity-90 transition-transform hover:-translate-y-1 z-40 cursor-pointer">
        <CalendarBlank size={24} weight="fill" />
        <span className="font-label-caps text-label-caps">Schedule a Tour</span>
      </button>
    </div>
  )
}
