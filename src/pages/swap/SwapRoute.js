import React, { Fragment, useState } from 'react'
import {Image,Modal,Icon} from '../../compontent'
import useGlobal from '../../hooks/useGlobal'
import styled from 'styled-components'

export default function SwapRoute({ types, pool }) {
  const { from, to, setState } = useGlobal()
  const [visible, setVisible] = useState(false)

  const selectRoute = route => {
    const state = types === 1 ? { to: { ...to, route } } : { from: { ...from, route } }
    setState(state)
    setVisible(false)
  }

  return (
    <Fragment>
      <RouteBox onClick={() => setVisible(true)}>
        <div className="f-c f-1">
          <Image width="18" height="18" src={pool.swap[pool.route].image} style={{ borderRadius: 90, marginRight:4 }} />
          <div className="f-1">{pool.swap[pool.route]?.name}</div>
        </div>
        <Icon type="chevron-right" />
      </RouteBox>
      <Modal title="Select Route" visible={ visible } onClose={setVisible}>
        <RouteContainer>
          {
            pool.swap.map((item, index) => {
              return (
                <RouteItem key={ index } onClick={() => selectRoute(index)}>
                  <Image width="32" height="32" src={item.image} />
                  <RouteText>{item.name}
                    {pool?.route === index && <Icon type="check-circle" />}
                  </RouteText>
                </RouteItem>
              )
            })
          }
        </RouteContainer>
      </Modal>
    </Fragment>
  )
}

const RouteBox = styled.div`
  display:flex;
  align-items:center;
  background:#fff;
  padding:6px 4px;
  border-radius:3px;
  margin-right:10px;
  width:120px;
  cursor: pointer;
`

const RouteContainer = styled.div``
const RouteItem = styled.div`
  display:flex;
  align-items:center;
  padding:10px 0;
  cursor: pointer;
  &:hover{
    color:blue;
  }
`
const RouteText = styled.div`
  margin-left:10px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex:1;
`
