import { useState, useEffect, useCallback } from 'react'
import { decToBn, getBalanceNumber, getDisplayBalance } from '../utils'
import { allowance,approve } from '../utils/erc20'
import { message, LinkItem } from '../compontent'
import Web3 from "web3"
import useGlobal from './useGlobal'
import BigNumber from 'bignumber.js'
import JSBI from 'jsbi'
import { Token, TokenAmount,Percent } from '@uniswap/sdk'
import useLocalStorage from './useLocalStorage'
import { IUniswapV2Router02 } from '../abi'



const BASE_FEE = new Percent(JSBI.BigInt(30), JSBI.BigInt(10000))
const ONE_HUNDRED_PERCENT = new Percent(JSBI.BigInt(10000), JSBI.BigInt(10000))
const INPUT_FRACTION_AFTER_FEE = ONE_HUNDRED_PERCENT.subtract(BASE_FEE)
console.log('INPUT_FRACTION_AFTER_FEE',INPUT_FRACTION_AFTER_FEE,BASE_FEE,ONE_HUNDRED_PERCENT)
export default function useGetTokenValue() {
  const { currentProvider, accounts, setPending, pending, from, to, setState, setButtonText } = useGlobal()
  const [loading,setLoading] = useState(false)
  // const [value, setValue] = useState(0)
  const [approveLoading,setApproveLoading] = useState(false)
  const [authorization, setAuthorization] = useState(true)
  const [isApprove, setIsApprove] = useState(true)
  const [recent, setRecent] = useLocalStorage([],'recent')

  // const getReceived = async () => {
  //   const receivedAmount = Number(from.tokenValue) - (from.tokenValue * Number(tolerance))
  //   const res = await swapTokenValue(receivedAmount)
  // }

  // approve && authorization
  const approveActions = async () => {
    const {currency,router:spender,explorerUrl} = from
    const recentInfo = {content:`Approved ${currency?.symbol}`}
    try {
      setApproveLoading(true)
      setPending([...pending,'approve'])
      const res = await approve({ provider: currentProvider, tokenAddress: currency?.tokenAddress, spender, accounts })
      console.log('approve result ======',res)
      setIsApprove(res)
      setApproveLoading(false)
      setAuthorization(true)
      // set approve history success
      setRecent(item => [...item, {...recentInfo, status:1, "explorerUrl": `${explorerUrl}tx/${res.transactionHash}` }])
      setPending(pending.filter(i => i !== 'approve'))
      message({
        icon: 'award',
        title:`Approvd White ${currency?.symbol}`,
        content: <LinkItem target="_blank" href={ `${explorerUrl}tx/${res?.transactionHash}`}>View on Etherscan</LinkItem>
      })
    } catch (error) {
      // set approve history failed
      setRecent(item => [...item, { ...recentInfo, status: 0 }])
      throw error
    } finally {
      setAuthorization(true)
      setApproveLoading(false)
      setPending(pending.filter(i => i!== 'approve'))
    }
  }

  // allowance authorization
  const allowanceAction = async (tokenValue) => {
    const {provider,currency,router:spender} = from
    const allowanceTotal = await allowance({ provider, tokenAddress: currency?.tokenAddress, spender, accounts })
    const amountToken = decToBn(tokenValue).toNumber()
    const allonceNum = decToBn(allowanceTotal).toNumber()
    return allonceNum > amountToken
  }

  // const networkError = () => {
  //    message({
  //     title: 'Network Error',
  //     content: 'chain network connect failed',
  //     icon:'wifi-off'
  //   })
  // }

  // const lessValue = () => {
  //   message({
  //     title: 'illiquid',
  //     content: 'The deal is illiquid',
  //     icon:'wifi-off'
  //   })
  // }

  // Get Burn amount Post
  const swapBurnAmount = async (pool = {}, tokenValue, isFrom = false) => {
    try {
      const { czz, weth, currency, provider, router, swaprouter } = pool
      const contract = await new Web3(provider)
      const lpContract = await new contract.eth.Contract(IUniswapV2Router02, swaprouter)
      const tokenAddress = currency?.tokenAddress || router
      const tokenArray = isFrom ? [tokenAddress, weth, czz] : [czz, weth, tokenAddress]
      // debugger
      const result = await lpContract.methods.getAmountsOut(tokenValue, tokenArray).call(null)
      console.log("swapBurnGetAmount result ===", result)
      return result[2]
    } catch (error) {
      setButtonText('NONE_TRADE')
      throw error
    }
  }

  const swapTokenValue = async (from) => {
    if (from && from.currency && to.currency && from.tokenValue && Number(from.tokenValue) > 0) {
      setLoading(false)
      try {
        setLoading(true)
        setButtonText('FINDING_PRICE_ING')
        const inAmount = decToBn(Number(from.tokenValue), from.currency.decimals).toString()
        console.log('inAmount == ',inAmount)
        // debugger
        const inAmountRes = await swapBurnAmount(from, inAmount, true)
        const changeAmount = new BigNumber(Number(inAmountRes)).toString()
        console.log('inAmountExchangeValue == ', changeAmount)
        if (changeAmount === "0") {
          setButtonText('NONE_TRADE')
          setLoading(false)
          return false
        }
        const result = await swapBurnAmount(to, changeAmount)
        const token = new Token(to.networkId, to.currency.tokenAddress, to.currency.decimals)
        const result_1 = JSBI.BigInt(result)
        const amounts = new TokenAmount(token, result_1)
        const outAmount = amounts.toSignificant(6)
        const allowanceResult = await allowanceAction(from.tokenValue)
        let newTo = {...to,tokenValue:outAmount}
        setState({to:newTo})
        setAuthorization(allowanceResult)
        setLoading(false)
        console.log("SWAP AMOUNT ==", from.tokenValue, "==", outAmount)
      } catch (error) {
        setButtonText('NONE_TRADE')
        setLoading(false)
        throw error
      } finally {
        setLoading(false)
      }
    }
  }

  // Get token Value Effect
  useEffect(() => {
    if (from.currency && from.tokenValue && to.currency) {
      swapTokenValue(from)
    } else {
      if(!from.currency) setButtonText('NONE_FROM_TOKEN')
      if(!to.currency) setButtonText('NONE_TO_TOKEN')
      if(from.tokenValue === '' && accounts) setButtonText('NONE_AMOUNT')
    }
  }, [from?.tokenValue, to.currency?.symbol, from.currency?.symbol])

  return {loading,authorization,isApprove,approveActions,approveLoading}
}
