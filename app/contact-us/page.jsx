import { Metadata } from 'next'
import Contact from "../../src/assets/pages/contact"

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Pacesetter Frontier Magazine. Contact us for advertising, partnerships, or general inquiries. Located in Enugu and Abuja, Nigeria.",
  openGraph: {
    title: "Contact Us | Pacesetter Frontier Magazine",
    description: "Get in touch with Pacesetter Frontier Magazine for advertising, partnerships, or general inquiries.",
    images: ['/logo.png'],
  },
  twitter: {
    title: "Contact Us | Pacesetter Frontier Magazine",
    description: "Get in touch with Pacesetter Frontier Magazine for advertising, partnerships, or general inquiries.",
  },
  alternates: {
    canonical: '/contact-us',
  },
}

export default function ContactPage() {
  return <Contact />
}