const path = require("path");
const HtmlWebpackPlugin =
    require("html-webpack-plugin");


module.exports = {

    mode: "development",

    entry: "./src/index.js",

    output: {

        path: path.resolve(
            __dirname,
            "dist"
        ),

        filename: "main.js",

        clean: true

    },


    module: {

        rules: [

            {
                test: /\.html$/i,
                loader: "html-loader"
            },

            {
                test: /\.css$/i,

                use: [
                    "style-loader",
                    "css-loader"
                ]

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

            directory: path.join(
                __dirname,
                "dist"
            )

        },

        port: 8080,

        open: true,

        hot: true

    }

};