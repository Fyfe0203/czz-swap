import React, { useState, useEffect} from 'react'
import useGlobal from '../../hooks/useGlobal'
import SwapSelect from './SwapSelect'
import { getBalance } from '../../utils/erc20'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from '../../utils'
import Web3 from 'web3'

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const AmountInput = styled.input``

export default function SwapItem({ pool, exchange, type, status = () => { }}) {
  const [ balance,setBalance ] = useState(0)
  const { from, setState, accounts } = useGlobal()
  const enforcer = (nextUserInput) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      valChange(nextUserInput)
    }
  }

  const valChange = tokenValue => {
    setState({from:{...from,tokenValue}})
  }
  
  const balanceGet = async () => {
    if (accounts && pool && pool.provider) {
      const res = pool.symbol ? await getBalance(pool.provider, pool.currency?.tokenAddress, accounts) : await new Web3(pool.provider).eth.getBalance(accounts)
      const balances = getBalanceNumber(new BigNumber(Number(res))).toFixed(4)
      status(balances === 0 && type === 0 ? 'NONE_BALANCE' : null)
      setBalance(balances)
    }
  }

  useEffect(() => {
    balanceGet(accounts,pool)
  }, [accounts, pool])
  
  return (
    <div className="swap-item">
      <div className="f-c-sb swap-head">
        <div className="swap-info">{`${type === 0 ? 'From':'To'} ${pool.networkType ? pool.networkType : ''}`}</div>
        <div className="f-c swap-info">
        Balance:{balance} {exchange}
        </div>
      </div>
      <div className="swap-block f-c">
        <div className="swap-init f-1">
          <AmountInput placeholder="0.0"
            value={ pool?.tokenValue }
            className={`swap-input ${pool?.tokenValue?.length > 12 ? 'max' : ''}`}
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
