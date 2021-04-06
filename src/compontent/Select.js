import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Scrollbars from 'rc-scrollbars'
import PropTypes from 'prop-types'

// select box

export default function Select(props) {
  const [status, setStatus] = useState(false)
  const normalFilter = (i)=>i
  const { list, rangeKey, filter = normalFilter, onChange } = props
  const containerRef = useRef()

  const selectItem = (item) => {
    setStatus(false)
    valuRef.current.innerHTML = rangeKey ? item[rangeKey] : item
    onChange(item)
  }
  const valuRef = useRef()
  const selectList = (
    <SelectList ref={containerRef}>
      <Scrollbars>
      {
        list.filter(filter).map((item, index) => {
          return <OptionItem onClick={() => selectItem(item)} key={index} >{rangeKey ? item[rangeKey] : item}</OptionItem>
        })
      }
      </Scrollbars>
    </SelectList>
  )
  return (
    <SelectInner>
      <SelectButton>
        <SelectVal ref={ valuRef } onClick={ () => setStatus(true)}>{ `Select Value`}</SelectVal>
        <Icon className="ico-chevron-right" />
      </SelectButton>
      { status && selectList }
    </SelectInner>
  )
}
Select.propTypes = {
  list: PropTypes.array,
  onChange: PropTypes.func
}

const SelectInner = styled.div`
  background: rgba(110,110,110,0.1);
  border-radius:6px;
  flex:1;
  position:relative;
`
const Icon = styled.div`
  padding:5px;
`
const SelectList = styled.div`
  position:absolute;
  left:0;
  right:0;
  top:100%;
  background:#fff;
  z-index:10;
  box-shadow: 0 2px 8px rgb(0 0 0 / 20%);
  border-radius: 5px;
`
const OptionItem = styled.div`
  padding:15px 20px;
  cursor: pointer;
`
const SelectButton = styled.div`
  display:flex;
  align-items:center;
  cursor: pointer;
  font-size:14px;
`
const SelectVal = styled.div`
  padding:10px 20px;
  flex:1;
`