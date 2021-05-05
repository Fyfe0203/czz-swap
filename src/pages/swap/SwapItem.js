import React from 'react'
import useGlobal from '../../hooks/useGlobal'
import useBalance from '../../hooks/useBalance'
import SwapSelect from './SwapSelect'
import SwapRoute from './SwapRoute'
import styled from 'styled-components'
import intl from 'react-intl-universal'


const SwapItemBox = styled.div`
  background:#f2f2f2;
  margin-bottom:20px;
  border-radius: 5px;
  padding:15px;
`

const SwapItemBlock = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top:10px;
    align-items:center;
`

const SwapItemHead = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0;
`

const AmountInput = styled.input``
const SwapItemInit = styled.div``
const SwapItemInfo = styled.div`
  display:flex;
  font-size:12px;
  align-items:center;
`
const MaxBalance = styled.div`
  background:#333;
  color:#fff;
  padding:3px 6px;
  border-radius:2px;
  margin-right:8px;
  font-size:12px;
  cursor: pointer;
  &:hover{
    background:#555;
  }
`

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
    <SwapItemBox>
      <SwapItemHead>
        <SwapItemInfo>
          {/* {pool.currency ? `Dex:${pool.swap[pool.route]?.name}` : ''} */}
          { pool?.currency && <SwapRoute types={type} pool={pool} />}
          <span style={{ marginRight: 10 }}>{`${type === 0 ? 'From' : 'To'} ${pool.networkType ? pool.networkType : ''}`}</span>
        </SwapItemInfo>
        <div className="f-c swap-info">
          {intl.get("Balance") + balance.toFixed(4)} {exchange}
        </div>
      </SwapItemHead>
      <SwapItemBlock>
        <SwapItemInit className="swap-init f-1">
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
        </SwapItemInit>
        {type===0 ? <MaxBalance onClick={ () => valChange(balance === 0 ? '' : balance.toFixed(4)) } >MAX</MaxBalance> : null} 
        <SwapSelect types={type} pool={pool} />
      </SwapItemBlock>
    </SwapItemBox>
  )
}
