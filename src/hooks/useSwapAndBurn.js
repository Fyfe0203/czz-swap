import { useState,useEffect } from 'react'
import { decToBn } from '../utils'
import { message,LinkItem } from '../compontent'
import useGlobal from './useGlobal'
import useLocalStorage from './useLocalStorage'
import Web3 from 'web3'

export default function useSwapAndBurn() {
  const { from, to, currentProvider, accounts, setPending, pending, swapSetting,  setButtonText, setState} = useGlobal()
  const { tolerance, deadline } = swapSetting
  const [receipt, setReceipt] = useState(null)
  const [hash,setHash] = useState(null)
  const [loading, setLoading] = useState(false)
  const [recent,setRecent] = useLocalStorage([],'recent')

  const getHashUrl = address => {
    return {
      explorerUrl: `${from.explorerUrl}tx/${address}`,
      fromUrl: from.explorerUrl,
      fromType: from.networkType,
      toType: to.networkType,
      toUrl: to.explorerUrl,
      fromImage: from.currency.image,
      toImage: to.currency.image,
    }
  }
  
  const stopPending = () => {
    setLoading(false)
    setPending(pending.filter(i => i !== 'swapburn'))
  }
  
  // swap success
  const swapSuccess = (receipt) => {
    const state = {
      form: {
        ...from,
        tokenValue: '',
      },
      to: {
        ...to,
        tokenValue: ''
      }
    }
    successMessage(receipt)
    setState(state)
    stopPending()
  }

  const fetchSwap = () => {
    setLoading(true)
    setButtonText('SWAP_ING')
    const infoContract = new Web3(currentProvider)
    const lpContract = new infoContract.eth.Contract(
      from.abi,
      from.router
    )
    const amountIn = decToBn(Number(from?.tokenValue), from.currency?.decimals)
    
    // history params
    const deadlineVal = deadline ? new Date().getTime() + deadline * 60 * 60 * 1000 : 100000000000000
    const recentItem = {
      types: 'Swap',
      accounts,
      content: `Swap ${from?.tokenValue} ${from.currency?.symbol} to ${to.currency?.symbol}`
    }

    const swapTranscationHash = hashRes => {
      console.log('Swap hash Result === ', hashRes)
      const swapResresult = { ...recentItem, status: 0, hash: hashRes, ...getHashUrl(hashRes), id: new Date().getTime() }
      setRecent(recent => [...recent, swapResresult])
      setHash(swapResresult)
      setPending([...pending,'swapburn'])
    }

    const swapReceipt = receipt => {
      console.log('Swap receipt Result === ', receipt)
      setReceipt(receipt)
      swapSuccess(receipt)
    }

    const swapError = error => {
      setLoading(false)
      stopPending()
      setButtonText('SWAP')
      console.log('swap error ===>', error)
    }
    
    const lpSwap = () => {
      lpContract.methods.swapAndBurn(
          amountIn.toString(),
          0, // tolerancAmount, // 0
          from.currency?.tokenAddress,
          to.ntype,
          to.currency?.tokenAddress,
          from.swaprouter, // change router setting
          from.weth, // change weth setting
          deadlineVal,
      )
      .send({ from: accounts })
      .on("transactionHash", swapTranscationHash)
      .on("receipt",swapReceipt)
      .on("error",swapError)
    }
    const ethSwap = () => {
      lpContract.methods.swapAndBurnEth(
          0, // tolerancAmount, // 0
          to.ntype,
          to.currency.tokenAddress ? to.currency.tokenAddress : "0x0000000000000000000000000000000000000000" ,
          from.swaprouter, // change router setting
          from.weth,       // change weth setting
          deadlineVal,
      ).send({ from: accounts,value: amountIn})
      .on("transactionHash",swapTranscationHash)
      .on("receipt", swapReceipt)
      .on("error", swapError)
    }
    from.currency.tokenAddress ? lpSwap() : ethSwap()
  }


  const successMessage = (res) => {
    message({
      icon: 'check-circle',
      title:`Swap ${from?.currency.symbol} to ${to?.currency.symbol}`,
      content: <LinkItem target="_blank" href={ `${from?.explorerUrl}tx/${res.transactionHash}`} rel="noopener">View on Etherscan</LinkItem>
    })
  }

  useEffect(() => {
    if (loading) {
      setButtonText('SWAP_ING')
    }
  }, [loading])

  
  return {loading,receipt,hash,fetchSwap,setHash}
}
