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
		API_URL: '[API URL, include http or https]/app',
		// GA4_TRACKING: '[Uncomment and include GA4 code here]'
	}
}

module.exports = nextConfig
