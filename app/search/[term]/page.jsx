import { Metadata } from 'next'
import Search from "../../../src/assets/pages/search"

export async function generateMetadata({ params }) {
  const searchTerm = decodeURIComponent(params.term).replace(/-/g, ' ')
  
  return {
    title: `Search Results for "${searchTerm}"`,
    description: `Search results for "${searchTerm}" on Pacesetter Frontier Magazine. Find relevant news and articles.`,
    robots: {
      index: false, // Don't index search pages
      follow: true,
    },
    openGraph: {
      title: `Search Results for "${searchTerm}" | Pacesetter Frontier Magazine`,
      description: `Search results for "${searchTerm}" on Pacesetter Frontier Magazine.`,
      images: ['/logo.png'],
    },
  }
}

export default function SearchPage() {
  return <Search />
}