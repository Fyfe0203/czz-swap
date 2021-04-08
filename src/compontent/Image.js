import React from 'react'
import styled from 'styled-components'

const ImageContainer = styled.div`
  background-size:100%;
  background: ${props => `url(${props.background}) no-repeat center` };
  width: ${props => props.width};
  height: ${props => props.height}
`
export default function Image({ icon, ...rest }) {
  return  <ImageContainer {...rest} />
}
