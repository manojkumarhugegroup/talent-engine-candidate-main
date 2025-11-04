// // import { ReactNode, useState } from "react"
// // import { Eye, EyeOff } from "lucide-react"

// // interface MaskedTextProps {
// //   text: string
// //   maskChar?: string
// //   visibleChars?: number
// //   className?: string
// //   iconClassName?: string
// //    beforeIcon?: ReactNode
// // }

// // export function MaskedText({ 
// //   text, 
// //   maskChar = "*", 
// //   visibleChars = 2, 
// //   className = "", 
// //   beforeIcon,
// //   iconClassName = "w-4 h-4 cursor-pointer hover:opacity-70" 
// // }: MaskedTextProps) {
// //   const [isVisible, setIsVisible] = useState(false)

// //   const getMaskedText = (originalText: string): string => {
// //     if (originalText.length <= visibleChars) {
// //       return maskChar.repeat(originalText.length)
// //     }

// //     // For email: show first 2 chars and domain
// //     if (originalText.includes("@")) {
// //       const [localPart, domain] = originalText.split("@")
// //       const maskedLocal = localPart.slice(0, visibleChars) + maskChar.repeat(Math.max(0, localPart.length - visibleChars))
// //       return `${maskedLocal}@${domain}`
// //     }

// //     // For phone or other text: show first few chars and mask the rest
// //     return originalText.slice(0, visibleChars) + maskChar.repeat(Math.max(0, originalText.length - visibleChars))
// //   }

// //   const toggleVisibility = () => {
// //     setIsVisible(!isVisible)
// //   }

// //   return (
// //     <div className="flex items-center justify-between w-full">
// //       <span className={className}>
// //         {isVisible ? text : getMaskedText(text)}
// //       </span>
// //       <button 
// //         onClick={toggleVisibility}
// //         className="ml-2 focus:outline-none"
// //         aria-label={isVisible ? "Hide text" : "Show text"}
// //       >
// //         {isVisible ? (
// //           <EyeOff className={iconClassName} />
// //         ) : (
// //           <Eye className={iconClassName} />
// //         )}
// //       </button>
// //     </div>
// //   )
// // }

// import { useState, ReactNode } from "react"
// import { Eye, EyeOff } from "lucide-react"

// interface MaskedTextProps {
//   text: string
//   maskChar?: string
//   visibleChars?: number
//   className?: string
//   iconClassName?: string
//   beforeIcon?: ReactNode // ✅ new prop
// }

// export function MaskedText({ 
//   text, 
//   maskChar = "*", 
//   visibleChars = 2, 
//   className = "", 
//   iconClassName = "w-4 h-4 cursor-pointer hover:opacity-70",
//   beforeIcon
// }: MaskedTextProps) {
//   const [isVisible, setIsVisible] = useState(false)

//   const getMaskedText = (originalText: string): string => {
//     if (originalText.length <= visibleChars) {
//       return maskChar.repeat(originalText.length)
//     }

//     if (originalText.includes("@")) {
//       const [localPart, domain] = originalText.split("@")
//       const maskedLocal = localPart.slice(0, visibleChars) + maskChar.repeat(Math.max(0, localPart.length - visibleChars))
//       return `${maskedLocal}@${domain}`
//     }

//     return originalText.slice(0, visibleChars) + maskChar.repeat(Math.max(0, originalText.length - visibleChars))
//   }

//   const toggleVisibility = () => setIsVisible(!isVisible)

//   return (
//     <div className="flex items-center justify-between w-full">
//       <span className={className}>
//         {isVisible ? text : getMaskedText(text)}
//       </span>

//       <div className="flex items-center gap-2">
//         {beforeIcon && beforeIcon} {/* CopyButton rendered here */}
//         <button 
//           onClick={toggleVisibility}
//           className="ml-0.5 focus:outline-none"
//           aria-label={isVisible ? "Hide text" : "Show text"}
//         >
//           {isVisible ? <EyeOff className={iconClassName} /> : <Eye className={iconClassName} />}
//         </button>
//       </div>
//     </div>
//   )
// }


import { useState, ReactNode } from "react"
import { Eye, EyeOff } from "lucide-react"

interface MaskedTextProps {
  text?: string | number | null
  maskChar?: string
  visibleChars?: number
  className?: string
  iconClassName?: string
  beforeIcon?: ReactNode
}

export function MaskedText({
  text,
  maskChar = "*",
  visibleChars = 2,
  className = "",
  iconClassName = "w-4 h-4 cursor-pointer hover:opacity-70",
  beforeIcon
}: MaskedTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Normalize input to a safe string (empty for null/object)
  const normalize = (value: any): string => {
    if (value == null) return ""           // null or undefined -> empty
    if (typeof value === "object") return "" // avoid "[object Object]"
    return String(value)
  }

  const getMaskedText = (originalText: any): string => {
    const str = normalize(originalText)
    if (!str) return ""

    // Email: keep domain, mask local part
    if (str.includes("@")) {
      const [localPart, domain] = str.split("@", 2)
      const maskedLocal = localPart.slice(0, visibleChars) +
        maskChar.repeat(Math.max(0, localPart.length - visibleChars))
      return domain ? `${maskedLocal}@${domain}` : maskedLocal
    }

    // Non-email (phone/other)
    if (str.length <= visibleChars) return maskChar.repeat(str.length)
    return str.slice(0, visibleChars) + maskChar.repeat(Math.max(0, str.length - visibleChars))
  }

  const toggleVisibility = () => setIsVisible(v => !v)

  return (
    <div className="flex items-center justify-between w-full">
      <span className={className}>
        {isVisible ? normalize(text) : getMaskedText(text)}
      </span>

      <div className="flex items-center gap-2">
        {beforeIcon}
        <button
          onClick={toggleVisibility}
          className="ml-0.5 focus:outline-none"
          aria-label={isVisible ? "Hide text" : "Show text"}
        >
          {isVisible ? <EyeOff className={iconClassName} /> : <Eye className={iconClassName} />}
        </button>
      </div>
    </div>
  )
}
