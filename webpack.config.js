const path = require('path');

module.exports = {
    entry: {
        bundle: './src/index.js',
        panelReusing: './src/examples/panel-reusing/panel-reusing-example.js',
        rbAccount: './src/examples/rb-account/rb-account-example.js',
        inlineVideo: './src/examples/inline-videos/render-inline-video-example.js',
        resolveImageUrl: './src/examples/images/image-sources.js',
        resolveTranslation: './src/examples/translations/resolve-translation-example.js',
        storedQueries: './src/examples/stored-queries/stored-queries-example.js'
    },
    mode: 'development',
    output: {
        library: 'customScript',
        libraryTarget: 'amd',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
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
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: "markdown-loader",
                        options: {
                            /* your options here */
                        }
                    }
                ]
            }
        ]
    }
};

