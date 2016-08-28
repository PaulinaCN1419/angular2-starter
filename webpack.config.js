let webpack = require('webpack');
let HtmlWebpackPlugin = require ('html-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    output: {
        path : './dist',
        filename: 'app.bundle.js'
    },

    /// las extensiones que soporta webpack
    resolve:{
        alias: {
            materializecss: 'materialize-css/dist/css/materialize.css',
            materialize: 'materialize-css/dist/js/materialize.js',
        },
        extensions:['', '.js', '.ts', '.html', '.css', '.styl'],

    },
    module:{
        loaders:[
            {
                test:/\.ts$/,
                loader:'ts-loader'         ///loader para archivos typescript
            },
            {
                test:/\.html$/,
                loader:'raw-loader'         ///loader para archivos con extension .html
            },
            { test: /\.css$/,   loader: 'raw-loader' },
            { 
                test: /\.css$/,             
                loader: 'style-loader!css-loader'  
            },
            {
                test:/\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader' //usa css-loader para añadir reglas css  
            },
            {
                test: /materialize-css\/dist\/js\/materialize\.js/,
                loader: 'imports?materializecss'
            },
            { test: /materialize\.css$/,   loader: 'style-loader!css-loader' },
            { test: /^((?!materialize).)*\.css$/,   loader: 'raw-loader' },
        ]
    },
     ////////////Plugin para añadir nib a stylus 
    stylus: {
        use: [ require('nib')() ],
        import: ['~nib/lib/nib/index.styl']
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'Cientifico UNL',
            template: './src/index.html'
        }),
        /*Plugin dentro de webpack que permite añadir una variable de entorno a nuestro proyecto
            asi nuestra variable de entorno servira a angular conocer en que ambiente queremos estar
            production o environment en el archivo main.ts. Aqui se usa la variable de entorno con node.js
        */    
        new webpack.DefinePlugin({
            app:{
                environment:JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
            }
        })
    ]
} 