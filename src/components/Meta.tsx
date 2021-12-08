import React from 'react'
import Head from 'next/head'

type MetaProps = {
  title: string
  description: string
  canonical?: string
  image?: string
}

// <Meta title={page?.page_title} description={page?.page_description} />
const Meta: React.FC<MetaProps> = ({ title, description, canonical, image }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta name="og:description" property="og:description" content={description} />
    <meta property="og:site_name" content="hayashiki blog" />
    <meta property="og:url" content={`${canonical}`} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content="@hayashiki" />
    <meta name="twitter:creator" content="@hayashiki" />
    {image ? (
      <meta property="og:image" content={`${image}`} />
    ) : (
      <meta property="og:image" content="TODO:default image" />
    )}
    {image && <meta name="twitter:image" content={`${image}`} />}
    {canonical && <link rel="canonical" href={`${canonical}`} />}
  </Head>
)

export default Meta
