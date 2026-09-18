"use client"

import * as React from "react"
import { formatTHB, formatFeeWithInterval, type CurrencyLocale } from "@/utils/currency"
import { Coins, DownloadSimple, CheckCircle, GraduationCap } from "@phosphor-icons/react"

export interface AdditionalFee {
  feeName: string
  amount: number
  feeType: "one-time" | "term" | "annual"
}

export interface TuitionFeeCardProps {
  programTitle: string
  levelName?: string
  baseTuition: number
  billingInterval: "term" | "year" | "month"
  additionalFees?: AdditionalFee[]
  syllabusPdfUrl?: string
  locale?: CurrencyLocale
}

export function TuitionFeeCard({
  programTitle,
  levelName,
  baseTuition,
  billingInterval,
  additionalFees = [],
  syllabusPdfUrl,
  locale = "th",
}: TuitionFeeCardProps) {
  const totalAdditional = additionalFees.reduce((sum, item) => sum + (item.amount || 0), 0)
  const totalEstimatedFirstTerm = baseTuition + totalAdditional

  return (
    <div className="rounded-xl border border-outline-variant/30 bg-surface p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-8 hover:-translate-y-1 transition-transform">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container/20 px-3 py-1 font-label-caps text-label-caps text-secondary">
            <Coins size={14} weight="fill" />
            {locale === "th" ? "อัตราค่าธรรมเนียมการศึกษา (บาท ฿)" : "Tuition & Fees (THB ฿)"}
          </span>
          <h3 className="mt-2.5 font-headline-md text-headline-md text-primary">{programTitle}</h3>
          {levelName && (
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 mt-1">
              <GraduationCap size={16} weight="light" className="text-secondary" />
              {levelName}
            </p>
          )}
        </div>
        <div className="text-left sm:text-right">
          <div className="font-display-lg text-3xl md:text-4xl text-primary font-bold">
            {formatTHB(baseTuition, { locale })}
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {billingInterval === "term"
              ? locale === "th"
                ? "ต่อภาคเรียน (เทอม)"
                : "per term / semester"
              : billingInterval === "year"
              ? locale === "th"
                ? "ต่อปีการศึกษา"
                : "per academic year"
              : locale === "th"
              ? "ต่อเดือน"
              : "per month"}
          </span>
        </div>
      </div>

      {additionalFees.length > 0 && (
        <div className="mt-6 border-t border-outline-variant/20 pt-5">
          <h4 className="font-label-caps text-label-caps text-secondary uppercase tracking-wider mb-3">
            {locale === "th" ? "รายละเอียดค่าธรรมเนียมประกอบ" : "Itemized Additional Fees"}
          </h4>
          <ul className="space-y-2.5">
            {additionalFees.map((fee, idx) => (
              <li key={idx} className="flex items-center justify-between font-body-md text-body-md">
                <span className="flex items-center gap-2 text-on-surface">
                  <CheckCircle size={16} weight="fill" className="text-primary shrink-0" />
                  {fee.feeName}
                  <span className="text-xs text-on-surface-variant">
                    ({fee.feeType === "one-time"
                      ? locale === "th"
                        ? "ชำระแรกเข้า"
                        : "one-time"
                      : fee.feeType === "annual"
                      ? locale === "th"
                        ? "รายปี"
                        : "annual"
                      : locale === "th"
                      ? "รายเทอม"
                      : "per term"})
                  </span>
                </span>
                <span className="font-semibold text-primary">
                  {formatTHB(fee.amount, { locale })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary Box */}
      <div className="mt-6 rounded-xl bg-surface-container-low p-5 border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-body-sm text-body-sm text-on-surface-variant block">
            {locale === "th" ? "ประมาณการค่าใช้จ่ายแรกเข้า (เทอม 1)" : "Estimated 1st Term Total"}
          </span>
          <div className="font-headline-md text-xl font-bold text-primary">
            {formatTHB(totalEstimatedFirstTerm, { locale })}
          </div>
        </div>
        {syllabusPdfUrl && (
          <a
            href={syllabusPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 font-label-caps text-label-caps text-on-primary hover:opacity-90 transition-opacity shrink-0"
          >
            <DownloadSimple size={16} weight="bold" />
            {locale === "th" ? "ดาวน์โหลดหลักสูตร (PDF)" : "Syllabus (PDF)"}
          </a>
        )}
      </div>
    </div>
  )
}
