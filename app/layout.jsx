import { Inter, Poppins, Raleway, Montserrat } from 'next/font/google'
import { ScrollToTop } from "../src/assets/custom/Utils"
import "../src/index.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Providers from "../src/assets/providers/Providers"
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-poppins'
})
const raleway = Raleway({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '700'],
  variable: '--font-raleway'
})
const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['200', '400', '700'],
  variable: '--font-montserrat'
})

export const metadata = {
  title: {
    default: "Pacesetter Frontier Magazine - Setting the pace and leaving strides in time",
    template: "%s | Pacesetter Frontier Magazine"
  },
  description: "Pacesetter Frontier Magazine is a privately owned, quarterly published, multimedia, multi-connect, cosmopolitan, print and online magazine established in 2020 and headquartered in Enugu.",
  keywords: ["news", "magazine", "Nigeria", "politics", "entertainment", "business", "education", "lifestyle", "Enugu", "frontier", "pacesetter"],
  authors: [{ name: "Pacesetter Frontier Magazine" }],
  creator: "Pacesetter Frontier Magazine",
  publisher: "Pacesetter Frontier Magazine",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pacesetterfrontier.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Pacesetter Frontier Magazine",
    description: "Setting the pace and leaving strides in time",
    url: 'https://pacesetterfrontier.com',
    siteName: 'Pacesetter Frontier Magazine',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Pacesetter Frontier Magazine Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pacesetter Frontier Magazine',
    description: 'Setting the pace and leaving strides in time',
    creator: '@pacesetterfrontier',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${raleway.variable} ${montserrat.variable}`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-3536158399576400" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Providers>
          <ScrollToTop>{children}</ScrollToTop>
        </Providers>
        
        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3536158399576400"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        {/* Mailchimp Script */}
        <Script
          id="mailchimp-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/41cf0c45a5141cbfb27bfc3fd/bfb1cf43be183f753e97814fb.js");`
          }}
        />
        
        {/* Bootstrap JavaScript */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
          integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}