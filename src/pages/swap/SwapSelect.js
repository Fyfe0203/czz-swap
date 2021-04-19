import React, { Fragment, useState, useEffect } from 'react'
import useGlobal from '../../hooks/useGlobal'
import { Modal, Loading } from '../../compontent/index'
// import {formatAddress} from '../../utils'
import { Scrollbars } from 'rc-scrollbars'
import styled from 'styled-components'
// import useSwap from '../../hooks/useSwap'
import intl from 'react-intl-universal'
const SearchInput = styled.input`
`

const TokenItem = ({ item, onClick, currency }) => {
  return (
    <div className={`f-c token-item ${currency?.tokenAddress === item.tokenAddress ? 'active' : ''}`} onClick={() => onClick(item)}>
      <div className="token-info f-c">
        {item.image && <div className="img" style={{backgroundImage:`url(${item.image})`}} />}
        <div className="f-1">
          <h2>{item.symbolName || item.symbol}</h2>
          {/* <div className="token-address">{item.name}</div> */}
        </div>
      </div>
      <div className="token-desc" style={{fontSize:12,fontWeight:'normal',opacity:.4}}>
        { item.name }
        {/* { item.loading ?<Loading size="small" color="blue" /> : <>{item.balance || '0.00'}</>  } */}
      </div>
    </div>
  )
}

export default React.memo( function SelectId({ types, pool }) {
  const [listStatus, setListStatus] = useState(false)
  const { pools, networks, setState, from, to } = useGlobal()
  const { currency } = pool
  // const { poolsBalance } = useSwap()
  const [networkTabs,setNetworkTabs] = useState([])
  const [keyword, setKeyword] = useState('')
  const [chainId, setChainId] = useState(null)

  // select tooken item
  const selectToken = item => {
    const currentNetwork = networks.filter(i => i.networkType === item.systemType)[0]
    let oldItem = types === 1 ? to : from
    const symbolItem = { ...oldItem, ...currentNetwork, tokenValue: oldItem.tokenValue, currency: item }
    let toOld = currentNetwork.networkType === to?.networkType ? {tokenValue:''} : to
    types === 1 ? setState({ to: { ...symbolItem, tokenValue: '' } }) : setState({ from: symbolItem ,to:toOld})
    setListStatus(false)
  }

  const [filters, setFilters] = useState(null)

  const filterNetwork = (nodes = null) => {
    const item = types === 1 ? networks.filter(i => i.networkType !== from.networkType) : networks
    setNetworkTabs(item)
    const node = nodes || item[0]
    setChainId(node.chainId)
    setFilters(() => { return token => { return token.systemType === node.networkType } })
  }
  
  useEffect(() => {
    if (from.currency || to.currency) {
      filterNetwork()
    }
  }, [from.currency, to.currency])

  // clean search token
  const cleanSearch = () => {
    setKeyword('')
    filterNetwork()
  }

  // filter token
  const filterToken = ({target}) => {
    const { value } = target
    setKeyword(value)
    if (value.length > 0) {
      setFilters(() => { return token => { return token.name.indexOf(value.toUpperCase()) !== -1 && token?.systemType === pool.networkType} })
    } else {
      cleanSearch()
    }
  }

  useEffect(() => {
    pool.currency && filterNetwork(pool)
  }, [])
  
  const notFound = <div className="token-empty"><i className="img" style={{backgroundImage:`url(${require('../../asset/svg/noResults.svg').default})`}} /> <h2>Oops!</h2><p>Not Found token! </p></div>
  const tokenModal = (
    <Modal visible={listStatus} onClose={ setListStatus } style={{padding: 0}}>
      <div className="token-list">
        <div className="token-network">
          {networkTabs.map((item, index) => <div key={ index } className={ item.chainId === chainId ? 'selected' : ''} onClick={ () => filterNetwork(item)}>{ item.networkType }</div>)}
        </div>
        <div className="token-search">
          <i className="ico ico-search" />
          <div className="token-search-input">
            <SearchInput value={ keyword } className="c-input" onChange={filterToken} placeholder={intl.get('SearchToken')} type="text" />
          </div>
          {keyword && <i className="ico-x clean" onClick={ cleanSearch } />}
        </div>
        <Scrollbars style={{ maxHeight: 400, height: 400 }}>
          <div className="token-table">
              {pools && filters && pools.filter(filters).length ? pools.filter(filters).map((item, index) => {
                return <TokenItem key={ index } currency={currency} item={item} onClick={ selectToken } />
            }) : notFound}
          </div>
        </Scrollbars>
      </div>
    </Modal>
  )
  const icon = require(`../../asset/svg/BSC.svg`)

  function selectTokenModal(){
    setChainId(types === 1 ? to.chainId : from.chainId)
    setListStatus(!listStatus)
  }

  return (
    <Fragment>
      <div className="select select-inner f-c" onClick={selectTokenModal}>
        <div className="f-c f-1">
          {currency?.image && <i className="img" alt={icon.default} style={{ backgroundImage: `url(${currency?.image})` }} />}
          <div className="select-inner-val">
            <h3>{currency?.symbol || <span>{intl.get('SelectaToken')}</span>}</h3>
            {currency?.name && <div className="select-inner-desc">{ currency?.name }</div>}
          </div>
        </div>
        <div className="ico ico-chevron-down" />
      </div>
      {tokenModal}
    </Fragment>
  )
})
