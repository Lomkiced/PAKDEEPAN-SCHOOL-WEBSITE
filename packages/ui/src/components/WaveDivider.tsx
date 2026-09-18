import * as React from "react"
import { cn } from "../utils/cn"

interface WaveDividerProps extends React.SVGProps<SVGSVGElement> {
  position?: "top" | "bottom"
}

export function WaveDivider({ position = "bottom", className, ...props }: WaveDividerProps) {
  return (
    <div className={cn("absolute left-0 w-full overflow-hidden leading-[0]", position === "top" ? "top-0 rotate-180" : "bottom-0", className)}>
      <svg
        className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[120px] lg:h-[180px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        {...props}
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.45,191.56,98.22,236.85,82.38,278.43,64.4,321.39,56.44Z"
          className="fill-current"
        ></path>
      </svg>
    </div>
  )
}
