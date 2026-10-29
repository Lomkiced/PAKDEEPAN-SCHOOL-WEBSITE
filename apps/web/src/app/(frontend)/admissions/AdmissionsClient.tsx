"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CalendarBlank, CheckCircle } from "@phosphor-icons/react"
import { FadeIn, StaggerContainer, StaggerItem } from "@pakdeepan/ui"
import { formatTHB } from "@/utils/currency"
import { submitAdmissionInquiry } from "@/actions/admissions"
import { useLanguage } from "@/context/LanguageContext"
import { localizeData } from "@/lib/localize"

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
  admissionsPageData?: any;
  dict: any;
  locale: string;
}

const DEFAULT_STEPS_EN = [
  { stepNumber: 1, title: "Inquiry", desc: "Submit your initial details to connect with our admissions team." },
  { stepNumber: 2, title: "School Tour", desc: "Experience our campus and meet our dedicated educators." },
  { stepNumber: 3, title: "Assessment", desc: "A gentle evaluation to ensure we meet your child's needs." },
  { stepNumber: 4, title: "Enrollment", desc: "Finalize documentation and prepare for the academic year." },
]

const DEFAULT_STEPS_TH = [
  { stepNumber: 1, title: "สอบถามข้อมูล", desc: "ส่งข้อมูลเบื้องต้นเพื่อติดต่อประสานงานกับทีมงานฝ่ายรับสมัครของเรา" },
  { stepNumber: 2, title: "เยี่ยมชมโรงเรียน", desc: "สัมผัสบรรยากาศจริงในรั้วโรงเรียนและพบปะคุณครูผู้เชี่ยวชาญ" },
  { stepNumber: 3, title: "การประเมินความพร้อม", desc: "การประเมินอย่างอ่อนโยนเพื่อให้มั่นใจว่าเราตอบสนองต่อพัฒนาการของบุตรหลานท่าน" },
  { stepNumber: 4, title: "การลงทะเบียน", desc: "จัดเตรียมเอกสารและยืนยันการเข้าเรียนเพื่อเริ่มปีการศึกษาใหม่อย่างมั่นใจ" },
]

export default function AdmissionsClient({ programs, admissionsPageData, dict, locale }: AdmissionsClientProps) {
  const { locale: contextLocale } = useLanguage()
  const activeLocale = (contextLocale || locale || "en") as "en" | "th"
  const isTh = activeLocale === "th"

  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [serverError, setServerError] = React.useState<string | null>(null)

  // Configurable fields from CMS Global
  const heroBadge = 
    localizeData(admissionsPageData, 'heroBadge', activeLocale) || 
    (isTh ? "ร่วมเป็นส่วนหนึ่งของครอบครัวเรา" : "Join Our Community")
  const heroTitle = 
    localizeData(admissionsPageData, 'heroTitle', activeLocale) || 
    (isTh ? "การรับสมัครและการลงทะเบียน" : "Admissions & Enrollment")
  const heroDescription = 
    localizeData(admissionsPageData, 'heroDescription', activeLocale) || 
    (isTh 
      ? "ร่วมเป็นส่วนหนึ่งของชุมชนที่มุ่งมั่นสู่ความเป็นเลิศ การสืบเสาะค้นหา และการเติบโตอย่างรอบด้าน เริ่มต้นการเดินทางของบุตรหลานท่านที่โรงเรียนอนุบาลภักดีพรรณวันนี้" 
      : "Join a community dedicated to excellence, inquiry, and holistic growth. Begin your journey with Pakdeepan Kindergarten School today.")
  
  const stepsList = admissionsPageData?.steps && admissionsPageData.steps.length > 0 
    ? admissionsPageData.steps.map((item: any) => ({
        ...item,
        title: localizeData(item, 'title', activeLocale) || item.title,
        desc: localizeData(item, 'desc', activeLocale) || item.desc,
      }))
    : (isTh ? DEFAULT_STEPS_TH : DEFAULT_STEPS_EN)

  const formTitle = 
    localizeData(admissionsPageData, 'formTitle', activeLocale) || 
    (isTh ? "แบบฟอร์มแสดงความจำนงสมัครเรียน" : "Inquiry Form")
  const formSubtitle = 
    localizeData(admissionsPageData, 'formSubtitle', activeLocale) || 
    (isTh 
      ? "กรุณากรอกข้อมูลของท่านด้านล่าง ทีมงานฝ่ายรับสมัครจะติดต่อกลับอย่างรวดเร็วเพื่อแนะนำขั้นตอนถัดไป" 
      : "Please provide your details below, and our admissions team will contact you shortly to guide you through the next steps.")
  const consentLabel = 
    localizeData(admissionsPageData, 'consentLabel', activeLocale) || 
    (isTh 
      ? "ข้าพเจ้ายินยอมให้โรงเรียนอนุบาลภักดีพรรณเก็บและประมวลผลข้อมูลส่วนบุคคลเพื่อวัตถุประสงค์ในการรับสมัครเรียนตามนโยบายความเป็นส่วนตัว" 
      : "I consent to Pakdeepan Kindergarten School collecting and processing my data for admissions purposes in accordance with the Privacy Policy.")
  const submitButtonLabel = 
    localizeData(admissionsPageData, 'submitButtonLabel', activeLocale) || 
    (isTh ? "ส่งแบบฟอร์มสอบถาม" : "Submit Inquiry")
  const successTitle = 
    localizeData(admissionsPageData, 'successTitle', activeLocale) || 
    (isTh ? "ได้รับข้อมูลการสอบถามเรียบร้อยแล้ว" : "Inquiry Received")
  const successMessage = 
    localizeData(admissionsPageData, 'successMessage', activeLocale) || 
    (isTh 
      ? "ขอบพระคุณที่ให้ความสนใจโรงเรียนอนุบาลภักดีพรรณ ทีมงานฝ่ายรับสมัครจะตรวจสอบข้อมูลและติดต่อกลับท่านในเร็วๆ นี้" 
      : "Thank you for your interest in Pakdeepan Kindergarten School. Our admissions team will review your details and contact you shortly.")
  const floatingTourLabel = 
    localizeData(admissionsPageData, 'floatingTourLabel', activeLocale) || 
    (isTh ? "นัดหมายเยี่ยมชมโรงเรียน" : "Schedule a Tour")

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
      setServerError(result.error || (isTh ? "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" : "An unexpected error occurred."))
    }
  }

  const scrollToInquiry = () => {
    document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col relative">
      <main className="flex-grow pt-[120px] pb-20">
        
        {/* Hero Section */}
        <section className="max-w-[1120px] mx-auto px-5 md:px-20 mb-20">
          <FadeIn direction="up" className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-secondary-container/30 text-on-secondary-container font-label-caps text-label-caps rounded-full mb-6">
              {heroBadge}
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
              {heroTitle}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              {heroDescription}
            </p>
          </FadeIn>
        </section>

        {/* Stepper */}
        <section className="max-w-[1120px] mx-auto px-5 md:px-20 mb-20">
          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-6 left-12 right-12 h-[2px] bg-surface-variant z-0"></div>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {stepsList.map((item: any, idx: number) => {
                const stepNum = item.stepNumber || idx + 1
                const isActive = idx === 0

                return (
                  <StaggerItem key={idx}>
                    <div className="bg-surface rounded-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-center flex flex-col items-center relative z-10 hover:-translate-y-1 transition-transform duration-300">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display-lg text-headline-sm mb-4 border-4 border-surface shadow-sm ${isActive ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant'}`}>
                        {stepNum}
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-primary mb-2">{item.title}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant text-sm">{item.desc}</p>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Tuition Fees Table */}
        <section className="max-w-[1120px] mx-auto px-5 md:px-20 mb-20">
          <FadeIn direction="up">
            <h2 className="font-headline-md text-headline-md text-primary mb-6 text-center md:text-left">
              {dict.finance?.tuitionAndFees || (isTh ? "ค่าธรรมเนียมการศึกษา" : "Tuition & Fees")}
            </h2>
            <div className="bg-surface rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden border border-outline-variant/30">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead className="bg-surface-container-low font-label-caps text-label-caps text-on-surface">
                    <tr>
                      <th className="p-4 border-b border-outline-variant/30">
                        {isTh ? "ระดับชั้น / หลักสูตร" : "Program"}
                      </th>
                      <th className="p-4 border-b border-outline-variant/30 text-right">
                        {isTh ? "ค่าเล่าเรียน (฿)" : `Tuition Fee (${dict.finance?.currencySymbol || "฿"})`}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-body-md text-body-md text-on-surface-variant">
                    {programs.length > 0 ? programs.map((program) => (
                      <tr key={program.id} className="hover:bg-surface-container-lowest transition-colors border-b border-outline-variant/10">
                        <td className="p-4">
                          <span className="block font-semibold text-on-surface">
                            {localizeData(program, 'title', activeLocale) || program.title}
                          </span>
                          <span className="text-sm opacity-80">
                            {program.level === 'kindergarten' && (isTh ? "อายุ 2-5 ขวบ" : "Ages 2-5")}
                            {program.level === 'primary' && (isTh ? "ประถมศึกษาปีที่ 1-6" : "Grades 1-6")}
                            {program.level === 'secondary' && (isTh ? "มัธยมศึกษาปีที่ 1-6" : "Grades 7-12")}
                            {program.level === 'english-program' && "EP"}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="font-semibold text-primary">{formatTHB(program.tuitionFee)}</span>
                          <span className="text-sm ml-1">
                            / {program.billingInterval === 'term' ? (dict.finance?.perTerm || (isTh ? "ภาคเรียน" : "term")) : 
                               program.billingInterval === 'year' ? (dict.finance?.perYear || (isTh ? "ปีการศึกษา" : "year")) : 
                               (dict.finance?.perMonth || (isTh ? "เดือน" : "month"))}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr className="hover:bg-surface-container-lowest transition-colors">
                        <td colSpan={2} className="p-8 text-center text-on-surface-variant">
                          {isTh ? "ไม่มีข้อมูลค่าธรรมเนียมการศึกษา" : "No tuition data available."}
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
                  <h2 className="font-headline-md text-headline-md text-primary mb-4">{successTitle}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md mx-auto">
                    {successMessage}
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-surface-container-high text-on-surface hover:bg-surface-container-highest px-6 py-2 rounded-full transition-colors font-label-caps text-label-caps cursor-pointer"
                  >
                    {isTh ? "ส่งแบบฟอร์มอีกครั้ง" : "Submit Another"}
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-headline-md text-headline-md text-primary mb-3 text-center">{formTitle}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-8 text-center max-w-lg mx-auto">
                    {formSubtitle}
                  </p>
                  
                  {serverError && (
                    <div className="mb-6 p-4 bg-error/10 text-error rounded-md text-sm">
                      {serverError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      <div className="flex flex-col gap-2">
                        <label className="font-label-caps text-label-caps text-on-surface">
                          {isTh ? "ชื่อ-นามสกุล ผู้ปกครอง" : "Parent/Guardian Name"}
                        </label>
                        <input 
                          {...register("parentName")}
                          className={`w-full rounded-md border ${errors.parentName ? 'border-error' : 'border-outline/30'} focus:border-secondary focus:ring-1 focus:ring-secondary bg-surface-bright text-on-surface p-3 outline-none transition-colors`} 
                          placeholder={isTh ? "เช่น คุณวิภาดา เจริญสุข" : "Jane Doe"} 
                          type="text"
                        />
                        {errors.parentName && <span className="text-error text-xs">{errors.parentName.message}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="font-label-caps text-label-caps text-on-surface">
                          {isTh ? "ที่อยู่อีเมล" : "Email Address"}
                        </label>
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
                        <label className="font-label-caps text-label-caps text-on-surface">
                          {isTh ? "ชื่อ-นามสกุล บุตรหลาน" : "Child's Name"}
                        </label>
                        <input 
                          {...register("childName")}
                          className={`w-full rounded-md border ${errors.childName ? 'border-error' : 'border-outline/30'} focus:border-secondary focus:ring-1 focus:ring-secondary bg-surface-bright text-on-surface p-3 outline-none transition-colors`} 
                          placeholder={isTh ? "เช่น ด.ช. ภานุวัฒน์" : "John Doe"} 
                          type="text"
                        />
                        {errors.childName && <span className="text-error text-xs">{errors.childName.message}</span>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="font-label-caps text-label-caps text-on-surface">
                          {isTh ? "อายุบุตรหลาน / ระดับชั้นที่ประสงค์เข้าเรียน" : "Child's Age / Expected Grade"}
                        </label>
                        <select 
                          {...register("grade")}
                          className={`w-full rounded-md border ${errors.grade ? 'border-error' : 'border-outline/30'} focus:border-secondary focus:ring-1 focus:ring-secondary bg-surface-bright text-on-surface p-3 outline-none transition-colors cursor-pointer`}
                        >
                          <option value="">{isTh ? "เลือกระดับชั้น..." : "Select Grade..."}</option>
                          {programs.map((program) => (
                            <option key={program.id} value={program.id}>
                              {localizeData(program, 'title', activeLocale) || program.title}
                            </option>
                          ))}
                          {programs.length === 0 && (
                            <>
                              <option value="pre-k">{isTh ? "เตรียมอนุบาล (อายุ 3-4 ปี)" : "Pre-K (3-4 yrs)"}</option>
                              <option value="kindergarten">{isTh ? "อนุบาล (อายุ 5-6 ปี)" : "Kindergarten (5-6 yrs)"}</option>
                              <option value="lower-primary">{isTh ? "ประถมศึกษาตอนต้น (อายุ 7-10 ปี)" : "Lower Primary (7-10 yrs)"}</option>
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
                          {consentLabel}
                        </label>
                      </div>
                      {errors.consent && <span className="text-error text-xs">{errors.consent.message}</span>}
                    </div>

                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-on-primary font-label-caps text-label-caps py-4 rounded-full hover:opacity-90 transition-opacity mt-8 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" 
                      type="submit"
                    >
                      {isSubmitting ? (isTh ? "กำลังส่งข้อมูล..." : "Submitting...") : submitButtonLabel}
                    </button>
                  </form>
                </>
              )}
            </div>
          </FadeIn>
        </section>
      </main>

      {/* Floating CTA */}
      <button 
        onClick={scrollToInquiry}
        className="fixed bottom-6 right-6 md:bottom-12 md:right-12 bg-secondary text-on-secondary shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-full px-6 py-4 flex items-center gap-2 hover:opacity-90 transition-transform hover:-translate-y-1 z-40 cursor-pointer active:scale-95"
      >
        <CalendarBlank size={24} weight="fill" />
        <span className="font-label-caps text-label-caps">{floatingTourLabel}</span>
      </button>
    </div>
  )
}
