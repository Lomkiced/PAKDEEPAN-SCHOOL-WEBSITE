import * as React from "react"

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-white/80 backdrop-blur-md transition-opacity duration-300"
    >
      {/* Top 4px Blue-to-Light-Pink Shimmer Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[9999] overflow-hidden bg-slate-100">
        <div className="h-full w-full bg-gradient-to-r from-blue-600 via-pink-400 to-blue-500 animate-[shimmer_1.8s_infinite] bg-[length:200%_100%]" />
      </div>

      {/* Centered Frosted Loading Card */}
      <div className="relative flex flex-col items-center justify-center px-8 py-7 rounded-3xl bg-white/90 shadow-2xl shadow-blue-900/10 border border-white/60 backdrop-blur-xl max-w-xs sm:max-w-sm text-center">
        {/* Dual Orbital Royal Blue & Light Pink Spinner */}
        <div className="relative w-16 h-16 mb-5 flex items-center justify-center">
          {/* Outer Royal Blue Ring */}
          <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-blue-600 border-r-blue-500 animate-spin" />
          
          {/* Inner Light Pink Ring (Counter-rotating) */}
          <div className="absolute inset-1.5 rounded-full border-3 border-transparent border-b-pink-400 border-l-pink-300 animate-[spin_1.2s_linear_infinite_reverse]" />
          
          {/* Center Glowing Dot */}
          <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-blue-600 to-pink-400 shadow-md shadow-pink-400/50 animate-pulse" />
        </div>

        {/* Bilingual Status Typography */}
        <div className="space-y-1">
          <p className="text-base font-bold text-slate-800 tracking-tight flex items-center justify-center gap-1.5">
            <span>กำลังโหลดข้อมูล...</span>
          </p>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Loading Pakdeepan School...
          </p>
        </div>

        {/* Micro Shimmer Pill */}
        <div className="mt-4 w-32 h-1 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-blue-600 via-pink-400 to-blue-600 animate-[shimmer_1.5s_infinite] bg-[length:200%_100%]" />
        </div>
      </div>
    </div>
  )
}

