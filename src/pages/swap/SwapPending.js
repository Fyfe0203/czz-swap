import React, { useState, useEffect} from 'react'
import useGlobal from '../../hooks/useGlobal'
import {Loading,Icon,Image,Modal,Button} from '../../compontent'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const SwapItem = styled.div`
  display:flex;
  justify-content:space-around;
  padding:15px;
  background:#f4f4f4;
  border-radius:4px;
  align-items:center;
`
const SwapName = styled.div`
  flex:1;
  display:flex;
  align-items:center;
  margin-right:20px;
`
const InfoContainer = styled.div`
  font-weight:700;
  flex:1;
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
const DexBox = styled.div`
  display:flex;
  align-items:center;
  font-size:12px;
  font-weight:normal;
`
const SwapInfo = styled.div`
  display:flex;
  flex-direction:column;
`

export default function SwapPending(props) {
  const {hash,visible,fromType,fromRoute,toRoute,toType,fromUrl,toUrl,fromImage,toImage,onClose,id, ...rest} = props
  const { explorer } = useGlobal()
  // const [recents] = useLocalStorage([], 'recent')
  const recents = window.localStorage.getItem('recent') ? JSON.parse( window.localStorage.getItem('recent')) : []
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
        const swapList = recents.map(item => {
          if(item.id === id) item.status = 1
          return item
        })
        // debugger
        window.localStorage.setItem('recent',JSON.stringify(swapList) )
      }
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
  const iconStyle = { width: 60, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }
  
  const loadingStatus =  <Loading color="blue" size="small" />
  return (
    <Modal title="SwapPending Detail" visible={visible} onClose={ () => onClose(null) } {...rest}>
      <SwapItem>
        <SwapName>
          <Image style={imageStyle} src={fromImage} />
          <InfoContainer>
            <SwapInfo><DexBox><Image style={{borderRadius: 90,marginRight:5}} size="16" src={ fromRoute?.image } />{ fromRoute?.name}</DexBox>{fromType} </SwapInfo>
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
            <SwapInfo>{toType}<DexBox><Image style={{borderRadius: 90,marginRight:5}} size="16" src={ toRoute?.image } />{ toRoute?.name}</DexBox></SwapInfo>
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
