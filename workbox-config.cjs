module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{png,css,js,svg,jpg,html}'
	],
	swDest: 'dist/sw.js',
	// ignoreURLParametersMatching: [
	// 	/^utm_/,
	// 	/^fbclid$/
	// ],
	swSrc: 'src/serviceWorker.js',
	
};