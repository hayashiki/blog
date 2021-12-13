import React from 'react'
import Link from 'next/link'
import fetch from 'node-fetch'

type Props = {
  stars: number
}

function Index({ stars }: Props) {
  console.log("Index 1214")

  return (
    <div>
      <p>Next.js has {stars} ⭐️</p>
      <Link href="/get-server-side-props">
        <a>Go to getServerSideProps</a>
      </Link>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return {
    props: {
      stars: json.stargazers_count,
    },
  }
}

export default Index
