import { useState, useEffect, useCallback } from 'react'
import { decToBn, getBalanceNumber, getDisplayBalance } from '../utils'
import { allowance,approve } from '../utils/erc20'
import { message, LinkItem } from '../compontent'
import Web3 from "web3"
import useGlobal from './useGlobal'
import BigNumber from 'bignumber.js'
import JSBI from 'jsbi'
import { Token, TokenAmount } from '@uniswap/sdk'
import useLocalStorage from './useLocalStorage'

export default function useGetTokenValue() {
  const { currentProvider, accounts, setPending, pending, from, to, setState } = useGlobal()
  const [loading,setLoading] = useState(false)
  // const [value, setValue] = useState(0)
  const [approveLoading,setApproveLoading] = useState(false)
  const [authorization, setAuthorization] = useState(true)
  const [isApprove, setIsApprove] = useState(true)
  const [recent, setRecent] = useLocalStorage([],'recent')
  const [status, setStatus] = useState(null)
  
  const swapStatus = {
    NONE_AMOUNT: "Enter a Amount",
    NONE_FROM_TOKEN: 'Select a Token',
    NONE_TO_TOKEN: 'Select a Token',
    NETWORK_ERROR: 'NetWork Error',
    APPROVE_ING: 'Approve in Pending',
    SWAP_ING: 'Appove in Pending',
    WALLET_ERROR: 'Connect Wallet',
    SWAP_OK: 'SWAP NOW',
    SWAP_ERROR: 'Price Impact Too High',
    SWAP_IMPACT_WARN: 'Swap Anyway',
    SWAP_IMPACT_HIGH: 'Price Impact Too High',
    SWAP_FAILED: 'Swap Failed',
    FINDING_PRICE: 'Finding a Best Price',
    NONE_BALANCE: 'Insufficient ETH balance',
  }

  // const getReceived = async () => {
  //   const receivedAmount = Number(from.tokenValue) - (from.tokenValue * Number(tolerance))
  //   const res = await swapTokenValue(receivedAmount)
  // }

  // approve && authorization
  const approveActions = async () => {
    const {symbol,router:spender,explorerUrl,tokenValue} = from
    const recentInfo = {content:`Approved ${symbol?.symbol}`}
    try {
      setApproveLoading(true)
      setPending([...pending,'approve'])
      const res = await approve({ provider: currentProvider, tokenAddress: symbol?.tokenAddress, spender, accounts })
      console.log('approve result ======',res)
      setIsApprove(res)
      setApproveLoading(false)
      setAuthorization(true)
      // set approve history success
      setRecent(item => [...item, {...recentInfo, status:1, "explorerUrl": `${explorerUrl}tx/${res.transactionHash}` }])
      setPending(pending.filter(i => i !== 'approve'))
      message({
        icon: 'award',
        title:`Approvd White ${symbol?.symbol}`,
        content: <LinkItem target="_blank" href={ `${explorerUrl}tx/${res?.transactionHash}`}>View on Etherscan</LinkItem>
      })
    } catch (error) {
      console.log(error)
      // set approve history failed
      setRecent(item => [...item,{...recentInfo,status:0}])
    } finally {
      setAuthorization(true)
      setApproveLoading(false)
      setPending(pending.filter(i => i!== 'approve'))
    }
  }

  // allowance authorization
  const allowanceAction = async (tokenValue) => {
    const {provider,symbol,router:spender} = from
    const allowanceTotal = await allowance({ provider, tokenAddress: symbol?.tokenAddress, spender, accounts })
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

  const lessValue = () => {
    message({
      title: 'illiquid',
      content: 'The deal is illiquid',
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

  const swapTokenValue = async (from) => {
    if (from && from.symbol && from.tokenValue && Number(from.tokenValue) > 0 && !loading) {
      setLoading(false)
      try {
        // debugger
        setLoading(true)
        setStatus('FINDING_PRICE')
        const inAmount = decToBn(Number(from.tokenValue), from.symbol.decimals).toString()
        console.log('inAmount == ',inAmount)
        // debugger
        const inAmountRes = await swapBurnAmount(from, inAmount, true)
        const changeAmount = new BigNumber(Number(inAmountRes)).toString()
        console.log('inAmountExchangeValue == ', changeAmount)
        if (changeAmount === 0) {
          lessValue()
          return 0
        }
        const result = await swapBurnAmount(to, changeAmount)
        const token = new Token(to.networkId, to.symbol.tokenAddress, to.symbol.decimals)
        const result_1 = JSBI.BigInt(result)
        const amounts = new TokenAmount(token, result_1)
        // const outAmount = getBalanceNumber(amount).toFixed(4)
        const outAmount = amounts.toSignificant(6)
        const allowanceResult = await allowanceAction(from.tokenValue)
        let newTo = {...to,tokenValue:outAmount}
        setState({to:newTo})
        // let list = Array.from(poolsList)
        // list[1].tokenValue = outAmount
        // setPoolsList(list)
        setAuthorization(allowanceResult)
        console.log("SWAP AMOUNT == >", from.tokenValue, "< == >", outAmount)
      } catch (error) {
        console.log('swap token value error::', error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
  }
  
  // Get token Value Effect
  useEffect(() => {
    if (from.symbol && from.tokenValue && to.symbol) {
      setStatus(swapStatus['NONE_TO_TOKEN'])
      swapTokenValue(from)
    } else {
      if(!from.symbol) setStatus('NONE_FROM_TOKEN')
      if(!to.symbol) setStatus('NONE_TO_TOKEN')
      if(!from.tokenValue) setStatus('NONE_AMOUNT')
    }
  }, [from?.tokenValue,to?.symbol,from?.symbol])

  return {loading,authorization,isApprove,approveActions,approveLoading,status,swapStatus}
}
