module.exports = {
    entry: './app/scripts/main.js',
    output: {
        path: './build/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.coffee$/,
            loader: 'coffee-loader'
        }, {
            test: /\.sass$/,
            loader: "sass!css!style"
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015','react']
            }
        }]
    }
};



// var path = require("path")
// var webpack = require("webpack")

// module.exports = {
//   entry: [
//     'webpack-dev-server/client?http://127.0.0.1:9090',
//     'webpack/hot/only-dev-server',
//     './app/scripts/main.jsx'
//   ],
//   output: {
//     publicPath: 'http://127.0.0.1:9090/build/bundle.js',
//     // path: './build/',
//     path: __dirname + '/build/',
//     filename: 'bundle.js'
//   },
//   module: {
//     //加载器配置
//     loaders: [
//       { 
//         test: /\.css$/, 
//         loader: 'style!css'
//       },
//       {
//         test: /\.(png|jpg|gif)$/, 
//         loader: 'url?limit=8142&name=img/[name].[ext]'
//       }
//       // ,
//       // {
//       //   test: /app\/scripts\/.js$/, 
//       //   exclude:  [/bower_components/, /node_modules/],
//       //   loader: "uglify"
//       // }
//       ,
//       // {
//       //   test: /app\/scripts\/.jsx?$/, 
//       //   exclude:  /node_modules/,
//       //   loader: 'babel-loader!jsx-loader?harmony'
//       // },
//       {
//         test: /app\/scripts\/.jsx?$/,
//         exclude: /(node_modules|bower_components)/,
//         loader: 'babel', // 'babel-loader' is also a legal name to reference
//         query: {
//             presets: ['es2015','react']
//         }
//       }
//     ]
//   }
//   // ,
//   // plugins: [
//   //   new webpack.HotModuleReplacementPlugin()
//   // ]
// }


