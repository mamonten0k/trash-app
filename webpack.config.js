const path = require('path');
const resolve = require('resolve');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
                include: path.resolve(__dirname, './src'),
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.css'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: true,
            typescript: {
                typescriptPath: resolve.sync('typescript', {
                    basedir: path.resolve(__dirname, './node_modules'),
                }),
                configOverwrite: {
                    compilerOptions: {
                        sourceMap: true,
                        skipLibCheck: true,
                        inlineSourceMap: false,
                        declarationMap: false,
                        noEmit: true,
                        incremental: true,
                        tsBuildInfoFile: path.resolve(__dirname, './node_modules/.cache/tsconfig.tsbuildinfo'),
                    },
                },
                context: path.resolve(__dirname, '.'),
                diagnosticOptions: {
                    syntactic: true,
                },
                mode: 'write-references',
            },
            issue: {
                include: [{ file: '../**/src/**/*.{ts}' }, { file: '**/src/**/*.{ts}' }],
            },
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
