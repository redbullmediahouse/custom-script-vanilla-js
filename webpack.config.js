const path = require('path');
const uuid = require('uuid');

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
        uniqueName: `custom-script-${uuid.v4()}`,
        library: {
            name:'customScript',
            type: 'amd'
        },
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: ''
    },
    devServer: {
        port: 8080,
        static: {
            directory: path.join(__dirname, 'dist')
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        compress: true,
        https: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'css-loader' }
                ]
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

