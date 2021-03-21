import React from 'react'
import styled from 'styled-components'

export default function SwapButton(props) {

  const { children,type, ...rest } = props
  const Button = styled.button`
    font-size:16px;
  `
  
  return (
    <Button {...rest}>
      {children}
    </Button>
  )
}
