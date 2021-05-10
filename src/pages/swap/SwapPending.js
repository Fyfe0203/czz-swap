import React, { useState, useEffect} from 'react'
import useGlobal from '../../hooks/useGlobal'
import {Loading,Icon,Image,Modal,Button} from '../../compontent'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import useLocalStorage from '../../hooks/useLocalStorage'

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
  display:flex;
  align-items:center;
  justify-content:space-between;
`
const ViewLink = styled.div`
  display:block;
  font-size:12px;
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
  color:#888;
  margin-top:4px;
`
const SwapInfo = styled.div`
`

const SwapContentInfo = styled.div`
  font-size:12px;
  margin:20px 0;
`
const NetworkInfo = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  font-size:12px;
  margin-right:15px;
  line-height:2;
`

export default function SwapPending(props) {
  const {hash,visible,fromType,fromRoute,toRoute,toType,fromUrl,toUrl,fromImage,toImage,onClose,id,content,fromSymbol,toSymbol} = props
  const { explorer } = useGlobal()
  const [recent,setRecent] = useLocalStorage('recent',[])
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
      if (items[0]?.confirm_ext_tx_hash) {
        const swapList = recent.map(item => {
          if(item.id === id) item.status = 1
          return item
        })
        setRecent(swapList)
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
  
  const imageStyle = { width: 30, height: 30, margin: "0 0", backgroundSize: 'contain', borderRadius: 90}
  const iconStyle = { width: 60, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }
  
  const loadingStatus =  <Loading color="blue" size="small" />
  return (
    <Modal title="SwapDetail" visible={visible} onClose={() => onClose(null)}>
      <SwapItem>
        <SwapName>
          <NetworkInfo>
            <Image style={imageStyle} src={fromImage} />{fromType}
          </NetworkInfo>
          <InfoContainer>
            <SwapInfo>{fromSymbol}<DexBox>DEX:{ fromRoute?.name}</DexBox></SwapInfo>
            <ViewLink onClick={()=>window.open(`${fromUrl}tx/${hash}`) }><Icon type="external-link" />{explorer[fromType]}</ViewLink>
          </InfoContainer>
        </SwapName>
        <Icon type="check-circle" />
      </SwapItem>
      <Icon style={iconStyle} type="arrow-down" />
      <SwapItem>
        <SwapName>
          <NetworkInfo>
            <Image style={imageStyle} src={require('../../asset/svg/logos.svg').default} />
            CZZ
          </NetworkInfo>
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
          <NetworkInfo>
            <Image style={imageStyle} src={toImage} />{toType}
          </NetworkInfo>
          <InfoContainer>
            <SwapInfo>{toSymbol}<DexBox>DEX:{ toRoute?.name}</DexBox></SwapInfo>
            {confirm_ext_tx_hash && <ViewLink onClick={ ()=>window.open(`${toUrl}tx/${confirm_ext_tx_hash}`)}> <Icon type="external-link" />{explorer[toType]}</ViewLink>}
          </InfoContainer>
        </SwapName>
        {confirm_ext_tx_hash ? <Icon type="check-circle" /> : loadingStatus}
      </SwapItem>
      <SwapContentInfo>{ content }</SwapContentInfo>
      <Button style={{margin:'25px 0 10px'}} className="block" onClick={ () => onClose(null) }>Close</Button>
    </Modal>
  )
}

SwapPending.propTypes = {
  onClose: PropTypes.func,
}
