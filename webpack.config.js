const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        library: 'customScript',
        libraryTarget: 'amd',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        https: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    }
};

