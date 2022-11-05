const mongoose  =   require('mongoose')
const bcrypt    =   require('bcryptjs')
const Schema    =   mongoose.Schema;

const userSchema =  new Schema ({
firstName   : { type : String, required : true  },
lastName    : { type : String, required : true  },
email       : { type : String, unique   : true, required : true, lowercase: true  },
password    : { type : String, required : true  },
tokens      : [ { token: { type : String, required: true } } ]
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save()
        return token;
    } catch (err) {
        console.log(err)
    }
}

module.exports = mongoose.model('users',userSchema);