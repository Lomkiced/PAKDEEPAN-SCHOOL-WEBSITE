import * as React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { getPayload } from "payload"
import configPromise from "@/payload.config"
import { getDictionary } from "@/lib/i18n"
import { normalizeNewsItem, DEFAULT_NEWS_ITEMS } from "@/lib/newsData"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Sparkles,
  ChevronRight,
  BookOpen,
  ArrowRight,
} from "lucide-react"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface NewsDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const cookieStore = await cookies()
  const localeStr = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const locale = (localeStr === "th" ? "th" : "en") as "en" | "th"

  let articleDoc: any = null
  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: "news",
      where: {
        or: [{ id: { equals: id } }, { slug: { equals: id } }],
      },
      locale,
      depth: 1,
    })
    if (res.docs.length > 0) {
      articleDoc = res.docs[0]
    }
  } catch {
    // fallback
  }

  const fallback = DEFAULT_NEWS_ITEMS.find((n) => n.id === id || n.slug === id)
  const article = normalizeNewsItem(articleDoc || fallback, locale)

  return {
    title: `${article.title} | Pakdeepan Kindergarten School`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.imageUrl }],
    },
  }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params
  const cookieStore = await cookies()
  const localeStr = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const locale = (localeStr === "th" ? "th" : "en") as "en" | "th"
  const isTh = locale === "th"
  const dict = await getDictionary(locale)

  let articleDoc: any = null
  let moreNewsDocs: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: "news",
      where: {
        or: [{ id: { equals: id } }, { slug: { equals: id } }],
      },
      locale,
      depth: 1,
    })

    if (res.docs.length > 0) {
      articleDoc = res.docs[0]
    }

    // Fetch other recent news
    const moreRes = await payload.find({
      collection: "news",
      limit: 4,
      locale,
      sort: "-publishDate",
      where: {
        status: { equals: "published" },
      },
    })
    moreNewsDocs = moreRes.docs.filter((d: any) => String(d.id) !== id && d.slug !== id)
  } catch (err) {
    console.error("Error fetching news article:", err)
  }

  // Fallback to static news data if not found in CMS
  const fallback = DEFAULT_NEWS_ITEMS.find((n) => n.id === id || n.slug === id)
  if (!articleDoc && !fallback) {
    notFound()
  }

  const article = normalizeNewsItem(articleDoc || fallback, locale)

  // Normalize other news items
  const otherItems = (moreNewsDocs.length > 0 ? moreNewsDocs : DEFAULT_NEWS_ITEMS)
    .filter((n: any) => n.id !== article.id && n.slug !== article.slug)
    .slice(0, 3)
    .map((n: any) => normalizeNewsItem(n, locale))

  // Split content into clean paragraphs
  const paragraphs = (article.content || article.excerpt)
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pt-28 pb-20 font-sans">
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 flex-wrap"
        >
          <Link href="/" className="hover:text-[#1e3a8a] transition-colors">
            {isTh ? "หน้าแรก" : "Home"}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/campus-life" className="hover:text-[#1e3a8a] transition-colors">
            {isTh ? "ข่าวสารและกิจกรรม" : "Campus Life & News"}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 truncate max-w-[220px] sm:max-w-md font-bold">
            {article.title}
          </span>
        </nav>

        {/* Back Link Button */}
        <div className="mb-6">
          <Link
            href="/campus-life"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#1e3a8a] bg-blue-50/80 hover:bg-blue-100/80 transition-colors border border-blue-100 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isTh ? "กลับสู่หน้าข่าวสารและกิจกรรม" : "Back to Campus Life & News"}</span>
          </Link>
        </div>

        {/* Header Metadata & Headline */}
        <header className="space-y-4 mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1e3a8a] text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span>{article.category}</span>
            </span>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {article.formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {article.readTime}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal pt-1">
              {article.excerpt}
            </p>
          )}
        </header>

        {/* Cinematic Full-Width Featured Cover Image */}
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 mb-10 group bg-slate-100">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Story Body Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-slate-200/80 mb-12">
          {/* Excerpt Editorial Callout */}
          {article.excerpt && (
            <div className="p-5 rounded-2xl bg-blue-50/70 border-l-4 border-[#1e3a8a] text-sm sm:text-base font-semibold text-[#1e3a8a] leading-relaxed mb-8 shadow-2xs">
              {article.excerpt}
            </div>
          )}

          {/* Paragraphs */}
          <div className="text-base sm:text-lg leading-relaxed text-slate-700 space-y-6 font-normal">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="whitespace-pre-line leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Share Section Bar */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-[#1e3a8a]" />
              {isTh ? "แบ่งปันเรื่องราวนี้" : "Share this story"}
            </span>

            <div className="flex items-center gap-2">
              <ShareCopyButton
                url={`/news/${article.slug || article.id}`}
                copiedLabel={isTh ? "คัดลอกลิงก์แล้ว!" : "Link Copied!"}
                shareLabel={isTh ? "คัดลอกลิงก์บทความ" : "Copy Article Link"}
              />

              <a
                href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
                  `https://pakdeepan.ac.th/news/${article.slug || article.id}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              >
                LINE
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  `https://pakdeepan.ac.th/news/${article.slug || article.id}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* More Campus Life & News Section */}
        {otherItems.length > 0 && (
          <section className="mt-16 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-[#1e3a8a] tracking-wider uppercase">
                  {isTh ? "เรื่องราวแนะนำ" : "Related Stories"}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {isTh ? "ข่าวสารและกิจกรรมอื่นๆ" : "More Campus Life & News"}
                </h3>
              </div>

              <Link
                href="/campus-life"
                className="text-xs font-bold text-[#1e3a8a] hover:underline flex items-center gap-1"
              >
                <span>{isTh ? "ดูทั้งหมด" : "View All"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug || item.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all group flex flex-col"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-white/90 text-[#1e3a8a] backdrop-blur-md shadow-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                        {item.formattedDate}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#1e3a8a] transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                        {item.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center text-xs font-bold text-[#1e3a8a] gap-1 group-hover:translate-x-1 transition-transform">
                      <span>{isTh ? "อ่านต่อ" : "Read Story"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </article>
    </div>
  )
}

function ShareCopyButton({
  url,
  copiedLabel,
  shareLabel,
}: {
  url: string
  copiedLabel: string
  shareLabel: string
}) {
  return (
    <ClientCopyButton url={url} copiedLabel={copiedLabel} shareLabel={shareLabel} />
  )
}

import { ClientCopyButton } from "./ClientCopyButton"

