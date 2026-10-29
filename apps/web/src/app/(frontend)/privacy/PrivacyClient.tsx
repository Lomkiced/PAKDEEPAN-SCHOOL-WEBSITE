"use client"

import * as React from "react"
import { FadeIn } from "@pakdeepan/ui"
import { cn } from "@pakdeepan/ui/src/utils/cn"

const DEFAULT_SECTIONS = [
  {
    sectionId: "information-collection",
    title: "Information Collection",
    description: "We collect information that is necessary for educational, administrative, and safeguarding purposes. This may include:",
    bullets: [
      { text: "Personal identification details (names, dates of birth, addresses)." },
      { text: "Academic records and progress reports." },
      { text: "Medical and health information required for student welfare." },
      { text: "Communications and correspondence with the school." }
    ]
  },
  {
    sectionId: "use-of-information",
    title: "Use of Information",
    description: "The information we collect is strictly utilized to provide a nurturing and effective educational environment. Specifically, we use personal data to:",
    bullets: [
      { text: "Facilitate admissions and enrollment processes." },
      { text: "Monitor academic progress and tailor educational support." },
      { text: "Ensure the health, safety, and well-being of all students." },
      { text: "Communicate essential school updates, events, and reports to parents and guardians." }
    ]
  },
  {
    sectionId: "data-protection",
    title: "Data Protection",
    description: "We employ robust security measures to protect your data against unauthorized access, alteration, disclosure, or destruction. Our data handling practices are regularly reviewed to ensure compliance with relevant data protection regulations and to maintain the highest standards of confidentiality.",
    bullets: []
  },
  {
    sectionId: "child-privacy",
    title: "Child Privacy",
    description: "Protecting the privacy of children is our utmost priority. We do not knowingly collect personal information from children under the age of 13 without verifiable parental consent. All data concerning students is handled with extreme sensitivity and is only accessible to authorized personnel who require it for educational or safeguarding purposes.",
    bullets: []
  },
  {
    sectionId: "contact-us",
    title: "Contact Us",
    description: "If you have any questions or concerns regarding this Privacy Policy or our data practices, please do not hesitate to contact our administrative office at admissions@pakdeepan.ac.th.",
    bullets: []
  }
]

export default function PrivacyClient({ privacyPageData, dict, locale }: { privacyPageData?: any, dict: any, locale: string }) {
  const title = privacyPageData?.title || dict.privacy?.title || "Privacy Policy"
  const lastUpdated = privacyPageData?.lastUpdated || dict.privacy?.lastUpdated || "October 24, 2024"
  const intro = privacyPageData?.intro || dict.privacy?.intro || "At Pakdeepan Kindergarten School, we are committed to protecting the privacy and security of our students, parents, staff, and broader community. This Privacy Policy outlines how we collect, use, and safeguard personal information in a manner that aligns with our core values of transparency and trust."

  const sections = privacyPageData?.sections && privacyPageData.sections.length > 0 
    ? privacyPageData.sections 
    : DEFAULT_SECTIONS

  const [activeSection, setActiveSection] = React.useState(sections[0]?.sectionId || "information-collection")

  React.useEffect(() => {
    const handleScroll = () => {
      let currentActive = sections[0]?.sectionId || ""
      for (const s of sections) {
        const el = document.getElementById(s.sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            currentActive = s.sectionId
          }
        }
      }
      if (currentActive) {
        setActiveSection(currentActive)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  return (
    <div className="flex flex-col relative min-h-screen">
      <main className="flex-grow pt-[120px] pb-20 w-full max-w-[1120px] mx-auto px-5 md:px-20">
        
        <FadeIn direction="up">
          <header className="mb-16">
            <h1 className="font-display-lg text-[40px] md:text-[56px] text-primary tracking-tight mb-4">
              {title}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Last updated: {lastUpdated}
            </p>
          </header>
        </FadeIn>

        <div className="flex flex-col md:flex-row gap-12 relative">
          
          {/* Sticky Table of Contents */}
          <FadeIn direction="right" delay={0.1} className="hidden md:block w-1/4 shrink-0">
            <div className="sticky top-32">
              <nav className="flex flex-col gap-2">
                <span className="font-label-caps text-[12px] uppercase tracking-wider text-primary mb-4">
                  {dict.privacy?.contents || "Contents"}
                </span>
                {sections.map((section: any) => (
                  <a 
                    key={section.sectionId}
                    href={`#${section.sectionId}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(section.sectionId)?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className={cn(
                      "font-body-md text-body-md pl-4 py-1 border-l-2 transition-all cursor-pointer",
                      activeSection === section.sectionId 
                        ? "text-primary font-bold border-primary" 
                        : "text-on-surface-variant hover:text-primary border-transparent"
                    )}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </FadeIn>

          {/* Main Content */}
          <FadeIn direction="left" delay={0.2} className="w-full md:w-3/4">
            <article className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-outline-variant/30">
              
              <div className="space-y-8">
                <p className="font-body-lg text-[18px] text-on-surface-variant leading-relaxed font-light">
                  {intro}
                </p>

                {sections.map((section: any) => (
                  <section key={section.sectionId} id={section.sectionId} className="scroll-mt-32">
                    <h2 className="font-headline-sm text-[24px] text-primary mb-4">{section.title}</h2>
                    {section.description && (
                      <p className="font-body-lg text-[18px] text-on-surface-variant leading-relaxed font-light mb-4">
                        {section.description}
                      </p>
                    )}
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="space-y-2 pl-4">
                        {section.bullets.map((b: any, bIdx: number) => {
                          const bulletText = typeof b === "string" ? b : b.text
                          return (
                            <li key={bIdx} className="font-body-md text-[16px] text-on-surface-variant leading-relaxed relative before:content-['•'] before:absolute before:-left-4 before:text-secondary before:text-xl flex items-center">
                              {bulletText}
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </section>
                ))}

              </div>
            </article>
          </FadeIn>

        </div>
      </main>
    </div>
  )
}
