const Post = require('../../models/Post');
const jwt = require('jsonwebtoken')
exports.postprompt = async(req, res) => {
        try {
                const { title, description, prompt, tags } = req.body
                const token = req.cookies.userData
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                if (!title || !description || !prompt || !tags) {
                        return res.status(400).json({message: 'All fields are required'})
                }

                if (title.length < 8) {
                        return res.status(400).json({message: 'Title must be at least 8 characters long'})
                }

                if (description.length < 20) {
                        return res.status(400).json({message: 'Description must be at least 20 characters long'})
                }

                if (prompt.length < 20) {
                        return res.status(400).json({message: 'Prompt must be at least 20 characters long'})
                }

                const arrTags = tags.split(',').map(tag => `#${tag.toLowerCase().trim()}`)
                if (arrTags.length < 3) {
                        return res.status(400).json({message: 'Please add at least 3 tags'})
                }

                await Post.create({ author: decoded._id,title, description, prompt, tags: arrTags })
                
                // console.log(arrTags);
                return res.status(200).json({message: 'Prompt added'})
        } catch (error) {
                console.log(error)
        }
};