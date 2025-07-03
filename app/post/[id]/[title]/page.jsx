import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PostPage from "../../../../src/assets/pages/post"

async function getPost(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts/${id}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    
    if (!res.ok) {
      return null
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.id)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.'
    }
  }

  const { title, yoast_head_json = {} } = post
  const cleanTitle = title?.rendered?.replace(/<[^>]*>/g, '') || 'Untitled Post'
  const description = yoast_head_json.og_description || yoast_head_json.description || 'Read the latest news and articles from Pacesetter Frontier Magazine.'
  const image = yoast_head_json.og_image?.[0]?.url || yoast_head_json.schema?.["@graph"]?.[2]?.url || '/logo.png'
  const author = yoast_head_json.author || 'Pacesetter Frontier Magazine'
  const publishedTime = post.date
  const modifiedTime = post.modified

  return {
    title: cleanTitle,
    description: description,
    authors: [{ name: author }],
    openGraph: {
      title: cleanTitle,
      description: description,
      type: 'article',
      publishedTime: publishedTime,
      modifiedTime: modifiedTime,
      authors: [author],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: cleanTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: description,
      images: [image],
      creator: yoast_head_json.twitter_creator || '@pacesetterfrontier',
    },
    alternates: {
      canonical: `/post/${params.id}/${params.title}`,
    },
  }
}

export default async function PostDetailPage({ params }) {
  const post = await getPost(params.id)
  
  if (!post) {
    notFound()
  }

  return <PostPage initialPost={post} />
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}posts?per_page=100`)
    if (!res.ok) return []
    
    const posts = await res.json()
    
    return posts.map((post) => ({
      id: post.id.toString(),
      title: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}