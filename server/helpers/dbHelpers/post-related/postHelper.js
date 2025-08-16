const Post = require('../../../models/Post')

module.exports = {
    checkPost: async (id) => await Post.exists(id).catch(err => console.log(err)),
    createPost: async (data) => await Post.create(data).catch(err => console.log(err)),
    deletePost: async (id) => await Post.findByIdAndDelete(id, { new: true }).catch(err => console.log(err)),
    updatePost: async (id, data) => await Post.findByIdAndUpdate(id, data, { new: true }).catch(err => console.log(err)),
    readPost: async (id) => await Post.findById(id).catch(err => console.log(err)),
    dropPost: async () => await Post.deleteMany({}).catch(err => console.log(err)),
    deleteManyPost: async (id, val) => await Post.deleteMany({ [id]: { $in: val }}).catch(err => { console.log(err); throw err }),
}