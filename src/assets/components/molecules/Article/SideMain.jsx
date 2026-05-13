"use client"

import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

import { TextFirstSegment } from "../../newsItem"
import { UseFetch } from "../../../custom"
import { LatestSlider, ArticleTitle, Adverts, PromotionsProvider } from "../.."

const SideMain = ({ initialPosts = null }) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}posts`
  const useInitial = Array.isArray(initialPosts) && initialPosts.length > 0
  const { loading, data } = useInitial ? { loading: false, data: initialPosts } : UseFetch(url, "posts")

  return (
    <>
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="mb-4">
            <Skeleton height={180} className="w-100 mb-2 rounded" />
            <Skeleton width="70%" />
            <Skeleton width="40%" />
          </div>
        ))
        : data.slice(2, 8).map((item) => (
          <TextFirstSegment key={item.id} {...item} item={item} />
        ))}

      <div>
        <ArticleTitle title="latest" width={30} class_="fs-5" />
        <LatestSlider class_="mt-5" initialPosts={data} />
        <PromotionsProvider>
          <Adverts index={5} />
        </PromotionsProvider>
      </div>
    </>
  )
}

export default SideMain
