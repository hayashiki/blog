const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    env: {
        VERSION: require('./package.json').version,
    },
    experimental: {
        sprFlushToDisk: false,
    },
    trailingSlash: true,
}

module.exports = nextConfig

//const isProd = process.env.NODE_ENV === 'production'
//
// const nextConfig = {
//     // target: 'serverless',
//
//     env: {
//         VERSION: require('./package.json').version,
//         FIREBASE_PROJECT_ID: 'oimonote',
//     },
//
//     experimental: {
//         sprFlushToDisk: false,
//     }
// }
//
// module.exports = nextConfig
