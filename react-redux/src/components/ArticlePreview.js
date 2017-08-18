import React from 'react'
import { Link } from 'react-router'

const ArticlePreview = props => {
    const article = props.article

    return (
        <div className='article-preview'>
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
            </div>

            <Link to={`article/${article.slug}`} className='preview-link'>
                <h1>{article.title}</h1>
                <p>{article.body.slice(0, 50)}</p>
                <span>Read more...</span>
            </Link>
        </div>
    )
}

export default ArticlePreview