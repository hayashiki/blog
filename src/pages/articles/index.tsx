import { GetStaticProps, NextPage } from "next";
import path from "path";
import { promises as fs } from "fs";
import dayjs from "dayjs";
import Link from "next/link";

type Props = {
  posts: {
    date: string;
    title: string;
    fileName: string;
  }[];
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div id="post-list-container">
      {posts.map(({ date, title, fileName }) => (
        <Link key={date} href={`/posts/${fileName.replace(".md", "")}`}>
          <a>{`${dayjs(date).format("YYYY-MM-DD HH:mm (ddd)")} ${title}`}</a>
        </Link>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const markdownDir = path.resolve(
    process.cwd(),
    "src/pages/articles/contents"
  );
  const fileNames = await fs.readdir(markdownDir);

  const posts = fileNames.map((fileName) => {
    const date = fileName.split("_")[0];
    const title = fileName.replace(".md", "").replace(/^[\d]{14}_/, "");
    return { date, title, fileName };
  });
  posts.sort((a, b) => Number(b.date) - Number(a.date));

  return {
    props: {
      posts,
    },
  };
};

export default Home;
