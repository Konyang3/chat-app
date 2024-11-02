import React from 'react'
import cn from "classnames"

import './Button.css'

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const {className, ...rest} = props

    return <button className={cn('button', className)} {...rest} />
}

export default Button