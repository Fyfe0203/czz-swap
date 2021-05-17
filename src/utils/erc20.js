import Web3 from 'web3'
// import { provider } from 'web3-core'
// import { Contract } from 'web3-eth-contract'
// import { AbiItem } from 'web3-utils'
import { ABI_TOKEN } from '../abi'
const { utils } = Web3
const { numberToHex } = utils

export const getContract = (provider, address, abi = ABI_TOKEN, ) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    abi,
    address,
  )
  return contract
}

// token Infos
export const getToken = async ({ provider, address }) => {
  if (provider && address) {
    try {
      const contract = getContract(provider, address)
      const [name, symbol, decimals, totalSupply] = await Promise.all([
        contract.methods.name().call(),
        contract.methods.symbol().call(),
        contract.methods.decimals().call(),
        contract.methods.totalSupply().call(),
      ])
      return { name, symbol, decimals: +decimals, totalSupply, address }
    } catch (error) {
      return {}
    }
  }
}

// 查询主币余额
export const getBalanceEth = async (provider, tokenAddress) => {
  if (provider) {
    const blance = await provider.eth.getBalance(tokenAddress)
    return blance
  }
}

// getowner 
// tokenAddress :from token
// provider: from provider
// abi: tokenAbi
// spender: from router
export const allowance = async ({ spender, provider, tokenAddress,accounts }) => {
  const lpContract = getContract(provider, tokenAddress)
  try {
    const res = await lpContract.methods
      .allowance(accounts,spender)
      .call()
    console.log('Allowance result=======', res)
    return res
  } catch (error) {
    console.warn(error)
    return false
  }
}

// tokenAddress :from token
// provider: from provider
// abi: tokenAbi
// spender: from router
export const approve = async ({ spender, provider, tokenAddress, accounts }) => {
  const lpContract = getContract(provider, tokenAddress)
  try {
    const amount = numberToHex('115792089237316195423570985008687907853269984665640564039457584007913129639935')
    const res = await lpContract.methods
      .approve(spender,amount)
      .send({ from: accounts })
    console.log('approve result===',res)
    return res
  } catch (error) {
    throw error
  }
}

// 代币余额查询
export const getBalance = async (  provider, tokenAddress, userAddress ) => {
  const lpContract = getContract(provider, tokenAddress)
  try {
    const balance = await lpContract.methods
      .balanceOf(userAddress)
      .call()
    return balance
  } catch (e) {
    return '0'
  }
}
