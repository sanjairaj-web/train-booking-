const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",

    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        clean: true
    },

    module: {
        rules: [

            // HTML
            {
                test: /\.html$/i,
                loader: "html-loader"
            },

            // CSS
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },

            // JavaScript
            {
                test: /\.js$/i,
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, "dist")
        },

        port: 8080,

        open: true,

        hot: true
    },

    devtool: "source-map"
};