import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa6"

// Categories mapping
export const Categories = {
  1: "opinion",
  2: "politics", 
  3: "entertainment",
  4: "business/economy",
  5: "education",
  6: "news",
  7: "lifestyle",
  8: "interviews",
  9: "press release",
  10: "technology",
  11: "fashion",
  12: "novella",
  13: "sports",
  14: "religion",
  15: "health"
}

// Tags mapping
export const Tags = {
  1: "breaking",
  2: "trending",
  3: "featured",
  4: "exclusive",
  5: "analysis"
}

// Social media data
export const socials = [
  {
    name: "Facebook",
    word: "facebook",
    icon: <FaFacebook />,
    link: "https://facebook.com/pacesetterfrontier",
    pill_class: "btn-primary",
    limit: 1200
  },
  {
    name: "Twitter", 
    word: "twitter",
    icon: <FaTwitter />,
    link: "https://twitter.com/pacesetterfrontier",
    pill_class: "btn-info",
    limit: 800
  },
  {
    name: "Instagram",
    word: "instagram", 
    icon: <FaInstagram />,
    link: "https://instagram.com/pacesetterfrontier",
    pill_class: "btn-danger",
    limit: 600
  },
  {
    name: "LinkedIn",
    word: "linkedin",
    icon: <FaLinkedin />,
    link: "https://linkedin.com/company/pacesetterfrontier",
    pill_class: "btn-dark",
    limit: 400
  },
  {
    name: "Whatsapp",
    word: "whatsapp",
    icon: <FaWhatsapp />,
    link: "https://whatsapp.com/channel/0029VaGnbXuCsU9Si7zguy0S",
    pill_class: "btn-success",
    limit: 300
  }
]

// Share socials for posts
export const shareSocials = [
  {
    name: "Facebook",
    icon: <FaFacebook />,
    shareLink: "https://www.facebook.com/sharer/sharer.php?u="
  },
  {
    name: "Twitter", 
    icon: <FaTwitter />,
    shareLink: "https://twitter.com/intent/tweet?url="
  },
  {
    name: "WhatsApp",
    icon: <FaWhatsapp />,
    shareLink: "https://wa.me/?text="
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    shareLink: "https://www.linkedin.com/sharing/share-offsite/?url="
  }
]

// Simple share socials
export const simpleSocials = [
  {
    name: "facebook",
    icon: <FaFacebook />,
    shareLink: "https://www.facebook.com/sharer/sharer.php?u="
  },
  {
    name: "twitter",
    icon: <FaTwitter />,
    shareLink: "https://twitter.com/intent/tweet?url="
  },
  {
    name: "whatsapp",
    icon: <FaWhatsapp />,
    shareLink: "https://wa.me/?text="
  }
]

// Navigation menu
export const navMenu = [
  { name: "home", link: "" },
  { name: "about us", link: "about-us" },
  { name: "contact us", link: "contact-us" },
  {
    name: "columns",
    links: [
      { name: "opinion" },
      { name: "politics" },
      { name: "entertainment" },
      { name: "business/economy" },
      { name: "education" },
      { name: "news" },
      { name: "lifestyle" },
      { name: "interviews" },
      { name: "press release" },
      { name: "technology" },
      { name: "fashion" },
      { name: "novella" },
      { name: "sports" },
      { name: "religion" },
      { name: "health" }
    ]
  },
  {
    name: "more",
    links: [
      { name: "privacy policy", link: "/privacy-policy" },
      { name: "terms and conditions", link: "/terms-and-conditions" },
      { name: "advertise", link: "https://news.pacesetterfrontier.com/enter" }
    ]
  }
]