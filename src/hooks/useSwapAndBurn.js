import { useState } from 'react'
import { decToBn } from '../utils'
import { message } from '../compontent'
import useGlobal from './useGlobal'
import Web3 from 'web3'

function useSwapAndBurn() {
  const { poolsList, currentProvider, accounts, setPending, pending, swapSetting } = useGlobal()
  const { tolerance, deadline } = swapSetting
  const [receipt,setReceipt] = useState(null)
  const [hash,setHash] = useState(null)
  const [loading,setLoading] = useState(false)
  const [from, to] = poolsList
  // const {gas, gasPrice } = swapSetting
  const fetchSwap = () => {
    setLoading(true)
    const infoContract = new Web3(currentProvider)
    const lpContract = new infoContract.eth.Contract(
      from.abi,
      from.router
    )
    const amountIn = decToBn(Number(from?.tokenValue))
    // debugger
    // const receivedAmount = Number(poolsList[0].tokenValue) - (poolsList[0].tokenValue * Number(tolerance))
    // const tolerancAmount = amountIn.minus(amountIn.times(tolerance))
    // const deadlineVal = deadline ? new Date().getTime() + deadline * 60 * 60 * 1000 : 100000000000000
    lpContract.methods.swapAndBurn(
      amountIn.toString(),
      0, // tolerancAmount, // 0
      from.symbol?.tokenAddress,
      to.ntype,
      to.symbol?.tokenAddress,
      from.swaprouter, // change router setting
      from.weth, // change weth setting
      100000000000000,
    )
    .send({ from: accounts })
    .on("transactionHash", (hash)=> {
      console.log("hash", hash)
      setHash(hash)
      const pendings = [...pending,'swapburn']
      setPending(pendings)
    })
    .on("receipt", (receipt) => {
      console.log("receipt", receipt)
      setReceipt(receipt)
      setLoading(false)
      setPending(pending.filter(i => i !== 'swapburn'))
      successMessage(receipt)
    })
    .on("error", (error) => {
      setLoading(false)
      console.log('swap error ===>',error)
    })
  }
  
  const successMessage = (res) => {
    message({
      icon: 'check-circle',
      title:`Swap ${from?.symbol.symbol} to ${to?.symbol.symbol}`,
      content: <a target="_blank" href={ `${from?.explorerUrl}/tx/${res.transactionHash}`} rel="noopener">View on Etherscan</a>
    })
  }
  return {loading,receipt,hash,fetchSwap}
}
export default useSwapAndBurn