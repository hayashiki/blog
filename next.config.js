const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    env: {
        VERSION: require('./package.json').version,
    },
    experimental: {
        sprFlushToDisk: false,
    }
}

module.exports = nextConfig
