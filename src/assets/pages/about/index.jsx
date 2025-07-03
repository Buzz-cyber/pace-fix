"use client"

import { FaMapLocation, FaSquareEnvelope, FaPager } from "react-icons/fa6"

import { Layout } from ".."

const About = () => (
  <Layout>
    <div className="container my-5 py-5">
      <h1 className="fw-bold text-uppercase mb-5">Pacesetter Frontier Magazine</h1>
      <p>
        Pacesetter Frontier Magazine is a privately owned, quarterly published, multimedia, multi-connect, cosmopolitan,
        print and online magazine established in 2020 and headquartered in Enugu with a market audience and base cutting
        across 11 states of Nigeria's 36 states and the nation's capital, Abuja.
      </p>
      <p>
        Our interests are across multiple sectors from Politics, News, Economy, Religion and Education to Lifestyle,
        Culture, Women, Health, Events, etc. Our editions are the Easter, Democracy, Independence and Christmas/New Year
        editions. Upon request, we also publish Special Editions.{" "}
      </p>
      <p>
        We are a leading electronic and print media magazine committed to making a stride in time; we care about quality
        content. Our hard copies are published quarterly, distributed and sold. This makes us one of the widely read
        magazines you can find around.
      </p>
      <p>
        In 2021, observing the chasm that existed between those in government and those governed, the dearth of a major
        public-private sector platform for reviews and cross-fertilization of development ideas, and poised to
        contribute to an informed society, acknowledging outstanding contributors to its development, our team
        spearheaded Frontier Discourse.
      </p>
      <p>
        This initiative has spurred robust discussions on inclusive peace, responsible governance, societal progress and
        development. The unique lecture topics, thoughtful speaker selection, transparent awardees' selection process
        and impeccable execution have set it apart. It counts captains of industries, spiritual leaders, traditional
        rulers, politicians, youths, civil & non-governmental organizations, professional bodies, secondary school
        students, university undergraduates and honored Nigerians as guests.
      </p>
      <div className="row my-5 text-center">
        <div className="col-md-4">
          <p className="text-center fs-1 text-danger">
            <FaMapLocation />
          </p>
          16-18 Chief Emeka Ebila Street, Off Eso Bus Stop Agbani Road, Enugu
        </div>
        <div className="col-md-4 text-center">
          <p className="text-center fs-1 text-danger">
            <FaPager />{" "}
          </p>
          Call
          <a href="tel:+2349137940957" className="text-decoration-none text-danger fw-bold">
            {" "}
            +234 913 794 0957
          </a>
        </div>
        <div className="col-md-4">
          <p className="text-center fs-1 text-danger">
            <FaSquareEnvelope />
          </p>
          <a href="mailto:admin@pacesetterfrontier.com" className="text-decoration-none text-danger">
            admin@pacesetterfrontier.com
          </a>
        </div>
      </div>
    </div>
  </Layout>
)

export default About
