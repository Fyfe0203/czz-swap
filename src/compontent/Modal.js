import React, { Fragment } from 'react'

export default function Modal(props) {
  const { visible = false } = props
  return (
    <Fragment>
      {visible &&
        <div className="mask f-c-c">
        <div className="modal">
          <div className="f-c-sb modal-header">
            <h2 className="modal-title">
              {props?.title}
            </h2>
            <div className="ico-x modal-close" onClick={()=>props.onClose(false) } />
          </div>
          <div className="modal-content">
            { props.children }
          </div>
        </div>
      </div>
      }
    </Fragment>
  )
}
