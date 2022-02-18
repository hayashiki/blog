import Grid from '@material-ui/core/Grid'
import {
  colors,
  Container,
  createStyles,
  List,
  ListItem,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { ArticleProps, Metadata } from '@/pages/articles/[slug]'
import Link from 'next/link'
import React, { useState } from 'react'
import Content from '@/views/Articles/Content'
import SearchInput from '@/views/Articles/Search'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nav: {
      marginTop: '2rem',
      marginBottom: '2rem',
      backgroundColor: 'white',
    },
    root: {
      // marginLeft: '1rem',
      // marginRight: '1rem',
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.primary,
    },
    noPaddingBottom: {
      paddingBottom: 0,
    },
    list: {},
    listItem: {
      cursor: 'pointer',
      paddingTop: 0,
      borderBottom: `1px solid ${colors.grey[200]}`,
    },
    listItemText: {},
    categories: {
      padding: theme.spacing(1),
      // border: `1px solid ${colors.grey[200]}`,
      // borderRadius: theme.spacing(2),
      // [theme.breakpoints.up('md')]: {
      //   padding: theme.spacing(3),
      // },
    },
    sectionTitle: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(3),
      },
    },
    tag: {
      padding: theme.spacing(1 / 2, 1),
      borderRadius: theme.spacing(1 / 2),
      background: theme.palette.primary.light,
      color: 'white',
      margin: theme.spacing(0, 1, 1, 0),
      cursor: 'pointer',
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 2, 2, 0),
      },
    },
  }),
)

type ArticlesProps = {
  articles: ArticleProps[]
}

const tags = ['GitHub', 'Workflow']

// const useQueryParams = <TParams>(): Partial<TParams> =>
//   qs.parse(useLocation().search) as any as Partial<TParams>

const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  const classes = useStyles()

  // params.query ||
  const [query, setQuery] = useState('')

  // useEffect(() => {
  //   setQuery(params.query || '');
  // }, [params.query]);

  const handleSearchSubmit = (query: string) => {
    // if (query) {
    //   history.push(paths.reviews({ query }));
    //   logEvent(firebase.analytics, 'search', { search_term: query });
    // }
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={9} className={classes.root}>
          <List disablePadding className={classes.list}>
            {articles.map((article: ArticleProps, i: number) => (
              <Link
                key={i}
                href="/articles/[slug]"
                as={'/articles/' + article.metadata.slug}
                passHref
              >
                <ListItem disableGutters className={classes.listItem}>
                  {/*<ListItemText className={classes.listItemText}*/}
                  {/*              primary={article.metadata.title}*/}
                  {/*/>*/}
                  <Content data={article.metadata} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Grid>
        <Grid item xs={3}>
          <div className={classes.categories}>
            <Typography
              variant="h6"
              color="textPrimary"
              gutterBottom
              className={classes.sectionTitle}
            >
              About Me
            </Typography>
          </div>
          {/* Search */}
          <SearchInput value={query} onChange={setQuery} onSubmit={handleSearchSubmit} />

          <div className={classes.categories}>
            <Typography
              variant="h6"
              color="textPrimary"
              gutterBottom
              className={classes.sectionTitle}
            >
              Tags
            </Typography>
            {tags.map((item, index) => (
              <Typography variant="caption" color="primary" className={classes.tag} key={index}>
                {item}
              </Typography>
            ))}
          </div>
        </Grid>
      </Grid>
      {/*</Section>*/}
    </Container>
  )
}

export default Articles
