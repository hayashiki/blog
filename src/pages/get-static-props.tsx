import React from 'react'
import Link from 'next/link'
import fetch from 'node-fetch'

type Props = {
  stars: number
}

function Index({ stars }: Props) {
  return (
    <div>
      <p>Next.js has {stars} ⭐️</p>
      <Link href="/get-static-props">
        <a>Go to getStaticProps</a>
      </Link>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return {
    props: {
      stars: json.stargazers_count,
    },
  }
}

export default Index
