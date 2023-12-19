/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
	webpackDevMiddleware: config => { // Poll for edits, recompile
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
	env: {
		API_URL: '[API URL, include http or https]/app'
	}
}

module.exports = nextConfig
