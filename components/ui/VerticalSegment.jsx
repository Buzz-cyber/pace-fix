"use client"

import { useRouter } from "next/navigation"
import PropTypes from "prop-types"
import SafeImage from "./SafeImage"
import { AuthorTime } from "./AuthorTime"
import { usePostContext } from "../../lib/context/general"
import { truncateExcerpt } from "../../lib/utils/textUtils"
import { SimpleSharers } from "./SimpleSharers"

import "./VerticalSegment.css"

export const VerticalSegment = ({
  id,
  date,
  slug,
  title,
  catName,
  excerpt,
  categories,
  yoast_head_json,
  item,
  imgClass = "",
  titleClass = "fs-3",
  sharePost = false,
  showDesc = true,
}) => {
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
    <div className="mx-1 mt-3">
      <div
        className={`top-hero v-seg d-flex align-items-end shadow pointer ${imgClass}`}
        style={{ backgroundImage: `url("${imageUrl}")` }}
        onClick={handlePostClick}
      >
        <SafeImage
          src={imageUrl}
          alt="News Image"
          width={400}
          height={300}
          style={{ display: "none" }}
          priority={false}
        />
        <span className="rounded link pointer fs-13">{catName}</span>
      </div>
      <p
        className={`mt-5 fw-bold lh-1 fs-16-mobile pointer ${titleClass}`}
        onClick={handlePostClick}
        dangerouslySetInnerHTML={{ __html: title?.rendered }}
      />
      <div style={{ maxWidth: 350 }} className="text-muted">
        <AuthorTime
          date={date}
          author={author}
          comments={12}
          readTime={yoast_head_json?.twitter_misc?.["Est. reading time"]?.[0] || "5"}
          between
        />
      </div>
      {showDesc && <p dangerouslySetInnerHTML={{ __html: truncateExcerpt(excerpt?.rendered || "") }} />}
      {sharePost && (
        <div className="mt-3">
          <SimpleSharers title={yoast_head_json?.title || title?.rendered} />
        </div>
      )}
    </div>
  )
}

VerticalSegment.propTypes = {
  id: PropTypes.number,
  date: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.object,
  columns: PropTypes.number,
  content: PropTypes.object,
  categories: PropTypes.array,
  yoast_head_json: PropTypes.object,
  catName: PropTypes.string,
  item: PropTypes.object,
  titleClass: PropTypes.string,
  imgClass: PropTypes.string,
  sharePost: PropTypes.bool,
  showDesc: PropTypes.bool,
}