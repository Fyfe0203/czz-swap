import { useState, useEffect } from 'react'
import { decToBn } from '../utils'
import { allowance,approve } from '../utils/erc20'
import { message, LinkItem } from '../compontent'
import Web3 from "web3"
import useGlobal from './useGlobal'
import BigNumber from 'bignumber.js'
import JSBI from 'jsbi'
import { Token, TokenAmount } from '@uniswap/sdk'
import useLocalStorage from './useLocalStorage'
import useBalance from './useBalance'
import { IUniswapV2Router02 } from '../abi'
import useDebounce from './useDebounce'

export default function useGetTokenValue() {
  const { currentProvider, accounts, setPending, pending, from, to, setState, setButtonText, networkStatus,priceStatus, impactPrice} = useGlobal()
  const [loading,setLoading] = useState(false)
  const [approveLoading,setApproveLoading] = useState(false)
  const [authorization, setAuthorization] = useState(true)
  const [isApprove, setIsApprove] = useState(true)
  const [recent, setRecent] = useLocalStorage([],'recent')
  const { balance, getBalanceValue } = useBalance(from)

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
      setState({priceStatus:null})
      setPending([...pending, 'approve'])
      const res = await approve({ provider: currentProvider, tokenAddress: currency?.tokenAddress, spender, accounts })
      console.log('Approve result ======',res)
      setIsApprove(res)
      setApproveLoading(false)
      setAuthorization(true)
      setRecent(item => [...item, {...recentInfo, status:1, "explorerUrl": `${explorerUrl}tx/${res.transactionHash}` }])
      setPending(pending.filter(i => i !== 'approve'))
      // setButtonText('SWAP')
      message({
        icon: 'award',
        title:`Approvd White ${currency?.symbol}`,
        content: <LinkItem target="_blank" href={ `${explorerUrl}tx/${res?.transactionHash}`}>View on Etherscan</LinkItem>
      })
    } catch (error) {
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
    console.log('AllonceNum result==', allowance)
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
      console.log("SwapBurnGetAmount result ===", result)
      return result[2]
    } catch (error) {
      setButtonText('NONE_TRADE')
      throw error
    }
  }

  const swapTokenValue = async (from,to) => {
    if (from && from.currency && to.currency && from.tokenValue && Number(from.tokenValue) > 0) {
      try {
        setLoading(true)
        setState({priceStatus:null})
        const inAmount = decToBn(Number(from.tokenValue), from.currency.decimals).toString()
        console.log('inAmount == ',inAmount)
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
        setState({ to: newTo })
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

  const debounceValue = useDebounce({
    fn: swapTokenValue,
    wait: 1000
  })

  const [hasBalance,setHasBalance] =  useState(true)
  useEffect(() => {
    setHasBalance( Number(balance) > Number(from.tokenValue))
  }, [balance])

  // Get token Value Effect
  useEffect(() => {
    if (from.currency && from?.tokenValue && to.currency?.symbol) {
      debounceValue(from, to)
    }
  }, [from?.tokenValue, to.currency?.symbol, from.currency?.symbol,accounts])

  useEffect(() => {
    getBalanceValue(from)
   if (accounts) {
     if (to.currency == null) {
       setButtonText('NONE_TO_TOKEN')
      } else if (from.tokenValue === '') {
       setButtonText('NONE_AMOUNT')
      } else if(loading){
        setButtonText('FINDING_PRICE_ING')
      } else if(approveLoading){
        setButtonText('APPROVE_ING')
      } else if (!hasBalance) {
       setButtonText('NONE_BALANCE')
      } else if (!networkStatus && to.tokenValue) {
        setButtonText('NONE_NETWORK')
      } else if (!authorization  && to.tokenValue && impactPrice) {
        setButtonText('APPROVE' )
      } else if (to.tokenValue && from.tokenValue && priceStatus === 0 && hasBalance && authorization) {
        setButtonText('SWAP')
      }
    } else {
      setButtonText('NONE_WALLET')
    }
  }, [accounts, from.tokenValue, to.currency, impactPrice, approveLoading, loading, authorization])
  
  return {loading,authorization,isApprove,approveActions,approveLoading}
}
