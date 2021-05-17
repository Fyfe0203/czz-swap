import React from 'react'
import styled from 'styled-components'

const IconContaienr = styled.i``
export default function Icon({type,className='',...rest}) {
  return <IconContaienr className={`ico-${type} ${className}`} {...rest} />
}
