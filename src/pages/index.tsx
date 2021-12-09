import { GetStaticProps } from 'next'
import { getFileContentWithMeta, getFilenames } from '@/lib/fileInfo'
import { ArticleProps, Metadata } from '@/pages/articles/[slug]'
import React from 'react'
import WithLayout from '@/layouts/WithLayout'
import Minimal from '@/layouts/Minimal'
import Articles from '@/views/Articles/Articles'

type PageProps = {
  articles: ArticleProps[]
}

export default function ArticlesPage({ articles }: PageProps) {
  return <WithLayout component={Articles} layout={Minimal} articles={articles} />
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const files = getFilenames()
  const articles = getFileContentWithMeta(files).map((file) => {
    console.log(file)
    return {
      metadata: file.data,
      contents: file.content,
    }
  }) as ArticleProps[]

  // TODO: sort timestampでおこなう？
  // articles.sort((a, b) => Number(b.date) - Number(a.date));

  return {
    props: {
      articles: articles,
    },
  }
}
