/**
 * Caution: Consider this file when using NextJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using GatsbyJS or react-scripts version
 */
import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { website } from '@/../blog.config'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta charSet="utf-8" />
          <link
            rel="apple-touch-icon"
            type="image/png"
            href="/assets/apple-touch-icon-180x180.png"
          />
          <link rel="icon" type="image/png" href="/assets/icon-192x192.png" />

          {/*<meta name="theme-color" content="#ffffff" />*/}
          {/*<meta*/}
          {/*  name="description"*/}
          {/*  content="A modern design system for your new landing and web pages."*/}
          {/*/>*/}
          {/*<meta*/}
          {/*  name="robots"*/}
          {/*  content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"*/}
          {/*/>*/}
          {/*<meta property="og:locale" content="ja_JP" />*/}
          {/*<meta property="og:type" content="website" />*/}
          {/*<meta property="og:image" content="" />*/}
          {/*<meta property="og:title" content="hayashida.dev | TechBlog" />*/}
          {/*<meta property="og:description" content="web pages created by hayashiki" />*/}
          {/*<meta property="og:url" content="" />*/}
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans+JP&display=swap"
            rel="stylesheet"
          />
          <script src="https://kit.fontawesome.com/4c273e6d43.js" crossOrigin="anonymous" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${website.googleAnalytics}`}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${website.googleAnalytics}');
              `,
            }}
          />
        </body>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  }
}
