import { useState } from 'react'
import { decToBn } from '../utils'
import { message } from '../compontent'
import useGlobal from './useGlobal'
import useLocalStorage from './useLocalStorage'
import Web3 from 'web3'

function useSwapAndBurn() {
  const { poolsList, currentProvider, accounts, setPending, pending, swapSetting } = useGlobal()
  const { tolerance, deadline } = swapSetting
  const [receipt,setReceipt] = useState(null)
  const [hash,setHash] = useState(null)
  const [loading, setLoading] = useState(false)
  const [recent,setRecent] = useLocalStorage([],'recent')
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
    const deadlineVal = deadline ? new Date().getTime() + deadline * 60 * 60 * 1000 : 100000000000000
    const msgContent = `Swap ${from?.tokenValue} ${from.symbol?.symbol} to ${to.symbol?.symbol}`
    lpContract.methods.swapAndBurn(
      amountIn.toString(),
      0, // tolerancAmount, // 0
      from.symbol?.tokenAddress,
      to.ntype,
      to.symbol?.tokenAddress,
      from.swaprouter, // change router setting
      from.weth, // change weth setting
      deadlineVal,
    )
    .send({ from: accounts })
    .on("transactionHash", (hash)=> {
      console.log("hash", hash)
      setHash(hash)
      const pendings = [...pending,'swapburn']
      setPending(pendings)
    })
    .on("receipt", (receipt) => {
      setReceipt(receipt)
      setPending(pending.filter(i => i !== 'swapburn'))
      console.log('Swap receipt Result === ', receipt)
      // Set Swap history Success Status
      setRecent(item => [...item,{"types":'Swap',"status":1,content:msgContent,"explorerUrl":`${from.explorerUrl}tx/${receipt.transactionHash}`}])
      successMessage(receipt)
      setLoading(false)
    })
    .on("error", (error) => {
      // Set Swap history Error Status
      if(hash) setRecent(item => [...item,{"types":'Swap',"status":2,content:msgContent,"explorerUrl":`${from.explorerUrl}tx/${hash}`}])
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