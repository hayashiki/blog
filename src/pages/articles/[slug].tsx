import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Article from '@/views/Article/Article'
import { getFilenames, getFileContentWithMeta } from '@/lib/fileInfo'
import { BlogSEO } from '@/components/SEO'
import BaseLayout from '@/layouts/BaseLayout'

export type ArticleProps = {
  metadata: Metadata
  contents: string
}

export type Metadata = {
  title: string
  slug: string
  timestamp: string
  date: string
  description: string
  tags: Array<string>
  images: Array<string>
  lastMod?: string
}

const ArticlePage: React.FC<ArticleProps> = ({ contents, metadata }) => {
  return (
    <>
      <BlogSEO
        title={metadata.title}
        date={metadata.date}
        description={metadata.description}
        images={metadata.images}
        slug={metadata.slug}
        tags={metadata.tags}
        timestamp={metadata.timestamp}
      />
      <BaseLayout themeMode={'light'}>
        <Article metadata={metadata} contents={contents} />
      </BaseLayout>
    </>
  )
}

export default ArticlePage

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = getFilenames()
  return {
    paths: filenames.map((filename) => ({
      params: {
        slug: filename,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (!ctx.params) {
    return { props: {} }
  }
  const { slug } = ctx.params

  if (!slug) {
    return { props: {} }
  }

  const parsed = getFileContentWithMeta(slug)[0]
  return {
    props: {
      contents: parsed.content,
      metadata: parsed.data,
    },
  }
}
