import React, { useState, useEffect, Fragment} from 'react'
import useGlobal from '../../hooks/useGlobal'
import {Loading,Icon,Image,Modal} from '../../compontent'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const SwapItem = styled.div`
  display:flex;
  justify-content:space-around;
`
const SwapName = styled.div``

export default function SwapPending(props) {
  const {hash,...rest} = props
  const { from, to } = useGlobal()
  const [status,setStatus] = useState({})
  const getStatus = async () => {
    try {
      const res = await fetch(`https://testnet.classzz.com/v1/transactions/dh?txhash=${hash}`)
      const result = await res.json()
      const { items } = result
      if (items) setStatus(items[0])
      if (items.confirm_ext_tx_hash === '') getStatus()
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getStatus()
  },[])

  return (
    <Modal title="SwapPeding" {...rest}>
      {from.currency?.image && to.currency?.image ?
        <Fragment>
      <SwapItem>
        <SwapName>
          <Image url={from.currency.image} />
          { from.currency.symbol }
        </SwapName>
        {status.ext_tx_hash ? <Loading /> : <Icon type="check-circle" /> }
      </SwapItem>
      <SwapItem>
        <SwapName>
          <Image url={require('../../asset/images/DODO.png')} />
          ClassZZ Network
        </SwapName>
        {status.tx_hash ? <Loading /> : <Icon type="check-circle" /> }
      </SwapItem>
      <SwapItem>
        <SwapName>
          <Image url={to.currency.image} />
          { from.currency.symbol }
        </SwapName>
        {status.confirm_ext_tx_hash ? <Loading /> : <Icon type="check-circle" /> }
      </SwapItem> </Fragment> : null
        }
    </Modal>
  )
}

SwapPending.propTypes = {
  onClose:PropTypes.func,
}
