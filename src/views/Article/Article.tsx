import React, { ReactNode } from 'react'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import breaks from 'remark-breaks'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Variant } from '@material-ui/core/styles/createTypography'
import {
  Box,
  Grid,
  Link,
  makeStyles,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import { ArticleProps } from '@/pages/articles/[slug]'
import Section from '@/components/Section'
// import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { okaidia as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import coy from 'react-syntax-highlighter/dist/cjs/styles/prism/coy'
import { Theme } from '@material-ui/core/styles/createMuiTheme'

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
  li: {
    // eslint-disable-next-line no-magic-numbers
    marginTop: theme.spacing(1),
  },
  // listItem: {
  //   '& > p::before': {
  //     content: '"-"',
  //     marginRight: theme.spacing(1),},
  //
  // },
  noPaddingBottom: {
    paddingBottom: 0,
  },
  p: {
    fontWeight: theme.typography.fontWeightLight,
    textAlign: 'justify',
  },
  tags: {
    padding: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
  },
  tag: {
    padding: theme.spacing(1 / 2, 1),
    borderRadius: theme.spacing(1 / 2),
    background: theme.palette.secondary.light,
    color: 'white',
    margin: theme.spacing(0, 1, 1, 0),
    cursor: 'pointer',
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, 2, 2, 0),
    },
  },
  root: {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    wordBreak: 'break-word',
    '& .anchor-link': {
      marginTop: -96,
      position: 'absolute',
    },
    paddingTop: 0,
  },
}))

const Article: React.FC<ArticleProps> = ({ contents, metadata }) => {
  const classes = useStyles()
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <div>
        <Section className={classes.noPaddingBottom}>
          <>
            <Grid item xs={12} className="section-header__title-wrapper">
              <Typography variant="h1" align="center">
                {metadata.title}
              </Typography>
            </Grid>
            <Grid container justify={'center'} alignItems="center" wrap="nowrap">
              <div className={classes.tags}>
                {metadata.tags.map((item, index) => (
                  <Typography variant="caption" color="primary" className={classes.tag} key={index}>
                    {item}
                  </Typography>
                ))}
              </div>
            </Grid>
          </>
        </Section>
        <Section className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <ReactMarkdown source={contents} plugins={[gfm, breaks]} renderers={renderers} />
            </Grid>
          </Grid>
        </Section>
      </div>
    </>
  )
}

export default Article

type PrismRenderProps = {
  value: string
  language?: string
}

const CodeBlock: React.FC<PrismRenderProps> = ({ language, value }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={theme}
      showLineNumbers={false}
      customStyle={{ fontSize: 'inherit', background: '#282c34' }}
    >
      {value}
    </SyntaxHighlighter>
  )
}

const renderers = {
  code: CodeBlock,
  link: (props: { href: string; children: ReactNode }) => {
    return <Link href={props.href}>{props.children}</Link>
  },
  heading: (props: { level?: 1 | 2 | 3 | 4 | 5; children: ReactNode }) => {
    const classes = useStyles()
    let variant: Variant
    switch (props.level) {
      case 1:
        variant = 'h2'
        break
      case 2:
        variant = 'h3'
        break
      case 3:
        variant = 'subtitle1'
        break
      case 4:
        variant = 'subtitle2'
        break
      default:
        variant = 'h6'
        break
    }
    return (
      <Box mt={4} mb={4}>
        <Typography gutterBottom variant={variant}>
          {props.children}
        </Typography>
      </Box>
    )
  },
  paragraph: (props: { children: ReactNode }) => {
    const classes = useStyles()
    return (
      <Typography
        classes={{ body2: classes.p }}
        gutterBottom
        component="p"
        variant="body2"
        paragraph
      >
        {props.children}
      </Typography>
    )
  },
  span: (props: { children: ReactNode }) => {
    const classes = useStyles()
    return (
      <Typography classes={{ body2: classes.p }} component="span" variant="body2" paragraph>
        {props.children}
      </Typography>
    )
  },
  // list: (props: { children: ReactNode }) => {
  //   return (
  //     <ui>{props.children}</ui>
  //   );
  // },
  listItem: (props: { children: ReactNode }) => {
    const classes = useStyles()
    return (
      <li className={classes.li}>
        <Typography component="span">{props.children}</Typography>
      </li>
    )
  },
  table: MarkdownTable,
  tableHead: MarkdownTableHead,
  tableBody: MarkdownTableBody,
  tableRow: MarkdownTableRow,
  tableCell: MarkdownTableCell,
  image: ({ src, alt }: { src: string; alt: string }) => <Image src={src} label={alt} />,
}

interface IImageProps {
  src?: string
  label: string
}

export const Image = ({ src, label }: IImageProps) => <img src={src} alt={label} />

function MarkdownTable(props: { children: ReactNode }) {
  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        {props.children}
      </Table>
    </TableContainer>
  )
}

function MarkdownTableCell(props: { children: ReactNode }) {
  return <TableCell>{props.children}</TableCell>
}

function MarkdownTableRow(props: { children: ReactNode }) {
  return <TableRow>{props.children}</TableRow>
}

function MarkdownTableBody(props: { children: ReactNode }) {
  return <TableBody>{props.children}</TableBody>
}

function MarkdownTableHead(props: { children: ReactNode }) {
  return <TableHead>{props.children}</TableHead>
}
