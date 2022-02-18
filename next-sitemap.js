/**
 * @type {import('next-sitemap').IConfig}
 */

module.exports = {
  siteUrl: 'https://hayashida.dev',
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: [],
  outDir: 'public',
};
