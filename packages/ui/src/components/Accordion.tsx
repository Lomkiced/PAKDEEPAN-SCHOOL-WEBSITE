"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CaretDown } from "@phosphor-icons/react"
import { cn } from "../utils/cn"

export interface AccordionItemProps {
  title: string
  content: React.ReactNode
  isOpen?: boolean
  onClick?: () => void
  className?: string
}

export function AccordionItem({ title, content, isOpen, onClick, className }: AccordionItemProps) {
  return (
    <div className={cn("border-b", className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:text-primary"
        onClick={onClick}
      >
        {title}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <CaretDown size={20} className="text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 pt-0 text-muted-foreground text-sm">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export interface AccordionProps {
  items: Omit<AccordionItemProps, "isOpen" | "onClick">[]
  allowMultiple?: boolean
  className?: string
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<number[]>([])

  const handleItemClick = (index: number) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      )
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          {...item}
          isOpen={openItems.includes(index)}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  )
}
