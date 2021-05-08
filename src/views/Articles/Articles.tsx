import Grid from "@material-ui/core/Grid";
import {
  createStyles,
  List,
  ListItem,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { ArticleProps } from "@/pages/articles/[slug]";
import Link from "next/link";
import React from "react";
import Section from "@/components/Section";

const useGrid = makeStyles((theme: Theme) =>
  createStyles({
    nav: {
      marginTop: "2rem",
      marginBottom: "2rem",
      backgroundColor: "white",
    },
    root: {
      marginLeft: "1rem",
      marginRight: "1rem",
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.primary,
    },
    noPaddingBottom: {
      paddingBottom: 0,
    },
  })
);

type ArticlesProps = {
  articles: ArticleProps[];
};

const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  const classes = useGrid();

  return (
    <Section className={classes.noPaddingBottom}>
      <Grid item xs={6} className={classes.root}>
        <List>
          {articles.map((article: ArticleProps, i: number) => (
            <ListItem key={i}>
              <Link
                href="/articles/[slug]"
                as={"/articles/" + article.metadata.slug}
                passHref
              >
                <div>{article.metadata.title}</div>
              </Link>
              <div>{article.metadata.date}</div>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Section>
  );
};

export default Articles;
