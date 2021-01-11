const path = require('path');

module.exports = {
	entry: {
		app: ['@babel/polyfill', './src/app.js'],
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'app.bundle.js',
	},
	devServer: {
		contentBase: './public',
		watchContentBase: true,
		inline: true,
		hot: true,
		stats: 'errors-only',
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['@babel/preset-env'],
				},
			},
		],
	},
};
