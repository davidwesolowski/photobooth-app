const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');

const loadMode = (mode) => require(`./built-utils/webpack.${mode}`)();

module.exports = ({ mode }) => {
	return webpackMerge(
		{
			entry: './src/index.js',
			output: {
				path: path.join(__dirname, 'public/dist'),
				filename: 'bundle.js'
			},
			module: {
				rules: [
					{
						loader: 'babel-loader',
						test: /\.jsx?$/,
						exclude: /node_modules/
					},
					{
						test: /\.s?css$/,
						use: ['style-loader', 'css-loader', 'sass-loader']
					}
				]
			},
			plugins: [new webpack.ProgressPlugin()]
		},
		loadMode(mode)
	);
};
