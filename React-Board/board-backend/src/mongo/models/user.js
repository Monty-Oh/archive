const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
});

// 호출 시 토큰 발급, 쿠키에 담아서 사용
UserSchema.methods.generateToken = function() {
    const token = jwt.sign(
        {
            _id: this.id,
            username: this.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        }
    );
    return token;
}

UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
};

UserSchema.statics.findByUsername = function(username) {
    return this.findOne({ username });
};

UserSchema.methods.serialize = function() {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};


module.exports = mongoose.model('User', UserSchema);
