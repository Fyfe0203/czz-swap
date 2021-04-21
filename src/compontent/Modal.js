import React, { Fragment, useRef } from 'react'

export default function Modal(props) {
  const { visible = false, title = null, maskClose = true, ...rest } = props
  const maskRef = useRef()
  const close = (e) => {
    e.preventDefault()
     if (e.target === maskRef.current)  maskClose && props.onClose(false)
  }
  return (
    <Fragment>
      {
        visible &&
        <Fragment>
          <div className="modal-wrap" onClick={close} ref={ maskRef } >
            <div className="modal" {...rest}  >
              <div className="ico-x modal-close" onClick={()=> props.onClose(false)}/>
                {
                  title &&
                <div className="f-c-sb modal-header">
                  <h2 className="modal-title">
                    {title}
                  </h2>
                </div>
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
