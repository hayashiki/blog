import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Metadata } from '@/pages/articles/[slug]'

type Props = {
  data: Metadata
}

const useStyles = makeStyles(theme => ({
  section: {
    marginTop: theme.spacing(2),

    marginBottom: theme.spacing(2),
    // [theme.breakpoints.up('md')]: {
    //   marginBottom: theme.spacing(4),
    // },
  },
}));

const Content = ({ data } :Props): JSX.Element => {
  const classes = useStyles()

  return (
    <div className={classes.section}>
      <Box paddingBottom={2}>
        <Typography component="span" variant={'h6'} color="textPrimary">{data.date}</Typography>
      </Box>
      <Box paddingBottom={2}>
        <Typography component="h1" variant={'h1'}>{data.title}</Typography>
      </Box>
      <Typography component="p" variant={'body2'}>{data.description}</Typography>
    </div>
  )
}

export default Content
