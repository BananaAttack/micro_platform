// vue.config.js
configureWebpack: config => {
    config.output.libraryTarget = 'system';
  
    config.devServer = {
      port: 666,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      disableHostCheck: true,
      historyApiFallback: true,
    };
  }
  