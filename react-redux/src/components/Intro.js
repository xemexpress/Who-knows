import React from 'react'

import {
    DISCLAIMER_CONTENT
} from '../constants'

const Intro = () => {
    return (
        <div className='banner'>
            <div className='container'>
                <h1 className='logo-font'>
                    Disclaimer
                </h1>
                <p>{DISCLAIMER_CONTENT}</p>
            </div>
        </div>
    )
}

export default Intro