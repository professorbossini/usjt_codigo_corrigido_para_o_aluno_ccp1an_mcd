const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email:{ type: String, required: true, lowercase: true},
  login:{ type: String, required: true},
  senha:{type: String, required: true},
  createdAt:{type: Date, default: Date.now,}
});

// UserSchema.pre('save', async function(next){
//   const hash =  await bcrypt.hash(this.senha, 10);
//   this.senha = hash;
//   next();
// })

module.exports = mongoose.model("User", UserSchema);

