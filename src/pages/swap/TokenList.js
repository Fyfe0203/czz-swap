import React, { useState, useEffect, useLayoutEffect, useCallback,Fragment,useMemo } from 'react'
import styled from 'styled-components'
import { Modal,Image, Icon, Loading } from '../../compontent'
import useGlobal from '../../hooks/useGlobal'
import useLocalStorage from '../../hooks/useLocalStorage'
import { Scrollbars } from 'rc-scrollbars'
import useBalance from '../../hooks/useBalance'
import useToken from '../../hooks/useToken'
import intl from 'react-intl-universal'

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
  font-size:16px;
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
  &:hover,&.active{
    background:#f4f4f4;
  }
  &:hover{
    background: #eee;
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
  display:flex;
  align-items:center;
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
  .search{
    font-size:16px;
    margin-right:10px;
    opacity:.4;
  }
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
const CustomTag = styled.div`
  font-size:12px;
  padding:4px 6px;
  border-radius:3px;
  background:#444;
  margin-right:4px;
  color:#fff;
  transform:scale(.7);
  transform-origin:100% 50%;
`
const ListItem = props => {
  const { image, symbol, name, tokenAddress,selected, ...rest } = props
  const { getPoolBalance, poolBalance } = useBalance()
  useEffect(() => {
    getPoolBalance(props)
  }, [name])

  useLayoutEffect(() => {
    props.balanceChange(poolBalance)
  }, [poolBalance])

  return (
    <TokenItem {...rest} className={`${selected ? 'active' : ''}`}>
      <Image className="img" src={image} size="32" />
      <ItemBlock>
        <ItemSymbol>{symbol}</ItemSymbol>
        <ItemName>{name}</ItemName>
      </ItemBlock>
      { props.custom ? <CustomTag>CUSTOM</CustomTag> : null}
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

export default function TokenList({ pool, onClose, type, visible}) {
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
    setCurrentList(allToken.filter(i => i.systemType === item.networkType).map(i => { i.balance = 0; return i}))
  }

  const searchTokenActions = async(key,current) => {
    if (searchKey.length > 0 && current) {
      setCurrentList([])
      setLoading(true)
      const address = isAddress(key)
      if (address) {
        const filterList = allToken.filter(i => i.systemType === current.networkType)
        const filterItem = filterList.filter(i => i.tokenAddress === address.toLocaleLowerCase())
        if (filterItem && filterItem.length > 0) {
          setCurrentList(filterItem)
        } else {
          searchToken({ current, tokenAddress: address })
        }
        setLoading(false)
      } else {
        const selfFilter = filterToken(key)
        setCurrentList(selfFilter)
        setLoading(false)
      }
    } else if (key === '') {
      getCurrentList(current)
    }
  }

    // filter network token list
  const filterNetwork = (item) => {
    setCurrent(item)
    if (searchKey.length) {
      searchTokenActions(searchKey, item)
    } else {
      getCurrentList(item)
    }
  }

  // get coustom token list for localStorage
  const initList = () => {
    setAllToken([...pools,...customToken])
    setSearchKey('')
    setLoading(false)
    const currentItem = type === 1 ? networks.filter(i => from.chainId !== i.chainId) : networks
    setCurrentNetworks(currentItem)
    let currentPool = networks.filter(i => i.networkId === pool.networkId)
    const item = currentPool && currentPool.length > 0 ? currentPool[0] : currentItem[0]
    filterNetwork(item)
  }

  // filter token
  const filterToken = word => {
    const key = word.toLowerCase()
    return currentList.filter(i => i.name.toLowerCase().indexOf(key) !== -1 || i.symbol.toLowerCase().indexOf(key) !== -1)
  }

  // filter Address token
  const filterAddressToken = (address,current) => {
    return getCurrentList(current).filter(i => i.tokenAddress === address)
  }

  // select token
  const selectTokenItem = currency => {
    let item = type === 1 ? { to: { ...to, ...current, currency, tokenValue: '' } } : currency?.systemType === to?.networkType ? { to: {tokenValue:''},from:{ ...from, ...current,tokenValue:from.tokenValue, currency }}  : {from:{ ...from, ...current, tokenValue:from.tokenValue, currency }}
    setState(item)
    onClose(false)
  }

  const cleanSearch = () => {
    setSearchKey('')
  }

  const addCustomHanle = () => {
    cleanSearch()
    const newItem = { ...token, tokenAddress: token.address.toLowerCase() }
    const allLocal = [...customToken, newItem]
    setCustomToken(allLocal)
    setAllToken([...pools,...allLocal])
    setIsActive(true)
  }

  useLayoutEffect(() => {
    initList()
  }, [visible])

  useEffect(() => {
    if (allToken && current) {
      searchTokenActions(searchKey, current)
    }
  }, [searchKey])

  useEffect(() => {
    cleanSearch()
  }, [onClose])

  useEffect(() => {
    if (allToken && current) {
      getCurrentList(current)
    }
  }, [allToken])

  useEffect(() => {
    if(token) setIsActive(allToken.some(i=>i.tokenAddress === token?.address))
  }, [token])


  const balanceChange = (val,index) => {
    let arr = [...currentList]
    arr[index].balance = val
    setCurrentList(arr)
  }

  // const list = useMemo(() => currentList, [currentList])
  const listBlock = (
    <Scrollbars style={{ maxHeight: 450, height: 450 }}>
      {currentList.length ? currentList.map((item, index) => <ListItem selected={pool?.currency?.tokenAddress === item.tokenAddress} balanceChange={val => balanceChange(val,index) } onClick={ ()=> selectTokenItem(item) } key={index} {...item} />) : <EmptyBlock text="None Token" />}
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
        {currentNetworks.map((item, index) =>
          <TabItem className={`${current?.networkId === item.networkId ? 'selected' : ''}`} key={index} {...item} onClick={() => filterNetwork(item)} >
            {/* <Image className="img" src={ item.image } size="16" /> */}
            {item.networkType}
          </TabItem>
        )}
      </ListTab>
      <SearchContainer>
        <Icon type="search" className="search" />
        <SearchBox>
          <SearchTokenInput placeholder={intl.get('SearchTokenPasteAddress')} value={searchKey} onChange={e => setSearchKey(e.target.value)} />
        </SearchBox>
        {searchKey.length ? <Icon className="close" type="x" onClick={cleanSearch} /> : null}
      </SearchContainer>
      <ListContainer>
        {searchKey ? <Fragment>
          {token?.name ? tokenBlock : (currentList.length ? listBlock : <EmptyBlock loading={searchLoading || loading} text={intl.get('NotFoundToken')} />)}
          </Fragment> : listBlock
        }
      </ListContainer>
      <Tips>Tip: Custom tokens are stored locally in your browser {customToken.length ? <CustomInfo>{ customToken.length} Custom Tokens</CustomInfo> : null}</Tips>
    </Modal>
  )
}
