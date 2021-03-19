import React, { useState, useEffect } from 'react'
import { Scrollbars } from 'rc-scrollbars'
import useGlobal from '../../hooks/useGlobal'
import { formatAddress } from '../../utils'

export default function tokenModal({ types }) {
  const [listStatus, setListStatus] = useState(false)
  const { poolsList, pools, setPoolsList, networks } = useGlobal()
  const tokenSystem = poolsList[types] || {}
  const { type, symbol } = tokenSystem

  const normalFilter = token => token?.systemType === type
  const [filters, setFilters] = useState(() => { return normalFilter })
  const [keyword, setKeyword] = useState(null)
  const [chainId,setChainId] = useState(null)

  const notFound = <div className="token-empty"><i className="ico ico-target" /> <span>{keyword}</span><p>Not Found this token! </p></div>

  // filter token list
  const filterToken = (e) => { 
    if (e.target.value.length > 0) {
      setKeyword(e.target.value)
      setFilters(() => { return token => { return token.symbol.indexOf(e.target.value.toUpperCase()) !== -1 && token?.systemType === type } })
    }
  }
  useEffect(() => {
    setFilters(() => { return token => token?.systemType === type})
  }, [type])

  // select tooken item
  const selectToken = item => { 
    let list = Array.from(poolsList)
    list.splice(types, 1, { ...tokenSystem, symbol:item })
    setPoolsList(list)
    setListStatus(false)
  }
  const tokenContainer = (
    <Scrollbars>
      <div className="token-table">
          {pools && tokenSystem && pools.filter(filters).length ? pools.filter(filters).map((item, index) => {
            const icons = require(`../../asset/svg/${item.systemType}.svg`)
          return (
            <div key={index} className={`f-c token-item ${tokenSystem.symbol?.tokenAddress === item.tokenAddress ? 'active' : ''}`} onClick={() => selectToken(item)}>
              <div className="token-info f-c">
                <div className="img" style={{backgroundImage:`url(${icons.default})`}} />
                <div className="f-1">
                  <h2>{item.symbol}</h2>
                  <div className="token-address">{formatAddress(item.tokenAddress)}</div>
                </div>
              </div>
              <div className="token-desc">
                { item.desc }
              </div>
            </div>
          )
        }) : notFound}
      </div>
    </Scrollbars>
  )
  const tokenNetwork = (
    <div className="token-network">
      {networks.map((item, index) => <div key={ index } className={ chainId === item.chainId && 'selected'} onClick={ () => filterNetwork(item)}>{ item.symbol }</div>)}
    </div>)
  return (
    <div className="token-modal">
      <div className="token-search">
        <i className="ico ico-search" />
        <div className="token-search-input">
          <input value={ keyword } className="c-input" onChange={filterToken} placeholder="search token" type="text" />
        </div>
        {keyword && <i className="ico-x-circle clean" onClick={ cleanSearch } />}
      </div>
      <div className="token-list">
        { tokenContainer }
      </div>
    </div>
  )
}
