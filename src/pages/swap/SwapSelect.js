import React, { Fragment, useState, useEffect } from 'react'
import useGlobal from '../../hooks/useGlobal'
import { Modal } from '../../compontent/index'
import {formatAddress} from '../../utils'
import { Scrollbars } from 'rc-scrollbars'

export default function SelectId({ types }) {
  const [listStatus, setListStatus] = useState(false)
  const { poolsList, pools, setPoolsList, networks, changePools } = useGlobal()
  const tokenSystem = poolsList[types] || {}
  const { type, symbol } = tokenSystem

  const normalFilter = token => token?.systemType === type
  const [filters, setFilters] = useState(() => { return normalFilter })
  const [keyword, setKeyword] = useState(null)
  const [chainId,setChainId] = useState(null)
  
  useEffect(() => {
    setFilters(() => { return token => token?.systemType === type})
  }, [type])

  // select tooken item
  const selectToken = item => { 
    let list = Array.from(poolsList)
    list.splice(types, 1, { ...tokenSystem, symbol:item })
    setPoolsList(list)
    setListStatus(false)
    changePools()
  }

  // filter token
  const filterToken = (e) => { 
    if (e.target.value.length > 0) {
      setKeyword(e.target.value)
      setFilters(() => { return token => { return token.symbol.indexOf(e.target.value.toUpperCase()) !== -1 && token?.systemType === type } })
    }
  }
  
  // clean search token
  const cleanSearch = () => {
    setKeyword('')
    setFilters(() => { return normalFilter })
  }
  
  const filterNetwork = (item) => {
    setChainId(item.chainId)
    setFilters(() => { return token => { return token.systemType === item.symbol } })
  }

  const notFound = <div className="token-empty"><i className="ico ico-target" /> <span>{keyword}</span><p>Not Found this token! </p></div>
  const tokenModal = (
    <Modal title={`Select Token ${type}`} visible={listStatus} onClose={ setListStatus }>
      <div className="token-search">
        <i className="ico ico-search" />
        <div className="token-search-input">
          <input value={ keyword } className="c-input" onChange={filterToken} placeholder="search token" type="text" />
        </div>
        {keyword && <i className="ico-x-circle clean" onClick={ cleanSearch } />}
      </div>
      <div className="token-list">
        <div className="token-network">
          {networks.map((item, index) => <div key={ index } className={ chainId === item.chainId && 'selected'} onClick={ () => filterNetwork(item)}>{ item.symbol }</div>)}
        </div>
        <Scrollbars style={{ maxWidth: 500, height: 300 }}>
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
      </div>
    </Modal>
  )
  const icon = require(`../../asset/svg/${type}.svg`)
  return (
    <Fragment>
      <div className="select select-inner f-c" onClick={() => setListStatus(!listStatus)}>
        <div className="f-c f-1">
          <i className="img" alt={icon.default} style={{ backgroundImage: `url(${icon.default})` }} />
          <div className="select-inner-val">
            <h3>{symbol?.symbol || type || 'Select Token'}</h3>
            <div className="select-inner-desc">{ symbol?.desc }</div>
          </div>
        </div>
        <div className="ico ico-chevron-down" />
      </div>
      {listStatus ? tokenModal : null}
    </Fragment>
  )
}
