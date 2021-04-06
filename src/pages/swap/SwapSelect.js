import React, { Fragment, useState, useEffect } from 'react'
import useGlobal from '../../hooks/useGlobal'
import { Modal } from '../../compontent/index'
import {formatAddress} from '../../utils'
import { Scrollbars } from 'rc-scrollbars'
import styled from 'styled-components'

const SearchInput = styled.input`
`
export default function SelectId({ types, pool }) {
  const [listStatus, setListStatus] = useState(false)
  const { pools, networks, setState, from, to } = useGlobal()
  const { currency } = pool

  const normalFilter = token => token?.systemType === pool.networkType
  const [filters, setFilters] = useState(() => { return normalFilter })
  const [keyword, setKeyword] = useState(null)
  const [chainId, setChainId] = useState(null)

  useEffect(() => {
    setFilters(() => { return token => token?.systemType === pool.networkType })
    setChainId(pool.chainId)
  }, [pool.networkType, pool.chainId])

  // select tooken item
  const selectToken = item => {
    const currentNetwork = networks.filter(i => i.networkType === item.systemType)[0]
    // debugger
    const symbolItem =  { ...currentNetwork, currency:item }
    types === 1 ? setState({ to: { ...symbolItem, tokenValue: '' } }) : setState({ from: symbolItem})
    setListStatus(false)
  }

  // filter token
  const filterToken = ({target}) => {
    const { value } = target
    setKeyword(value)
    if (value.length > 0) {
      setFilters(() => { return token => { return token.symbol.indexOf(value.toUpperCase()) !== -1 && token?.systemType === pool.networkType } })
    } else {
      cleanSearch()
    }
  }
  
  // clean search token
  const cleanSearch = () => {
    setKeyword('')
    setFilters(() => { return normalFilter })
  }
  
  const filterNetwork = (item) => {
    setChainId(item.chainId)
    setFilters(() => { return token => { return token.systemType === item.networkType } })
  }

  const notFound = <div className="token-empty"><i className="ico ico-target" /> <span>{keyword}</span><p>Not Found this token! </p></div>

  const tokenModal = (
    <Modal visible={listStatus} onClose={ setListStatus } style={{padding: 0}}>
      <div className="token-list">
        <div className="token-network">
          {networks.map((item, index) => <div key={ index } className={ chainId === item.chainId && 'selected'} onClick={ () => filterNetwork(item)}>{ item.networkType }</div>)}
        </div>
        <div className="token-search">
          <i className="ico ico-search" />
          <div className="token-search-input">
            <SearchInput value={ keyword } className="c-input" onChange={filterToken} placeholder="search token" type="text" />
          </div>
          {keyword && <i className="ico-x-circle clean" onClick={ cleanSearch } />}
        </div>
        <Scrollbars style={{ maxWidth: 500, height: 560 }}>
          <div className="token-table">
              {pools && pools.filter(filters).length ? pools.filter(filters).map((item, index) => {
              const icons = require(`../../asset/svg/${item.systemType}.svg`)
              return (
                <div key={index} className={`f-c token-item ${currency?.tokenAddress === item.tokenAddress ? 'active' : ''}`} onClick={() => selectToken(item)}>
                  <div className="token-info f-c">
                    {icons.default && <div className="img" style={{backgroundImage:`url(${icons.default})`}} />}
                    <div className="f-1">
                      <h2>{item.symbol}</h2>
                      <div className="token-address">{formatAddress(item.tokenAddress)}</div>
                    </div>
                  </div>
                  <div className="token-desc">
                    { item.name }
                  </div>
                </div>
              )
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
          <i className="img" alt={icon.default} style={{ backgroundImage: `url(${icon.default})` }} />
          <div className="select-inner-val">
            <h3>{currency?.symbol || 'Select Token'}</h3>
            <div className="select-inner-desc">{ currency?.name }</div>
          </div>
        </div>
        <div className="ico ico-chevron-down" />
      </div>
      {tokenModal}
    </Fragment>
  )
}
