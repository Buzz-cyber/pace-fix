"use client";

import { Layout } from "..";
import HeroSlider from "./HeroSlider";
import "./index.css";
import { Adverts, Common, SideMain } from "../../components";

const SECTION_NAMES = [
  "News",
  "Politics",
  "Opinion",
  "World News",
  "Press Release",
  "African News",
  "Business & Economy",
  "Interviews",
  "Entertainment",
  "Fashion",
  "Tech",
  "Lifestyle",
  "Health",
  "Education",
  "Sports",
];

export default function WelcomeClient({ heroPosts, sectionPosts, sidebarPosts }) {
  return (
    <Layout>
      <HeroSlider initialPosts={heroPosts} />

      <div className="my-5 container">
        <div className="row">
          <div className="col-lg-8">
            {SECTION_NAMES.map((name, i) => (
              <div key={name}>
                <Common name={name} start={0} initialPosts={sectionPosts?.[name] || []} />
                <Adverts index={i + 1} />
              </div>
            ))}
          </div>

          <div className="col-lg-4 px-lg-5">
            <SideMain initialPosts={sidebarPosts} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

