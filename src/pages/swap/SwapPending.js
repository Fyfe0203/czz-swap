import React, { useState, useEffect, Fragment} from 'react'
import useGlobal from '../../hooks/useGlobal'
import {Loading,Icon,Image,Modal} from '../../compontent'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const SwapItem = styled.div`
  display:flex;
  justify-content:space-around;
  padding:18px 0;
  align-items:center;
`
const SwapName = styled.div`
  flex:1;
  display:flex;
  align-items:center;
`

const InfoContainer = styled.div`
  font-weight:700;
`
const ViewLink = styled.a.attrs(props => ({
  target: '_blank',
  herf:props.herf
}))`
  display:block;
  font-size:12px;
  margin-top:10px;
  font-weight:normal;
  cursor: pointer;
  i{
    margin-right:6px;
  }
`

export default function SwapPending(props) {
  const {hash,...rest} = props
  const { from, to } = useGlobal()
  const {explorerUrl : fromExporer } = from
  const { explorerUrl: toExplorer } = to
  const [status, setStatus] = useState({
    ext_tx_hash: null,
    tx_hash: null,
    confirm_ext_tx_hash: null
  })

  const {ext_tx_hash,tx_hash,confirm_ext_tx_hash } = status
  const getStatus = async () => {
    try {
      const res = await fetch(`https://testnet.classzz.com/v1/transactions/dh?txhash=${hash}`)
      const result = await res.json()
      const { items } = result
      if (items) setStatus(items[0] || {    ext_tx_hash: null,
    tx_hash: null,
    confirm_ext_tx_hash: null})
      if (items.confirm_ext_tx_hash === '') getStatus()
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getStatus()
  }, [])
  
  const imageStyle = { width: 30, height: 30, margin: "0 0", marginRight: 15 }
  const iconStyle = { width: 30, height:30, display: 'flex', alignItems: 'center', justifyContent:'center'}
  return (
    <Modal title="SwapPeding" {...rest}>
      <SwapItem>
        <SwapName>
          <Image style={imageStyle} src={from?.currency?.image} />
          <InfoContainer>
            { from?.currency?.symbol }
            <ViewLink href={`${fromExporer}tx/${ext_tx_hash}` }><Icon type="external-link" />View on Etherscan</ViewLink>
          </InfoContainer>
        </SwapName>
        {ext_tx_hash ? <Loading /> : <Icon type="check-circle" /> }
      </SwapItem>
      <Icon style={iconStyle} type="arrow-down" />
      <SwapItem>
        <SwapName>
          <Image style={imageStyle} src={require('../../asset/svg/logos.svg').default} />
          <InfoContainer>
            ClassZZ Network
            <ViewLink href={`${fromExporer}tx/${tx_hash}` }><Icon type="external-link" />View on Etherscan</ViewLink>
          </InfoContainer>
        </SwapName>
        {tx_hash ? <Loading /> : <Icon type="check-circle" /> }
      </SwapItem>
      <Icon style={iconStyle} type="arrow-down" />
      <SwapItem>
        <SwapName>
          <Image style={imageStyle}  src={to?.currency?.image} />
          <InfoContainer>
            { from?.currency?.symbol }
            <ViewLink href={`${toExplorer}tx/${confirm_ext_tx_hash}` }> <Icon type="external-link" />View on Etherscan</ViewLink>
          </InfoContainer>
        </SwapName>
        {confirm_ext_tx_hash ? <Loading /> : <Icon type="check-circle" /> }
      </SwapItem>
    </Modal>
  )
}

SwapPending.propTypes = {
  onClose:PropTypes.func,
}
