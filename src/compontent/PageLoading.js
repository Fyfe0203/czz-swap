import React from 'react'
import logo from '../asset/images/favicon.png'

export default function PageLoading() {
  return (
    <div className="page-load">
      <div className="page-loading img" style={{ backgroundImage: `url(${logo})` }} />
    </div>
  )
}
