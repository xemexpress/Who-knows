var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var slug = require('slug')

var ArticleSchema = new mongoose.Schema({
    slug: { type: String, unique: true, lowercase: true },
    title: String,
    body: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

ArticleSchema.plugin(uniqueValidator, { message: 'is already taken' })

ArticleSchema.methods.slugify = function(){
    this.slug = slug(this.title)
    if(this.slug === ''){
        this.slug = this.title
    }
}

ArticleSchema.pre('validate', function(next){
    if(!this.slug){
        this.slugify()
    }

    next()
})

ArticleSchema.methods.toJSONFor = function(){
    return {
        slug: this.slug,
        title: this.title,
        body: this.body,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        author: this.author.toProfileJSONFor()
    }
}

mongoose.model('Article', ArticleSchema)