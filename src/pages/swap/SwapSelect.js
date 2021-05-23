import React, { Fragment, useState } from 'react'
import { Image } from '../../compontent/index'
import styled from 'styled-components'
import intl from 'react-intl-universal'
import TokenList from './TokenList'

const SelectBox = styled.div``

export default function SelectId({ type, pool }) {
  const { currency } = pool
  const [listStatus, setListStatus] = useState(false)
  
  return (
    <Fragment>
      <SelectBox className="select select-inner f-c" onClick={(() => setListStatus(true))}>
        <div className="f-c f-1">
          {currency?.image && <Image src={currency?.image} size="28" style={{marginRight:10,borderRadius:90}} />}
          <div className="select-inner-val">
            <h3>{currency?.symbol || <span>{intl.get('SelectaToken')}</span>}</h3>
            {/* {currency?.name && <div className="select-inner-desc">{ currency?.name }</div>} */}
          </div>
        </div>
        <div className="ico ico-chevron-down" />
      </SelectBox>
      <TokenList pool={pool} type={type} visible={listStatus} onClose={setListStatus} />
    </Fragment>
  )
}
