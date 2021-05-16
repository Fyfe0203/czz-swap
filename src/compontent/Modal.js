import React, { Fragment, useRef } from 'react'
import styled from 'styled-components'
const Titles = styled.div`
  flex:1;
  padding:10px;
`
const ModalHead = styled.div`
  padding:10px;
  display:flex;
  align-items:center;
`

export default function Modal(props) {
  const { visible = false, title = null, maskClose = true,excat, ...rest } = props
  const maskRef = useRef()
  const close = (e) => {
    if (e.target === maskRef.current)  maskClose && props.onClose(false)
    e.preventDefault()
  }
  return (
    <Fragment>
      {
        visible &&
        <Fragment>
          <div className="modal-wrap" onClick={close} ref={ maskRef } >
            <div className="modal" {...rest}>
              <div className="ico-x modal-close" onClick={()=> props.onClose(false)}/>
                {
                  title &&
                <ModalHead className="f-c-sb">
                  { excat }
                  <Titles>{title}</Titles>
                </ModalHead>
                }
                <div className="modal-content">
                  { props.children }
                </div>
            </div>
          </div>
          <div className="mask f-c-c"/>
        </Fragment>
      }
    </Fragment>
  )
}
