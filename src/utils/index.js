import BigNumber from 'bignumber.js'

export const formatAddress = (address) => {
  if (address) { 
    return address.slice(0, 6) + '...' + address.slice(-6)
  }
}

export const bnToDec = (bn, decimals = 18) => {
  return bn.dividedBy(new BigNumber(10).pow(decimals))
}

export const decToBn = (dec, decimals = 18) => {
  let num = new BigNumber(dec).decimalPlaces(decimals)
  return num.multipliedBy(new BigNumber(10).pow(decimals))
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
