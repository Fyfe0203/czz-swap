import React, { Fragment } from 'react'
import { Loading } from '../../compontent'
import useGlobal from '../../hooks/useGlobal'

export default function Pending() {
  const { pending } = useGlobal()
  return (
    <Fragment>
      {
        pending.length && <div className="pending">
          <Loading size="small" color="#fff" />
          <span>
            {pending.length} Pending
          </span>
        </div>
      }
    </Fragment>
  )
}
