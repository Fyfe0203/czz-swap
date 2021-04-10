import React from 'react'
import styled from 'styled-components'

const IconContaienr = styled.i``
export default function Icon(props) {
  return  <IconContaienr className={`ico-${props.type}`} />
}
