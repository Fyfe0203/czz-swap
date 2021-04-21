import React, { useState, useEffect} from 'react'
import useGlobal from '../../hooks/useGlobal'
import useLocalStorage from '../../hooks/useLocalStorage'
import {Loading,Icon,Image,Modal,Button} from '../../compontent'
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
const ViewLink = styled.div`
  display:block;
  font-size:12px;
  margin-top:10px;
  font-weight:normal;
  cursor: pointer;
  color:blue;
  &:hover{
    color:darkblue;
  }
  i{
    margin-right:6px;
  }
`

export default function SwapPending(props) {
  const {hash,visible,fromType,toType,fromUrl,toUrl,fromImage,toImage,onClose,id, ...rest} = props
  const { explorer } = useGlobal()
  const [recent] = useLocalStorage([],'recent')
  const normalHash = {
    ext_tx_hash: null,
    tx_hash: null,
    confirm_ext_tx_hash: null
  }
  const [status, setStatus] = useState(normalHash)

  const { tx_hash, confirm_ext_tx_hash } = status
  
  const getStatus = async (query) => {
    try {
      const res = await fetch(`https://scan.classzz.com/v1/transactions/dh?${query}`)
      const result = await res.json()
      const { items } = result
      if (items) setStatus({ ...normalHash, ...items[0] })
      if (items?.confirm_ext_tx_hash) {
        const swapList = recent.map((item, index) => {
          if(item.id === id) item.status = 1
          return item
        })
        window.localStorage.setItem('recent',JSON.stringify(swapList) )
      }
      // if (!items?.tx_hash || !items?.ext_tx_hash || !items?.confirm_ext_tx_hash) getStatus(query)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    let intervalId = setInterval(() => {
      hash && getStatus(`extTxHash=${hash}`)
    }, 3000 )
    return () => {
      clearInterval(intervalId)
      intervalId = null
    }
  }, [hash])
  
  const imageStyle = { width: 30, height: 30, margin: "0 0", marginRight: 15 ,backgroundSize:'contain'}
  const iconStyle = { width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }
  
  const loadingStatus =  <Loading color="blue" size="small" />
  return (
    <Modal title="SwapPending Detail" visible={visible} onClose={ () => onClose(null) } {...rest}>
      <SwapItem>
        <SwapName>
          <Image style={imageStyle} src={fromImage} />
          <InfoContainer>
            { fromType }
            <ViewLink onClick={()=>window.open(`${fromUrl}tx/${hash}`) }><Icon type="external-link" />{explorer[fromType]}</ViewLink>
          </InfoContainer>
        </SwapName>
        <Icon type="check-circle" />
      </SwapItem>
      <Icon style={iconStyle} type="arrow-down" />
      <SwapItem>
        <SwapName>
          <Image style={imageStyle} src={require('../../asset/svg/logos.svg').default} />
          <InfoContainer>
            ClassZZ Network
           {tx_hash && <ViewLink onClick={()=>window.open(`https://scan.classzz.com/#/transactionHash?transHash=${tx_hash}`)}><Icon type="external-link" />View on classZZscan</ViewLink>}
          </InfoContainer>
        </SwapName>
        {tx_hash ?  <Icon type="check-circle" /> : loadingStatus}
      </SwapItem>
      <Icon style={iconStyle} type="arrow-down" />
      <SwapItem>
        <SwapName>
          <Image style={imageStyle}  src={toImage} />
          <InfoContainer>
            { toType }
            {confirm_ext_tx_hash && <ViewLink onClick={ ()=>window.open(`${toUrl}tx/${confirm_ext_tx_hash}`)}> <Icon type="external-link" />{explorer[toType]}</ViewLink>}
          </InfoContainer>
        </SwapName>
        {confirm_ext_tx_hash ? <Icon type="check-circle" /> : loadingStatus}
      </SwapItem>
      <Button style={{margin:'10px 0'}} className="block" onClick={ () => onClose(null) }>Close</Button>
    </Modal>
  )
}

SwapPending.propTypes = {
  onClose: PropTypes.func,
}
