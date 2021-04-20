import BigNumber from 'bignumber.js'
import JSBI from 'jsbi'
import web3 from 'web3'

window.JSBI = JSBI
export const formatAddress = (address) => {
  if (address) { 
    return address.slice(0, 6) + '...' + address.slice(-6)
  }
}

export const bnToDec = (bn, decimals = 18) => {
  return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber()
}

export const decToBn = (dec, decimals = 18) => {
  return new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals))
}

export const toNonExponential = (num) => {
  let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}

export const getBalanceNumber = (balance, decimals = 18) => {
  if (balance) { 
    const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
    return displayBalance.toNumber()
  }
}

export const getDisplayBalance = (balance, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  if (displayBalance.lt(1)) {
    return displayBalance.toPrecision(4)
  } else {
    return displayBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

export const getFullDisplayBalance = (balance, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

export const debounce = function (fn, delay = 1000) {
  return (...rest) => {
    let args = rest
    if (this.timerId) clearTimeout(this.timerId)
    this.timerId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export const throttle = (fn, delay = 3000) => {
  let canRun = true
  return (...rest) => {
    if (!canRun) return;
    canRun = false
    setTimeout(() => {
      fn.apply(this, rest)
      canRun = true
    }, delay)
  }
}

const MAX_FEE = web3.utils.toBN('9999')
export const getFee = (amount, feePercent) => {
  return web3.utils.toBN(amount)
    .mul(web3.utils.toBN(feePercent))
    .div(MAX_FEE.addn(1))
    .toString()
}

window.getFee = getFee
window.web3 = web3
window.bnToDec = bnToDec
window.decToBn = decToBn
