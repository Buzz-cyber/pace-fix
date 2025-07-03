import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Category from "../../../src/assets/pages/category"
import { Categories } from "../../../src/assets/data"

export async function generateMetadata({ params }) {
  const categoryName = decodeURIComponent(params.name)
  const categoryExists = Object.values(Categories).includes(categoryName.toLowerCase())
  
  if (!categoryExists) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.'
    }
  }

  const formattedName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
  
  return {
    title: `${formattedName} News`,
    description: `Latest ${formattedName.toLowerCase()} news and articles from Pacesetter Frontier Magazine. Stay updated with comprehensive coverage.`,
    openGraph: {
      title: `${formattedName} News | Pacesetter Frontier Magazine`,
      description: `Latest ${formattedName.toLowerCase()} news and articles from Pacesetter Frontier Magazine.`,
      images: ['/logo.png'],
    },
    twitter: {
      title: `${formattedName} News | Pacesetter Frontier Magazine`,
      description: `Latest ${formattedName.toLowerCase()} news and articles from Pacesetter Frontier Magazine.`,
    },
    alternates: {
      canonical: `/category/${params.name}`,
    },
  }
}

export default function CategoryPage({ params }) {
  const categoryName = decodeURIComponent(params.name)
  const categoryExists = Object.values(Categories).includes(categoryName.toLowerCase())
  
  if (!categoryExists) {
    notFound()
  }

  return <Category />
}

export async function generateStaticParams() {
  return Object.values(Categories).map((category) => ({
    name: category,
  }))
}