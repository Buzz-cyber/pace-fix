"use client"

import axios from "axios"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaPaperPlane, FaPhone } from "react-icons/fa6"

import { Layout } from ".."
import "./style.css"

const Contact = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}email/`

  const HandleSubmit = (e) => {
    e.preventDefault()
    if (!name) toast.error("Name wasn't provided.")
    if (!email) toast.error("Email Address wasn't provided.")
    if (!message) toast.error("Message wasn't provided.")
    if (message && name && email) {
      // Make a call to the backend contact api.
      axios
        .post(url, { full_name: name, email_address: email, subject, message })
        .then((res) => {
          // Send toast message and clear form.
          toast.success("Message Sent!")
          setName("")
          setMessage("")
          setSubject("")
          setEmail("")
        })
        .catch((err) => {
          const details = err.response.data
          const status = err.response.status
          if (status !== 200) {
            toast.warning(`😭 ${err.message}`)
            if (typeof details === "object") {
              // Loop through object
              for (const detailsKey in details) {
                const message = `${detailsKey}: ${details[detailsKey]}`
                toast.warning(message)
              }
            }
          } else {
            toast.success("Message Sent 😁")
            //   Clear form
            setEmail("")
            setMessage("")
            setName("")
            setSubject("")
          }
        })
    }
  }

  return (
    <Layout>
      <div className="post-container my-5">
        <ToastContainer />
        <div className="row">
          <div className="col-md-12">
            <div className="contact-form">
              <div className="row justify-content-center">
                <div className="col-lg-10 col-md-12">
                  <div className="wrapper">
                    <div className="row justify-content-center">
                      <div className="col-lg-8 mb-5 text-center">
                        <h3 className="mb-4 text-center fw-bold">Advertise with Us.</h3>
                        <p>
                          We offer electronic and print media ads. This gives us a unique control and edge over the
                          market.
                        </p>
                        <p>For advert engagement, reach our ad team through thepacesetter03@gmail.com or 08184441324</p>
                        <div className="row my-5 text-center">
                          <div className="col-md-6">
                            <h5 className={"fw-bold"}>Enugu Office</h5>
                            16-18 Chief Emeka Ebila Street, Off Eso Bus Stop, Agbani Road, Enugu.
                          </div>
                          <div className="col-md-6">
                            <h5 className={"fw-bold"}>Abuja Office</h5>
                            93A Kwame Nkrumah Crescent, By ECOWAS Secretariat, Asokoro, Abuja.
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8 mb-5">
                        <div className="row mt-1">
                          <h3 className="mb-4 text-center fw-bold"> Get in touch with us </h3>
                          <div className="col-md-6">
                            <div className="dbox w-100 text-center">
                              <div className="icon d-flex align-items-center justify-content-center">
                                <FaPhone />
                              </div>
                              <div className="text">
                                <p>
                                  <span>Phone:</span> <a href="tel:+2349137940957">+ 234 913-794-0957</a>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="dbox w-100 text-center">
                              <div className="icon d-flex align-items-center justify-content-center">
                                <FaPaperPlane />
                              </div>
                              <div className="text">
                                <p>
                                  <span>Emails:</span>{" "}
                                  <a href="mailto:admin@pacesetterfrontier.com">admin@pacesetterfrontier.com</a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <div className="contact-wrap">
                          <div id="form-message-warning" className="mb-4 w-100 text-center"></div>
                          <form
                            method="POST"
                            id="contactForm"
                            onSubmit={HandleSubmit}
                            className="contactForm"
                            noValidate="novalidate"
                          >
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <textarea
                                    className="form-control"
                                    cols="30"
                                    rows="8"
                                    value={message}
                                    placeholder="Message"
                                    onChange={(e) => setMessage(e.target.value)}
                                  ></textarea>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="d-grid">
                                  <input type="submit" value="Send Message" className="btn btn-danger fw-bold" />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
