"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

import { Layout } from ".."
import SideBar from "./SideBar"
import {
  Adverts,
  Disclaimer,
  PostTitle,
  Sharers,
  SimpleSharers,
  BottomRecent,
  ArticleTitle,
  CommentDetails,
  WhatsappChannel,
} from "../../components"
import { usePostContext } from "../../context"
import { Tags } from "../../data"

import "./style.css"
import { UseFetch } from "../../custom"
import { Preloader } from "../../components/loaders"

const addGoogleAds = (paragraphs) => {
  const script0 = `
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3536158399576400"
         crossorigin="anonymous">
    </script>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-3536158399576400"
         data-ad-slot="9096348399"
         data-ad-format="auto"
         data-full-width-responsive="true">
    </ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
`
  const script1 = `
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3536158399576400"
         crossorigin="anonymous">
    </script>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-3536158399576400"
         data-ad-slot="7380011854"
         data-ad-format="auto"
         data-full-width-responsive="true">
    </ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
`

  let count = 0
  const adScripts = {
    0: script0,
    1: script1,
  }

  for (const index in paragraphs) {
    if (index % 4 === 0) {
      const addition = `
            <div class="ad-container">${adScripts[count]}</div>
          `
      paragraphs[index] = paragraphs[index] + addition

      if (count === 0) count = 1
      else count = 0
    }
  }
  return paragraphs
}

const PostPage = ({ initialPost }) => {
  const [imgLoaded, setImgLoaded] = useState(true)
  const { postItem, updatePostItem } = usePostContext()
  
  const [currentPost, setCurrentPost] = useState(initialPost || postItem)
  
  const newsID = typeof window !== "undefined" ? window.location.pathname.split("/")[2] : ""
  const url = `${process.env.NEXT_PUBLIC_API_URL}posts/${newsID}`
  
  const shouldFetch = !currentPost || Object.keys(currentPost).length === 0
  const { loading, data } = UseFetch(shouldFetch ? url : null, `post_${newsID}`)

  useEffect(() => {
    if (initialPost) {
      setCurrentPost(initialPost)
      updatePostItem(initialPost)
    } else if (data && !loading) {
      setCurrentPost(data)
      updatePostItem(data)
    }
  }, [initialPost, data, loading, updatePostItem])

  if (shouldFetch && loading) {
    return <Preloader />
  }

  if (!currentPost || Object.keys(currentPost).length === 0) {
    return <div>Post not found</div>
  }

  const { title, yoast_head_json = {}, content, categories = [], id, tags = [] } = currentPost
  
  const ogImage = yoast_head_json.og_image?.[0]?.url || 
                  yoast_head_json.schema?.["@graph"]?.[2]?.url || 
                  "/placeholder.svg"
  
  const imageUrl = imgLoaded ? ogImage : "/placeholder.svg"
  const imgCaption = yoast_head_json.schema?.["@graph"]?.[2]?.caption || ""
  let information = content?.rendered || ""

  const addAdvertToNewsInfo = (html) => {
    if (!html) return ""
    
    html = html.split("</p>")
    let count = 1
    let existingAdvert = typeof window !== "undefined" ? sessionStorage.getItem("pacesetter_adverts") : null
    if (existingAdvert) {
      try {
        existingAdvert = JSON.parse(existingAdvert)
        for (const index in html) {
          if (index % 3 === 0) {
            if (count >= 5) break
            else if (count < 5 && existingAdvert[count]?.image_file) {
              const advertImage = `
              <div class="text-center my-4">
                <p>
                  <b>
                    <small>Advertisement</small>
                  </b>
                </p>
                <img
                  src=${existingAdvert[count].image_file}
                  alt="Advert ${count}"
                  class="img-thumbnail rounded advert-img-max-height"
                />
          </div>
      `
              html[index] = html[index] + advertImage
              count++
            }
          }
        }
      } catch (e) {
        console.error("Error parsing adverts from session storage:", e)
      }
    }
    html = addGoogleAds(html)
    html = html.join("")
    html = html.replace(/width="\d+"/g, 'width="100%"').replace(/height="\d+"/g, "")

    return html
  }

  try {
    information = addAdvertToNewsInfo(information)
  } catch (e) {
    console.error("Error joining advert images to post.", e)
    information = content?.rendered || ""
  }

  if (!title?.rendered) {
    return <div>Invalid post data</div>
  }

  return (
    <Layout>
      <div className="post-container my-5">
        <div className="row">
          <div className="col-md-9">
            <Adverts index={0} />
            <div className="row">
              <div className="col-md-1 sharers">
                <Sharers title={yoast_head_json.title || title.rendered} />
              </div>
              <div className="col-md-11 post-head">
                <div className="post-image-holder text-center">
                  <Image 
                    src={imageUrl} 
                    alt={title.rendered || "Post Image"} 
                    width={800}
                    height={500}
                    className="shadow rounded"
                    style={{ objectFit: "cover" }}
                    onError={() => setImgLoaded(false)}
                    priority
                  />
                </div>
                {imgCaption && (
                  <p className="fw-bold mx-auto mt-2 text-muted">
                    <small>{imgCaption}</small>
                  </p>
                )}
              </div>
            </div>
            <div className="row my-1 align-items-start">
              <div className="col-md-12 px-0">
                <PostTitle title={title.rendered} details={yoast_head_json} categories={categories} />
                <div dangerouslySetInnerHTML={{ __html: information }} className="news-holder pe-md-3" />
                <SimpleSharers title={yoast_head_json.title || title.rendered} />
                <WhatsappChannel />
                <Disclaimer category={categories} />
                <CommentDetails post_id={id} />
                <Adverts index={5} />
                {tags && tags.length > 0 && (
                  <div className="mb-3">
                    <span className="badge rounded-pill bg-dark">Tags</span>
                    {tags.map((tag, index) => (
                      <small key={index} className="badge rounded-pill bg-light ms-2 text-muted">
                        {Tags[tag] || `Tag ${tag}`}
                      </small>
                    ))}
                  </div>
                )}
                <div className="mb-5">
                  <ArticleTitle title="related posts" width={30} />
                </div>
                <BottomRecent categories={categories} />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <SideBar />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PostPage