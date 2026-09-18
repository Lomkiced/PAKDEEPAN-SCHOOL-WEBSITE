"use client"

import * as React from "react"
import { FadeIn, StaggerContainer, StaggerItem } from "@pakdeepan/ui"
import { Baby, Shapes, Student, Brain, Translate, Atom, Checks } from "@phosphor-icons/react"
import { formatTHB } from "@/utils/currency"

interface ProgramsClientProps {
  programs: any[];
  dict: any;
  locale: string;
}

// Map the level to the appropriate icon
const getProgramIcon = (level: string) => {
  switch (level) {
    case 'kindergarten':
      return <Baby size={40} weight="fill" className="text-primary" />
    case 'primary':
      return <Shapes size={40} weight="fill" className="text-secondary" />
    case 'secondary':
      return <Student size={40} weight="fill" className="text-tertiary" />
    default:
      return <Atom size={40} weight="fill" className="text-primary" />
  }
}

// Map the level to a color class for styling
const getProgramColorClass = (level: string, isText = false, isBg = false) => {
  switch (level) {
    case 'kindergarten':
      if (isBg) return 'bg-primary/10'
      return isText ? 'text-primary' : 'bg-primary-container/50'
    case 'primary':
      if (isBg) return 'bg-secondary/10'
      return isText ? 'text-secondary' : 'bg-secondary-container/50'
    case 'secondary':
      if (isBg) return 'bg-tertiary/10'
      return isText ? 'text-tertiary' : 'bg-tertiary-container/50'
    default:
      if (isBg) return 'bg-primary/10'
      return isText ? 'text-primary' : 'bg-primary-container/50'
  }
}

export default function ProgramsClient({ programs, dict, locale }: ProgramsClientProps) {
  return (
    <div className="flex flex-col relative">
      <main className="flex-grow pt-[120px] pb-20 space-y-20">
        
        {/* Hero Section */}
        <section className="max-w-[1120px] mx-auto px-5 md:px-20 text-center max-w-3xl mx-auto space-y-6">
          <FadeIn direction="up">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
              {dict.programs?.title || "Academic Programs"}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              {dict.programs?.description || "Nurturing curiosity and laying the foundation for a lifelong love of learning through our specialized early childhood curriculum."}
            </p>
          </FadeIn>
        </section>

        {/* Programs by Age Group (Bento Grid from CMS) */}
        <section className="max-w-[1120px] mx-auto px-5 md:px-20 space-y-12">
          <FadeIn direction="up">
            <h2 className="font-headline-md text-headline-md text-primary text-center">{dict.programs?.subtitle || "Programs by Age"}</h2>
          </FadeIn>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {programs.length > 0 ? programs.map((program, idx) => (
              <StaggerItem key={program.id} className={idx % 3 === 2 ? "md:col-span-2" : "h-full"}>
                <div className="bg-surface-container-lowest h-full rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-8 flex flex-col space-y-4 border border-outline-variant/30 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute top-0 right-0 p-4">
                    <span className={`font-label-caps text-label-caps px-3 py-1 rounded-full ${getProgramColorClass(program.level, true, true)}`}>
                      {program.level === 'kindergarten' && "Ages 2-5"}
                      {program.level === 'primary' && "Grades 1-6"}
                      {program.level === 'secondary' && "Grades 7-12"}
                      {program.level === 'english-program' && "EP"}
                    </span>
                  </div>
                  
                  {idx % 3 === 2 ? (
                    // Large card layout (spanning 2 columns)
                    <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                      <div className="w-full md:w-1/3 h-48 md:h-full min-h-[200px] rounded-lg overflow-hidden border border-outline-variant/30 relative">
                        <img 
                          className="object-cover w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-500" 
                          alt={program.title} 
                          src={program.featuredImage?.url || "https://lh3.googleusercontent.com/aida-public/AB6AXuCw60OJntiG4Naep-HcfVYFc8uGy0elhI0wVGUsLDCW93tsT8-dr0r4ux0W9rlC-VGRf-lR2X1XRWVuLlqBgsUQMDI9KUz1QZlFXeXF-Vv00aIpKowIxUo9y8v_kv2chuM3sawMbk3G6TUTgOKQreMOO2G1XUHhd2Hg4WnYe_DEPFw3h_8lLSqse9Tjxhn7FydYVsZ2p-F1t8yLecu6Akbm8Ux0U7Sq7pg0JHXeAslU38eMHWkUCwedLQ"}
                        />
                      </div>
                      <div className="flex-grow flex flex-col space-y-4 justify-center py-2">
                        {getProgramIcon(program.level)}
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">{program.title}</h3>
                        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                          {program.summary}
                        </p>
                        
                        {/* Tuition info */}
                        <div className="mt-4 pt-4 border-t border-outline-variant/30">
                          <p className="text-sm font-label-caps text-on-surface-variant mb-1">
                            {dict.finance?.tuitionFee || "Base Tuition"}:
                          </p>
                          <p className={`font-bold ${getProgramColorClass(program.level, true)}`}>
                            {formatTHB(program.tuitionFee)} / 
                            {program.billingInterval === 'term' ? ` ${dict.finance?.perTerm || "term"}` : 
                             program.billingInterval === 'year' ? ` ${dict.finance?.perYear || "year"}` : 
                             ` ${dict.finance?.perMonth || "month"}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Standard card layout
                    <>
                      {getProgramIcon(program.level)}
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">{program.title}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant flex-grow">
                        {program.summary}
                      </p>
                      
                      {/* Tuition info */}
                      <div className="mt-4 pt-4 border-t border-outline-variant/30">
                        <p className="text-sm font-label-caps text-on-surface-variant mb-1">
                          {dict.finance?.tuitionFee || "Base Tuition"}:
                        </p>
                        <p className={`font-bold ${getProgramColorClass(program.level, true)}`}>
                          {formatTHB(program.tuitionFee)} / 
                          {program.billingInterval === 'term' ? ` ${dict.finance?.perTerm || "term"}` : 
                           program.billingInterval === 'year' ? ` ${dict.finance?.perYear || "year"}` : 
                           ` ${dict.finance?.perMonth || "month"}`}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </StaggerItem>
            )) : (
              // Empty state
              <div className="col-span-1 md:col-span-2 text-center p-12 bg-surface rounded-xl border border-outline-variant/30">
                <p className="text-on-surface-variant mb-2">No programs currently available.</p>
              </div>
            )}
            
          </StaggerContainer>
        </section>

        {/* Curriculum Highlights */}
        <section className="max-w-[1120px] mx-auto px-5 md:px-20">
          <FadeIn direction="up">
            <div className="bg-surface-container-low rounded-xl p-8 md:p-12 space-y-12 border border-outline-variant/20 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <h2 className="font-headline-md text-headline-md text-primary text-center">Curriculum Highlights</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
                    <Brain size={32} weight="light" className="text-primary" />
                  </div>
                  <h3 className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">Montessori-Inspired</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                    Self-directed activity, hands-on learning, and collaborative play designed to foster independent thinking.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
                    <Translate size={32} weight="light" className="text-secondary" />
                  </div>
                  <h3 className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">Bilingual Program</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                    Immersive language acquisition supporting cognitive flexibility and global awareness from day one.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
                    <Atom size={32} weight="light" className="text-primary" />
                  </div>
                  <h3 className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">Early STEM</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                    Introducing foundational science, technology, engineering, and math concepts through playful discovery.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Daily Schedule Visual Timeline */}
        <section className="max-w-[1120px] mx-auto px-5 md:px-20 space-y-12">
          <FadeIn direction="up">
            <h2 className="font-headline-md text-headline-md text-primary text-center">A Typical Day</h2>
          </FadeIn>
          
          <StaggerContainer className="max-w-2xl mx-auto space-y-6">
            
            <StaggerItem>
              <div className="flex items-start gap-6 relative">
                <div className="w-24 flex-shrink-0 text-right font-label-caps text-label-caps text-on-surface-variant pt-1">08:30 AM</div>
                <div className="w-4 h-4 rounded-full bg-primary-container mt-1 flex-shrink-0 z-10 shadow-sm"></div>
                <div className="flex-grow pb-8 border-l-2 border-surface-container-high pl-6 -ml-[25px]">
                  <h4 className="font-headline-sm text-headline-sm text-on-surface text-lg mb-1">Arrival & Morning Greeting</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">Welcoming students and setting a calm tone for the day.</p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-start gap-6 relative">
                <div className="w-24 flex-shrink-0 text-right font-label-caps text-label-caps text-on-surface-variant pt-1">09:00 AM</div>
                <div className="w-4 h-4 rounded-full bg-secondary-container mt-1 flex-shrink-0 z-10 shadow-sm"></div>
                <div className="flex-grow pb-8 border-l-2 border-surface-container-high pl-6 -ml-[25px]">
                  <h4 className="font-headline-sm text-headline-sm text-on-surface text-lg mb-1">Guided Learning Blocks</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">Focused sessions on literacy, numeracy, and thematic studies.</p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-start gap-6 relative">
                <div className="w-24 flex-shrink-0 text-right font-label-caps text-label-caps text-on-surface-variant pt-1">10:30 AM</div>
                <div className="w-4 h-4 rounded-full bg-primary mt-1 flex-shrink-0 z-10 shadow-sm"></div>
                <div className="flex-grow pb-8 border-l-2 border-surface-container-high pl-6 -ml-[25px]">
                  <h4 className="font-headline-sm text-headline-sm text-on-surface text-lg mb-1">Outdoor Exploration</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">Physical activity and nature engagement in our secure gardens.</p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-start gap-6 relative">
                <div className="w-24 flex-shrink-0 text-right font-label-caps text-label-caps text-on-surface-variant pt-1">12:00 PM</div>
                <div className="w-4 h-4 rounded-full bg-secondary mt-1 flex-shrink-0 z-10 shadow-sm"></div>
                <div className="flex-grow pl-6 -ml-[25px]">
                  <h4 className="font-headline-sm text-headline-sm text-on-surface text-lg mb-1">Lunch & Rest</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">Nutritious meals followed by a period of quiet reflection or sleep.</p>
                </div>
              </div>
            </StaggerItem>
            
          </StaggerContainer>
        </section>

      </main>
    </div>
  )
}
