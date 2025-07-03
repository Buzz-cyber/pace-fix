import { Metadata } from 'next'
import Welcome from "../src/assets/pages/welcome"

export const metadata = {
  title: "Home",
  description: "Latest news, politics, entertainment, business, and lifestyle content from Pacesetter Frontier Magazine - Nigeria's leading multimedia magazine.",
  openGraph: {
    title: "Pacesetter Frontier Magazine - Home",
    description: "Latest news, politics, entertainment, business, and lifestyle content from Nigeria's leading multimedia magazine.",
    images: ['/logo.png'],
  },
  twitter: {
    title: "Pacesetter Frontier Magazine - Home",
    description: "Latest news, politics, entertainment, business, and lifestyle content from Nigeria's leading multimedia magazine.",
  },
}

export default function HomePage() {
  return <Welcome />
}