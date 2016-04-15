module.exports = {
	entry: "ressources/sourcefiles/render.js",
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	module: {
	  loaders: [
		{
		  test: /\.jsx?$/,
		  exclude: /(node_modules|bower_components)/,
		  loader: 'babel', // 'babel-loader' is also a legal name to reference
		  query: {
			presets: ['react', 'es2015', 'stage-2']
		  }
		}
	  ]
	}
};