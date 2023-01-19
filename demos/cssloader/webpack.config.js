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
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ]
            },
            // {
            //     test: /\.(png|jpg|jpeg|webp)$/,
            //     type: "asset",
            // }
        ],
    },
};
