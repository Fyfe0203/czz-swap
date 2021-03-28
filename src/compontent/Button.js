import React from 'react'
import styled from 'styled-components'
import PropType from 'prop-types'

const ButtonBox = styled.button`
  background:blue;
  color:#fff;
  text-align:center;
  border:none;
  outline:none;
  border-radius:5px;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:14px 30px;
  cursor: pointer;
  &:hover{
    background-color:darkblue;
  }
  &.block{
    display:block;
  }
  &.mini{
    display:flex;
    padding:4px 10px;
    font-size:12px;
  }
`

function Button(props) {
  const { children, ...rest } = props
  return (
    <ButtonBox {...rest}>
      {children}
    </ButtonBox>
  )
}

Button.propType = {
  size:PropType.string
}

export default Button
