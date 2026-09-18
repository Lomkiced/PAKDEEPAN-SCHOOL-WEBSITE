"use client"

import * as React from "react"
import { cn } from "../utils/cn"
import { Check } from "@phosphor-icons/react"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onCheckedChange?.(e.target.checked)
    }

    return (
      <div className="relative flex items-center justify-center w-5 h-5">
        <input
          type="checkbox"
          ref={ref}
          onChange={handleChange}
          className={cn(
            "peer h-5 w-5 appearance-none rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary checked:border-primary transition-all",
            className
          )}
          {...props}
        />
        <Check
          weight="bold"
          className="absolute pointer-events-none opacity-0 peer-checked:opacity-100 text-white transition-opacity w-3.5 h-3.5"
        />
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
