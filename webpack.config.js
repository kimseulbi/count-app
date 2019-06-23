const debug = process.env.NODE_ENV !== "production";
const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

// webpack은 번들링 
module.exports = {
    entry: "./src/index.js",
    output: {
        publicPath: "/",
        path: path.join(__dirname, "dist"),
        // [name]변수처럼 
        filename: "js/[name].bundle.min.js",
        chunkFilename: "js/[name].bundle.js"
    },
    devServer: {
        inline: true,
        contentBase: "./src",
        port: 3000,
        historyApiFallback: true
    },
    // devtool 크롬 개발환경 
    devtool: debug ? "cheap-module-eval-source-map" : false,
    resolve: {
        extensions: [".js", ".jsx"]
    },
    // babel-loader로 통해서 연결 babel  연결 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["@babel/env", "@babel/preset-react"],
                    plugins: [
                        "@babel/plugin-proposal-class-properties", // 생성자 키워드 안써도 됨
                        "@babel/plugin-syntax-dynamic-import",
                        "@babel/plugin-proposal-object-rest-spread", // [...]
                        ["@babel/plugin-proposal-decorators", { legacy: true }] // @문법 사용 
                    ]
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: debug
                    ? [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                    : [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
            },
            {
                test: /\.(eot|ttf|woff|woff2|otf|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 100000,
                            name: "./assets/fonts/[name].[ext]"
                            // publicPath: '../'
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/images/"
                        }
                    }
                ]
            }
        ]
    },
    plugins: debug
        ? [
            new CircularDependencyPlugin({
                // exclude detection of files based on a RegExp
                exclude: /a\.js|node_modules/,
                // add errors to webpack instead of warnings
                failOnError: true,
                // set the current working directory for displaying module paths
                cwd: process.cwd()
            }),
            new HtmlWebpackPlugin({
                template: "./public/index.html"
            })
        ]
        : [
            // define NODE_ENV to remove unnecessary code
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify("production")
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
            // extract imported css into own file
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new HtmlWebpackPlugin({
                template: "./src/index.html"
                // minify: {
                //   collapseWhitespace: true,
                //   removeAttributeQuotes: false
                // }
            }),
            new CompressionPlugin({
                test: /\.(html|css|js|gif|svg|ico|woff|ttf|eot)$/,
                exclude: /(node_modules)/
            }),
            new BundleAnalyzerPlugin()
        ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    ie8: true,
                    safari10: true,
                    sourceMap: true
                }
            })
        ]
    }
}