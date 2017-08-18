var router = require('express').Router()
var passport = require('passport')
var mongoose = require('mongoose')
var Article = mongoose.model('Article')
var User = mongoose.model('User')
var Comment = mongoose.model('Comment')
var auth = require('../auth')

// Preload article
router.param('article', function(req, res, next, slug){
    Article.findOne({ slug: slug })
        .populate('author')
        .then(function(article){
            if(!article){ return res.sendStatus(404) }

            req.article = article

            return next()
        }).catch(next)
})

// Preload comment
router.param('comment', function(req, res, next, id){
    Comment.findById(id)
        .populate('author')
        .then(function(comment){
            if(!comment){ return res.sendStatus(404) }

            req.comment = comment

            return next()
        }).catch(next)
})

// List articles
router.get('/', auth.optional, function(req, res, next){
    var query = {}
    var limit = 10
    var offset = 0

    if(typeof req.query.limit !== 'undefined'){
        limit = req.query.limit
    }

    if(typeof req.query.offset !== 'undefined'){
        offset = req.query.offset
    }
        
    Promise.all([
        req.query.author ? User.findOne({ username: req.query.author }) : null
    ]).then(function(results){
        var author = results[0]

        if(author){
            query.author = author._id
        }

        return Promise.all([
            Article.find(query)
                .limit(Number(limit))
                .skip(Number(offset))
                .sort({ createdAt: 'desc'})
                .populate('author')
                .exec(),
            Article.count(query).exec()
        ]).then(function(results){
            var articles = results[0]
            var articlesCount = results[1]
    
            return res.json({
                articles: articles.map(function(article){
                    return article.toJSONFor()
                }),
                articlesCount: articlesCount
            })
        })
    }).catch(next)
})

// Read article
router.get('/:article', auth.optional, function(req, res, next){
    req.article.execPopulate().then(function(){
        return res.json({ article: req.article.toJSONFor() })
    }).catch(next)
})

// Create article (admin)
router.post('/', auth.required, function(req, res, next){
    User.findById(req.payload.id).then(function(user){
        if(!user || auth.admin.indexOf(req.payload.username) === -1){
            return res.sendStatus(401)
        }

        var article = new Article(req.body.article)

        article.author = user

        return article.save().then(function(){
            return res.json({ article: article.toJSONFor() })
        })
    }).catch(next)
})

// Update article (admin)
router.put('/:article', auth.required, function(req, res, next){
    if(req.article.author._id.toString() === req.payload.id.toString()){
        if(typeof req.body.article.title !== 'undefined'){
            req.article.title = req.body.article.title
        }

        if(typeof req.body.article.body !== 'undefined'){
            req.article.body = req.body.article.body
        }

        req.article.save().then(function(article){
            return res.json({ article: article.toJSONFor() })
        }).catch(next)
    }else{
        return res.sendStatus(403)
    }
})

// Delete article (admin)
router.delete('/:article', auth.required, function(req, res, next){
    User.findById(req.payload.id).then(function(){
        if(req.article.author._id.toString() === req.payload.id.toString()){
            return req.article.remove().then(function(){
                return res.sendStatus(204)
            })
        }else{
            return res.sendStatus(403)
        }
    }).catch(next)
})

// List comments
router.get('/:article/comments', auth.optional, function(req, res, next){
    req.article.populate({
        path: 'comments',
        populate: {
            path: 'author'
        },
        options: {
            sort: {
                createdAt: 'asc'
            }
        }
    }).execPopulate().then(function(){
        return res.json({ comments: req.article.comments.map(function(comment){
            return comment.toJSONFor()
        })})
    }).catch(next)
})

// Create comment
router.post('/:article/comments', auth.required, function(req, res, next){
    User.findById(req.payload.id).then(function(user){
        if(!user){ return res.sendStatus(401) }

        var comment = new Comment(req.body.comment)
        comment.article = req.article
        comment.author = user

        return comment.save().then(function(){
            req.article.comments.push(comment)

            return req.article.save().then(function(){
                return res.json({ comment: comment.toJSONFor() })
            })
        })
    }).catch(next)
})

// Update comment
router.put('/:article/comments/:comment', auth.required, function(req, res, next){
    if(req.comment.author._id.toString() === req.payload.id.toString()){
        if(typeof req.body.comment.body !== 'undefined'){
            req.comment.body = req.body.comment.body
        }

        req.comment.save().then(function(comment){
            return res.json({ comment: comment.toJSONFor() })
        }).catch(next)
    }else{
        return res.sendStatus(403)
    }
})

// Delete comment
router.delete('/:article/comments/:comment', auth.required, function(req, res, next){
    // author is not populated yet, hence it's still an ObjectId
    if(req.comment.author._id.toString() === req.payload.id.toString()){
        req.article.comments.remove(req.comment._id)
        req.article.save()
            .then(Comment.find({ _id: req.comment._id }).remove().exec())
            .then(function(){
                return res.sendStatus(204)
            })
    }else{
        return res.sendStatus(403)
    }
})

module.exports = router