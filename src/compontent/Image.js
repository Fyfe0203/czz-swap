import React from 'react'
import styled from 'styled-components'

export default function Image({ src, style = {}, ...rest }) {
  return <ImageContainer style={{ backgroundImage: `url(${src})`, backgroundColor:`${src ?'' : 'blue'}`, ...style }} {...rest}>
    { src ? '' : '?'}
  </ImageContainer>
}
const ImageContainer = styled.div`
  background-size:100%;
  margin:0 auto;
  background-repeat:no-repeat;
  background-position: center center;
  width: ${props => `${props.width}px` || '200px'};
  height: ${props => `${props.height}px` || '200px'};
  width:${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
`