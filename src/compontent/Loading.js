import React from 'react'
import styled from 'styled-components'

export default function Loading(props) {
  let arr = "123"
  const {color,text,mask,...rest} = props
  return (
    <LoadingBox className={`loading  ${mask ? 'mask' : ''} ${props?.size}`} {...rest}>
      <div className="f-c-c">
      {
        arr.split('').map((item, index) => {
          return <div style={{backgroundColor:color}} className={`item i-${index}`} key={index} >{ item }</div>
        })
        }
      </div>
      {text && <Text>{ text }</Text>}
      {props.children}
    </LoadingBox>
  )
}

const LoadingBox = styled.div`
  margin-left:5px;
  font-size:12px;
`
const Text = styled.div`
  margin-left:5px;
  font-size:14px;
`