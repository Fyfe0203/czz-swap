import React from 'react'
import useGlobal from '../../hooks/useGlobal'
import useBalance from '../../hooks/useBalance'
import SwapSelect from './SwapSelect'
import SwapRoute from './SwapRoute'
import styled from 'styled-components'
import intl from 'react-intl-universal'


const AmountInput = styled.input``


const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export default function SwapItem({ pool, exchange, type}) {
  const { from, setState } = useGlobal()
  const {  balance } = useBalance(pool)

  const enforcer = (nextUserInput) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      valChange(nextUserInput)
    }
  }

  const valChange = tokenValue => {
    setState({from:{...from,tokenValue}})
  }

  return (
    <div className="swap-item">
      <div className="f-c-sb swap-head">
        <div className="swap-info">
          <span style={{marginRight: 10}}>{`${type === 0 ? 'From' : 'To'} ${pool.networkType ? pool.networkType : ''}`}</span>
          {pool.currency ? `Dex:${pool.swap[pool.route]?.name}` : ''}
        </div>
        <div className="f-c swap-info">
        {intl.get("Balance") + balance.toFixed(4)} {exchange}
        </div>
      </div>
      <div className="swap-block f-c">
        <div className="swap-init f-1">
          { pool?.currency && <SwapRoute  types={type} pool={pool} />}
          <AmountInput placeholder="0.0"
            value={ pool?.tokenValue }
            className={`swap-input ${pool?.tokenValue?.length > 11 ? 'max' : ''}`}
            onChange={e => enforcer(e.target.value.replace(/,/g, '.'))}
            disabled={ type ===1 }
            inputMode="decimal"
            title="Token Amount"
            autoComplete="off"
            autoCorrect="off"
            type="text"
            pattern="^[0-9]*[.,]?[0-9]*$"
            minLength={1}
            maxLength={79}
            spellCheck="false"/>
        </div>
        <SwapSelect types={type} pool={pool} />
      </div>
    </div>
  )
}
