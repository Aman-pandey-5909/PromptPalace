const Post = require('../../models/Post');

exports.postprompt = async(req, res) => {
        try {
                const { title, description, prompt, tags } = req.body
                if (!title || !description || !prompt || !tags) {
                        return res.status(400).json({message: 'All fields are required'})
                }
                const arrTags = tags.split(',').map(tag => `#${tag.toLowerCase().trim()}`)
                const post = await Post.create({ title, description, prompt, tags: arrTags })
                // console.log(arrTags);
                return res.status(200).json({message: 'Prompt added'})
        } catch (error) {
                console.log(error)
        }
};