"use client"

import { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"

const UseFetch = (url, cacheName = "") => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getData = useCallback(async () => {
    if (!url || !isClient) return

    try {
      // We checked if it's cached and then retrieve it.
      const storageName = `pacesetter_${cacheName}`
      const storageDetails = sessionStorage.getItem(storageName)

      if (storageDetails) {
        setData(JSON.parse(storageDetails))
        setLoading(false)
      } else {
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
        setLoading(false)

        // Cache data if cache name is given.
        if (cacheName) sessionStorage.setItem(storageName, JSON.stringify(data))
      }
    } catch (error) {
      console.log("Fetch Error occurred.")
      console.error(error)
      setLoading(false)
    }
  }, [url, cacheName, isClient])

  useEffect(() => {
    getData()
  }, [getData])

  return { loading, data }
}

UseFetch.propTypes = {
  url: PropTypes.string,
  cacheName: PropTypes.string,
}

export default UseFetch