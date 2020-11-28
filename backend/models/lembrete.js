const moongose = require ('mongoose');

const lembreteSchema = moongose.Schema({
  dataHoje: {type: String, default:'dd/MM/yyyy', required:true},
  dataPrev: {type: String, default:'dd/MM/yyyy', required:true},
  nome: {type: String, required:true},
  conteudoLembrete: {type: String, required:false},
  imagemURL: {type: String, require: false}
})
module.exports = moongose.model('Lembrete', lembreteSchema);
