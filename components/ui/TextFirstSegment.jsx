"use client"

import { useRouter } from "next/navigation"
import PropTypes from "prop-types"
import SafeImage from "./SafeImage"
import { AuthorTime } from "./AuthorTime"
import { usePostContext } from "../../lib/context/general"

import "./VerticalSegment.css"

export const TextFirstSegment = ({ yoast_head_json, title, excerpt, date, item, id, slug }) => {
  const imageUrl = yoast_head_json?.og_image?.[0]?.url || 
                   yoast_head_json?.schema?.["@graph"]?.[2]?.url || 
                   "/placeholder.svg"
  const author = yoast_head_json?.author || "Pacesetter Frontier Magazine"
  const router = useRouter()
  const { updatePostItem } = usePostContext()

  const handlePostClick = () => {
    updatePostItem(item)
    router.push(`/post/${id}/${slug}`)
  }

  return (
    <div
      className="top-hero v-seg rounded p-3 my-4 d-flex shadow pointer"
      onClick={handlePostClick}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <SafeImage
        src={imageUrl}
        alt="News Image"
        width={400}
        height={300}
        style={{ display: "none" }}
        priority={false}
      />
      <div className="rounded card p-2 p-md-4 t-white-8 shadow border-0">
        <p
          className="mt-5 fw-bold fs-4 lh-1 mont pointer"
          onClick={handlePostClick}
          dangerouslySetInnerHTML={{ __html: title?.rendered }}
        />
        <div className="my-3">
          <AuthorTime
            date={date}
            comments={2}
            author={author}
            readTime={yoast_head_json?.twitter_misc?.["Est. reading time"]?.[0] || "5"}
          />
        </div>
        <p dangerouslySetInnerHTML={{ __html: excerpt?.rendered }} />
      </div>
    </div>
  )
}

TextFirstSegment.propTypes = {
  id: PropTypes.number,
  date: PropTypes.string,
  title: PropTypes.object,
  excerpt: PropTypes.object,
  yoast_head_json: PropTypes.object,
  item: PropTypes.object,
  slug: PropTypes.string,
}