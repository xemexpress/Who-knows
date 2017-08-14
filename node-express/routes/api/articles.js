var router = require('express').Router()
var passport = require('passport')
var mongoose = require('mongoose')
var Article = mongoose.model('Article')
var User = mongoose.model('User')
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
    User.findById(req.payload.id).then(function(user){
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
    })
})

module.exports = router