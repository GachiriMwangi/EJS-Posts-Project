const mongoose = require('mongoose') 
const slugify = require('slugify')

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
type: String, 
    required: false
    },
    markdown: {
        type: String,
        required: true
    },
     writer: {
           type: mongoose.Schema.Types.ObjectId, 
           required: false, 
           ref: 'User'
       },
    slug: {
        type: String,
        require: true, 
        unique: true
    }
}, 
{
    timestamps: true
}) 

// @ts-ignore
ArticleSchema.pre('validate', function(next){
    if(this.title){
        // @ts-ignore
        this.slug = slugify(this.title, {
            lower: true, 
            strict: true
        })
    }
    next()
})

module.exports = mongoose.model('blogs', ArticleSchema)