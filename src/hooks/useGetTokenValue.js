import { useState, useEffect } from 'react'
import { decToBn } from '../utils'
import { allowance,approve } from '../utils/erc20'
import { message, LinkItem } from '../compontent'
import Web3 from "web3"
import useGlobal from './useGlobal'
import BigNumber from 'bignumber.js'
import { Token, TokenAmount } from '@uniswap/sdk'
import useLocalStorage from './useLocalStorage'
import { IUniswapV2Router02 } from '../abi'
import useDebounce from './useDebounce'
import JSBI from "jsbi";

export default function useGetTokenValue() {
  const { currentProvider, accounts, setPending, pending, from, to, setState, setButtonText} = useGlobal()
  const [loading,setLoading] = useState(false)
  const [approveLoading,setApproveLoading] = useState(false)
  const [authorization, setAuthorization] = useState(true)
  const [isApprove, setIsApprove] = useState(true)
  const [recent, setRecent] = useLocalStorage('recent',[])
  // const getReceived = async () => {
  //   const receivedAmount = Number(from.tokenValue) - (from.tokenValue * Number(tolerance))
  //   const res = await swapTokenValue(receivedAmount)
  // }
  // approve && authorization
  const approveActions = async () => {
    const {currency,router:spender,explorerUrl} = from
    const recentInfo = {content:`Approved ${currency?.symbol}`,accounts,types:'Approved'}
    try {
      setApproveLoading(true)
      setButtonText('APPROVE_ING')
      setPending([...pending, 'approve'])
      const res = await approve({ provider: currentProvider, tokenAddress: currency?.tokenAddress, spender, accounts })
      console.log('Approve result ======',res)
      setAuthorization(true)
      setApproveLoading(false)
      setPending(pending.filter(i => i !== 'approve'))
      setRecent([...recent, {...recentInfo, status:1, "explorerUrl": `${explorerUrl}tx/${res.transactionHash}` }])
      setIsApprove(res)
      message({
        icon: 'award',
        title: `Approvd White ${currency?.symbol}`,
        content: <LinkItem target="_blank" href={ `${explorerUrl}tx/${res?.transactionHash}`}>View on Explorer</LinkItem>
      })
    } catch (error) {
      setAuthorization(false)
      setRecent([...recent, { ...recentInfo, status: 0 }])
      throw error
    }
  }

  // allowance authorization
  const allowanceAction = async (from) => {
    const { provider, currency, router: spender,tokenValue } = from
    const { tokenAddress } = currency
    const allowanceTotal = await allowance({ provider, tokenAddress, spender, accounts })
    const amountToken = new BigNumber(decToBn(tokenValue))
    const allonceNum = new BigNumber(decToBn(allowanceTotal))
    console.log('Allowance result==', allonceNum)
    return allonceNum.comparedTo(amountToken) > 0
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
      const { czz,  currency, provider, router, networkName, weth } = pool
      const { swaprouter, currentToken } = pool.swap[pool.route]
      const contract = await new Web3(provider)
      const lpContract = await new contract.eth.Contract(IUniswapV2Router02, swaprouter)
      const tokenAddress = currency?.tokenAddress || router
      let tokenArray = []
      if (networkName === "ETH"){
        tokenArray =  isFrom ? [tokenAddress, weth, czz] : [czz, weth, tokenAddress]
      }else{
        tokenArray =  isFrom ? [tokenAddress, currentToken, weth, czz] : [czz, weth, currentToken, tokenAddress]
      }
      const tokenamount = Web3.utils.numberToHex(new BigNumber(tokenValue))
      console.log("swapBurnAmount", tokenamount)
      const result = await lpContract.methods.getAmountsOut(tokenamount, tokenArray).call(null)
      console.log("SwapBurnGetAmount result ===", result)
      return result[result.length -1]
    } catch (error) {
      setButtonText('NONE_TRADE')
      throw error
    }
  }

  const swapTokenBurnAmount = async (pool = {}, tokenValue, isFrom = false) => {
    try {
      const { czz, provider, networkName, weth } = pool
      const { swaprouter, currentToken } = pool.swap[pool.route]
      const contract = await new Web3(provider)
      const lpContract = await new contract.eth.Contract(IUniswapV2Router02, swaprouter)
      let tokenArray = []
      if (networkName === "ETH"){
        tokenArray = isFrom ? [weth, czz] : [czz, weth]
      }else{
        tokenArray =  isFrom ? [currentToken, weth, czz] : [czz, weth, currentToken]
      }
      const tokenamount = Web3.utils.numberToHex(new BigNumber(tokenValue))
      console.log("swapTokenBurnAmount", tokenamount)
      const result = await lpContract.methods.getAmountsOut(tokenamount, tokenArray).call()
      console.log("swapTokenBurnAmount result ===", result)
      return result[result.length -1]
    } catch (error) {
      console.log(error)
      setButtonText('NONE_TRADE')
      throw error
    }
  }

  const swapCastingAmount = async (pool = {}) => {
    try {
      const { czz, provider,networkName, weth} = pool
      const { swaprouter, currentToken } = pool.swap[pool.route]
      const contract = await new Web3(provider)
      const gasPrice = await contract.eth.getGasPrice( (price) => price)
      let gas = gasPrice * 800000
      const result_1 =  new BigNumber(Number(gas)).toString()
      const lpContract = await new contract.eth.Contract(IUniswapV2Router02, swaprouter)
      let tokenArray = []
      if (networkName === "ETH"){
        tokenArray = [weth, czz]
      }else{
        tokenArray = [currentToken, weth, czz]
      }
      const result = await lpContract.methods.getAmountsOut(result_1, tokenArray).call(null)
      console.log("SwapBurnGetAmount result ===", result)
      return result[result.length-1]
    } catch (error) {
      setButtonText('NONE_TRADE')
      throw error
    }
  }

  const swapTokenValue = async (from,to) => {
    if (from && from.currency && to.currency && from.tokenValue && Number(from.tokenValue) > 0) {
      try {
        setLoading(true)
        setState({priceStatus:0})

        let changeAmount = 0
        const inAmount = decToBn(from.tokenValue, from.currency.decimals).toString()
        if (from.currency.tokenAddress !== from.czz) {
          console.log('inAmount == ',inAmount)
          const inAmountRes = from.currency.tokenAddress ? await swapBurnAmount(from, inAmount, true) : await swapTokenBurnAmount(from, inAmount, true)
          changeAmount = new BigNumber(inAmountRes)
          console.log('inAmountExchangeValue == ', changeAmount.toString())
          if (changeAmount === "0") {
            setButtonText('NONE_TRADE')
            setLoading(false)
            return false
          }
        }else{
          changeAmount = new BigNumber(inAmount)
        }

        let outAmount = 0
        let miniReceived = 0
        const tokenAddress = to.currency.tokenAddress ? to.currency.tokenAddress : to.currentToken
        const totoken = new Token(to.networkId, tokenAddress, to.currency.decimals)
        if (to.currency.tokenAddress !== to.czz) {
          const result = to.currency.tokenAddress ? await swapBurnAmount(to, changeAmount, false) : await swapTokenBurnAmount(to, changeAmount, false)

          const amounts = new TokenAmount(totoken, JSBI.BigInt(result))
          outAmount = amounts.toSignificant(6)

          const czzfee = await swapCastingAmount(to)
          const changeAmount2 = changeAmount - czzfee
          if (changeAmount2 > 0) {
            const result1 = to.currency.tokenAddress ? await swapBurnAmount(to, changeAmount2, false) : await swapTokenBurnAmount(to,changeAmount2,false)
            const amounts1 = new TokenAmount(totoken, JSBI.BigInt(result1))
            miniReceived = amounts1.toSignificant(6)
          }
        }else{
          const czzfee = await swapCastingAmount(to)
          const amounts1 = new TokenAmount(totoken, JSBI.BigInt(changeAmount))
          outAmount = amounts1.toSignificant(6)
          if (changeAmount - czzfee < 0) {
            miniReceived = 0
          }else {
            const amounts2 = new TokenAmount(totoken, JSBI.BigInt(changeAmount - czzfee))
            miniReceived = amounts2.toSignificant(6)
          }
        }

        // if from is network approve setting true
        const allowanceResult = from.currency.tokenAddress ? await allowanceAction(from) : true
        setAuthorization(allowanceResult)
        let newTo = {...to,tokenValue:outAmount}
        setState({ to: newTo, miniReceived })
        console.log("SWAP AMOUNT ==", from.tokenValue, "==", outAmount)
        setLoading(false)
      } catch (error) {
        setButtonText('NONE_TRADE')
        setLoading(false)
        throw error
      }
    }
  }

  const debounceValue = useDebounce({
    fn: swapTokenValue,
    wait: 1000
  })


  // Get token Value Effect
  useEffect(() => {
    if (from.currency && from?.tokenValue && to.currency?.symbol) {
      debounceValue(from, to)
    }
  }, [from?.tokenValue, to.currency?.symbol, from.currency?.symbol, accounts,from.route,to.route])

  return {loading,authorization,isApprove,approveActions,approveLoading}
}
