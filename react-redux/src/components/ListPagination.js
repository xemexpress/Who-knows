import React from 'react'

const ListPagination = props => {
    if(props.articlesCount <= 3){
        return null
    }

    const range = []
    for(let i = 0; i < Math.ceil(props.articlesCount / 3); i++){
        range.push(i)
    }

    return (
        <nav>
            <ul className='pagination'>
                {
                    range.map(v => {
                        const isCurrent = v === props.currentPage
                        const handleClick = ev => {
                            ev.preventDefault()
                            props.onSetPage(v)
                        }
                        return (
                            <li
                                className={ isCurrent ? 'page-item active' : 'page-item' }
                                onClick={handleClick}
                                key={v.toString()}>
                                <a className='page-link'>{v + 1}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default ListPagination