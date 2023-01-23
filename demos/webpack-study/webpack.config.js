const path = require("path");

module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader:  path.resolve(__dirname, 'loaders/my-style-loader1.js')},
                    { loader:  path.resolve(__dirname, 'loaders/my-style-loader2.js')},
                    "css-loader"
                ]
            },
        ],
    },
};
