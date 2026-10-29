import { localizeData } from "./localize"

export interface NormalizedNewsItem {
  id: string
  slug: string
  title: string
  titleEn: string
  titleTh: string
  excerpt: string
  excerptEn: string
  excerptTh: string
  content: string
  contentEn: string
  contentTh: string
  category: string
  categoryTh: string
  imageUrl: string
  publishDate: string
  formattedDate: string
  readTime: string
  isFeatured?: boolean
}

export const DEFAULT_NEWS_ITEMS: NormalizedNewsItem[] = [
  {
    id: "admissions-open-2025",
    slug: "admissions-open-2025",
    title: "Admissions Open for Academic Year 2025–2026",
    titleEn: "Admissions Open for Academic Year 2025–2026",
    titleTh: "เปิดรับสมัครนักเรียนใหม่ ประจำปีการศึกษา 2568–2569",
    excerpt:
      "Pakdeepan Kindergarten School is now accepting new students for Pre-K and Kindergarten 1–3. Schedule a private campus walkthrough with our admissions team today.",
    excerptEn:
      "Pakdeepan Kindergarten School is now accepting new students for Pre-K and Kindergarten 1–3. Schedule a private campus walkthrough with our admissions team today.",
    excerptTh:
      "โรงเรียนอนุบาลภักดีพรรณเปิดรับสมัครนักเรียนระดับเตรียมอนุบาลและอนุบาล 1–3 พร้อมเปิดให้ผู้ปกครองลงทะเบียนนัดหมายเยี่ยมชมโรงเรียนแบบส่วนตัวได้แล้ววันนี้",
    content: `We are delighted to announce that admissions are officially open for the upcoming academic year 2025–2026 at Pakdeepan Kindergarten School.

Our school provides a safe, nurturing, and intellectually stimulating environment where young children cultivate critical thinking, emotional agility, and a genuine love for lifelong learning. With a blend of child-centered inquiry, Montessori-inspired practical life blocks, and immersive English-Thai bilingual development, our students are empowered to flourish from day one.

Classes Available:
• Pre-Kindergarten (Ages 2–3)
• Kindergarten 1 (Ages 3–4)
• Kindergarten 2 (Ages 4–5)
• Kindergarten 3 (Ages 5–6)

During the admissions period, parents are warmly invited to book a personalized campus walkthrough with our School Director and faculty. You will experience our modern science discovery corners, lush eco-gardens, certified organic dining, and play-based learning studios in action.

To schedule your private family tour or submit an early inquiry form, visit our Admissions page or contact our Admissions Office at (+66) 39-311-234.`,
    contentEn: `We are delighted to announce that admissions are officially open for the upcoming academic year 2025–2026 at Pakdeepan Kindergarten School.

Our school provides a safe, nurturing, and intellectually stimulating environment where young children cultivate critical thinking, emotional agility, and a genuine love for lifelong learning. With a blend of child-centered inquiry, Montessori-inspired practical life blocks, and immersive English-Thai bilingual development, our students are empowered to flourish from day one.

Classes Available:
• Pre-Kindergarten (Ages 2–3)
• Kindergarten 1 (Ages 3–4)
• Kindergarten 2 (Ages 4–5)
• Kindergarten 3 (Ages 5–6)

During the admissions period, parents are warmly invited to book a personalized campus walkthrough with our School Director and faculty. You will experience our modern science discovery corners, lush eco-gardens, certified organic dining, and play-based learning studios in action.

To schedule your private family tour or submit an early inquiry form, visit our Admissions page or contact our Admissions Office at (+66) 39-311-234.`,
    contentTh: `โรงเรียนอนุบาลภักดีพรรณมีความยินดีเป็นอย่างยิ่งที่จะประกาศเปิดรับสมัครนักเรียนใหม่ สำหรับปีการศึกษา 2568–2569 อย่างเป็นทางการแล้ววันนี้

โรงเรียนของเรามุ่งมั่นในการสร้างสภาพแวดล้อมที่ปลอดภัย อบอุ่น และเต็มเปี่ยมด้วยแรงบันดาลใจในการเรียนรู้ ผ่านการบูรณาการหลักสูตรปฐมวัยที่เน้นผู้เรียนเป็นศูนย์กลาง ผสานแนวคิดมอนเตสซอรี่ และการเรียนรู้สองภาษา (English-Thai Bilingual) อย่างเป็นธรรมชาติ เพื่อให้เด็กๆ เติบโตอย่างรอบด้านทั้งทางสติปัญญา อารมณ์ และสังคม

ระดับชั้นที่เปิดรับสมัคร:
• เตรียมอนุบาล (อายุ 2–3 ขวบ)
• อนุบาล 1 (อายุ 3–4 ขวบ)
• อนุบาล 2 (อายุ 4–5 ขวบ)
• อนุบาล 3 (อายุ 5–6 ขวบ)

ในช่วงเวลานี้ ผู้ปกครองสามารถลงทะเบียนนัดหมายเพื่อเข้าเยี่ยมชมโรงเรียนแบบส่วนตัว (Private Campus Tour) เพื่อสัมผัสบรรยากาศการเรียนรู้จริง สวนธรรมชาติศึกษา ห้องกิจกรรมเสริมสร้างกล้ามเนื้อ และห้องปฏิบัติการวิทยาศาสตร์ปฐมวัย

สอบถามรายละเอียดเพิ่มเติมหรือนัดหมายเยี่ยมชมได้ที่สำนักงานฝ่ายรับสมัคร โทร. 039-311-234 หรือผ่านระบบรับสมัครออนไลน์บนเว็บไซต์`,
    category: "Announcements",
    categoryTh: "ประกาศสำคัญ",
    imageUrl:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop",
    publishDate: "2026-10-15T08:00:00.000Z",
    formattedDate: "Oct 15, 2026",
    readTime: "3 min read",
    isFeatured: true,
  },
  {
    id: "junior-science-week",
    slug: "junior-science-week",
    title: "Junior Science & Nature Discovery Week Highlights",
    titleEn: "Junior Science & Nature Discovery Week Highlights",
    titleTh: "ไฮไลท์สัปดาห์กิจกรรมการทดลองวิทยาศาสตร์และธรรมชาติศึกษา",
    excerpt:
      "Our young explorers engaged in hands-on physics, seed germination workshops, and botanical garden exploration during our annual Junior Science Discovery Week.",
    excerptEn:
      "Our young explorers engaged in hands-on physics, seed germination workshops, and botanical garden exploration during our annual Junior Science Discovery Week.",
    excerptTh:
      "เด็กๆ ได้ร่วมทำการทดลองวิทยาศาสตร์เบื้องต้น ปลูกเมล็ดพันธุ์พืช และสังเกตปรากฏการณ์ธรรมชาติผ่านการลงมือปฏิบัติจริงในสัปดาห์วิทยาศาสตร์ปฐมวัย",
    content: `Curiosity is the engine of early childhood education. This week, Pakdeepan transformed into an interactive discovery center during our annual Junior Science & Nature Discovery Week.

Students from Pre-K through K3 participated in guided experiments designed to introduce fundamental concepts of light, density, magnetism, and seed life cycles. In the school garden, each student planted their own organic herb pot to track germination over the upcoming weeks.

"When children are allowed to touch, ask questions, and test their own hypotheses, science stops being an abstract subject and becomes an exhilarating everyday adventure," explained our Early Years Science Coordinator.

Key Event Highlights:
• Rainbow density towers exploring liquids and floatation
• Magnet sorting games enhancing fine motor dexterity
• Botanical leaf classification in the school sensory garden
• A student mini-exhibition for visiting parents

We commend our energetic students for their passionate inquiries and our faculty for orchestrating such a joyful, discovery-filled learning experience.`,
    contentEn: `Curiosity is the engine of early childhood education. This week, Pakdeepan transformed into an interactive discovery center during our annual Junior Science & Nature Discovery Week.

Students from Pre-K through K3 participated in guided experiments designed to introduce fundamental concepts of light, density, magnetism, and seed life cycles. In the school garden, each student planted their own organic herb pot to track germination over the upcoming weeks.

"When children are allowed to touch, ask questions, and test their own hypotheses, science stops being an abstract subject and becomes an exhilarating everyday adventure," explained our Early Years Science Coordinator.

Key Event Highlights:
• Rainbow density towers exploring liquids and floatation
• Magnet sorting games enhancing fine motor dexterity
• Botanical leaf classification in the school sensory garden
• A student mini-exhibition for visiting parents

We commend our energetic students for their passionate inquiries and our faculty for orchestrating such a joyful, discovery-filled learning experience.`,
    contentTh: `ความอยากรู้อยากเห็นคือหัวใจสำคัญของการเรียนรู้ในวัยเด็ก สัปดาห์นี้ โรงเรียนภักดีพรรณได้เปลี่ยนพื้นที่โรงเรียนให้กลายเป็นห้องทดลองวิทยาศาสตร์ธรรมชาติแสนสนุกในกิจกรรม "Junior Science & Nature Discovery Week"

นักเรียนตั้งแต่ระดับเตรียมอนุบาลถึงอนุบาล 3 ได้มีโอกาสลงมือทำการทดลองด้วยตนเอง เช่น การทดลองความหนาแน่นของของเหลว แรงแม่เหล็ก การจำแนกแสงสี และวงจรการเจริญเติบโตของเมล็ดพันธุ์พืช โดยเด็กๆ ทุกคนได้ลงมือปลูกต้นไม้ในกระถางส่วนตัวเพื่อติดตามผลอย่างต่อเนื่อง

"เมื่อเด็กๆ ได้สัมผัส ได้ตั้งคำถาม และได้สังเกตผลการทดลองด้วยตาตนเอง วิทยาศาสตร์จะไม่ใช่เรื่องไกลตัว แต่จะกลายเป็นการผจญภัยที่น่าตื่นเต้นในทุกๆ วัน" ผู้ประสานงานด้านการเรียนรู้วิทยาศาสตร์กล่าว

ไฮไลท์สำคัญของกิจกรรม:
• การทดลองหอคอยของเหลวหลากสีสัน
• เกมแยกประเภทวัสดุด้วยแรงแม่เหล็ก
• การสำรวจความหลากหลายของใบไม้ในสวนพฤกษศาสตร์โรงเรียน
• มินินิทรรศการแสดงผลงานให้ผู้ปกครองเข้าชม

โรงเรียนขอชื่นชมนักเรียนทุกคนที่เต็มไปด้วยความกระตือรือร้น และขอขอบคุณคุณครูทุกท่านที่ร่วมสร้างประสบการณ์การเรียนรู้ที่เปี่ยมสุขนี้`,
    category: "Academics",
    categoryTh: "วิชาการ",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    publishDate: "2026-10-20T08:00:00.000Z",
    formattedDate: "Oct 20, 2026",
    readTime: "4 min read",
    isFeatured: false,
  },
  {
    id: "sports-day-celebration",
    slug: "sports-day-celebration",
    title: "Annual Sports Day Promotes Teamwork and Joyful Movement",
    titleEn: "Annual Sports Day Promotes Teamwork and Joyful Movement",
    titleTh: "วันกีฬาสีและสุขภาพประจำปี เสริมสร้างน้ำใจนักกีฬาและความสามัคคี",
    excerpt:
      "Laughter, friendly cheering, and energetic movement filled our covered athletic courts as students, teachers, and parents bonded during our 2026 Sports Day.",
    excerptEn:
      "Laughter, friendly cheering, and energetic movement filled our covered athletic courts as students, teachers, and parents bonded during our 2026 Sports Day.",
    excerptTh:
      "เสียงเชียร์และรอยยิ้มอบอวลทั่วสนามกีฬาในร่มของโรงเรียน นักเรียนและผู้ปกครองร่วมทำกิจกรรมกีฬาสีส่งเสริมสุขภาพและมิตรภาพร่วมกัน",
    content: `Physical wellness and cooperative play form an essential pillar of our kindergarten philosophy. Last Friday, students, teachers, and families gathered for our highly anticipated Annual Sports Day Celebration.

The day opened with a vibrant student parade featuring handmade banners and music. Throughout the morning, children took part in obstacle courses, relay races, sack races, and balance games engineered to foster gross motor coordination, teamwork, and resilience.

In the afternoon, parents joined the faculty for a light-hearted tug-of-war and cooperative team games, concluding with a healthy organic fruit buffet and commemorative medals for every young athlete.

"Sports Day at Pakdeepan is never about winning alone; it is about learning how to cheer for one's peers, try one's best with a smile, and celebrate healthy physical movement together," remarked our School Director.

We extend our heartfelt appreciation to all parents who attended and cheered our students on with boundless warmth!`,
    contentEn: `Physical wellness and cooperative play form an essential pillar of our kindergarten philosophy. Last Friday, students, teachers, and families gathered for our highly anticipated Annual Sports Day Celebration.

The day opened with a vibrant student parade featuring handmade banners and music. Throughout the morning, children took part in obstacle courses, relay races, sack races, and balance games engineered to foster gross motor coordination, teamwork, and resilience.

In the afternoon, parents joined the faculty for a light-hearted tug-of-war and cooperative team games, concluding with a healthy organic fruit buffet and commemorative medals for every young athlete.

"Sports Day at Pakdeepan is never about winning alone; it is about learning how to cheer for one's peers, try one's best with a smile, and celebrate healthy physical movement together," remarked our School Director.

We extend our heartfelt appreciation to all parents who attended and cheered our students on with boundless warmth!`,
    contentTh: `สุขภาพกายและพัฒนาการทางกล้ามเนื้อคือรากฐานสำคัญของการเติบโตในวัยปฐมวัย เมื่อวันศุกร์ที่ผ่านมา นักเรียน คุณครู และผู้ปกครองได้ร่วมกันจัดกิจกรรม "วันกีฬาสีและสุขภาพประจำปี 2569"

บรรยากาศเริ่มต้นด้วยขบวนพาเหรดแฟนซีของเด็กๆ ตามด้วยกิจกรรมการแข่งขันวิ่งผลัด วิ่งวิบากส่งเสริมทักษะการทรงตัว และเกมส่งต่อลูกบอลที่เน้นความร่วมมือและการทำงานเป็นทีม

ในช่วงบ่าย ผู้ปกครองได้ร่วมลงแข่งขันเกมกระชับมิตรกับคณะครูอย่างสนุกสนาน ปิดท้ายด้วยการรับประทานผลไม้ออร์แกนิกเพื่อสุขภาพ และการมอบเหรียญรางวัลเป็นที่ระลึกแก่นักกีฬาตัวน้อยทุกคน

"กีฬาสีที่ภักดีพรรณไม่ได้มุ่งเน้นที่ผลแพ้ชนะ แต่คือการเรียนรู้ที่จะส่งเสียงเชียร์เพื่อนๆ การมีน้ำใจนักกีฬา และการได้ออกกำลังกายอย่างมีความสุขร่วมกัน" ผู้อำนวยการโรงเรียนกล่าวในพิธีปิด

โรงเรียนขอขอบพระคุณท่านผู้ปกครองทุกท่านที่มาร่วมสร้างรอยยิ้มและความทรงจำอันแสนอบอุ่นในครั้งนี้`,
    category: "Campus Life",
    categoryTh: "ชีวิตในรั้วโรงเรียน",
    imageUrl:
      "https://images.unsplash.com/photo-1546410531-ea4cea477149?q=80&w=1200&auto=format&fit=crop",
    publishDate: "2026-10-24T08:00:00.000Z",
    formattedDate: "Oct 24, 2026",
    readTime: "3 min read",
    isFeatured: false,
  },
  {
    id: "creative-arts-festival",
    slug: "creative-arts-festival",
    title: "Young Creators Showcase: Early Years Art & Music Festival",
    titleEn: "Young Creators Showcase: Early Years Art & Music Festival",
    titleTh: "เทศกาลศิลปะและดนตรีสร้างสรรค์ แสดงผลงานและจินตนาการของนักเรียน",
    excerpt:
      "From clay sculpting and watercolor canvases to rhythmic percussion performances, our students celebrated their imaginative voices at the 2026 Arts Festival.",
    excerptEn:
      "From clay sculpting and watercolor canvases to rhythmic percussion performances, our students celebrated their imaginative voices at the 2026 Arts Festival.",
    excerptTh:
      "จัดแสดงผลงานภาพวาดสีน้ำ งานปั้นดินเหนียว และการแสดงดนตรีเคาะจังหวะ สะท้อนจินตนาการและความคิดสร้างสรรค์ของเด็กๆ อย่างอิสระ",
    content: `Art is the visual language of the young child. Last weekend, our campus galleries and courtyards opened for the 2026 Young Creators Art & Music Festival.

Every classroom was converted into a vibrant studio gallery exhibiting watercolor landscapes, recycled material sculptures, texture collages, and collaborative clay murals created entirely by our students over the past term.

In the performing amphitheater, students performed traditional and international rhythm songs using percussion instruments, illustrating auditory memory and joyful self-expression.

Thank you to our creative arts educators for curating this unforgettable showcase of childhood imagination!`,
    contentEn: `Art is the visual language of the young child. Last weekend, our campus galleries and courtyards opened for the 2026 Young Creators Art & Music Festival.

Every classroom was converted into a vibrant studio gallery exhibiting watercolor landscapes, recycled material sculptures, texture collages, and collaborative clay murals created entirely by our students over the past term.

In the performing amphitheater, students performed traditional and international rhythm songs using percussion instruments, illustrating auditory memory and joyful self-expression.

Thank you to our creative arts educators for curating this unforgettable showcase of childhood imagination!`,
    contentTh: `ศิลปะคือภาษาแห่งจินตนาการของเด็ก เมื่อสุดสัปดาห์ที่ผ่านมา โรงเรียนภักดีพรรณได้จัดเทศกาลศิลปะและดนตรีสร้างสรรค์ประจำปี เพื่อเปิดพื้นที่ให้เด็กๆ ได้แสดงออกทางความคิดอย่างมั่นใจ

ห้องเรียนและระเบียงทางเดินถูกเนรมิตเป็นแกลเลอรีภาพผลงานศิลปะ ทั้งภาพวาดสีน้ำ งานประดิษฐ์จากวัสดุธรรมชาติ และงานปั้นดินเหนียวที่เด็กๆ ได้ร่วมกันสร้างสรรค์ตลอดภาคเรียนที่ผ่านมา

นอกจากนี้ ณ ลานกิจกรรมกลางแจ้ง เด็กๆ ยังได้ร่วมกันแสดงดนตรีเคาะจังหวะและขับร้องบทเพลงอย่างไพเราะ สร้างความประทับใจให้แก่ผู้ปกครองที่มาร่วมชื่นชมผลงานเป็นอย่างยิ่ง`,
    category: "Events",
    categoryTh: "กิจกรรม",
    imageUrl:
      "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=1200&auto=format&fit=crop",
    publishDate: "2026-10-27T08:00:00.000Z",
    formattedDate: "Oct 27, 2026",
    readTime: "3 min read",
    isFeatured: false,
  },
]

/**
 * Normalizes any news object (from Payload CMS or mock) into a consistent, robust structure
 * with guaranteed fallbacks for content, excerpt, and titles in both EN and TH.
 */
export function normalizeNewsItem(
  doc: any,
  lang: "en" | "th" = "en"
): NormalizedNewsItem {
  if (!doc) return DEFAULT_NEWS_ITEMS[0]

  const isTh = lang === "th"
  const id = String(doc.id || doc.slug || "news-article")
  const slug = String(doc.slug || doc.id || "news-article")

  // Extract titles
  const titleEn =
    doc.title_en ||
    doc.titleEn ||
    (typeof doc.title === "string" ? doc.title : doc.title?.en) ||
    "Campus News Article"
  const titleTh =
    doc.title_th ||
    doc.titleTh ||
    (typeof doc.title === "object" ? doc.title?.th : null) ||
    titleEn

  const title = isTh ? titleTh : titleEn

  // Extract excerpts
  const excerptEn =
    doc.excerpt_en ||
    doc.excerptEn ||
    (typeof doc.excerpt === "string" ? doc.excerpt : doc.excerpt?.en) ||
    doc.description ||
    ""
  const excerptTh =
    doc.excerpt_th ||
    doc.excerptTh ||
    (typeof doc.excerpt === "object" ? doc.excerpt?.th : null) ||
    excerptEn

  const excerpt = isTh ? (excerptTh || excerptEn) : (excerptEn || excerptTh)

  // Extract content with progressive fallback
  let rawContentEn =
    doc.content_en ||
    doc.contentEn ||
    (typeof doc.content === "string" ? doc.content : doc.content?.en) ||
    ""
  const rawContentTh =
    doc.content_th ||
    doc.contentTh ||
    (typeof doc.content === "object" ? doc.content?.th : null) ||
    ""

  // If rich text body exists
  if (!rawContentEn && doc.body) {
    if (typeof doc.body === "string") {
      rawContentEn = doc.body
    } else if (doc.body.root?.children) {
      try {
        rawContentEn = doc.body.root.children
          .map((node: any) =>
            node.children?.map((c: any) => c.text).join("") || ""
          )
          .filter(Boolean)
          .join("\n\n")
      } catch {
        // fallback
      }
    }
  }

  // Graceful content fallback: if content is missing, fall back to excerpt
  const contentEn = rawContentEn || excerptEn || excerptTh || titleEn
  const contentTh = rawContentTh || excerptTh || contentEn

  const content = isTh ? (contentTh || contentEn) : (contentEn || contentTh)

  // Category
  const categoryEn =
    doc.category_en ||
    (typeof doc.category === "string" ? doc.category : doc.category?.en) ||
    "Campus Life"
  const categoryTh =
    doc.category_th ||
    (typeof doc.category === "object" ? doc.category?.th : null) ||
    (categoryEn === "announcements" || categoryEn === "Announcements"
      ? "ประกาศสำคัญ"
      : categoryEn === "academics" || categoryEn === "Academics"
      ? "วิชาการ"
      : categoryEn === "events" || categoryEn === "Events"
      ? "กิจกรรม"
      : categoryEn === "community" || categoryEn === "Community"
      ? "ชุมชนภักดีพรรณ"
      : "ชีวิตในรั้วโรงเรียน")

  const category = isTh ? categoryTh : categoryEn

  // Image URL
  const imageUrl =
    doc.featuredImage?.url ||
    doc.imageUrl ||
    doc.image ||
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop"

  // Date
  const rawDate = doc.publishDate || doc.date || doc.createdAt || new Date().toISOString()
  const dateObj = new Date(rawDate)
  const formattedDate = dateObj.toLocaleDateString(
    isTh ? "th-TH" : "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  )

  // Calculate read time
  const wordCount = (content || "").split(/\s+/).length
  const readMinutes = Math.max(1, Math.ceil(wordCount / 180))
  const readTime = isTh ? `อ่าน ${readMinutes} นาที` : `${readMinutes} min read`

  return {
    id,
    slug,
    title,
    titleEn,
    titleTh,
    excerpt,
    excerptEn,
    excerptTh,
    content,
    contentEn,
    contentTh,
    category,
    categoryTh,
    imageUrl,
    publishDate: rawDate,
    formattedDate,
    readTime,
    isFeatured: Boolean(doc.isFeatured),
  }
}

