"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PiDotsThreeOutlineVerticalDuotone } from "react-icons/pi"
import { TfiSearch, TfiUser } from "react-icons/tfi"
import { SlMenu } from "react-icons/sl"

import { navMenu } from "../../data"
import MobileSide from "./MobileSide"
import TopLogo from "../../images/top-logo.png"

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [displayNav, setDisplayNav] = useState(false)
  const router = useRouter()

  const HandleSubmit = (e) => {
    e.preventDefault()
    const term = searchTerm.trim()
    // Go to search page if criteria is met.
    if (term.length > 0) router.push(`/search/${term}`)
    setSearchTerm("")
    // close search modal.
    const closeButton = document.getElementById("search-modal-close")
    if (closeButton) closeButton.click()
  }

  return (
    <div className="p-3 border-bottom border-1 sticky-sm">
      <div className="container">
        <div className="d-flex justify-content-between">
          <Link href={"/"}>
            <img src={TopLogo || "/placeholder.svg"} alt="Pacesetter" height={70} />
          </Link>
          <div className="d-flex align-items-center fs-4 pointer">
            <div className="nav-body me-3 hide-on-sm">
              {navMenu.map((item, index) => (
                <div key={index} className={`text-uppercase fs-13 mx-2 hover-red ${item.links && "my-dropdowns"}`}>
                  <Link href={item.links ? "#" : `/${item.link}`} className="fw-bold-5 text-dark text-decoration-none">
                    {item.name} {item.links && <PiDotsThreeOutlineVerticalDuotone />}
                  </Link>
                  {item.links && (
                    <ul className="my-dropdown-container">
                      {item.links.map((address, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={
                              address.link
                                ? address.link
                                : item.name.toLowerCase() === "columns"
                                  ? `/category/${address.name}`
                                  : `/${address.name}`
                            }
                            className="text-capitalize my-dropdown-item"
                            target={address.link ? `_blank` : undefined}
                            rel={address.link ? "noreferrer" : undefined}
                          >
                            {address.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <TfiSearch className="mx-2 hover-red" data-bs-toggle="modal" data-bs-target="#searchModal" />
            <a href="https://news.pacesetterfrontier.com/enter" rel="noreferrer" className="p-1 px-2" target="_blank">
              <TfiUser className="mx-2 hover-red" />
            </a>
            <SlMenu className="mx-2 hover-red fw-bold hide-on-lg" onClick={(e) => setDisplayNav(!displayNav)} />
          </div>
        </div>
      </div>

      {/*Search Component*/}
      <div className="modal fade mt-5" id="searchModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="search-modal-close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="search"
                className="form-control"
                placeholder="Input search keyword and press enter."
                value={searchTerm}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    HandleSubmit(e)
                  }
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Side bar */}
      <MobileSide menus={navMenu} display={displayNav} />
    </div>
  )
}

export default NavBar
