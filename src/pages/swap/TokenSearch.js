import React, { useState,useEffect } from 'react'
import useToken from '../../hooks/useToken'
import useGlobal from '../../hooks/useGlobal'
import useLocalStorage from '../../hooks/useLocalStorage'
import styled from 'styled-components'
import { Image, Icon } from '../../compontent'

const SearchContentBox = styled.div`
  height:380px;
`
const Tips = styled.div`
  font-size:12px;
  text-align:center;
  color:#888;
`
const SearchTokenBox = styled.div`
  padding:10px;
`
const SearchWrap = styled.div`
  padding:0 15px;
  background:rgba(90,90,90,.1);
  border-radius:4px;
  input{
    width:100%;
    padding:15px 0;
    font-size:15px;
    background:transparent;
    outline:none;
  }
`
const CustomInfo = styled.div`
  font-size:12px;
  color:#666;
  padding:10px 0;
`
const SearchEmpty = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  font-size:14px;
  color:blue;
`
const ResultText = styled.div``
const ResultItem = styled.div`
  display:flex;
  align-items:center;
  background:rgba(90,90,90,.1);
  padding:20px;
  border-radius:5px;
`
const AddCustomButton = styled.div`
  padding:5px 10px;
  background:blue;
  color:#fff;
  border-radius:2px;
  font-size:12px;
  display:flex;
  align-items:center;
`
const AddCustom = styled.div`
  color:blue;
  font-size:12px;
  i{
    margin-right:5px;
  }
`
const ResultInfo = styled.div`
  display:flex;
  align-items:center;
  justify-content:flex-start;
  flex:1;
  .img{
    border-radius:90px;
    margin:0;
    margin-right:10px;
  }
  h2{
    margin:0;
    padding:0;
    font-size:14px;
  }
  span{
    font-size:12px;
    color:#888;
  }
`

function EmptyImg({text}) {
  return (
    <SearchEmpty>
      <Image size={200} src={require('../../asset/svg/tokenFailed.svg').default} />
      <div>{text}</div>
    </SearchEmpty>
  )
}
export default function TokenSearch() {
  const { networks,pools,setState } = useGlobal()
  const { loading, token, isAddress, searchToken } = useToken()
  const [customToken, setCustomToken] = useLocalStorage('customToken', [])
  const current = networks[0]
  const { networkName: networkType } = current
  
  const [val, setVal] = useState(null)

  const queryChange = ({ target }) => {
    setVal(target.value)
    // if (isAddress(target.value)) {
      searchToken({ current, tokenAddress: target.value })
    // } else {
      
    // }
  }

  const [isActive, setIsActive] = useState(false)
    const activeAction = () => {
    setIsActive(pools.some(i=>i.tokenAddress === token?.address))
    }
  
  const addCustom = () => {
    const newItem = { ...token, networkType, tokenAddress: token.address }
    setCustomToken([...customToken,newItem])
    setIsActive(true)
  }

  useEffect(() => {
    if (token) {
      setVal('')
      activeAction()
    }
  }, [token])


  const tokenBlock = (
    <ResultItem>
      <ResultInfo>
        <Image className="img" size="32" src={token?.logoURI} />
        <ResultText>
          <h2>{token?.symbol}</h2>
          <span>{token?.name}</span>
        </ResultText>
      </ResultInfo>
      {isActive ? <AddCustom><Icon type="check-circle" />Active</AddCustom> : <AddCustomButton onClick={addCustom}>Add</AddCustomButton>}
    </ResultItem>
  )
  
  return (
    <SearchTokenBox>
      <SearchWrap>
        <input className="c-input" placeholder="0x0000" onChange={queryChange} />
      </SearchWrap>
      <CustomInfo>{ customToken.length} Custom Tokens</CustomInfo>
      <SearchContentBox>
        {token?.name && tokenBlock}
        {val && token === null && isAddress(val) && <EmptyImg text="NotFound Token" />}
        {val && !isAddress(val) && <EmptyImg text="Enter valid token address" /> }
      </SearchContentBox>
      <Tips>Tip: Custom tokens are stored locally in your browser</Tips>
    </SearchTokenBox>
  )
}
