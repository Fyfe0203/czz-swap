import React from 'react'
import styled from 'styled-components'

export default function Image({ icon, ...rest }) {
  return  <ImageContainer {...rest} />
}
const ImageContainer = styled.div`
  background-size:100%;
  margin:0 auto;
  background-color: #f4f4f4;
  background-image: ${props => `url(${props.src})` };
  background-repeat:no-repeat;
  background-position: center center;
  width: ${props => `${props.width}px` || '200px'};
  height: ${props => `${props.height}px` || '200px'};
  width:${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
`