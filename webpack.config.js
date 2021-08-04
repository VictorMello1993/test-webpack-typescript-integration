//WEBPACK É BASEADO EM SISTEMA DE MÓDULOS PARA DEFINIR AS TAREFAS (WORKFLOW) A SEREM EXECUTADAS NO PROJETO
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'production', //Ou pode configurar para ambiente de desenvolvimento caso queira que gere arquivo não minificado 
  entry: './src/main.ts', //Arquivo de entrada,

  //Executando o auto-load da aplicação (semelhante ao Live-Server ou nodemon)
  devServer: { 
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    hot: true //Atualiza a aplicação sempre que houver modificações nos arquivos
  },

  output: {
    filename: 'app.min.js', //Arquivo final que será gerada (saída). Como está em modo de produção, será gerado um arquivo minificado
    path: path.join(__dirname, 'dist') //A pasta que será gerada na build
  },
  plugins: [
    new CopyPlugin({
      patterns:[
        {from: 'public'}, //Por padrão, serão copiados os arquivos contidos da pasta de origem (public) para a pasta de destino em que foi definida na propriedade output (dist)
      ]
    })
  ],
  resolve: {
    extensions: ['.ts', '.js'] //Resolvendo as extensões .ts e .js no sistema de módulos
  },
  module: {
    //Regras que definem a build do projeto
    rules: [{
      test: /\.ts$/, //A partir dos arquivos .ts
      use: 'ts-loader', //Executar o compilador do Typescript para gerar arquivos .js
      exclude: /node_modules/
    }]
  }
}