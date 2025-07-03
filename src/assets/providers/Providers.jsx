"use client"

import { GeneralProvider } from "../context"

export default function Providers({ children }) {
  return (
    <GeneralProvider>
      {children}
    </GeneralProvider>
  )
}