"use client"

import { useEffect, useState } from "react"
import BusinessEconomy from "./BusinessEconomy"
import Education from "./Education"
import Entertainment from "./Entertainment"
import Fashion from "./Fashion"
import HeroSlider from "./HeroSlider"
import Health from "./Health"
import Interviews from "./Interviews"
import Lifestyle from "./Lifestyle"
import News from "./News"
import Novella from "./Novella"
import Opinion from "./Opinion"
import Politics from "./Politics"
import PressRelease from "./PressRelease"
import Religion from "./Religion"
import Sports from "./Sports"
import Technology from "./Technology"
import SideBar from "./SideBar"

import { Layout } from ".."
import { Adverts } from "../../components"

import "./index.css"

const Welcome = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Resize function that only runs on client
    const resizePostListings = () => {
      if (typeof window === "undefined") return
      
      const innerWidth = window.innerWidth
      if (innerWidth <= 770) return null
      
      const sideBarDiv = document.getElementById("my-side-bar")
      const postLists = document.getElementById("my-post-listing")
      
      if (!sideBarDiv || !postLists) return
      
      let height = 0
      for (const div of sideBarDiv.children) height += div.clientHeight
      height = height += 150
      
      postLists.style.height = `${height}px`
    }

    // Resize after component mounts and DOM is ready
    const timer = setTimeout(resizePostListings, 4000)
    
    return () => clearTimeout(timer)
  }, [])

  if (!isClient) {
    return null // or a loading spinner
  }

  return (
    <Layout>
      <HeroSlider />
      <div className="row">
        <div className="col-md-9 mt-5" id="my-post-listing">
          <News />
          <Adverts index={1} />
          <Politics />
          <Adverts index={2} />
          <Opinion />
          <Adverts index={3} />
          <PressRelease />
          <Adverts index={4} />
          <Entertainment />
        </div>
        <div className="col-md-3 p-md-4" id="my-side-bar">
          <SideBar />
        </div>
      </div>
      <div className="row m-auto my-5 px-2 w-75-lg">
        <div className="col-md-12">
          <Interviews />
        </div>
        <Adverts index={5} />
      </div>
      <div className="row m-auto my-5 px-2 w-75-lg">
        <div className="col-md-12">
          <Lifestyle />
        </div>
      </div>
      <div className="row my-5 px-2">
        <div className="col-md-6">
          <BusinessEconomy />
        </div>
        <div className="col-md-6">
          <Technology />
        </div>
      </div>
      <div className="row m-auto my-5 px-2 w-75-lg">
        <div className="col-md-12">
          <Education />
        </div>
      </div>
      <div className="row my-5 px-2">
        <div className="col-md-6">
          <Fashion />
        </div>
        <div className="col-md-6">
          <Novella />
        </div>
      </div>
      <div className="row m-auto my-5 px-2 w-75-lg">
        <div className="col-md-12">
          <Sports />
        </div>
      </div>
      <div className="row my-5 px-2">
        <div className="col-md-6">
          <Religion />
        </div>
        <div className="col-md-6">
          <Health />
        </div>
        <div className="col-md-10 offset-md-1">
          <Adverts index={5} />
        </div>
      </div>
    </Layout>
  )
}

export default Welcome