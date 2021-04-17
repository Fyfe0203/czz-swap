const pools = [
    {
    name:'ETH',
    symbol: "ETH",
    decimals: 18,
    systemType: "ETH",
    image:'https://docs.classzz.com/svg/ETH.svg'
  },
  {
    name:'HECO',
    symbol: "HT",
    decimals: 18,
    systemType: "HECO",
    image:'https://docs.classzz.com/svg/HECO.svg'
  },
  {
    name:'BSC',
    symbol: "BNB",
    decimals: 18,
    systemType: "BSC",
    image:'https://docs.classzz.com/svg/BSC.svg'
  },
  {
    tokenAddress: "0x956f47f50a910163d8bf957cf5846d573e7f87ca",
    name:'Fei USD',
    symbol: "FEI",
    decimals: 18,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x956F47F50A910163D8BF957Cf5846D573E7f87CA/logo.png"
  },
  {
    tokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    name:'USD//C',
    symbol: "USDC",
    decimals: 6,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
  },
  {
    tokenAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    name:'Tether USD',
    symbol: "USDT",
    decimals: 6,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
  },
  {
    tokenAddress: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    name:'Wrapped BTC',
    symbol: "WBTC",
    decimals: 8,
    systemType: "ETH",
    image:"https://assets.coingecko.com/coins/images/9956/thumb/dai-multi-collateral-mcd.png?1574218774"
  },
  {
    tokenAddress: "0x66a0f676479cee1d7373f3dc2e2952778bff5bd6",
    name:'Wise Token',
    symbol: "WISE",
    decimals: 18,
    systemType: "ETH",
    image:"https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707"
  },
    {
    tokenAddress: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    name:'Uniswap',
    symbol: "UNI",
    decimals: 18,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png"
  },
  {
    tokenAddress: "0x5f98805a4e8be255a32880fdec7f6728c6568ba0",
    name:'LUSD Stablecoin',
    symbol: "LUSD",
    decimals: 18,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x5f98805A4E8be255a32880FDeC7F6728C6568bA0/logo.png"
  },
  {
    tokenAddress: "0x03ab458634910aad20ef5f1c8ee96f1d6ac54919",
    name:'Rai Reflex Index',
    symbol: "RAI",
    decimals: 18,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919/logo.png"
  },
  {
    tokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
    name:'Dai Stablecoin',
    symbol: "DAI",
    decimals: 18,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
  },
  {
    tokenAddress: "0x514910771af9ca656af840dff83e8264ecf986ca",
    name:'ChainLink Token',
    symbol: "LINK",
    decimals: 18,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png"
  },
  {
    tokenAddress: "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b",
    name:'DefiPulse Index',
    symbol: "DPI",
    decimals: 18,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b/logo.png"
  },
  {
    tokenAddress: "0x62359ed7505efc61ff1d56fef82158ccaffa23d7",
    name:'cVault.finance',
    symbol: "CORE",
    decimals: 18,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x62359Ed7505Efc61FF1D56fEF82158CcaffA23D7/logo.png"
  },
  {
    tokenAddress: "0x853d955acef822db058eb8505911ed77f175b99e",
    name:'Frax',
    symbol: "FRAX",
    decimals: 18,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x853d955aCEf822Db058eb8505911ED77F175b99e/logo.png"
  }, {
    tokenAddress: "0x35a532d376ffd9a705d0bb319532837337a398e7",
    name:'Wrapped DogeCoin',
    symbol: "WDOGE",
    decimals: 18,
    systemType: "ETH",
    image:"https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=010"
  }, {
    tokenAddress: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
    name:'Maker',
    symbol: "MKR",
    decimals: 18,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png"
  }, {
    tokenAddress: "0xeef9f339514298c6a857efcfc1a762af84438dee",
    name:'Hermez Network',
    symbol: "HEZ",
    decimals: 18,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xEEF9f339514298C6A857EfCfC1A762aF84438dEE/logo.png"
  }, {
    tokenAddress: "0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206",
    name:'Nexo',
    symbol: "NEXO",
    decimals: 18,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206/logo.png"
  }, {
    tokenAddress: "0x0000000000095413afc295d19edeb1ad7b71c952",
    name:'Tokenlon',
    symbol: "LON",
    decimals: 18,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000095413afC295d19EDeb1Ad7B71c952/logo.png"
  }, {
    tokenAddress: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    name:'Aave Token',
    symbol: "AAVE",
    decimals: 18,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png"
  }, {
    tokenAddress: "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
    name:'renBTC',
    symbol: "renBTC",
    decimals: 8,
    systemType: "ETH",
    image:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D/logo.png"
  },
  {
    tokenAddress: "0x66a79d23e58475d2738179ca52cd0b41d73f0bea",
    name:'Heco-Peg HBTC',
    symbol: "HBTC",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0x66a79d23e58475d2738179ca52cd0b41d73f0bea.png"
  },
  {
    tokenAddress: "0xa71edc38d189767582c38a3145b5873052c3e47a",
    name:'Heco-Peg USDT',
    symbol: "USDT",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0xa71edc38d189767582c38a3145b5873052c3e47a.png"
  },
  {
    tokenAddress: "0x64ff637fb478863b7468bc97d30a5bf3a428a1fd",
    name:'Heco-Peg ETH',
    symbol: "ETH",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0x64ff637fb478863b7468bc97d30a5bf3a428a1fd.png"
  },
  {
    tokenAddress: "0xecb56cf772b5c9a6907fb7d32387da2fcbfb63b4",
    name:'Heco-Peg HLTC',
    symbol: "HLTC",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0xecb56cf772b5c9a6907fb7d32387da2fcbfb63b4.png"
  },
  {
    tokenAddress: "0xa2c49cee16a5e5bdefde931107dc1fae9f7773e3",
    name:'Heco-Peg HDOT',
    symbol: "HDOT",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0xa2c49cee16a5e5bdefde931107dc1fae9f7773e3.png"
  },
  {
    tokenAddress: "0x80c66d460e2bb9d31a8de54b4016fca986d0811f",
    name:'火币生态隐私拓展链',
    symbol: "HTM",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0x80c66d460e2bb9d31a8de54b4016fca986d0811f.png"
  },
  {
    tokenAddress: "0xe499ef4616993730ced0f31fa2703b92b50bb536",
    name:'Heco-Peg HPT',
    symbol: "HPT",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0xe499ef4616993730ced0f31fa2703b92b50bb536.png"
  },
  {
    tokenAddress: "0xae3a768f9ab104c69a7cd6041fe16ffa235d1810",
    name:'Heco-Peg HFIL',
    symbol: "HFIL",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0xae3a768f9ab104c69a7cd6041fe16ffa235d1810.png"
  },
  {
    tokenAddress: "0xe36ffd17b2661eb57144ceaef942d95295e637f0",
    name:'FilDA on Heco',
    symbol: "FILDA",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0xe36ffd17b2661eb57144ceaef942d95295e637f0.png"
  },
  {
    tokenAddress: "0xef3cebd77e0c52cb6f60875d9306397b5caca375",
    name:'Heco-Peg HBCH',
    symbol: "HBCH",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0xef3cebd77e0c52cb6f60875d9306397b5caca375.png"
  },
  {
    tokenAddress: "0xfd6ce15009d46c6327649218431e8643f82f6d64",
    name:'HyperGraph',
    symbol: "HGT",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0xfd6ce15009d46c6327649218431e8643f82f6d64.png"
  },
  {
    tokenAddress: "0x98fc3b60ed4a504f588342a53746405e355f9347",
    name:'HFI',
    symbol: "HFI",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0x98fc3b60ed4a504f588342a53746405e355f9347.png"
  },
  {
    tokenAddress: "0x98fc3b60ed4a504f588342a53746405e355f9347",
    name:'HFI',
    symbol: "HFI",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0x98fc3b60ed4a504f588342a53746405e355f9347.png"
  },
  {
    tokenAddress: "0x98fc3b60ed4a504f588342a53746405e355f9347",
    name:'HFI',
    symbol: "HFI",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0x98fc3b60ed4a504f588342a53746405e355f9347.png"
  },
  {
    tokenAddress: "0x98fc3b60ed4a504f588342a53746405e355f9347",
    name:'HFI',
    symbol: "HFI",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0x98fc3b60ed4a504f588342a53746405e355f9347.png"
  },
  {
    tokenAddress: "0x98fc3b60ed4a504f588342a53746405e355f9347",
    name:'HFI',
    symbol: "HFI",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0x98fc3b60ed4a504f588342a53746405e355f9347.png"
  },
  {
    tokenAddress: "0x98fc3b60ed4a504f588342a53746405e355f9347",
    name:'HFI',
    symbol: "HFI",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0x98fc3b60ed4a504f588342a53746405e355f9347.png"
  },
  {
    tokenAddress: "0x98fc3b60ed4a504f588342a53746405e355f9347",
    name:'HFI',
    symbol: "HFI",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0x98fc3b60ed4a504f588342a53746405e355f9347.png"
  },{
    tokenAddress: "0x98fc3b60ed4a504f588342a53746405e355f9347",
    name:'HFI',
    symbol: "HFI",
    decimals: 18,
    systemType: "HECO",
    image:"https://mdex.com/token-icons/heco/0x98fc3b60ed4a504f588342a53746405e355f9347.png"
  },

  {
    tokenAddress: "0xfCcD0a3De337004B4Ea466AbE775dc7bdC292785",
    name:'CAKE',
    symbol: "CAKE",
    decimals: 8,
    systemType: "BSC",
    image:"https://cryptologos.cc/logos/pancakeswap-cake-logo.svg?v=010"
  },
  {
    tokenAddress: "0x550712C399CdF5D8e4ecF46d37cd57985E0D6BA8",
    name:'USDT',
    symbol: "USDT",
    decimals: 8,
    systemType: "BSC",
    image:"https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707"
  }

]
export default pools
