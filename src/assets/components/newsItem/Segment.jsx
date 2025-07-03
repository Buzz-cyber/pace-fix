"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import PropTypes from "prop-types"
import { AuthorTime, ViewComment } from "../metaInfo"
import { usePostContext } from "../../context"

import "./style.css"
const AltImage = "/placeholder.svg"
import { SimpleSharers } from "../sharers"
import { truncateExcerpt } from "../../custom"

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
  const [imgLoaded, setImgLoaded] = useState(true)
  const imageUrl = imgLoaded ? yoast_head_json?.og_image?.[0]?.url || AltImage : AltImage
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
        <Image
          src={imageUrl}
          alt="News Image"
          width={400}
          height={300}
          style={{ display: "none" }}
          onError={() => setImgLoaded(false)}
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

export const TextFirstSegment = ({ yoast_head_json, title, excerpt, date, item, id, slug }) => {
  const imageUrl = yoast_head_json?.og_image?.[0]?.url || AltImage
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

export const LittlePieceSegment = ({ title, yoast_head_json, item, id, slug }) => {
  const [imgLoaded, setImgLoaded] = useState(true)
  let imageUrl
  try {
    imageUrl = imgLoaded ? yoast_head_json?.og_image?.[0]?.url || AltImage : AltImage
  } catch (e) {
    imageUrl = imgLoaded ? yoast_head_json?.schema?.["@graph"]?.[2]?.url || AltImage : AltImage
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
          <Image
            src={imageUrl}
            alt="News Pic"
            width={75}
            height={75}
            className="w-100 rounded pointer"
            style={{ objectFit: "cover" }}
            onClick={handlePostClick}
            onError={() => setImgLoaded(false)}
          />
        </div>
        <div className="ms-2 w-75 fs-12 fw-bold">
          <span dangerouslySetInnerHTML={{ __html: title?.rendered }} className="pointer" onClick={handlePostClick} />
          <ViewComment />
        </div>
      </div>
    </>
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

TextFirstSegment.propTypes = {
  id: PropTypes.number,
  date: PropTypes.string,
  title: PropTypes.object,
  excerpt: PropTypes.object,
  yoast_head_json: PropTypes.object,
  item: PropTypes.object,
  slug: PropTypes.string,
}

LittlePieceSegment.propTypes = {
  title: PropTypes.object,
  yoast_head_json: PropTypes.object,
  item: PropTypes.object,
  slug: PropTypes.string,
  id: PropTypes.number,
}