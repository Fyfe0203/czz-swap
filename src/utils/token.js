
import { Token, TokenAmount } from '@uniswap/sdk'

export const balanceNumber = ({networkId,tokenAddress,amount}) =>{ 
  const token = new Token(networkId, tokenAddress, 18)
  const amounts = new TokenAmount(token, amount)
  return amounts
}