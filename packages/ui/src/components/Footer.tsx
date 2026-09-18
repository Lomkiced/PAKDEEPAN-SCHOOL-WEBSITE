"use client"

import * as React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-highest dark:bg-surface-container-highest rounded-t-xl py-20 px-5 md:px-20 mt-auto">
      <div className="max-w-[1120px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 font-body-md text-body-md">
        
        {/* Brand & Copyright */}
        <div className="col-span-1">
          <div className="font-display-lg text-headline-sm text-primary mb-3">
            Pakdeepan Kindergarten School
          </div>
          <p className="text-on-surface-variant text-sm mt-4">
            &copy; {new Date().getFullYear()} Pakdeepan Kindergarten School. Excellence in Early Education.
          </p>
        </div>
        
        {/* Links */}
        <div className="col-span-1 md:col-span-2 flex flex-wrap gap-6 justify-start md:justify-end items-start pt-2">
          <Link href="/privacy" className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80">Privacy Policy</Link>
          <Link href="/terms" className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80">Terms of Service</Link>
          <Link href="/safeguarding" className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80">Safeguarding</Link>
          <Link href="/contact" className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80">Contact Us</Link>
          <Link href="/careers" className="text-on-surface-variant hover:text-primary transition-colors hover:opacity-80">Careers</Link>
        </div>
        
      </div>
    </footer>
  )
}
