"use client"

import * as React from "react"
import { FadeIn } from "@pakdeepan/ui"
import { cn } from "@pakdeepan/ui/src/utils/cn"

export default function PrivacyClient({ dict, locale }: { dict: any, locale: string }) {
  const SECTIONS = [
    { id: "information-collection", title: dict.privacy?.informationCollection || "Information Collection" },
    { id: "use-of-information", title: dict.privacy?.useOfInformation || "Use of Information" },
    { id: "data-protection", title: dict.privacy?.dataProtection || "Data Protection" },
    { id: "child-privacy", title: dict.privacy?.childPrivacy || "Child Privacy" },
    { id: "contact-us", title: dict.privacy?.contactUs || "Contact Us" },
  ]

  const [activeSection, setActiveSection] = React.useState(SECTIONS[0].id)

  React.useEffect(() => {
    const handleScroll = () => {
      const sectionElements = SECTIONS.map(s => document.getElementById(s.id))
      
      let currentActive = SECTIONS[0].id
      for (const el of sectionElements) {
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) { // 150px offset for sticky header
            currentActive = el.id
          }
        }
      }
      setActiveSection(currentActive)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex flex-col relative min-h-screen">
      <main className="flex-grow pt-[120px] pb-20 w-full max-w-[1120px] mx-auto px-5 md:px-20">
        
        <FadeIn direction="up">
          <header className="mb-16">
            <h1 className="font-display-lg text-[40px] md:text-[56px] text-primary tracking-tight mb-4">
              {dict.privacy?.title || "Privacy Policy"}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              {dict.privacy?.lastUpdated || "Last updated"}: October 24, 2024
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
                {SECTIONS.map((section) => (
                  <a 
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className={cn(
                      "font-body-md text-body-md pl-4 py-1 border-l-2 transition-all",
                      activeSection === section.id 
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
                  {dict.privacy?.intro || "At Pakdeepan Kindergarten School, we are committed to protecting the privacy and security of our students, parents, staff, and broader community. This Privacy Policy outlines how we collect, use, and safeguard personal information in a manner that aligns with our core values of transparency and trust."}
                </p>

                <section id="information-collection" className="scroll-mt-32">
                  <h2 className="font-headline-sm text-[24px] text-primary mb-4">{SECTIONS[0].title}</h2>
                  <p className="font-body-lg text-[18px] text-on-surface-variant leading-relaxed font-light mb-4">
                    We collect information that is necessary for educational, administrative, and safeguarding purposes. This may include:
                  </p>
                  <ul className="space-y-2 pl-4">
                    {[
                      "Personal identification details (names, dates of birth, addresses).",
                      "Academic records and progress reports.",
                      "Medical and health information required for student welfare.",
                      "Communications and correspondence with the school."
                    ].map((item, i) => (
                      <li key={i} className="font-body-md text-[16px] text-on-surface-variant leading-relaxed relative before:content-['•'] before:absolute before:-left-4 before:text-secondary before:text-xl flex items-center">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="use-of-information" className="scroll-mt-32">
                  <h2 className="font-headline-sm text-[24px] text-primary mb-4">{SECTIONS[1].title}</h2>
                  <p className="font-body-lg text-[18px] text-on-surface-variant leading-relaxed font-light mb-4">
                    The information we collect is strictly utilized to provide a nurturing and effective educational environment. Specifically, we use personal data to:
                  </p>
                  <ul className="space-y-2 pl-4">
                    {[
                      "Facilitate admissions and enrollment processes.",
                      "Monitor academic progress and tailor educational support.",
                      "Ensure the health, safety, and well-being of all students.",
                      "Communicate essential school updates, events, and reports to parents and guardians."
                    ].map((item, i) => (
                      <li key={i} className="font-body-md text-[16px] text-on-surface-variant leading-relaxed relative before:content-['•'] before:absolute before:-left-4 before:text-secondary before:text-xl flex items-center">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="data-protection" className="scroll-mt-32">
                  <h2 className="font-headline-sm text-[24px] text-primary mb-4">{SECTIONS[2].title}</h2>
                  <p className="font-body-lg text-[18px] text-on-surface-variant leading-relaxed font-light">
                    We employ robust security measures to protect your data against unauthorized access, alteration, disclosure, or destruction. Our data handling practices are regularly reviewed to ensure compliance with relevant data protection regulations and to maintain the highest standards of confidentiality.
                  </p>
                </section>

                <section id="child-privacy" className="scroll-mt-32">
                  <h2 className="font-headline-sm text-[24px] text-primary mb-4">{SECTIONS[3].title}</h2>
                  <p className="font-body-lg text-[18px] text-on-surface-variant leading-relaxed font-light">
                    Protecting the privacy of children is our utmost priority. We do not knowingly collect personal information from children under the age of 13 without verifiable parental consent. All data concerning students is handled with extreme sensitivity and is only accessible to authorized personnel who require it for educational or safeguarding purposes.
                  </p>
                </section>

                <section id="contact-us" className="scroll-mt-32">
                  <h2 className="font-headline-sm text-[24px] text-primary mb-4">{SECTIONS[4].title}</h2>
                  <p className="font-body-lg text-[18px] text-on-surface-variant leading-relaxed font-light">
                    If you have any questions or concerns regarding this Privacy Policy or our data practices, please do not hesitate to contact our Data Protection Officer at <a href="mailto:privacy@pakdeepan.edu" className="text-secondary hover:underline">privacy@pakdeepan.edu</a>.
                  </p>
                </section>

              </div>
            </article>
          </FadeIn>

        </div>
      </main>
    </div>
  )
}
