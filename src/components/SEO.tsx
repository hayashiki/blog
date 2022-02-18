import Head from 'next/head'
import { useRouter } from 'next/router'
import { website } from '../../blog.config'
import { Metadata } from '@/pages/articles/[slug]'

type CommonSEOProps = {
  title: string
  description: string
  ogType: string
  ogImage: string
  twImage: string
}

const CommonSEO = ({ title, description, ogType, ogImage, twImage }: CommonSEOProps) => {
  const router = useRouter()
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta property="og:url" content={`${website.siteUrl}${router.asPath}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={website.title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      {/*{ogImage.constructor.name === 'Array' ? (*/}
      {/*  ogImage.map(({ url }) => <meta property="og:image" content={url} key={url} />)*/}
      {/*) : (*/}
      <meta property="og:image" content={ogImage} key={ogImage} />
      {/*)}*/}
      <meta name="twitter:card" content="summary_large_image" />
      {/*<meta name="twitter:site" content={siteMetadata.twitter} />*/}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twImage} />
    </Head>
  )
}

type PageSEOProps = {
  title?: string
  description?: string
}

export const PageSEO = ({ title, description }: PageSEOProps) => {
  title = title ? title : website.title
  description = description ? description : website.description

  return (
    <CommonSEO
      title={title}
      description={description}
      ogType="website"
      ogImage={website.siteLogo}
      twImage={website.siteLogo}
    />
  )
}

type BlogSeoProps = Metadata

export const BlogSEO = ({
  title,
  description,
  date,
  images,
  tags,
  slug,
  lastMod,
}: BlogSeoProps) => {
  const router = useRouter()
  const publishedAt = date // new Date(date).toISOString()
  // TODO: lastmod
  const modifiedAt = date //new Date(date || date).toISOString()
  const featuredImages = images.map((img) => {
    return {
      url: `${website.siteUrl}${img}`,
      alt: title,
    }
  })

  // let authorList
  // if (authorDetails) {
  //   authorList = authorDetails.map((author) => {
  //     return {
  //       '@type': 'Person',
  //       name: author.name,
  //     }
  //   })
  // } else {
  //   authorList = {
  //     '@type': 'Person',
  //     name: website.author,
  //   }
  // }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${website.siteUrl}articles/${slug}`,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: website.author, // ひとりだけなので
    publisher: {
      '@type': 'Organization',
      name: website.author,
      logo: {
        '@type': 'ImageObject',
        url: `${website.siteUrl}${website.siteLogo}`,
      },
    },
    description: description,
  }

  const twImageUrl = featuredImages[0].url

  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType="article"
        ogImage={twImageUrl}
        twImage={twImageUrl}
      />
      <Head>
        {date && <meta property="article:published_time" content={publishedAt} />}
        {lastMod && <meta property="article:modified_time" content={modifiedAt} />}
        <link rel="canonical" href={`${website.siteUrl}${router.asPath}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  )
}
