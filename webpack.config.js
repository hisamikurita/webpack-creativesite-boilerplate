const path = require('path');
const dotenv = require('dotenv');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const { optimizeImage } = require('./.squooshrc');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
dotenv.config();

const mode = process.env.NODE_ENV;
const srcRelativePath = process.env.WEBPACK_SRC_RELATIVE_PATH || 'src';
const distRelativePath = process.env.WEBPACK_DIST_RELATIVE_PATH || 'dist';

const config = {
    mode: mode,
    entry: {
        app: [
            path.resolve(__dirname, `${srcRelativePath}/assets/scripts/app.js`),
            path.resolve(__dirname, `${srcRelativePath}/assets/stylesheets/app.scss`),
        ]
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'initial'
        }
    },
    output: {
        path: path.resolve(__dirname, `${distRelativePath}/assets`),
        filename: 'scripts/[name].js'
    },
    module: {
        rules: [
            {
                test: [/\.js$/],
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        "modules": false
                                    }
                                ]
                            ],
                        }
                    }
                ]
            },
            {
                test: [/\.scss$/, /\.css$/],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ["autoprefixer", { grid: true }],
                                ],
                            },
                        },
                    },
                    {
                        loader: 'sass-loader'
                    },
                ]
            },
            {
                test: [/\.(glsl|vs|fs|vert|frag)$/],
                exclude: /node_modules/,
                use: [
                    'raw-loader', 'glslify-loader'
                ]
            }
        ]
    },
    target: 'web',
    plugins: [
        new BrowserSyncPlugin({
            host: process.env.WEBPACK_BROWSER_SYNC_HOST || 'localhost',
            port: process.env.WEBPACK_BROWSER_SYNC_PORT || 3000,
            proxy: process.env.WEBPACK_BROWSER_SYNC_PROXY || false,
            server: process.env.WEBPACK_BROWSER_SYNC_PROXY ? false : distRelativePath,
            open: false,
            files: [distRelativePath],
            injectChanges: true,
        }),
        new CleanWebpackPlugin,
        new StylelintPlugin({ configFile: path.resolve(__dirname, '.stylelintrc.js') }),
        new ESLintPlugin({
            extensions: ['.js'],
            exclude: 'node_modules'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, `${srcRelativePath}/assets/images`),
                    to: 'images/[name][ext]',
                    noErrorOnMissing: true,
                    transform: {
                        transformer: mode === 'production' ? optimizeImage : content => content
                    }
                }
            ]
        }),
        new ImageminWebpWebpackPlugin({
            config: [{
                test: /\.(jpe?g|png)$/i,
                options: {
                    quality: 60
                },
            }],
        }),
        new MiniCssExtractPlugin({
            filename: 'stylesheets/[name].css'
        }),
    ],
}

if (mode === 'development') {
    config.devtool = 'source-map';
}

module.exports = config;
