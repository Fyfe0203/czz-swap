import React, { useState, useEffect, useRef, useCallback} from 'react'
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
export default function SwapItem({pools,exchange,type}) {
  const [ balance,setBalance ] = useState(0)
  const { poolsList, setPoolsList, accounts } = useGlobal()

  const enforcer = (nextUserInput) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      valChange(nextUserInput)
      // amountInput.current.value = nextUserInput
    }
  }

  const valChange = tokenValue => {
    const list = Array.from(poolsList)
    list.splice(type, 1, { ...pools, tokenValue })
    // list.splice(type === 0 ? 1 : 0, 1, { ...poolsList[type === 0 ? 1 : 0], tokenValue: '' })
    setPoolsList(list)
  }
  
  const balanceGet = async () => {
    if (accounts && pools) {
      const res = pools.symbol ? await getBalance(pools.provider, pools.symbol?.tokenAddress, accounts) : await new Web3(pools.provider).eth.getBalance(accounts)
      const balances = getBalanceNumber(new BigNumber(Number(res))).toFixed(4)
      setBalance(balances)
    }
  }

  useEffect(() => {
    balanceGet(accounts,pools)
  }, [accounts, pools])

  // const amountInput = useRef()
  // const amoutnRes = () => {
  //   if (type === 1) amountInput.current.value = poolsList[1].tokenValue
  // }

  // useEffect(() => {
  //   amoutnRes()
  // }, [poolsList[1].tokenValue])
  
  return (
    <div className="swap-item">
      <div className="f-c-sb swap-head">
        <div className="swap-info">{`${type === 0 ? 'From':'To'} (${pools.type})`}</div>
        <div className="f-c swap-info">
        Balance:{balance} {exchange}
        </div>
      </div>
      <div className="swap-block f-c">
        <div className="swap-init f-1">
          <AmountInput placeholder="0.0"
            value={ poolsList[type].tokenValue }
            className="swap-input"
            onChange={e => enforcer(e.target.value.replace(/,/g, '.'))}
            disabled={ type ===1}
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
        <SwapSelect types={ type } />
      </div>
    </div>
  )
}

