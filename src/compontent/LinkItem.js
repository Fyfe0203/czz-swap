import React from 'react'
import styled from 'styled-components'

export default function LinkItem(props) {
  const Link = styled.a`
    font-size:12px;
    color:blue;
    cursor: pointer;
  `
  const { children ,...rest} = props
  return (
    <Link {...rest}>
      {children}
    </Link>
  )
}

