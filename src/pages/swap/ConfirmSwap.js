import React from 'react'
import useGlobal from '../../hooks/useGlobal'

const SwapItem = item => <div><div className="img" style={{ backgroundImg: `url(${item.img})` }} />{ item.symbol.symbol}</div>
export default function ConfirmSwap() {
  const { poolsList } = useGlobal()
  const [from, to] = poolsList
  // This swap has a price impact of at least 5%. Please confirm that you would like to continue whit this swap
  // Output is estimated.You will recive at least 0.23 HT or the transaction will revert.
  return (
    <div>
      <div>
        {
          poolsList.map((item, index) => <SwapItem key={ index } {...item} />)
        }
      </div>
      <div>
        {`Output is estimated.You will recive at least ${to.tokenValue} ${to.symbol?.symbol} or the transaction will revert.`}
      </div>
      
    </div>
  )
}
