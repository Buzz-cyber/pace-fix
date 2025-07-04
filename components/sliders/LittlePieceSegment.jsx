"use client"

import { useRouter } from "next/navigation"
import PropTypes from "prop-types"
import SafeImage from "../ui/SafeImage"
import { usePostContext } from "../../lib/context/general"

export const LittlePieceSegment = ({ title, yoast_head_json, item, id, slug }) => {
  let imageUrl
  try {
    imageUrl = yoast_head_json?.og_image?.[0]?.url || 
               yoast_head_json?.schema?.["@graph"]?.[2]?.url || 
               "/placeholder.svg"
  } catch (e) {
    imageUrl = "/placeholder.svg"
  }
  
  const router = useRouter()
  const { updatePostItem } = usePostContext()

  const handlePostClick = () => {
    updatePostItem(item)
    router.push(`/post/${id}/${slug}`)
  }

  return (
    <>
      <div className="border-bottom border-1 border-light py-3 d-flex align-items-center justify-content-between">
        <div className="w-30 p-2">
          <SafeImage
            src={imageUrl}
            alt="News Pic"
            width={75}
            height={75}
            className="w-100 rounded pointer"
            style={{ objectFit: "cover" }}
            onClick={handlePostClick}
          />
        </div>
        <div className="ms-2 w-75 fs-12 fw-bold">
          <span dangerouslySetInnerHTML={{ __html: title?.rendered }} className="pointer" onClick={handlePostClick} />
        </div>
      </div>
    </>
  )
}

LittlePieceSegment.propTypes = {
  title: PropTypes.object,
  yoast_head_json: PropTypes.object,
  item: PropTypes.object,
  slug: PropTypes.string,
  id: PropTypes.number,
}