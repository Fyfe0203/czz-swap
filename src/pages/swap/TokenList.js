import React, { useState, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { Modal,Image, Icon,Loading } from '../../compontent'
import useGlobal from '../../hooks/useGlobal'
import useLocalStorage from '../../hooks/useLocalStorage'
import { Scrollbars } from 'rc-scrollbars'
import { getToken } from '../../utils/erc20'
import { getAddress } from '@ethersproject/address'
import { Fragment } from 'react'
import useBalance from '../../hooks/useBalance'

const ListTab = styled.div`
  display:flex;
  align-items:center;
  margin:0 -10px;
`
const ListContainer = styled.div`
  margin:0 -15px;
  padding: 0 0 15px;
`
const TabItem = styled.div`
  text-align:center;
  padding:10px;
  cursor: pointer;
  font-size:15px;
  font-weight:800;
  &.selected{
    color:blue;
    position: relative;
    &:after{
      content:'';
      height:4px;
      position:absolute;
      left:30%;
      right:30%;
      bottom:0;
      background:blue;
    }
  }
`
const TokenItem = styled.div`
  display:flex;
  align-items:center;
  padding:15px;
  transition:.4s;
  margin:0 15px;
  border-radius:5px;
  cursor: pointer;
  .img{
    margin:0;
    border-radius:90px;
  }
  &:hover{
    background:rgba(90,90,90,.1);
  }
`
const ItemBlock = styled.div`
  flex:1;
  margin-left:10px;
`
const ItemName = styled.div`
  font-size:12px;
  opacity:.5;
`
const ItemSymbol = styled.div`
  font-size:15px;
  font-weight:800;
`
const SearchContainer = styled.div`
  background:rgba(90,90,90,.1);
  border-radius:5px;
  display:flex;
  align-items:center;
  padding:0 10px;
  margin:20px 0 10px;
`
const SearchBox = styled.div`
  flex:1;
`
const SearchTokenInput = styled.input`
  width:100%;
  padding:15px 0;
  font-size:16px;
  background:transparent;
  outline:none;
  border:none;
`
const ResultText = styled.div``
const ResultItem = styled.div`
  display:flex;
  align-items:center;
  background:rgba(90,90,90,.1);
  padding:20px;
  border-radius:5px;
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
const AddCustomButton = styled.div`
  padding:5px 10px;
  background:blue;
  color:#fff;
  border-radius:2px;
  font-size:12px;
  display:flex;
  align-items:center;
  cursor: pointer;
`
const AddCustom = styled.div`
  color:blue;
  font-size:12px;
  i{
    margin-right:5px;
  }
`
const SearchEmpty = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  font-size:14px;
  color:blue;
  height:480px;
`
const ItemBalance = styled.div`
  font-size:12px;
  opacity:.5;
`

const ListItem = props => {
  const { image, symbol, name, ...rest } = props
  const { itemLoading, getPoolBalance, poolBalance } = useBalance()
  useEffect(() => {
    getPoolBalance(props)
  }, [])
  
  return (
    <TokenItem {...rest}>
      <Image className="img" src={image} size="30" />
      <ItemBlock>
        <ItemSymbol>{symbol}</ItemSymbol>
        <ItemName>{name}</ItemName>
      </ItemBlock>
      <ItemBalance>{poolBalance.toFixed(4)}</ItemBalance>
    </TokenItem>
  )
}

function EmptyBlock({text}) {
  return (
    <SearchEmpty>
      <Image size={200} src={require('../../asset/svg/tokenFailed.svg').default} />
      <div>{text}</div>
    </SearchEmpty>
  )
}

export default function TokenList({ pool, onSelect, onClose, type, visible}) {
  const { pools, from, to, networks, setState } = useGlobal()
  const [customToken, setCustomToken] = useLocalStorage('customToken', [])
  // const  {isAddress, token, loading, setToken, searchToken} = useToken()
  const [allToken, setAllToken] = useState(pools)
  const [current, setCurrent] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [currentList, setCurrentList] = useState([])
  const [currentNetworks, setCurrentNetworks] = useState([])
  const [token, setToken] = useState([])
  const [loading, setLoading] = useState([])

  const isAddress = (value) => {
    try {
      return getAddress(value)
    } catch {
      return false
    }
  }
  const [isActive, setIsActive] = useState(false)
  const activeAction = () => {
    setIsActive(pools.some(i=>i.tokenAddress === token?.address))
  }

  const addCustom = () => {
    const { networkName:networkType } = currentNetworks
    const newItem = { ...token, networkType, tokenAddress: token.address }
    setCustomToken([...customToken,newItem])
    setIsActive(true)
    setSearchKey('')
    setToken({})
  }
  
  // get coustom token list for localStorage
  useEffect(() => {
    setAllToken([...pools,...customToken])
  }, [customToken])

  const initList = () => {
    const currentItem = type === 1 ? networks.filter(i => from.chainId !== i.chainId) : networks
    setCurrentNetworks(currentItem)
    const currentPool = networks.filter(i => i.networkId === pool.networkId)
    // setCurrent(currentPool.length ? currentPool[0] : networks[0])
    filterNetwork(currentPool.length ? currentPool[0] : networks[0])
  }

  useLayoutEffect(() => {
    initList()
  }, [visible])

  const queryToken = async ({ provider, address }) => {
    try {
      setLoading(true)
      const res = await getToken({ provider, address })
      debugger
      setToken(res)
      return res
    } catch (error) {
      setToken(null)
    } finally {
      setLoading(false)
    }
  }

  const filterToken = word => {
    const key = word.toLowerCase()
    const list = currentList.filter(i => i.name.toLowerCase().indexOf(key) !== -1 || i.symbol.toLowerCase().indexOf(key) !== -1)
    setCurrentList(list)
  }

  const filterAddressToken = (address) => {
    return currentList.filter(i => i.address === address)
  }

  // select token
  const selectTokenItem = currency => {
    const item = type === 1 ? { ...to, ...current, currency, tokenValue: '' } : { ...from,...current, currency }
    type === 1 ? setState({ to: item }) : setState({ from: item })
    onClose(false)
  }

  // filter network token list
  const filterNetwork = (item) => {
    setCurrent(item)
    setCurrentList(allToken.filter(i => i.systemType === item.networkType))
  }

  // clear search key
  const cleanSearchKey = () => {
    setToken(null)
    setSearchKey('')
  }

  useLayoutEffect(() => {
    if (searchKey.length > 0) {
      const address = isAddress(searchKey)
      if (address) {
        const filterList = filterAddressToken(address)
        debugger
        filterList.length === 0 ? queryToken({ provider: current.provider, address }) : setCurrentList(filterList)
      } else {
        filterToken(searchKey)
      }
    } else if (searchKey === '') {
      initList()
    }
  }, [searchKey])

  
  const listBlock = (
    <Scrollbars style={{ maxHeight: 450, height: 450 }}>
      {currentList.length ? currentList.map(item => <ListItem onClick={ ()=> selectTokenItem(item) } key={item.name} {...item} />) : <EmptyBlock text="None Token" />}
    </Scrollbars>
  )

  const tokenBlock = (
    <ResultItem>
      <ResultInfo>
        <Image className="img" size="32" src={token?.logoURI} />
        <ResultText>
          <h2>{token?.symbol}</h2>
          <span>{token?.name}</span>
          <span>{token?.address}</span>
        </ResultText>
      </ResultInfo>
      {isActive ? <AddCustom><Icon type="check-circle" />Active</AddCustom> : <AddCustomButton onClick={addCustom}>Add</AddCustomButton>}
    </ResultItem>
  )

  return (
    <Modal onClose={onClose} visible={visible} style={{ padding:'15px 15px 0'}}>
      <ListTab>
        {currentNetworks.map((item, index) => <TabItem className={ `${current?.networkId === item.networkId ? 'selected':''}`} key={index} {...item} onClick={() => filterNetwork(item)} >{ item.networkType }</TabItem>)}
      </ListTab>
      <SearchContainer>
        <SearchBox>
          <SearchTokenInput placeholder="Search Name or Paste Address" value={searchKey} onChange={e => setSearchKey(e.target.value)} />
        </SearchBox>
        {searchKey.length ? <Icon type="x" onClick={cleanSearchKey} /> : null}
      </SearchContainer>
      <ListContainer>
        {searchKey ? <Fragment>
            {currentList.length ? listBlock : <EmptyBlock text="Not Found Token" />}
            {token?.name ? tokenBlock : null}
          </Fragment> : listBlock
        }
      </ListContainer>
    </Modal>
  )
}
