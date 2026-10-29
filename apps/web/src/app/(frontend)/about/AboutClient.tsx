"use client"

import * as React from "react"
import { FadeIn, StaggerContainer, StaggerItem } from "@pakdeepan/ui"
import { useLanguage } from "@/context/LanguageContext"
import { localizeData } from "@/lib/localize"

interface AboutClientProps {
  aboutData: any;
  dict: any;
  locale: string;
}

export default function AboutClient({ aboutData, dict, locale }: AboutClientProps) {
  const { locale: contextLocale } = useLanguage()
  const activeLocale = (contextLocale || locale || "en") as "en" | "th"
  const isTh = activeLocale === "th"

  // --- HERO SECTION ---
  const heroBadge = 
    localizeData(aboutData, 'heroBadge', activeLocale) || 
    dict.about?.heroBadge || 
    (isTh ? "เรื่องราวของเรา" : "Our Story");
  const heroTitle = 
    localizeData(aboutData, 'heroTitle', activeLocale) || 
    dict.about?.heroTitle || 
    (isTh ? "บ่มเพาะความเป็นเลิศในการศึกษาระดับปฐมวัย" : "Nurturing Excellence in Early Education");
  const heroDescription = 
    localizeData(aboutData, 'heroDescription', activeLocale) || 
    dict.about?.heroDescription || 
    (isTh ? "ณ โรงเรียนภักดีพรรณ เราเชื่อมั่นในการสร้างรากฐานแห่งความอยากรู้อยากเห็น ความเห็นอกเห็นใจ และความเป็นเลิศทางวิชาการในบรรยากาศอบอุ่นมาตรฐานสากล" : "At Pakdeepan Kindergarten School, we believe in cultivating a foundation of curiosity, empathy, and academic rigor in a warm, international setting.");
  const heroImage = aboutData?.heroImage?.url || "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop";

  // --- VISION & MISSION ---
  const vision = 
    localizeData(aboutData, 'vision', activeLocale) || 
    dict.about?.vision || 
    (isTh ? "เป็นสถาบันการศึกษาระดับปฐมวัยชั้นนำที่ได้รับการยอมรับในระดับสากล ในการพัฒนาผู้เรียนให้เป็นนักคิดสร้างสรรค์และผู้นำที่เปี่ยมด้วยความเมตตาตั้งแต่ก้าวแรกของการศึกษา" : "To be the premier international early years institution, recognized globally for fostering innovative thinkers and compassionate leaders from their very first steps in education.");
  const mission = 
    localizeData(aboutData, 'mission', activeLocale) || 
    dict.about?.mission || 
    (isTh ? "เราจัดเตรียมหลักสูตรแบบองค์รวมที่เน้นเด็กเป็นศูนย์กลาง ภายใต้สภาพแวดล้อมที่ปลอดภัย สร้างแรงบันดาลใจ และเปิดกว้าง เพื่อให้เด็กทุกคนค้นพบศักยภาพอันโดดเด่นของตนเองผ่านการสืบเสาะและการเรียนรู้ที่เปี่ยมสุข" : "We provide a holistic, child-centered curriculum within a safe, inspiring, and culturally diverse environment, empowering each child to reach their unique potential through inquiry and joyful discovery.");

  // --- SCHOOL DIRECTOR MESSAGE ---
  const principalName = 
    localizeData(aboutData, 'principalName', activeLocale) || 
    (isTh ? "ดร. เอเลน่า รอสโตวา" : "Dr. Elena Rostova");
  const principalTitle = 
    localizeData(aboutData, 'principalTitle', activeLocale) || 
    dict.about?.directorTitle || 
    (isTh ? "ผู้อำนวยการโรงเรียน (ปริญญาเอก ด้านการศึกษาปฐมวัย)" : "School Director (Ph.D. in Early Education)");
  const principalMessage = 
    localizeData(aboutData, 'principalMessage', activeLocale) || 
    dict.about?.principalMessage || 
    (isTh ? "ยินดีต้อนรับสู่ประชาคมที่เด็กทุกคนได้รับการเอาใจใส่ รับฟัง และมองเห็นคุณค่า ทีมครูและบุคลากรของเรามุ่งมั่นมอบจุดเริ่มต้นที่ดีที่สุดสำหรับการเรียนรู้ตลอดชีวิตของบุตรหลานท่าน เราเชื่อมั่นว่าความเป็นเลิศที่แท้จริงเกิดขึ้นเมื่อวิชาการที่เข้มข้นผสานกับความอบอุ่นและเอาใจใส่" : "Welcome to a community where every child is seen, heard, and valued. Our dedicated team of international educators is committed to providing an exceptional start to your child's lifelong learning journey. We believe that true excellence is achieved when rigor meets warmth.");
  const principalPhoto = aboutData?.principalPhoto?.url || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop";

  // --- HISTORY & HERITAGE ---
  const historyBadge = 
    localizeData(aboutData, 'historyBadge', activeLocale) || 
    (isTh ? "ประวัติและความเป็นมา" : "Our Heritage");
  const historyTitle = 
    localizeData(aboutData, 'historyTitle', activeLocale) || 
    (isTh ? "รากฐานแห่งความไว้วางใจและการดูแลเอาใจใส่" : "A Foundation Built on Trust and Care");
  const historyDescription = 
    localizeData(aboutData, 'historyDescription', activeLocale) || 
    (isTh ? "ก่อตั้งขึ้นในจังหวัดจันทบุรีด้วยวิสัยทัศน์ที่มุ่งเน้นการศึกษาปฐมวัยสองภาษาที่ทันสมัยและเปี่ยมสุข โรงเรียนภักดีพรรณได้บ่มเพาะเยาวชนรุ่นแล้วรุ่นเล่าให้เติบโตอย่างมั่นใจและสร้างสรรค์" : "Founded in Chanthaburi with a vision for modern, joyful, and bilingual early years learning, Pakdeepan Kindergarten School has nurtured generations of young learners into confident, creative global citizens.");
  const historyImage = aboutData?.historyImage?.url || "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop";

  const defaultMilestones = [
    {
      year: "2010",
      title: isTh ? "ก่อตั้งโรงเรียนภักดีพรรณ" : "Founding of Pakdeepan",
      description: isTh 
        ? "ริเริ่มก่อตั้งโรงเรียนด้วยชั้นเรียนอนุบาล 2 ห้อง เพื่อสร้างสภาพแวดล้อมที่เปี่ยมด้วยความอบอุ่นและการเรียนรู้สองภาษา"
        : "Established in Chanthaburi with two early-years classrooms, pioneering inquiry-based bilingual early education."
    },
    {
      year: "2016",
      title: isTh ? "ขยายวิทยาเขตและสิ่งอำนวยความสะดวกระดับสากล" : "Campus Expansion & Innovation Wing",
      description: isTh
        ? "เปิดอาคารกิจกรรมสร้างสรรค์ สวนการเรียนรู้ธรรมชาติ และศูนย์พัฒนาการทางภาษา"
        : "Opened modern play-inquiry gardens, dedicated atelier creative studios, and early sensory development spaces."
    },
    {
      year: "2021",
      title: isTh ? "การรับรองมาตรฐานหลักสูตรนานาชาติ" : "International Accreditation & Holistic Pathways",
      description: isTh
        ? "ยกระดับหลักสูตรบูรณาการสองภาษา ผสานมาตรฐานวิชาการสากลและความพร้อมสู่ระดับประถมศึกษา"
        : "Integrated dual-immersion English-Thai frameworks aligned with premier international early years standards."
    },
    {
      year: "2025+",
      title: isTh ? "ก้าวสู่อนาคตแห่งการเรียนรู้ที่ยั่งยืน" : "Next-Gen Early Learning",
      description: isTh
        ? "มุ่งมั่นสร้างพลเมืองโลกที่มีความมั่นใจ มีความคิดสร้างสรรค์ และมีคุณธรรมเป็นเข็มทิศชีวิต"
        : "Empowering confident, compassionate global citizens through experiential STEM, arts, and character education."
    }
  ];

  const milestones = (aboutData?.milestones && aboutData.milestones.length > 0)
    ? aboutData.milestones.map((item: any) => ({
        ...item,
        title: localizeData(item, 'title', activeLocale) || item.title,
        description: localizeData(item, 'description', activeLocale) || item.description,
      }))
    : defaultMilestones;

  // --- FACULTY & TEACHERS ---
  const facultyBadge = 
    localizeData(aboutData, 'facultyBadge', activeLocale) || 
    (isTh ? "คณะครูและบุคลากร" : "Our Educators");
  const facultyTitle = 
    localizeData(aboutData, 'facultyTitle', activeLocale) || 
    (isTh ? "ครูผู้เปี่ยมด้วยหัวใจ ผู้นำทางสู่การเรียนรู้" : "Passionate Educators, Nurturing Leaders");
  const facultyDescription = 
    localizeData(aboutData, 'facultyDescription', activeLocale) || 
    (isTh ? "ทีมครูผู้ทรงคุณวุฒิทั้งชาวไทยและชาวต่างชาติ นำประสบการณ์และความเชี่ยวชาญด้านปฐมวัยมาส่งมอบความรักและการดูแลในทุกๆ วัน" : "Our team of certified international and Thai educators brings decades of specialized early learning experience and warmth to every classroom.");

  const defaultFaculty = [
    {
      name: isTh ? "ครูเอเลน่า รอสโตวา" : "Dr. Elena Rostova",
      role: isTh ? "ผู้อำนวยการโรงเรียน" : "School Director",
      qualification: "Ph.D. Early Childhood Education (UCL)",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
      bio: isTh
        ? "ประสบการณ์กว่า 18 ปีในการบริหารโรงเรียนนานาชาติและการพัฒนาหลักสูตรปฐมวัย"
        : "18+ years leading international early years institutes with deep passion for child-led inquiry."
    },
    {
      name: isTh ? "ครูกานต์ธิดา ศิริโรจน์" : "Kanthida Siriroj",
      role: isTh ? "หัวหน้าฝ่ายวิชาการภาษาไทยและปฐมวัย" : "Head of Thai Language & Culture",
      qualification: "M.Ed. Curriculum & Instruction (Chulalongkorn)",
      photoUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=600&auto=format&fit=crop",
      bio: isTh
        ? "ผู้เชี่ยวชาญด้านวรรณกรรมเด็ก การสื่อสารสองภาษา และการเสริมสร้างทักษะทางสังคมและอารมณ์"
        : "Specialist in bilingual literacy, social-emotional growth, and creative literature for young learners."
    },
    {
      name: isTh ? "มาร์คัส เชน" : "Marcus Chen",
      role: isTh ? "ครูผู้เชี่ยวชาญด้าน STEM และสิ่งแวดล้อมศึกษา" : "Lead Early STEM & Inquiry Specialist",
      qualification: "B.Sc. Cognitive Science, PGCE Early Years",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
      bio: isTh
        ? "ปลูกฝังความรักในธรรมชาติ วิทยาศาสตร์เชิงประจักษ์ และการคิดวิเคราะห์ผ่านการทดลองจริง"
        : "Fostering organic curiosity through hands-on science experiments, mathematics, and botanical discovery."
    },
    {
      name: isTh ? "โซเฟีย มาร์ติเนซ" : "Sofia Martinez",
      role: isTh ? "ครูผู้เชี่ยวชาญศิลปะและดนตรีบำบัดปฐมวัย" : "Arts & Expressive Movement Specialist",
      qualification: "M.A. Creative Arts Therapy, Orff Schulwerk Certified",
      photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
      bio: isTh
        ? "สร้างสรรค์การเรียนรู้ผ่านสุนทรียศาสตร์ ดนตรี และการเคลื่อนไหวเพื่อพัฒนาการของสมองทั้งสองซีก"
        : "Integrating fine motor dexterity, rhythm, and joyful visual expression into daily classroom rhythms."
    }
  ];

  const facultyMembers = (aboutData?.facultyMembers && aboutData.facultyMembers.length > 0)
    ? aboutData.facultyMembers.map((member: any) => ({
        ...member,
        name: localizeData(member, 'name', activeLocale) || member.name,
        role: localizeData(member, 'role', activeLocale) || member.role,
        bio: localizeData(member, 'bio', activeLocale) || member.bio,
      }))
    : defaultFaculty;

  return (
    <div className="flex flex-col bg-white">
      <main className="flex-grow">
        
        {/* --- IMMERSIVE HERO SECTION --- */}
        <section className="relative w-full min-h-[85vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
          
          {/* Edge-to-Edge Cinematic Background */}
          <div className="absolute inset-0 w-full h-full z-0">
            <img 
              className="w-full h-full object-cover object-[center_30%]" 
              alt="School environment" 
              src={heroImage}
            />
            {/* Elegant Gradient Fade to White (bottom) and slight darkening (top) */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/60 to-white z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent z-10" />
          </div>

          <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10 lg:px-20 relative z-20 pt-20">
            <FadeIn direction="up" className="max-w-2xl">
              
              {/* Signature Tagline */}
              <div className="mb-6 transform rotate-[-2deg] inline-block">
                <span className="font-sherlina text-[32px] md:text-5xl text-primary leading-tight drop-shadow-sm">
                  {heroBadge}
                </span>
              </div>
              
              <h1 className="font-display-lg text-[48px] md:text-[64px] lg:text-[76px] leading-[1.05] text-[#1e3a8a] font-extrabold mb-8 tracking-tight drop-shadow-sm">
                {heroTitle}
              </h1>
              
              <p className="font-body-lg text-[18px] md:text-[22px] text-on-surface-variant max-w-xl leading-relaxed">
                {heroDescription}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* --- EDITORIAL MISSION & VISION --- */}
        <section className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 py-24 md:py-32">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-sm">
            
            {/* Vision */}
            <StaggerItem className="p-10 md:p-16 relative group cursor-default hover:bg-slate-50 transition-colors duration-300 active:scale-[0.99]">
              <div className="absolute top-6 left-6 font-display-lg text-[140px] font-extrabold text-primary/5 select-none pointer-events-none group-hover:text-primary/10 transition-colors duration-500 leading-none">
                01
              </div>
              <div className="relative z-10 mt-12">
                <h2 className="font-display-lg text-[32px] md:text-[40px] text-[#1e3a8a] font-extrabold mb-6">
                  {dict.about?.visionTitle || (isTh ? "วิสัยทัศน์ของเรา" : "Our Vision")}
                </h2>
                <div className="w-12 h-1 bg-primary mb-8 rounded-full" />
                <p className="font-body-md text-[17px] md:text-[19px] leading-loose text-on-surface-variant">
                  {vision}
                </p>
              </div>
            </StaggerItem>
            
            {/* Mission */}
            <StaggerItem className="p-10 md:p-16 relative group cursor-default hover:bg-slate-50 transition-colors duration-300 active:scale-[0.99]">
              <div className="absolute top-6 left-6 font-display-lg text-[140px] font-extrabold text-primary/5 select-none pointer-events-none group-hover:text-primary/10 transition-colors duration-500 leading-none">
                02
              </div>
              <div className="relative z-10 mt-12">
                <h2 className="font-display-lg text-[32px] md:text-[40px] text-[#1e3a8a] font-extrabold mb-6">
                  {dict.about?.missionTitle || (isTh ? "พันธกิจของเรา" : "Our Mission")}
                </h2>
                <div className="w-12 h-1 bg-primary mb-8 rounded-full" />
                <p className="font-body-md text-[17px] md:text-[19px] leading-loose text-on-surface-variant">
                  {mission}
                </p>
              </div>
            </StaggerItem>

          </StaggerContainer>
        </section>

        {/* --- MAGAZINE-STYLE LEADERSHIP SPREAD (SCHOOL DIRECTOR) --- */}
        <section className="bg-slate-50 border-t border-slate-100">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 py-24 md:py-32">
            <FadeIn direction="up">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                
                {/* Left: Edge-to-Edge Style Portrait */}
                <div className="lg:col-span-5 relative">
                  <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/60 relative group">
                    <img 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                      alt={principalName} 
                      src={principalPhoto}
                    />
                    <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none z-10" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl z-[-1]" />
                </div>
                
                {/* Right: Editorial Typography Message */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <span className="text-sm font-bold tracking-widest text-primary uppercase mb-4 block">
                    {dict.about?.leadershipBadge || (isTh ? "ฝ่ายบริหารโรงเรียน" : "Leadership")}
                  </span>
                  
                  <h3 className="font-display-lg text-[36px] md:text-[48px] text-[#1e3a8a] font-extrabold leading-tight mb-10">
                    {dict.about?.messageTitle || (isTh ? "สาส์นจากผู้อำนวยการโรงเรียน" : "A Message from the School Director")}
                  </h3>
                  
                  {/* The Quote Block */}
                  <div className="relative pl-6 md:pl-10 border-l-2 border-secondary/40 mb-12">
                    <span className="absolute -top-12 -left-4 font-serif text-[120px] text-slate-200 opacity-50 select-none pointer-events-none leading-none">
                      &ldquo;
                    </span>
                    <p className="font-body-md text-[18px] md:text-[20px] text-on-surface-variant leading-relaxed relative z-10 whitespace-pre-wrap">
                      {principalMessage.replace(/^"|"$/g, '')}
                    </p>
                  </div>
                  
                  {/* Sign-off */}
                  <div className="flex flex-col">
                    <span className="font-display-lg text-[24px] text-[#1e3a8a] font-bold">
                      {principalName}
                    </span>
                    <span className="text-on-surface-variant text-sm mt-1">
                      {principalTitle}
                    </span>
                  </div>
                  
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* --- HISTORY & HERITAGE SECTION --- */}
        <section className="bg-white border-t border-slate-100 py-24 md:py-32">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">
            <FadeIn direction="up">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-16">
                <div className="lg:w-1/2">
                  <div className="mb-4 inline-block">
                    <span className="font-sherlina text-[28px] md:text-[36px] text-primary">
                      {historyBadge}
                    </span>
                  </div>
                  <h2 className="font-display-lg text-[36px] md:text-[48px] text-[#1e3a8a] font-extrabold leading-tight mb-6">
                    {historyTitle}
                  </h2>
                  <p className="font-body-md text-[18px] text-on-surface-variant leading-relaxed">
                    {historyDescription}
                  </p>
                </div>
                
                {historyImage && (
                  <div className="lg:w-1/2 w-full">
                    <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                      <img 
                        src={historyImage} 
                        alt={historyTitle} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Milestones Horizontal / Grid Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
                {milestones.map((item: any, idx: number) => (
                  <div 
                    key={idx} 
                    className="p-8 rounded-2xl bg-slate-50 border border-slate-100/80 hover:bg-white hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
                  >
                    <span className="font-display-lg text-[32px] font-extrabold text-primary group-hover:scale-105 inline-block transition-transform duration-300">
                      {item.year}
                    </span>
                    <h3 className="font-display-lg text-[20px] font-bold text-[#1e3a8a] mt-3 mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body-sm text-[15px] text-on-surface-variant leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* --- FACULTY & EDUCATORS SECTION --- */}
        <section className="bg-slate-50 border-t border-slate-100 py-24 md:py-32">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">
            <FadeIn direction="up">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="mb-3 inline-block">
                  <span className="font-sherlina text-[30px] md:text-[38px] text-primary">
                    {facultyBadge}
                  </span>
                </div>
                <h2 className="font-display-lg text-[36px] md:text-[50px] text-[#1e3a8a] font-extrabold tracking-tight leading-tight mb-6">
                  {facultyTitle}
                </h2>
                <p className="font-body-lg text-[18px] text-on-surface-variant leading-relaxed">
                  {facultyDescription}
                </p>
              </div>

              {/* Faculty Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {facultyMembers.map((member: any, idx: number) => {
                  const photoSrc = member.photo?.url || member.photoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop";
                  return (
                    <div 
                      key={idx}
                      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
                    >
                      <div className="aspect-[4/5] w-full overflow-hidden bg-slate-100 relative">
                        <img 
                          src={photoSrc} 
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                          {member.role}
                        </span>
                        <h3 className="font-display-lg text-[20px] font-bold text-[#1e3a8a] mb-2">
                          {member.name}
                        </h3>
                        {member.qualification && (
                          <span className="text-xs text-on-surface-variant/80 font-medium mb-3">
                            {member.qualification}
                          </span>
                        )}
                        {member.bio && (
                          <p className="text-sm text-on-surface-variant leading-relaxed mt-auto pt-2 border-t border-slate-100">
                            {member.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
    </div>
  )
}
