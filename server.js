var Webpack = require("webpack")
var WebpackDevServer = require("webpack-dev-server");
var config = require('./webpack.config.js');

new WebpackDevServer(Webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  noInfo: false,
  historyApiFallback: true
}).listen(9090, '127.0.0.1', function(err, result){
  if(err){
    console.log(err);
  }
  console.log('Listening on http://127.0.0.1:9090');
})

