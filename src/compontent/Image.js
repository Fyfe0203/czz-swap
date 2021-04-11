import React from 'react'
import styled from 'styled-components'


export default function Image({ icon, ...rest }) {
  return  <ImageContainer {...rest} />
}
const ImageContainer = styled.div`
  background-size:100%;
  margin:0 auto;
  background-image: ${props => `url(${props.src})` };
  background-repeat:no-repeat;
  background-position: center center;
  width: ${props => props.width || '200px'};
  height: ${props => props.height || '200px'}
`