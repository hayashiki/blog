import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Article from "@/views/Article/Article";
import WithLayout from "@/layouts/WithLayout";
import Minimal from "@/layouts/Minimal";
import { getFilenames, getFileContentWithMeta } from "@/lib/fileInfo";

export type ArticleProps = {
  metadata: Metadata;
  contents: string;
};

export type Metadata = {
  title: string;
  slug: string;
  timestamp: string;
  date: string;
  tag: string;
  description: string;
  tags: Array<string>;
};

const ArticlePage: React.FC<ArticleProps> = ({ contents, metadata }) => {
  return (
    <WithLayout
      component={Article}
      layout={Minimal}
      contents={contents}
      metadata={metadata}
    />
  );
};

export default ArticlePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = getFilenames();
  return {
    paths: filenames.map((filename) => ({
      params: {
        slug: filename,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (!ctx.params) {
    return { props: {} };
  }
  const { slug } = ctx.params;

  if (!slug) {
    return { props: {} };
  }

  const parsed = getFileContentWithMeta(slug)[0];
  return {
    props: {
      contents: parsed.content,
      metadata: parsed.data,
    },
  };
};

// あとでみる
// https://github.com/zhangzinn/zhangzinn.github.io/blob/e911bd38959e9c522631ecdb50fd836c87d36c29/src/pages/posts/%5Bslug%5D.tsx
// export const getStaticPaths: GetStaticPaths = async () => {
//     const markdownDir = path.resolve(process.cwd(), 'data');
//     const fileNames = await fs.readdir(markdownDir);
//
//     const paths = fileNames.map(fileName => ({
//         params: { slug: `${fileName.replace('.md', '')}` },
//     }));
//
//     return { paths, fallback: false };
// };
//
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//     const fileName = `${params.slug}.md`;
//     const markdownDir = path.resolve(process.cwd(), 'data');
//     const fileContents = await fs.readFile(`${markdownDir}/${fileName}`, 'utf8');
//
//     return {
//         props: {
//             title: fileName.replace('.md', '').replace(/^[\d]{8}_[\d]+_/, ''),
//             contents: fileContents,
//         },
//     };
// };
