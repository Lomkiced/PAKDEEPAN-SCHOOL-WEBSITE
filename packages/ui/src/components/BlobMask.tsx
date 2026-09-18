import * as React from "react"
import { cn } from "../utils/cn"

interface BlobMaskProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function BlobMask({ children, className, ...props }: BlobMaskProps) {
  return (
    <div 
      className={cn("relative overflow-hidden", className)}
      style={{
        maskImage: 'url("data:image/svg+xml;utf8,<svg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'><path fill=\'%23000\' d=\'M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-46.8C87.4,-34.5,90,-20,89.3,-5.7C88.6,8.5,84.6,22.5,77.5,35.2C70.3,47.9,60.1,59.3,47.5,67.6C35,75.9,20.2,81.1,5.2,78.2C-9.8,75.3,-24.9,64.2,-37.8,54.9C-50.7,45.6,-61.4,38,-69.5,27.5C-77.5,17,-82.9,3.7,-82,-9.3C-81,-22.3,-73.7,-35.1,-63.9,-45.3C-54.1,-55.5,-41.8,-63,-29,-68.8C-16.2,-74.5,-2.9,-78.6,10.6,-78.8C24.1,-79,30.6,-83.6,44.7,-76.4Z\' transform=\'translate(100 100)\' /></svg>")',
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: 'url("data:image/svg+xml;utf8,<svg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'><path fill=\'%23000\' d=\'M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-46.8C87.4,-34.5,90,-20,89.3,-5.7C88.6,8.5,84.6,22.5,77.5,35.2C70.3,47.9,60.1,59.3,47.5,67.6C35,75.9,20.2,81.1,5.2,78.2C-9.8,75.3,-24.9,64.2,-37.8,54.9C-50.7,45.6,-61.4,38,-69.5,27.5C-77.5,17,-82.9,3.7,-82,-9.3C-81,-22.3,-73.7,-35.1,-63.9,-45.3C-54.1,-55.5,-41.8,-63,-29,-68.8C-16.2,-74.5,-2.9,-78.6,10.6,-78.8C24.1,-79,30.6,-83.6,44.7,-76.4Z\' transform=\'translate(100 100)\' /></svg>")',
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
      }}
      {...props}
    >
      {children}
    </div>
  )
}
