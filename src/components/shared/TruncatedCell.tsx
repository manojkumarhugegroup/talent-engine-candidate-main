import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface TruncatedCellProps {
  content: React.ReactNode
  fullContent?: React.ReactNode
  className?: string
  maxLines?: number
  popoverClassName?: string
}

export const TruncatedCell: React.FC<TruncatedCellProps> = ({
  content,
  fullContent,
  className,
  maxLines = 1,
  popoverClassName
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isTruncated, setIsTruncated] = React.useState(false)
  const textRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const element = textRef.current
    if (element) {
      // Check if content is truncated
      const isContentTruncated = element.scrollHeight > element.clientHeight || 
                                 element.scrollWidth > element.clientWidth
      setIsTruncated(isContentTruncated)
    }
  }, [content])

  const truncateClass = maxLines === 1 
    ? 'truncate' 
    : `line-clamp-${maxLines}`

  if (!isTruncated) {
    return (
      <div 
        ref={textRef}
        className={cn(truncateClass, className)}
      >
        {content}
      </div>
    )
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div 
          ref={textRef}
          className={cn(
            truncateClass, 
            "cursor-pointer hover:bg-gray-50 rounded px-1 -mx-1 transition-colors",
            className
          )}
          onClick={() => setIsOpen(true)}
        >
          {content}
        </div>
      </PopoverTrigger>
      <PopoverContent 
        className={cn("max-w-sm", popoverClassName)}
        side="top"
        align="start"
      >
        <div className="text-sm">
          {fullContent || content}
        </div>
      </PopoverContent>
    </Popover>
  )
}