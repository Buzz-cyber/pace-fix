"use client"

import PropTypes from "prop-types"
import Image from "next/image"

import UseFetch from "../../../custom/UseFetch"

const AltImage = "/placeholder.svg"

const Adverts = ({ index, hideLabel = false }) => {
  let image = AltImage
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}promotions/`
  
  try {
    const { loading, data } = UseFetch(url, "adverts")
    if (loading) image = AltImage
    else {
      image = data[index]?.image_file || AltImage
    }
  } catch (e) {
    console.error(e)
    image = AltImage
  }

  return (
    <div className="text-center my-4">
      <p className={hideLabel ? "d-none" : ""}>
        <b>
          <small>Advertisement</small>
        </b>
      </p>
      <Image
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