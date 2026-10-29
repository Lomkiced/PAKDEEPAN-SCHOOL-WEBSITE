import fs from "fs"
import path from "path"

// Ensure .env is loaded when running as standalone script
try {
  const envPath = path.resolve(process.cwd(), ".env")
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n")
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
        const [key, ...rest] = trimmed.split("=")
        const val = rest.join("=").replace(/^["']|["']$/g, "")
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = val.trim()
        }
      }
    }
  }
} catch (e) {
  console.warn("Could not auto-load .env:", e)
}

import { getPayload } from "payload"
import configPromise from "../payload.config"

async function seed() {
  console.log("🌱 Starting Pakdeepan CMS database seed...")
  console.log("Database target:", process.env.DATABASE_URL ? "URL is set" : "WARNING: DATABASE_URL is missing!")

  const payload = await getPayload({ config: configPromise })

  // 1. Seed Programs with Thai Baht (THB) Tuition Fees
  console.log("🏫 Seeding Academic Programs with Thai Baht fee structures...")
  
  const existingPrograms = await payload.find({
    collection: "programs",
    limit: 1,
  })

  if (existingPrograms.totalDocs === 0) {
    // Kindergarten Program
    await payload.create({
      collection: "programs",
      data: {
        title: "หลักสูตรอนุบาล (Kindergarten Curriculum)",
        slug: "kindergarten-curriculum",
        level: "kindergarten",
        status: "published",
        summary: "หลักสูตรมาตรฐานที่เน้นการเรียนรู้ผ่านการเล่น (Play-Based Learning) และการพัฒนาทักษะทางอารมณ์และสังคมอย่างสมดุล",
        tuitionFee: 28000,
        billingInterval: "term",
        additionalFees: [
          { feeName: "ค่าธรรมเนียมแรกเข้า (Entrance Fee)", amount: 5000, feeType: "one-time" },
          { feeName: "ค่ากิจกรรมและอุปกรณ์การเรียน (Activities & Materials)", amount: 3500, feeType: "annual" },
          { feeName: "ประกันอุบัติเหตุนักเรียน (Student Accident Insurance)", amount: 800, feeType: "annual" },
        ],
      } as any,
    })

    // English Program (EP)
    await payload.create({
      collection: "programs",
      data: {
        title: "หลักสูตรภาษาอังกฤษ (English Program - EP)",
        slug: "english-program-ep",
        level: "english-program",
        status: "published",
        summary: "หลักสูตรสองภาษาที่สอนโดยครูเจ้าของภาษาที่มีคุณวุฒิ บ่มเพาะทักษะภาษาอังกฤษอย่างเป็นธรรมชาติควบคู่กับภาษาไทย",
        tuitionFee: 45000,
        billingInterval: "term",
        additionalFees: [
          { feeName: "ค่าธรรมเนียมแรกเข้า (EP Entrance Fee)", amount: 8000, feeType: "one-time" },
          { feeName: "ค่าอุปกรณ์เทคโนโลยีและสื่อการสอนสากล (Global Tech & Media)", amount: 6000, feeType: "annual" },
          { feeName: "ประกันอุบัติเหตุนักเรียน (Student Accident Insurance)", amount: 800, feeType: "annual" },
        ],
      } as any,
    })

    // Toddlers / Pre-K Program
    await payload.create({
      collection: "programs",
      data: {
        title: "หลักสูตรเตรียมอนุบาล (Toddler & Pre-K)",
        slug: "toddlers-pre-k",
        level: "kindergarten",
        status: "published",
        summary: "เตรียมความพร้อมสำหรับเด็กวัย 1.5 - 3 ขวบ พัฒนากล้ามเนื้อมัดเล็ก ประสาทสัมผัส และการช่วยเหลือตนเองเบื้องต้น",
        tuitionFee: 22000,
        billingInterval: "term",
        additionalFees: [
          { feeName: "ค่าธรรมเนียมแรกเข้า (Pre-K Entrance Fee)", amount: 3000, feeType: "one-time" },
          { feeName: "ค่าของเล่นเสริมพัฒนาการและโภชนาการ (Sensory & Nutrition)", amount: 2500, feeType: "annual" },
        ],
      } as any,
    })

    console.log("✅ Academic Programs seeded successfully!")
  } else {
    console.log("ℹ️ Programs already exist, skipping...")
  }

  // 2. Seed News & Announcements
  console.log("📰 Checking News and Announcements...")
  const existingNews = await payload.find({
    collection: "news",
    limit: 1,
  })

  if (existingNews.totalDocs === 0) {
    const today = new Date()

    await payload.create({
      collection: "news",
      data: {
        title: "Admissions Open for Academic Year 2025–2026",
        title_th: "เปิดรับสมัครนักเรียนใหม่ ประจำปีการศึกษา 2568–2569",
        slug: "admissions-open-2025",
        category: "announcements",
        category_th: "ประกาศสำคัญ",
        status: "published",
        isFeatured: true,
        excerpt: "Pakdeepan Kindergarten School is now accepting new students for Pre-K and Kindergarten 1–3. Schedule a private campus walkthrough today.",
        excerpt_th: "โรงเรียนอนุบาลภักดีพรรณเปิดรับสมัครนักเรียนระดับเตรียมอนุบาลและอนุบาล 1–3 ผู้ปกครองสามารถลงทะเบียนนัดหมายเยี่ยมชมโรงเรียนได้แล้ววันนี้",
        content: `We are delighted to announce that admissions are officially open for the upcoming academic year 2025–2026 at Pakdeepan Kindergarten School.

Our school provides a safe, nurturing, and intellectually stimulating environment where young children cultivate critical thinking, emotional agility, and a genuine love for lifelong learning. With a blend of child-centered inquiry, Montessori-inspired practical life blocks, and immersive English-Thai bilingual development, our students are empowered to flourish from day one.

During the admissions period, parents are warmly invited to book a personalized campus walkthrough with our School Director and faculty.`,
        content_th: `โรงเรียนอนุบาลภักดีพรรณมีความยินดีเป็นอย่างยิ่งที่จะประกาศเปิดรับสมัครนักเรียนใหม่ สำหรับปีการศึกษา 2568–2569 อย่างเป็นทางการแล้ววันนี้

โรงเรียนของเรามุ่งมั่นในการสร้างสภาพแวดล้อมที่ปลอดภัย อบอุ่น และเต็มเปี่ยมด้วยแรงบันดาลใจในการเรียนรู้ ผ่านการบูรณาการหลักสูตรปฐมวัยที่เน้นผู้เรียนเป็นศูนย์กลาง ผสานแนวคิดมอนเตสซอรี่ และการเรียนรู้สองภาษา (English-Thai Bilingual) อย่างเป็นธรรมชาติ

ในช่วงเวลานี้ ผู้ปกครองสามารถลงทะเบียนนัดหมายเพื่อเข้าเยี่ยมชมโรงเรียนแบบส่วนตัว เพื่อสัมผัสบรรยากาศการเรียนรู้จริงและพบปะกับผู้อำนวยการโรงเรียน`,
        imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop",
        publishDate: today.toISOString(),
      } as any,
    })

    await payload.create({
      collection: "news",
      data: {
        title: "Junior Science & Nature Discovery Week Highlights",
        title_th: "ไฮไลท์สัปดาห์กิจกรรมการทดลองวิทยาศาสตร์และธรรมชาติศึกษา",
        slug: "junior-science-week",
        category: "academics",
        category_th: "วิชาการ",
        status: "published",
        isFeatured: false,
        excerpt: "Our young explorers engaged in hands-on physics, seed germination workshops, and botanical garden exploration during our annual Junior Science Discovery Week.",
        excerpt_th: "เด็กๆ ได้ร่วมทำการทดลองวิทยาศาสตร์เบื้องต้น ปลูกเมล็ดพันธุ์พืช และสังเกตปรากฏการณ์ธรรมชาติผ่านการลงมือปฏิบัติจริง",
        content: `Curiosity is the engine of early childhood education. This week, Pakdeepan transformed into an interactive discovery center during our annual Junior Science & Nature Discovery Week.

Students from Pre-K through K3 participated in guided experiments designed to introduce fundamental concepts of light, density, magnetism, and seed life cycles. In the school garden, each student planted their own organic herb pot to track germination over the upcoming weeks.`,
        content_th: `ความอยากรู้อยากเห็นคือหัวใจสำคัญของการเรียนรู้ในวัยเด็ก สัปดาห์นี้ โรงเรียนภักดีพรรณได้เปลี่ยนพื้นที่โรงเรียนให้กลายเป็นห้องทดลองวิทยาศาสตร์ธรรมชาติแสนสนุก

นักเรียนตั้งแต่ระดับเตรียมอนุบาลถึงอนุบาล 3 ได้มีโอกาสลงมือทำการทดลองด้วยตนเอง เช่น การทดลองความหนาแน่นของของเหลว แรงแม่เหล็ก การจำแนกแสงสี และวงจรการเจริญเติบโตของเมล็ดพันธุ์พืช`,
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
        publishDate: today.toISOString(),
      } as any,
    })

    console.log("✅ News seeded successfully!")
  } else {
    console.log("ℹ️ News articles already exist, skipping...")
  }

  // 3. Seed Upcoming Event
  console.log("📅 Checking Upcoming Events...")
  const existingEvents = await payload.find({
    collection: "events",
    limit: 1,
  })

  if (existingEvents.totalDocs === 0) {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 14)

    await payload.create({
      collection: "events",
      data: {
        title: "วันเปิดบ้านภักดีพรรณ (Pakdeepan Open House 2025)",
        slug: "pakdeepan-open-house-2025",
        eventDate: futureDate.toISOString(),
        location: "หอประชุมใหญ่และพื้นที่กิจกรรม อาคารภักดีพรรณ",
        description: "ขอเชิญผู้ปกครองและน้องๆ ร่วมเยี่ยมชมห้องเรียน นวัตกรรมการสอน และพูดคุยกับคณะครูอย่างใกล้ชิด",
        status: "published",
      } as any,
    })

    console.log("✅ Events seeded successfully!")
  } else {
    console.log("ℹ️ Events already exist, skipping...")
  }

  // 4. Seed Site Settings Global
  console.log("⚙️ Seeding SiteSettings Global...")
  try {
    await payload.updateGlobal({
      slug: "site-settings",
      data: {
        schoolName: "Pakdeepan Kindergarten School",
        tagline: "Excellence in Early Education",
        navigation: {
          ctaLabel: "Enroll Now",
          ctaMobileLabel: "Enroll",
          ctaLink: "/admissions",
        },
        footer: {
          tagline: "Small steps today,\nbig dreams tomorrow.",
          philosophy: "Cultivating a foundation of curiosity, empathy, and academic rigor in a warm, international setting.",
          location: "Chanthaburi, Thailand",
          copyrightName: "Pakdeepan Kindergarten School",
        },
        contact: {
          phone: "+66 39 123 4567",
          email: "admissions@pakdeepan.ac.th",
          address: "Chanthaburi, Thailand",
          mapsUrl: "https://maps.google.com",
        },
        social: {
          facebook: "https://facebook.com/pakdeepanschool",
          instagram: "https://instagram.com/pakdeepanschool",
        },
        officeHours: {
          days: "Monday – Friday",
          hours: "8:00 AM – 4:00 PM (Local Time)",
        },
      } as any,
    })
    console.log("✅ SiteSettings Global seeded successfully!")
  } catch (e) {
    console.warn("Could not seed SiteSettings:", e)
  }

  // 5. Seed Home Page Global
  console.log("🏠 Seeding HomePage Global...")
  try {
    await payload.updateGlobal({
      slug: "home-page",
      data: {
        heroTagline: "Learn · Grow · Build Your Future",
        heroTitlePrefix: "Welcome to",
        heroTitleHighlight: "Pakdeepan",
        heroTitleSuffix: "School",
        heroBody: "Every great journey begins by opening a book. We cultivate joyful curiosity, strong bilingual foundations, and creative inquiry in every young child.",
        heroPrimaryCTALabel: "Discover Our School",
        heroPrimaryCTALink: "/about",
        heroSecondaryCTALabel: "Admissions",
        heroSecondaryCTALink: "/admissions",
        marqueeItems: [
          { text: "Bilingual Excellence" },
          { text: "Global Mindset" },
          { text: "Nurturing Empathy" },
          { text: "Creative Inquiry" },
          { text: "Joyful Curiosity" },
        ],
        philosophyScriptTagline: "Small steps today, big dreams tomorrow",
        philosophyHeading: "More than a school.",
        philosophySubheading: "A foundation for life.",
        philosophyBody: "We believe that education is not just about academics, but about character, creativity, and cultivating joyful curiosity in an international setting.",
        philosophyLinkLabel: "Read our story",
        philosophyLinkHref: "/about",
        pathwaysBadge: "Educational Pathways",
        pathwaysTitlePrefix: "Explore",
        pathwaysTitleHighlight: "Pakdeepan",
        pathwaysCTALabel: "Book a Campus Tour",
        pathwaysCTALink: "/contact",
        pathways: [
          {
            title: "Academic Programs",
            desc: "Early years, kindergarten, and primary bilingual curricula.",
            href: "/programs",
          },
          {
            title: "Admissions & Enrollment",
            desc: "Transparent tuition fees, requirements, and guided enrollment.",
            href: "/admissions",
          },
          {
            title: "Campus Life & Calendar",
            desc: "Milestones, student events, celebrations, and photo albums.",
            href: "/campus-life",
          },
        ],
        newsBadge: "Latest News & Events",
        newsTitlePrefix: "Stay",
        newsTitleHighlight: "Informed",
        newsSubtitle: "Get the latest updates, announcements, and upcoming events at Pakdeepan School.",
        newsViewAllLabel: "View All News & Events",
        ctaHeading: "See Our School in Action",
        ctaBody: "Take a glimpse of our vibrant community, classrooms, and school life.",
        ctaButtonLabel: "View Gallery",
        ctaButtonLink: "/campus-life",
        ctaScriptText: "Together We Grow",
      } as any,
    })
    console.log("✅ HomePage Global seeded successfully!")
  } catch (e) {
    console.warn("Could not seed HomePage:", e)
  }

  // 6. Seed Programs Page Global
  console.log("🎓 Seeding ProgramsPage Global...")
  try {
    await payload.updateGlobal({
      slug: "programs-page",
      data: {
        heroTitle: "Academic Programs",
        heroDescription: "Nurturing curiosity and laying the foundation for a lifelong love of learning through our specialized early childhood curriculum.",
        curriculumTitle: "Curriculum Highlights",
        highlights: [
          {
            iconName: "Brain",
            title: "Montessori-Inspired",
            description: "Self-directed activity, hands-on learning, and collaborative play designed to foster independent thinking.",
          },
          {
            iconName: "Translate",
            title: "Bilingual Program",
            description: "Immersive language acquisition supporting cognitive flexibility and global awareness from day one.",
          },
          {
            iconName: "Atom",
            title: "Early STEM",
            description: "Introducing foundational science, technology, engineering, and math concepts through playful discovery.",
          },
        ],
        scheduleTitle: "A Typical Day",
        scheduleItems: [
          {
            time: "08:30 AM",
            title: "Arrival & Morning Greeting",
            description: "Welcoming students and setting a calm tone for the day.",
          },
          {
            time: "09:00 AM",
            title: "Guided Learning Blocks",
            description: "Focused sessions on literacy, numeracy, and thematic studies.",
          },
          {
            time: "10:30 AM",
            title: "Outdoor Exploration",
            description: "Physical activity and nature engagement in our secure gardens.",
          },
          {
            time: "12:00 PM",
            title: "Lunch & Rest",
            description: "Nutritious meals followed by a period of quiet reflection or sleep.",
          },
        ],
      } as any,
    })
    console.log("✅ ProgramsPage Global seeded successfully!")
  } catch (e) {
    console.warn("Could not seed ProgramsPage:", e)
  }

  // 7. Seed Admissions Page Global
  console.log("📝 Seeding AdmissionsPage Global...")
  try {
    await payload.updateGlobal({
      slug: "admissions-page",
      data: {
        heroBadge: "Join Our Community",
        heroTitle: "Admissions & Enrollment",
        heroDescription: "Join a community dedicated to excellence, inquiry, and holistic growth. Begin your journey with Pakdeepan Kindergarten School today.",
        steps: [
          { stepNumber: 1, title: "Inquiry", desc: "Submit your initial details to connect with our admissions team." },
          { stepNumber: 2, title: "School Tour", desc: "Experience our campus and meet our dedicated educators." },
          { stepNumber: 3, title: "Assessment", desc: "A gentle evaluation to ensure we meet your child's needs." },
          { stepNumber: 4, title: "Enrollment", desc: "Finalize documentation and prepare for the academic year." },
        ],
        formTitle: "Inquiry Form",
        formSubtitle: "Please provide your details below, and our admissions team will contact you shortly to guide you through the next steps.",
        consentLabel: "I consent to Pakdeepan Kindergarten School collecting and processing my data for admissions purposes in accordance with the Privacy Policy.",
        submitButtonLabel: "Submit Inquiry",
        successTitle: "Inquiry Received",
        successMessage: "Thank you for your interest in Pakdeepan Kindergarten School. Our admissions team will review your details and contact you shortly.",
        floatingTourLabel: "Schedule a Tour",
      } as any,
    })
    console.log("✅ AdmissionsPage Global seeded successfully!")
  } catch (e) {
    console.warn("Could not seed AdmissionsPage:", e)
  }

  // 8. Seed Privacy Page Global
  console.log("🔒 Seeding PrivacyPage Global...")
  try {
    await payload.updateGlobal({
      slug: "privacy-page",
      data: {
        title: "Privacy Policy",
        lastUpdated: "October 24, 2024",
        intro: "At Pakdeepan Kindergarten School, we are committed to protecting the privacy and security of our students, parents, staff, and broader community. This Privacy Policy outlines how we collect, use, and safeguard personal information in a manner that aligns with our core values of transparency and trust.",
        sections: [
          {
            sectionId: "information-collection",
            title: "Information Collection",
            description: "We collect information that is necessary for educational, administrative, and safeguarding purposes. This may include:",
            bullets: [
              { text: "Personal identification details (names, dates of birth, addresses)." },
              { text: "Academic records and progress reports." },
              { text: "Medical and health information required for student welfare." },
              { text: "Communications and correspondence with the school." },
            ],
          },
          {
            sectionId: "use-of-information",
            title: "Use of Information",
            description: "The information we collect is strictly utilized to provide a nurturing and effective educational environment. Specifically, we use personal data to:",
            bullets: [
              { text: "Facilitate admissions and enrollment processes." },
              { text: "Monitor academic progress and tailor educational support." },
              { text: "Ensure the health, safety, and well-being of all students." },
              { text: "Communicate essential school updates, events, and reports to parents and guardians." },
            ],
          },
          {
            sectionId: "data-protection",
            title: "Data Protection",
            description: "We employ robust security measures to protect your data against unauthorized access, alteration, disclosure, or destruction. Our data handling practices are regularly reviewed to ensure compliance with relevant data protection regulations and to maintain the highest standards of confidentiality.",
            bullets: [],
          },
          {
            sectionId: "child-privacy",
            title: "Child Privacy",
            description: "Protecting the privacy of children is our utmost priority. We do not knowingly collect personal information from children under the age of 13 without verifiable parental consent. All data concerning students is handled with extreme sensitivity and is only accessible to authorized personnel who require it for educational or safeguarding purposes.",
            bullets: [],
          },
          {
            sectionId: "contact-us",
            title: "Contact Us",
            description: "If you have any questions or concerns regarding this Privacy Policy or our data practices, please do not hesitate to contact our administrative office at admissions@pakdeepan.ac.th.",
            bullets: [],
          },
        ],
      } as any,
    })
    console.log("✅ PrivacyPage Global seeded successfully!")
  } catch (e) {
    console.warn("Could not seed PrivacyPage:", e)
  }

  // 9. Seed Campus Life Page Global
  console.log("🏫 Seeding CampusLifePage Global...")
  try {
    await payload.updateGlobal({
      slug: "campus-life-page",
      data: {
        title: "Campus Life & News",
        subtitle: "Stay updated with the latest happenings, academic achievements, and community events at Pakdeepan Kindergarten School.",
        galleryTitle: "Gallery",
        gallerySubtitle: "Explore the vibrant daily experiences, modern learning environments, and joyous moments that define our campus.",
        eventModalDefaultText: "Join us for this wonderful event at Pakdeepan Kindergarten School.",
        rsvpButtonLabel: "RSVP Now",
      } as any,
    })
    console.log("✅ CampusLifePage Global seeded successfully!")
  } catch (e) {
    console.warn("Could not seed CampusLifePage:", e)
  }

  console.log("🎉 Seeding complete! All pages and CMS globals are now fully populated and configurable.")
  process.exit(0)
}

seed().catch((err) => {
  console.error("❌ Seed failed with error:", err)
  process.exit(1)
})
