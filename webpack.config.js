let webpack = require('webpack');
let path = require('path');

module.exports = {
    entry:{
        app:['./dist/main.js','./dist/main.scss'],
        vendor:['vue','axios']
    },
    output:{
        path: path.resolve(__dirname,'public'),
        filename:'[name].js',
        publicPath:'./public'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader'
            },
            {
                test: /\.scss$/,
                use:[
					{
						loader: 'file-loader',
						options: {
							name: 'style.css',
						}
					},
					{
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'sass-loader'
					}
				]
            }
        ]
    },
    resolve:{
        alias:{
            'vue$' : 'vue/dist/vue.esm.js'
        }
    }
}