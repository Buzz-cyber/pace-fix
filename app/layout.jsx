import { ScrollToTop } from "../src/assets/custom/Utils"
import "../src/index.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Providers from "../src/assets/providers/Providers"

export const metadata = {
  title: "Pacesetter Frontier Magazine",
  description: "Pacesetter Frontier Magazine - Setting the pace and leaving strides in time",
  icons: {
    icon: "/logo.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-3536158399576400" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;700&family=Poppins:wght@300;400;700&family=Raleway:wght@200;300;400;500;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;700&family=Poppins:wght@300;400;700&family=Raleway:wght@200;300;400;500;700&display=swap"
          media="print"
          onLoad="this.media='all'"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
          integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
          crossOrigin="anonymous"
        ></script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3536158399576400"
          crossOrigin="anonymous"
        ></script>
        <script id="mcjs">
          {`!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/41cf0c45a5141cbfb27bfc3fd/bfb1cf43be183f753e97814fb.js");`}
        </script>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Providers>
          <ScrollToTop>{children}</ScrollToTop>
        </Providers>
      </body>
    </html>
  )
}
