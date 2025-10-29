import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageGridProps {
  images: Array<{
    src: string
    alt: string
  }>
  className?: string
}

/**
 * Standard 2-image side-by-side grid
 * Max 400px height, contrast filter applied
 */
export function ImageGrid({ images, className }: ImageGridProps) {
  if (images.length !== 2) {
    console.error("[v0] ImageGrid requires exactly 2 images")
    return null
  }

  return (
    <div className={cn("grid md:grid-cols-2 gap-8 my-16", className)}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          width={600}
          height={400}
          className="w-full h-auto max-h-96 object-contain object-top rounded-xl shadow-lg filter contrast-75"
        />
      ))}
    </div>
  )
}
