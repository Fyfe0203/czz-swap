import React, { useRef } from 'react'
import styled from 'styled-components'
import Icon from './Icon'

const InputTextWarp = styled.div`
  background:rgba(60,60,60,.1);
  border-radius:4px;
`
const InputContainer = styled.input`
  outline:none;
  padding:0;
`

const Container = styled.input`
  outline:none;
  padding:0;
`

export default function InputText(props) {
  const { placeholder = '', type, ...rest } = props
  const inputRef = useRef()
  return (
    <InputTextWarp>
      {type === 'search' && <Icon type="search" />}
      <Container>
        <InputContainer ref={ inputRef } value={inputRef.current.value } placeholder={placeholder} {...rest} />
      </Container>
      {type === 'search' && <Icon onClick={ inputRef.value = '' } type="search" />}
    </InputTextWarp>
  )
}
