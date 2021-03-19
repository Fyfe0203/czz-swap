import React  from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const MessageWrap = styled.div``
const Icon = styled.div``
const CloseIcon = styled.div``
const Title = styled.h3``
const Content = styled.h3``

export function Message(props) {
  return (
    <MessageWrap className="message">
      <Icon className={`ico ico-${props?.icon}`} />
      <div className="message-container">
        <Title className="message-title">{ props?.title}</Title>
        <Content className="message-content">{ props?.content}</Content>
      </div>
      <CloseIcon className="close ico-x" onClick={ props?.onCancel} />
    </MessageWrap>
  )
}

export const message = props =>
  new Promise(() => {
    const holder = document.createElement('div')
    holder.setAttribute('class','message-box')
    document.body.appendChild(holder)
    const close = () => {
      document.body.removeChild(holder)
    }
    ReactDOM.render(
      <Message
        {...props}
        onCancel={close}
        onConfirm={() => {
          close()
        }}
      />,
      holder
    )
  })
