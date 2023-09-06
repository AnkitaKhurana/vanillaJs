module.exports = {
    mode: "none",
    entry: [
        './src/index.js',
        './src/index.css'
      ],
    output: {
        path: __dirname + "/dist",
        filename: 'bundle.js'
    },
    devServer: {
        historyApiFallback: true,
        static: './',
        devMiddleware: {
            writeToDisk: true,
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1,
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    }
};