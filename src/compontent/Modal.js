import React, { Fragment } from 'react'

export default function Modal(props) {
  const { visible = false, title = null, ...rest } = props
  return (
    <Fragment>
      {visible &&
        <div className="mask f-c-c">
        <div className="modal" {...rest}>
          <div className="ico-x modal-close" onClick={() => props.onClose(false)} />
          { title &&
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
      }
    </Fragment>
  )
}
