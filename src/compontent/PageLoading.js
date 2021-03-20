import React from 'react'
import logo from '../asset/images/favicon.png'
import styled from 'styled-components'

export default function PageLoading() {
  return (
    <PageInto className="page-load">
      <div className="page-loading img" style={{ backgroundImage: `url(${logo})` }} />
    </PageInto>
  )
}
const PageInto = styled.div`
  height:100vh
`