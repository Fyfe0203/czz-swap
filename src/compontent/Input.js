import React from 'react'
import styled from 'styled-components'

export default function Input(props) {
  const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)
  const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const { onChange,placeholder,reg,value,...rest} = props
  const regs = "^[0-9]*[.,]?[0-9]*$"
  const enforcer = v => {
    if (v === '' || inputRegex.test(escapeRegExp(v))) onChange(v)
  }
  return (
    <InputWarp>
      <InputNumber value={value} pattern={regs} onChange={e => enforcer(e.target.value.replace(/,/g, '.'))} placeholder={placeholder} {...rest} />
    </InputWarp>
  )
}
const InputWarp = styled.div`
  padding:0 6px;
`
const InputNumber = styled.input`
  outline:none;
  background:rgba(0,0,0,0.1);
  padding:10px 0;
  border:none;
  width:100%;
  background:transparent;
  border:none;
  
`