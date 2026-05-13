import WelcomeClient from "../src/assets/pages/welcome/WelcomeClient"
import { Categories } from "../src/assets/data"

export const metadata = {
  title: "Home | Pacesetter Frontier Magazine",
  description: "Welcome to Pacesetter Frontier Magazine. Stay updated with the latest news, articles, and features across various categories.",
  openGraph: {
    title: "Home | Pacesetter Frontier Magazine",
    description: "Welcome to Pacesetter Frontier Magazine. Stay updated with the latest news, articles, and features across various categories.",
    url: "https://pacesetterfrontier.com/",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Pacesetter Frontier Magazine Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | Pacesetter Frontier Magazine",
    description: "Welcome to Pacesetter Frontier Magazine. Stay updated with the latest news, articles, and features across various categories.",
    images: ["/logo.png"],
  },
};

export const revalidate = 30; // Revalidate every 30 seconds for fresh content

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

function categoryIdByName(name) {
  for (const [id, label] of Object.entries(Categories)) {
    if (label === name) return Number(id);
  }
  // Fallback to News
  return 6;
}

async function fetchJson(url) {
  // Use no-store for ads/promotions to always get fresh data
  const isAds = url.includes('promotions');
  const fetchOptions = isAds
    ? { cache: 'no-store' }
    : { next: { revalidate } };
  const res = await fetch(url, fetchOptions);
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const base = process.env.NEXT_PUBLIC_API_URL;
  const heroUrl = `${base}posts?per_page=10`;
  const sidebarUrl = `${base}posts?per_page=12`;

  const sectionFetches = SECTION_NAMES.map(async (name) => {
    const categoryId = categoryIdByName(name);
    const url = `${base}posts?categories=${categoryId}&per_page=12`;
    const posts = await fetchJson(url);
    return [name, Array.isArray(posts) ? posts : []];
  });

  const [heroPosts, sidebarPosts, sectionPairs] = await Promise.all([
    fetchJson(heroUrl),
    fetchJson(sidebarUrl),
    Promise.all(sectionFetches),
  ]);

  const sectionPosts = Object.fromEntries(sectionPairs);

  return (
    <WelcomeClient
      heroPosts={Array.isArray(heroPosts) ? heroPosts : []}
      sidebarPosts={Array.isArray(sidebarPosts) ? sidebarPosts : []}
      sectionPosts={sectionPosts}
    />
  );
}
