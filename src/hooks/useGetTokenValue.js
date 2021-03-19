import { useState, useEffect, useCallback } from 'react'
import { decToBn, getBalanceNumber, getDisplayBalance } from '../utils'
import { allowance,approve } from '../utils/erc20'
import { message } from '../compontent'
import Web3 from "web3"
import useGlobal from './useGlobal'
import BigNumber from 'bignumber.js'
import JSBI from 'jsbi'
import { Token,TokenAmount } from '@uniswap/sdk'

export default function useGetTokenValue() {
  const { setPoolsList, poolsList, currentProvider, accounts, setPending, pending, swapSetting } = useGlobal()
  const {  tolerance } = swapSetting
  const [loading,setLoading] = useState(false)
  // const [value, setValue] = useState(0)
  const [approveLoading,setApproveLoading] = useState(false)
  const [authorization, setAuthorization] = useState(true)
  const [isApprove, setIsApprove] = useState(true)

  // const getReceived = async () => {
  //   const receivedAmount = Number(poolsList[0].tokenValue) - (poolsList[0].tokenValue * Number(tolerance))
  //   const res = await swapTokenValue(receivedAmount)
  // }
  // approve && authorization
  const approveActions = async () => {
    try {
      setApproveLoading(true)
      setPending([...pending,'approve'])
      const {symbol,router:spender} = poolsList[0]
      const res = await approve({ provider: currentProvider, tokenAddress: symbol?.tokenAddress, spender, accounts })
      console.log('approve result ======',res)
      setIsApprove(res)
      setApproveLoading(false)
      setAuthorization(true)
      setPending(pending.filter(i => i !== 'approve'))
      message({
        icon: 'award',
        title:`Approvd White ${symbol?.symbol}`,
        content: <a target="_blank" href={ `https://ropsten.etherscan.io/tx/${res.transactionHash}`}>View on Etherscan</a>
      })
    } catch (error) {
      console.log(error)
    } finally {
      setAuthorization(true)
      setApproveLoading(false)
      setPending(pending.filter(i => i!== 'approve'))
    }
  }

  // allowance authorization
  const allowanceAction = async (tokenValue) => {
    const {provider,symbol,router:spender} = poolsList[0]
    const allowanceTotal = await allowance({ provider, tokenAddress: symbol?.tokenAddress, spender, accounts })
    // debugger
    console.log('Allowance Total result======',allowanceTotal)
    const amountToken = decToBn(tokenValue).toNumber()
    const allonceNum = decToBn(allowanceTotal).toNumber()
    return allonceNum > amountToken
  }

  const networkError = () => {
     message({
      title: 'Network Error',
      content: 'chain network connect failed',
      icon:'wifi-off'
    })
  }

  // Get Burn amount Post
  const swapBurnAmount = async (pool = {}, tokenValue, isFrom = false) => {
    try {
      const { abi, czz, weth, symbol, provider, router, swaprouter } = pool
      const contract = await new Web3(provider)
      const lpContract = await new contract.eth.Contract(abi, router)
      const tokenAddress = symbol?.tokenAddress || router
      const tokenArray = isFrom ? [tokenAddress, weth, czz] : [czz, weth, tokenAddress]
      // debugger
      const result = await lpContract.methods.swap_burn_get_amount(tokenValue, tokenArray, swaprouter).call(null)
      console.log("swapBurnGetAmount result ===", result)
      return result[2]
    } catch (error) {
      console.log(error)
    }
  }

  const swapTokenValue =useCallback( async (tokenValue) => {
    if (tokenValue && !loading) {
      setLoading(false)
      // debugger
      try {
        // debugger
        setLoading(true)
        console.log("From Amount ====", tokenValue)
        const inAmount = decToBn(Number(tokenValue)).toString()
        const inAmountRes = await swapBurnAmount(poolsList[0], inAmount, true)
        const changeAmount = new BigNumber(Number(inAmountRes)).toString()
        const result = await swapBurnAmount(poolsList[1], changeAmount)
        // setValue(result)
        // const amount = new BigNumber(result)
        const token = new Token(poolsList[1].networkId, poolsList[1].symbol.tokenAddress, 18)
        const result_1 = JSBI.BigInt(result)
        const amounts = new TokenAmount(token, result_1)

        // const outAmount = getBalanceNumber(amount).toFixed(4)
        const outAmount = amounts.toSignificant(6)
        console.log("SWAP AMOUNT==>", tokenValue, "<==>", outAmount)
        // debugger
        const allowanceResult = await allowanceAction(tokenValue)
        let list = Array.from(poolsList)
        list[1].tokenValue = outAmount
        setPoolsList(list)
        setAuthorization(allowanceResult)
      } catch (error) {
        console.log('SWAP_AMOUNT_ERROR::', error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
  },[poolsList[0].tokenValue,poolsList[1].symbol,poolsList[0].symbol])

  const swapStatus = {
    NONE_AMOUNT: "Enter a Amount",
    NONE_FROM_TOKEN: 'Select a Token',
    NONE_TO_TOKEN: 'Select a Token',
    NETWORK_ERROR: 'NetWork Error',
    SWAP_FAILED: 'Swap Failed',
    APPROVE_ING: 'Appove in Pending',
    WALLET_ERROR: 'Connect Wallet',
    SWAP_OK: 'SWAP NOW',
    SWAP_ERROR: 'SWAP NOW',
    SWAP_WARN: 'SWAP NOW',
  }

  const [status,setStatus] = useState()

  // Get token Value Effect
  useEffect(() => {
    if (poolsList[1].symbol && poolsList[0].symbol && poolsList[0].tokenValue ) {
      setStatus(swapStatus['NONE_TO_TOKEN'])
      swapTokenValue(poolsList[0].tokenValue)
    } else {
      if(!poolsList[0].symbol) setStatus(swapStatus['NONE_FROM_TOKEN'])
      if(!poolsList[1].symbol) setStatus(swapStatus['NONE_TO_TOKEN'])
      if(!poolsList[0].tokenValue) setStatus(swapStatus['NONE_AMOUNT'])
    }
  }, [poolsList[0].tokenValue,poolsList[1].symbol,poolsList[0].symbol])

  return {loading,authorization,isApprove,approveActions,approveLoading,status}
}
