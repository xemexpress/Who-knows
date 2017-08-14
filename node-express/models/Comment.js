var mongoose = require('mongoose')

var CommentSchema = new mongoose.Schema({
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
}, { timestamps: true })

CommentSchema.methods.toJSONFor = function(){
    return {
        id: this._id,
        body: this.body,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        author: this.author.toProfileJSONFor()
    }
}

mongoose.model('Comment', CommentSchema)