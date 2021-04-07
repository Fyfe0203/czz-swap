import React from 'react'
import styled from 'styled-components'
import PropType from 'prop-types'

const ButtonContainer = styled.button`
  background:blue;
  color:#fff;
  text-align:center;
  border:none;
  outline:none;
  border-radius:5px;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:16px 30px;
  cursor: pointer;
  transition:.5s;
  &:hover{
    background-color:darkblue;
  }
  &.block{
    display:block;
    width:100%;
    font-size:16px;
    display:flex;
    align-items:center;
    justify-content:center;
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
    <ButtonContainer {...rest}>
      {children}
    </ButtonContainer>
  )
}

Button.propType = {
  size:PropType.string
}

export default Button
