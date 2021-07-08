const path = require( 'path' );
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const mode = process.env.MODE || 'production'

module.exports = {
    mode: mode,
    entry: ['./src/index.js'],

    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'build/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.style\.css$/,
                use: [ MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]_[sha1:hash:hex:7]'
                            }
                        }
                    },
                ]
            },
            {
                test: /^((?!\.style).)*css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin( {
            filename: 'build/[name].css'
        } ),

        new HTMLWebpackPlugin( {
            filename: 'index.html',
            template: path.resolve( __dirname, 'src/index.html' ),
            minify: false,
        } ),
    ],

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    optimization: {
        splitChunks: {
            minSize: 100000,
            maxSize: 500000,
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    chunks: 'initial',
                    test: /node_modules/,
                    priority: -10
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    chunks: 'initial',
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
    },

    performance: {
        hints: false,
    },
    stats: {
        children: true
    },
    
    devtool: mode === "production" ? false : 'source-map'

};