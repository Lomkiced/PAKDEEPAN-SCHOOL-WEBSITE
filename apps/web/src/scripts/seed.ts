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
        title: "เปิดรับสมัครนักเรียนใหม่ ประจำปีการศึกษา 2568 (Admissions Open)",
        slug: "admissions-open-2025",
        category: "announcements",
        status: "published",
        isFeatured: true,
        excerpt: "โรงเรียนอนุบาลภักดีพรรณเปิดรับสมัครนักเรียนระดับเตรียมอนุบาลและอนุบาล 1-3 ผู้ปกครองสามารถลงทะเบียนออนไลน์ได้แล้ววันนี้",
        publishDate: today.toISOString(),
      } as any,
    })

    await payload.create({
      collection: "news",
      data: {
        title: "สัปดาห์กิจกรรมการทดลองวิทยาศาสตร์แสนสนุก (Junior Science Week)",
        slug: "junior-science-week",
        category: "academics",
        status: "published",
        isFeatured: false,
        excerpt: "เด็กๆ ได้ร่วมทำการทดลองวิทยาศาสตร์เบื้องต้น เรียนรู้เรื่องแรงโน้มถ่วง สีสัน และธรรมชาติรอบตัวผ่านการลงมือทำจริง",
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

  console.log("🎉 Seeding complete! The school website now has real bilingual data and Thai Baht tuition records.")
  process.exit(0)
}

seed().catch((err) => {
  console.error("❌ Seed failed with error:", err)
  process.exit(1)
})
