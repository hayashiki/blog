import { GetStaticProps } from 'next'
import { getFileContentWithMeta, getFilenames } from '@/lib/fileInfo'
import { ArticleProps } from '@/pages/articles/[slug]'
import React from 'react'
import Articles from '@/views/Articles/Articles'
import { PageSEO } from '@/components/SEO'
import BaseLayout from '@/layouts/BaseLayout'

type PageProps = {
  articles: ArticleProps[]
}

export default function ArticlesPage({ articles }: PageProps) {
  return (
    <>
      <PageSEO />
      <BaseLayout themeMode={'light'}>
        <Articles articles={articles} />
      </BaseLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const files = getFilenames()
  const articles = getFileContentWithMeta(files).map((file) => {
    return {
      metadata: file.data,
      contents: file.content,
    }
  }) as ArticleProps[]
  articles.sort((a, b) => dateSortDesc(a.metadata.date, b.metadata.date))
  return {
    props: {
      articles: articles,
    },
  }
}

export function dateSortDesc(a: number | string, b: number | string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}
