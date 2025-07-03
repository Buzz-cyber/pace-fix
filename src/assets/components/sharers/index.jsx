"use client"

import PropTypes from "prop-types"

import { shareSocials, simpleSocials } from "../../data"
import "./style.css"

const formatShareUrl = (shareLink, link, name, title = "") => {
  /* Simple function to generate the share url needed for each social media share button. */
  // encode url for sharing
  link = encodeURIComponent(link)
  switch (name) {
    case "Whatsapp":
    case "Threads":
      shareLink = shareLink.concat(title, " ", link)
      break
    case "Twitter":
      shareLink = shareLink.concat(link, "&text=", title)
      break
    case "Telegram":
      shareLink = shareLink.concat(link, title)
      break
    default:
      shareLink = shareLink.concat(link)
      break
  }
  return shareLink
}

export const Sharers = ({ title }) => {
  const link = window.location.href
  return shareSocials.map((item, index) => {
    const shareLink = formatShareUrl(item.shareLink, link, item.name, title)

    return (
      <a
        key={index}
        className="m-1 border border-1 rounded d-flex text-dark sharer-icon"
        href={shareLink}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {item.icon}
      </a>
    )
  })
}

export const SimpleSharers = ({ title }) => {
  const link = window.location.href
  return (
    <div className="my-3">
      <p className="fw-bold fs-12 mb-2">Share this:</p>
      {simpleSocials.map((item, index) => {
        const shareLink = formatShareUrl(item.shareLink, link, item.name, title)
        return (
          <a
            className="btn btn-light p-2 my-1 me-1 text-capitalize border border-1 fs-11"
            href={shareLink}
            target="_blank"
            rel="nofollow noopener noreferrer"
            key={index}
          >
            {item.icon} {item.name}
          </a>
        )
      })}
    </div>
  )
}

Sharers.propTypes = {
  title: PropTypes.string.isRequired,
}
SimpleSharers.propTypes = {
  title: PropTypes.string.isRequired,
}
