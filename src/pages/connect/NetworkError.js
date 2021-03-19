import React, { Fragment } from 'react'

export default function NetworkError() {
  return (
    <Fragment>
      {
        <div className="pending">
          <i className="ico ico-wind" />
          <span>
            Network Wrong
          </span>
        </div>
      }
    </Fragment>
  )
}
