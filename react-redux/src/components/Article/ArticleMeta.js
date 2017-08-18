import React from 'react'

import ArticleActions from './ArticleActions'

const ArticleMeta = props => {
    const article = props.article
    return (
        <div className='article-meta'>
            <a>
                <img src={article.author.image} alt={article.author.username} />
            </a>

            <div className='info'>
                <a className='author'>
                    {article.author.username}
                </a>
                <span className='date'>
                    {new Date(article.createdAt).toDateString()}
                </span>
            </div>

            <ArticleActions canModify={props.canModify} slug={article.slug} />
        </div>
    )
}

export default ArticleMeta