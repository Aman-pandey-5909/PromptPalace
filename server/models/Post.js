const mongoose = require("mongoose");

/**
 * Post Schema 
 * 1. id -> unique ids generated using uuid
 * 2. author -> reference to the creator of the post
 * 3. title -> >10 char, required
 * 4. prompt -> >10 char, required
 * 5. tags -> >3 words, required
 * 6. likes -> set by server
 */

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
    },
    prompt: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
    },
    tags: {
        type: [String],
        required: true,
        trim: true,
        minlength: 3,
    },  
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
