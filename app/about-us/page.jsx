import { Metadata } from 'next'
import About from "../../src/assets/pages/about"

export const metadata = {
  title: "About Us",
  description: "Learn about Pacesetter Frontier Magazine - a privately owned, quarterly published, multimedia magazine established in 2020 and headquartered in Enugu, Nigeria.",
  openGraph: {
    title: "About Us | Pacesetter Frontier Magazine",
    description: "Learn about Pacesetter Frontier Magazine - Nigeria's leading multimedia magazine established in 2020.",
    images: ['/logo.png'],
  },
  twitter: {
    title: "About Us | Pacesetter Frontier Magazine",
    description: "Learn about Pacesetter Frontier Magazine - Nigeria's leading multimedia magazine established in 2020.",
  },
  alternates: {
    canonical: '/about-us',
  },
}

export default function AboutPage() {
  return <About />
}