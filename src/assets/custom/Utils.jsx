"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export const HandleWidth = () => {
  const [width, setWidth] = useState(1200) // Default width for SSR

  useEffect(() => {
    // Set initial width after component mounts
    setWidth(window.innerWidth)
    
    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return width
}

export const manipulateDate = (dateString) => {
  const originalTime = dateString.replace("T", " ")
  dateString = dateString.split("T")[0]
  const date = new Date(dateString)
  const today = new Date()

  const isSameDate = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()

  if (isSameDate(date, today)) return originalTime

  const diffInDays = Math.floor((today - date) / (1000 * 60 * 60 * 24))
  let n = diffInDays

  if (diffInDays === 1) return "Yesterday"
  if (diffInDays < 0) return "Future"
  if (diffInDays <= 7) return `${n} day(s) ago`

  const diffInWeeks = Math.floor(diffInDays / 7)
  n = diffInWeeks
  if (diffInWeeks === 1) return "Last week"
  if (diffInWeeks <= 5) return `${n} week(s) ago`

  const diffInMonths = Math.floor(diffInDays / 30)
  n = diffInMonths
  if (diffInMonths === 1) return "Last month"
  if (diffInMonths <= 12) return `${n} month(s) ago`

  return originalTime
}

export const getKeyByValue = (obj, value) => {
  return Object.keys(obj).find((key) => obj[key] === value)
}

const capitalizeFirstChars = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

export const ScrollToTop = (props) => {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })

    const scrollAfterRender = () => {
      if (window.scrollY) {
        const scrollBtn = document.getElementById("scroll-top")
        if (scrollBtn) scrollBtn.click()
      }
    }

    window.requestAnimationFrame(scrollAfterRender)
  }, [pathname])

  return <>{props.children}</>
}

export const modifyTitle = (title) => {
  title = title + " Pacesetter Frontier Magazine"
  title = title.replaceAll("%20", " ")
  if (typeof document !== "undefined") {
    document.title = title.trim()
  }
}

export const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

export const truncateExcerpt = (rendered, num = 15) => {
  const text = rendered.replace(/<\/?[^>]+(>|$)/g, "")
  const words = text.split(/\s+/)
  const truncatedText = words.slice(0, num).join(" ")
  return `<p>${truncatedText} [&hellip;]</p>`
}

export const manipulateDate2 = (dateString) => {
  const dateObj = new Date(dateString)

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]

  const month = monthNames[dateObj.getMonth()]
  const day = String(dateObj.getDate()).padStart(2, "0")
  const year = dateObj.getFullYear()

  return `${month} ${day}, ${year}`
}