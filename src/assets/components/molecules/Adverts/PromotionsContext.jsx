"use client"

import { useState, useEffect, createContext, useContext } from "react"

const PromotionsContext = createContext(null)

export function PromotionsProvider({ children }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const url = `/api/promotions?_t=${Date.now()}`
        const res = await fetch(url, { cache: "no-store" })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const result = await res.json()
        setData(Array.isArray(result) ? result : [])
      } catch (err) {
        console.error("Failed to fetch ads:", err)
        setError(err)
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchAds()
  }, [])

  return (
    <PromotionsContext.Provider value={{ data, loading, error }}>
      {children}
    </PromotionsContext.Provider>
  )
}

export function usePromotions() {
  const context = useContext(PromotionsContext)
  if (!context) {
    throw new Error("usePromotions must be used within PromotionsProvider")
  }
  return context
}
