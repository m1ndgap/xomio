const path = require(`path`);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: path.resolve(__dirname, './src/js/index.js'),
    output: {
        filename: "bundle-[hash].js",
        path: path.join(__dirname, `public`)
    },
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        useLocalIp: true,
        contentBase: path.join(__dirname, `public`),
        open: false,
        port: 1337,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: `babel-loader`,
                },
            },
            {
                test: /\.(s(a|c)ss)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false,
                            esModule: false,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: false,
                        },
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|woff|woff2)$/,
                exclude: [
                    path.resolve(__dirname, './node_modules'),
                ],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[hash].[ext]',
                        outputPath: 'assets',
                        publicPath: '',
                    },
                },
            },
            {
                test: /\.twig$/,
                use: [
                    'raw-loader',
                    {
                        loader: 'twig-html-loader',
                        options: {
                            namespaces: {
                                'layouts': 'layout',
                                'components': '/',
                            },
                            functions: {
                                repeat(value, times) {
                                    return new Array(times + 1).join(value);
                                }
                            },
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style.css",
            chunkFilename: "[id].css",
        }),
        new HtmlWebpackPlugin({
            template: 'index.twig'
        }),
    ],
    devtool: `source-map`,
};
