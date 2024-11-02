import React from "react"
import cn from "classnames"

import "./Input.css"

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    const {className, ...rest} = props

    return <input className={cn('input', className)} {...rest}></input>
}

export default Input