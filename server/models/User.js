const mongoose = require("mongoose");

/**
 * User Schema 
 * 1. Name -> >0 char, not required
 * 2. Username -> unique, lowercase, >0 char, required
 * 3. Email -> unique, should have @, should be valid, required
 * 4. Password -> required, min 8 char, at least 1 uppercase, 1 lowercase, 1 number, 1 special char
 * 5. Mobile Number -> not required, should be valid
 * 6. Country -> not required
 * 7. Token -> set by server
 */

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true  
    },
    name: {
        type: String,
        trim: true,
        minlength: 1,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 1,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`,
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(v);
            },
            message:
                'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.',
        },
    },
    mobile: {
        type: String,
        validate: {
            validator: function (v) {
                return !v || /^\+?\d{10,15}$/.test(v); // optional field
            },
            message: props => `${props.value} is not a valid mobile number!`,
        },
    },
    country: {
        type: String,
        trim: true,
    },
    token: {
        type: String,
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
