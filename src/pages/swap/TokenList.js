import React, { useState, useEffect, useLayoutEffect, useCallback,Fragment } from 'react'
import styled from 'styled-components'
import { Modal,Image, Icon, Loading } from '../../compontent'
import useGlobal from '../../hooks/useGlobal'
import useLocalStorage from '../../hooks/useLocalStorage'
import { Scrollbars } from 'rc-scrollbars'
import useBalance from '../../hooks/useBalance'
import useToken from '../../hooks/useToken'

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
    background-color:#eee;
  }
  &:hover{
    background:#f2f2f2;
  }
`
const ItemBlock = styled.div`
  flex:1;
  margin-left:10px;
`
const ItemName = styled.div`
  font-size:12px;
  opacity:.5;
  transform:scale(.8);
  transform-origin:0;
  margin-top:3px;
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
  .close{
    cursor: pointer;
  }
`
const SearchBox = styled.div`
  flex:1;
`
const SearchTokenInput = styled.input`
  width:100%;
  padding:15px 0;
  font-size:14px;
  color:#444;
  background:transparent;
  outline:none;
  border:none;
`
const ResultText = styled.div``
const ResultBox = styled.div`
  height:480px;
  margin:0 15px;
`
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
  height:460px;
`
const ItemBalance = styled.div`
  font-size:12px;
  opacity:.5;
`
const Tips = styled.div`
  font-size:12px;
  color:#666;
  text-align:center;
  padding:10px 0;
  border-top:1px solid #eee;
`
const CustomInfo = styled.div`
  font-size:12px;
`
const ListItem = props => {
  const { image, symbol, name, ...rest } = props
  const { itemLoading, getPoolBalance, poolBalance } = useBalance()

  useEffect(() => {
    getPoolBalance(props)
  }, [])
  
  return (
    <TokenItem {...rest}>
      <Image className="img" src={image} size="34" />
      <ItemBlock>
        <ItemSymbol>{symbol}</ItemSymbol>
        <ItemName>{name}</ItemName>
      </ItemBlock>
      <ItemBalance>{poolBalance.toFixed(4)}</ItemBalance>
    </TokenItem>
  )
}

function EmptyBlock({text,loading}) {
  return (
    <SearchEmpty>
      {loading ? <Loading color="blue" /> : <Fragment>
        <Image size={280} src={require('../../asset/svg/tokenFailed.svg').default} />
        <div>{text}</div>
        </Fragment>
      }
    </SearchEmpty>
  )
}

export default function TokenList({ pool, onSelect, onClose, type, visible}) {
  const [customToken, setCustomToken] = useLocalStorage('customToken', [])
  const { pools, from, to, networks, setState } = useGlobal()
  const {loading:searchLoading, searchToken, isAddress, token} = useToken()
  const [allToken, setAllToken] = useState(pools)
  const [current, setCurrent] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [currentList, setCurrentList] = useState([])
  const [currentNetworks, setCurrentNetworks] = useState([])
  const [isActive, setIsActive] = useState(false)
  const [loading, setLoading] = useState(false)

  const getCurrentList = item => {
    setCurrentList(allToken.filter(i => i.systemType === item.networkType))
  }
    // filter network token list
  const filterNetwork = (item) => {
    setCurrent(item)
    getCurrentList(item)
  }

  // get coustom token list for localStorage
  const initList = () => {
    setSearchKey('')
    setLoading(false)
    const currentItem = type === 1 ? networks.filter(i => from.chainId !== i.chainId) : networks
    setCurrentNetworks(currentItem)
    const currentPool = networks.filter(i => i.networkId === pool.networkId)
    filterNetwork(currentPool.length ? currentPool[0] : networks[0])
    setAllToken([...pools,...customToken])
  }

  const filterToken = word => {
    const key = word.toLowerCase()
    return currentList.filter(i => i.name.toLowerCase().indexOf(key) !== -1 || i.symbol.toLowerCase().indexOf(key) !== -1)
  }

  const filterAddressToken = address => {
    return currentList.filter(i => i.address === address)
  }



  // select token
  const selectTokenItem = currency => {
    const item = type === 1 ? { ...to, ...current, currency, tokenValue: '' } : { ...from,...current, currency }
    type === 1 ? setState({ to: item }) : setState({ from: item })
    onClose(false)
  }

  const cleanSearch = () => {
    setSearchKey('')
  }

  const addCustomHanle = () => {
    cleanSearch()
    const newItem = { ...token, tokenAddress: token.address }
    const allLocal = [...customToken, newItem]
    setCustomToken(allLocal)
    setAllToken([...pools,...allLocal])
    setIsActive(true)
  }

  const searchTokenActions = useCallback( async(key) => {
    if (searchKey.length > 0 && current) {
      setCurrentList([])
      setLoading(true)
      const address = isAddress(key)
      if (address) {
        const filterList = filterAddressToken(address)
        if (filterList.length === 0) {
          searchToken({ current, tokenAddress: address })
        } else {
          setCurrentList(filterList)
        }
        setLoading(false)
      } else {
        const selfFilter = filterToken(key)
        // const searchLocal = await searchToken({ current, tokenAddress: key })
        console.log(selfFilter)
        setCurrentList(selfFilter)
        setLoading(false)
      }
    } else if (key === '') {
      getCurrentList(current)
    }
  },[searchKey])

  useEffect(() => {
    searchTokenActions(searchKey)
  }, [searchKey,current])

  useEffect(() => {
    if (allToken && current) {
      getCurrentList(current)
    }
  }, [allToken, current])

  useLayoutEffect(() => {
    initList()
  }, [visible])
  
  useEffect(() => {
    if(token) setIsActive(allToken.some(i=>i.tokenAddress === token?.address))
  }, [token])
  
  const listBlock = (
    <Scrollbars style={{ maxHeight: 450, height: 450 }}>
      {currentList.length ? currentList.map(item => <ListItem onClick={ ()=> selectTokenItem(item) } key={item.name} {...item} />) : <EmptyBlock text="None Token" />}
    </Scrollbars>
  )

  const tokenBlock = (
    <ResultBox>
      <ResultItem>
        <ResultInfo>
          <Image className="img" size="32" src={token?.logoURI} />
          <ResultText>
            <h2>{token?.symbol}</h2>
            <span>{token?.name}</span>
          </ResultText>
        </ResultInfo>
        {isActive ? <AddCustom><Icon type="check-circle" />Active</AddCustom> : <AddCustomButton onClick={addCustomHanle}>Add</AddCustomButton>}
      </ResultItem>
    </ResultBox>
  )

  return (
    <Modal onClose={onClose} visible={visible} style={{ padding: '15px 15px 0' }} maskClose={ false }>
      <ListTab>
        {currentNetworks.map((item, index) => <TabItem className={ `${current?.networkId === item.networkId ? 'selected':''}`} key={index} {...item} onClick={() => filterNetwork(item)} >{ item.networkType }</TabItem>)}
      </ListTab>
      <SearchContainer>
        <SearchBox>
          <SearchTokenInput placeholder="Search Name or Paste Address" value={searchKey} onChange={e => setSearchKey(e.target.value)} />
        </SearchBox>
        {searchKey.length ? <Icon className="close" type="x" onClick={cleanSearch} /> : null}
      </SearchContainer>
      <ListContainer>
        {searchKey ? <Fragment>
            {token?.name ? tokenBlock : (currentList.length ? listBlock : <EmptyBlock loading={ searchLoading || loading } text="Not Found Token" />)}
          </Fragment> : listBlock
        }
      </ListContainer>
      <Tips>Tip: Custom tokens are stored locally in your browser <CustomInfo>{ customToken.length} Custom Tokens</CustomInfo></Tips>
    </Modal>
  )
}
