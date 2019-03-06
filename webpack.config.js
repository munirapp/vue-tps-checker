let webpack = require('webpack');
let path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
    },
    plugins:[
        new webpack.optimize.MinChunkSizePlugin({
            names: ['vendor']
        })
    ]
};

if(process.env.NODE_ENV === 'production'){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap:true,
            compress:{
                warnings:false
            }
        })
    );
    module.exports.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV:'production'
            }
        })
    )
}

