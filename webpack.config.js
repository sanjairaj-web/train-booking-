const path = require("path");

const HtmlWebpackPlugin =
    require("html-webpack-plugin");


module.exports = {

    // =========================
    // MODE
    // =========================

    mode: "development",


    // =========================
    // ENTRY
    // =========================

    entry: "./src/index.js",


    // =========================
    // OUTPUT
    // =========================

    output: {

        path: path.resolve(
            __dirname,
            "dist"
        ),

        filename: "main.js",

        clean: true

    },


    // =========================
    // MODULE
    // =========================

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
            }

        ]

    },


    // =========================
    // PLUGINS
    // =========================

    plugins: [

        new HtmlWebpackPlugin({

            template: "./index.html"

        })

    ],


    // =========================
    // DEV SERVER
    // =========================

    devServer: {

        static: {

            directory: path.join(
                __dirname,
                "dist"
            )

        },

        port: 8080,

        open: true,

        hot: true,

        historyApiFallback: true

    }

};