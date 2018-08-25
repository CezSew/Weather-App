const path = require('path');

module.exports = {
    entry: ['./src/main.js', './src/styles/Main.scss'],
    output: {
        path: path.join(__dirname, 'public'),
        filename:'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        { 
            test:/\.scss$/,
            use:['style-loader','css-loader', 'sass-loader']
         }]
    }
};