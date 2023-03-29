const path = require('path'); //path 불러와서 아래 output에서 사용
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'NumberBaseball',
    mode: 'development', //배포할때 production
    devtool: 'eval', //빠르게 실행
    resolve: {
        extensions: ['.js', '.jsx'] //확장자    
    },

    entry: { //입력
        app: ['./client'], //배열형식으로 여러개 파일 설정 가능
    }, 

    module: {
        rules: [{ //적용할 규칙들
            test: /\.jsx?/, //적용할 파일: js, jsx 파일
            loader: 'babel-loader',
            options: { //babel 옵션
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties', 'react-refresh/babel'],
            }
        }], 
    },

    plugins: [
        new RefreshWebpackPlugin()
    ],

    output: { //출력
        path: path.join(__dirname, 'dist'), //dist 폴더 안의 app.js로 만들어줌, __dirname(현재 폴더)
        filename: 'app.js',
        publicPath: '/dist/',
    }, 

    devServer: {
        publicPath: '/dist/',
        hot: true,
    },
    server:{
        historyApiFallback:true,
        filename: 'app.js',
        publicPath: '/webpackbuild/',
    }
};