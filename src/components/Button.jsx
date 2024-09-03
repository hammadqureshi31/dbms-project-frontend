import React from 'react'
import { useNavigate } from 'react-router'

const Button = ({text, style, navigate}) => {
  const navigateTo = useNavigate()
  return (
    <div className={style} onClick={()=>navigateTo(`/${navigate}`)}>{text}</div>
  )
}

export default Button