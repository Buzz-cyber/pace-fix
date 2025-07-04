"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import SafeImage from "./SafeImage"
import { useFetch } from "../../lib/hooks/useFetch"

const Adverts = ({ index, hideLabel = false }) => {
  const [isClient, setIsClient] = useState(false)
  const [image, setImage] = useState("/placeholder.svg")
  
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}promotions/`
  const { loading, data } = useFetch(url, "adverts")

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && !loading && data && data[index]) {
      setImage(data[index]?.image_file || "/placeholder.svg")
    }
  }, [isClient, loading, data, index])

  if (!isClient) {
    return (
      <div className="text-center my-4">
        <p className={hideLabel ? "d-none" : ""}>
          <b>
            <small>Advertisement</small>
          </b>
        </p>
        <SafeImage
          src="/placeholder.svg"
          alt={`Advert ${index}`}
          width={400}
          height={300}
          className={"img-thumbnail rounded advert-img-max-height"}
          style={{ objectFit: "cover" }}
        />
      </div>
    )
  }

  return (
    <div className="text-center my-4">
      <p className={hideLabel ? "d-none" : ""}>
        <b>
          <small>Advertisement</small>
        </b>
      </p>
      <SafeImage
        src={image}
        alt={`Advert ${index}`}
        width={400}
        height={300}
        className={"img-thumbnail rounded advert-img-max-height"}
        style={{ objectFit: "cover" }}
      />
    </div>
  )
}

Adverts.propTypes = {
  index: PropTypes.number.isRequired,
  hideLabel: PropTypes.bool,
}

export default Adverts