"use client"

import { useState } from "react"
import Image from "next/image"

const SafeImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = "", 
  style = {}, 
  priority = false,
  onError,
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc("/placeholder.svg")
      if (onError) onError()
    }
  }

  // If no src provided, use placeholder
  if (!src || src === "") {
    return (
      <Image
        src="/placeholder.svg"
        alt={alt || "Placeholder"}
        width={width}
        height={height}
        className={className}
        style={style}
        priority={priority}
        {...props}
      />
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt || "Image"}
      width={width}
      height={height}
      className={className}
      style={style}
      priority={priority}
      onError={handleError}
      {...props}
    />
  )
}

export default SafeImage