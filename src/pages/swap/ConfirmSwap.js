import React from 'react'
import useGlobal from '../../hooks/useGlobal'

const SwapItem = item => <div><div className="img" style={{ backgroundImg: `url(${item.img})` }} />{ item.currency.symbol}</div>
export default function ConfirmSwap() {
  const { from, to } = useGlobal()
  // This swap has a price impact of at least 5%. Please confirm that you would like to continue whit this swap
  // Output is estimated.You will recive at least 0.23 HT or the transaction will revert.
  return (
    <div>
      <div>
        <SwapItem {...from} />
        <SwapItem {...to} />
      </div>
      <div>
        {`Output is estimated.You will recive at least ${to.tokenValue} ${to.currency?.symbol} or the transaction will revert.`}
      </div>
      
    </div>
  )
}
