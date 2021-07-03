const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username ya existe, intente con uno diferente"],
        required: [true, "Este campo es requerido"]        
    },
    email: {
       type: String,
       unique: [true, "Email ya existe, intente con uno diferente"],
       required: [true, "Este campo es requerido"]
    },
    password: {
        type: String,
        required: [true, "Este campo es requerido"]
    }
},
{timestamps: true}
);

UserSchema.pre('save', async function(next) {
  await bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

//Validación de Password
/* UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );
 */

const User = mongoose.model('User', UserSchema);
UserSchema.plugin(uniqueValidator);

module.exports = User;