import React, { Fragment } from 'react'

export default function NetworkError({connect}) {
  return (
    <Fragment>
      {
        <div className="pending" onClick={connect}>
          <i className="ico ico-wind" />
          <span>
            Network Wrong
          </span>
        </div>
      }
    </Fragment>
  )
}
