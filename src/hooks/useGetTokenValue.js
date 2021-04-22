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

export default function useGetTokenValue() {
  const { currentProvider, accounts, setPending, pending, from, to, setState, setButtonText} = useGlobal()
  const [loading,setLoading] = useState(false)
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
      setState({priceStatus:null})
      setPending([...pending, 'approve'])
      const res = await approve({ provider: currentProvider, tokenAddress: currency?.tokenAddress, spender, accounts })
      console.log('Approve result ======',res)
      setIsApprove(res)
      setApproveLoading(false)
      setAuthorization(true)
      setRecent(item => [...item, {...recentInfo, status:1, "explorerUrl": `${explorerUrl}tx/${res.transactionHash}` }])
      setPending(pending.filter(i => i !== 'approve'))

      message({
        icon: 'award',
        title: `Approvd White ${currency?.symbol}`,
        content: <LinkItem target="_blank" href={ `${explorerUrl}tx/${res?.transactionHash}`}>View on Explorer</LinkItem>
      })

    } catch (error) {
      setAuthorization(false)
      setRecent(item => [...item, { ...recentInfo, status: 0 }])
      throw error
    } finally {
      setApproveLoading(false)
      setPending(pending.filter(i => i!== 'approve'))
    }
  }

  // allowance authorization
  const allowanceAction = async (from) => {
    const { provider, currency, router: spender,tokenValue } = from
    const { tokenAddress } = currency
    const allowanceTotal = await allowance({ provider, tokenAddress, spender, accounts })
    const amountToken = decToBn(tokenValue).toNumber()
    const allonceNum = decToBn(allowanceTotal).toNumber()
    console.log('Allowance result==', allonceNum)
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
      const tokenamount =  Web3.utils.toHex(new BigNumber(tokenValue))
      const result = await lpContract.methods.getAmountsOut(tokenamount, tokenArray).call(null)
      console.log("SwapBurnGetAmount result ===", result)
      return result[2]
    } catch (error) {
      setButtonText('NONE_TRADE')
      throw error
    }
  }

  const swapTokenBurnAmount = async (pool = {}, tokenValue, isFrom = false) => {
    try {
      const { czz, weth, provider, swaprouter } = pool
      const contract = await new Web3(provider)
      const lpContract = await new contract.eth.Contract(IUniswapV2Router02, swaprouter)
      const tokenArray = isFrom ? [weth, czz] : [czz, weth]
      const tokenamount =  Web3.utils.toHex(new BigNumber(tokenValue))
      const result = await lpContract.methods.getAmountsOut(tokenamount, tokenArray).call()
      console.log("swapTokenBurnAmount result ===", result)
      return result[1]
    } catch (error) {
      console.log(error)
      setButtonText('NONE_TRADE')
      throw error
    }
  }

  const swapCastingAmount = async (pool = {}) => {
    try {
      const { czz, weth, provider, swaprouter } = pool
      const contract = await new Web3(provider)
      const gasPrice = await contract.eth.getGasPrice(function (price){
        return price
      });
      let gas = gasPrice * 800000
      const result_1 =  new BigNumber(Number(gas)).toString()
      const lpContract = await new contract.eth.Contract(IUniswapV2Router02, swaprouter)
      const tokenArray = [weth, czz]
      const result = await lpContract.methods.getAmountsOut(result_1, tokenArray).call(null)
      console.log("SwapBurnGetAmount result ===", result)
      return result[1]
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
        setButtonText('FINDING_PRICE_ING')
        const inAmount = decToBn(from.tokenValue, from.currency.decimals).toString()
        console.log('inAmount == ',inAmount)
        const inAmountRes = from.currency.tokenAddress ? await swapBurnAmount(from, inAmount, true) : await swapTokenBurnAmount(from, inAmount, true)
        const changeAmount = new BigNumber(inAmountRes)
        console.log('inAmountExchangeValue == ', changeAmount)
        if (changeAmount === "0") {
          setButtonText('NONE_TRADE')
          setLoading(false)
          return false
        }

        setButtonText('FINDING_PRICE_ING')
        const result = to.currency.tokenAddress ? await swapBurnAmount(to, changeAmount, false) : await swapTokenBurnAmount(to,changeAmount,false)
        const tokenAddress = to.currency.tokenAddress ? to.currency.tokenAddress : to.weth
        const token = new Token(to.networkId, tokenAddress, to.currency.decimals)
        const amounts = new TokenAmount(token, new BigNumber(result))
        const outAmount = amounts.toSignificant(6)

        const czzfee = await swapCastingAmount(to)
        const changeAmount2 = changeAmount - czzfee
        let miniReceived = 0
        if (changeAmount2 > 0) {
          const result1 = to.currency.tokenAddress ? await swapBurnAmount(to, changeAmount2, false) : await swapTokenBurnAmount(to,changeAmount2,false)
          const amounts1 = new TokenAmount(token, new BigNumber(result1))
          miniReceived = amounts1.toSignificant(6)
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
  }, [from?.tokenValue, to.currency?.symbol, from.currency?.symbol, accounts])

  return {loading,authorization,isApprove,approveActions,approveLoading}
}
