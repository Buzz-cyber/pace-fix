"use client"

import PropTypes from "prop-types"

import UseFetch from "../../../custom/UseFetch"

const AltImage = "/src/assets/images/default_advert.jpg"

const Adverts = ({ index, hideLabel = false }) => {
  let image = AltImage
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}promotions/`
  // Ensure default image is used when server is not accessible.
  try {
    const { loading, data } = UseFetch(url, "adverts")
    if (loading) image = AltImage
    else {
      image = data[index].image_file
      if (!image) image = AltImage
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
      <img
        src={image || "/placeholder.svg"}
        alt={`Advert ${index}`}
        className={"img-thumbnail rounded advert-img-max-height"}
      />
    </div>
  )
}

Adverts.propTypes = {
  index: PropTypes.number.isRequired,
}

export default Adverts
