import React from 'react'
import styled from 'styled-components'

const IconContaienr = styled.i``
export default function Icon({type,...rest}) {
  return <IconContaienr {...rest} className={`ico-${type}`} />
}
