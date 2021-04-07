const pools = [
  {
    tokenAddress: "0x103C9FfFf6FBD142a1bb12F49E3387Bd7a211C74",
    name:'WBTC',
    symbol: "WBTC",
    decimals: 8,
    systemType: "ETH",
    image:"https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744"
  },
  {
    tokenAddress: "0x1193e93d967eD48ACf6e5e208da7e2F4f9B12910",
    name:'SUSHI',
    symbol: "SUSHI",
    decimals: 8,
    systemType: "ETH",
    image:"https://assets.coingecko.com/coins/images/12271/thumb/512x512_Logo_no_chop.png?1606986688"
  },
  {
    tokenAddress: "0xc251D7983fb00917DF80BC336692d53B6b085fD6",
    name:'USDC',
    symbol: "USDC",
    decimals: 8,
    systemType: "ETH",
    image:"https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389"
  },
  {
    tokenAddress: "0x18f419C0B1AC87d42CEdDf2326311153c7ea3886",
    name:'DAI',
    symbol: "DAI",
    decimals: 8,
    systemType: "ETH",
    image:"https://assets.coingecko.com/coins/images/9956/thumb/dai-multi-collateral-mcd.png?1574218774"
  },
  {
    tokenAddress: "0xbBae92Ec8B158Bfce96E4d3Ee21Cca3aAA92849c",
    name:'USDT',
    symbol: "USDT",
    decimals: 8,
    systemType: "ETH",
    image:"https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707"
  },
    {
    tokenAddress: "0x568911F155c68c5b5eEfd10605916074168c0E56",
    name:'WISE',
    symbol: "WISE",
    decimals: 8,
    systemType: "ETH",
    image:"https://assets.coingecko.com/coins/images/13552/thumb/WISE-logo-1600x1280.png?1609727947"
  },
  {
    tokenAddress: "0x03a3804E0B06d60596D3ff921F42c723bB14D81E",
    name:'YFI',
    symbol: "YFI",
    decimals: 8,
    systemType: "ETH",
    image:"https://assets.coingecko.com/coins/images/11849/thumb/yfi-192x192.png?1598325330"
  },
  {
    tokenAddress: "0x62Fa3e051Acd2fe0Bb7DCa4465bac2d0Cd45C0c2",
    name:'LINK',
    symbol: "LINK",
    decimals: 8,
    systemType: "ETH",
    image:"https://assets.coingecko.com/coins/images/877/thumb/chainlink-new-logo.png?1547034700"
  },
  {
    tokenAddress: "0x743e211c78Bc00D615Fd3f6fB7C372ce5EDC719a",
    name:'SNX',
    symbol: "SNX",
    decimals: 8,
    systemType: "ETH",
    image:"https://assets.coingecko.com/coins/images/3406/thumb/SNX.png?1598631139"
  },
  {
    tokenAddress: "0xf09885a2dc51bD8e34BF0072A483e1a25523e7Ee",
    name:'CORE',
    symbol: "CORE",
    decimals: 8,
    systemType: "ETH",
    image:"https://assets.coingecko.com/coins/images/12635/thumb/cvault.finance_logo.png?1601353499"
  },
  {
    tokenAddress: "0xEc93eff8a951aa52B3ab659bEF27fac9b0a7F00B",
    name:'DPI',
    symbol: "DPI",
    decimals: 8,
    systemType: "ETH",
    image:"https://assets.coingecko.com/coins/images/12465/thumb/defi_pulse_index_set.png?1600051053"
  },
  {
    tokenAddress: "0x2135847305c331B7370A7Aba8a7b6699C885f170",
    name:'FRAX',
    symbol: "FRAX",
    decimals: 8,
    systemType: "ETH",
    image:"https://assets.coingecko.com/coins/images/13422/thumb/frax_logo.png?1608476506"
  },
  {
    tokenAddress: "0x9246Cd4bF4C6D520BAEaE347B4eC038DDB508211",
    name:'HBTC',
    symbol: "HBTC",
    decimals: 8,
    systemType: "HECO",
    image:"https://assets.coingecko.com/coins/images/12407/thumb/Unknown-5.png?1599624896"
  },
  {
    tokenAddress: "0xB17eFe3Cd100537803286180E3952447311C84C1",
    name:'ETH',
    symbol: "ETH",
    decimals: 8,
    systemType: "HECO",
    image:"https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=010"
  },
  {
    tokenAddress: "0x4E2aD2fe93e45143B97A8f926036992f17B572dc",
    name:'USDT',
    symbol: "USDT",
    decimals: 8,
    systemType: "HECO",
    image:"https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707"
  },
  {
    tokenAddress: "0x3ACd8a4739a6BD09346BB3886c40656B9aCbB51C",
    name:'UNI',
    symbol: "UNI",
    decimals: 8,
    systemType: "HECO",
    image:"https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png?1600306604"
  },
  {
    tokenAddress: "0x0b8F6C48fc24696E6AA88E81109111803c5554eF",
    name:'HLTC',
    symbol: "HLTC",
    decimals: 8,
    systemType: "HECO",
    image:"https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=010"
  },
  {
    tokenAddress: "0xce953b2345bC99c54a6d63c86DC6a0ab8e348C1E",
    name:'LINK',
    symbol: "LINK",
    decimals: 8,
    systemType: "HECO",
    image:"https://assets.coingecko.com/coins/images/877/thumb/chainlink-new-logo.png?1547034700"
  },
  {
    tokenAddress: "0x9EedBe6500AD7cEF0d9413EE353D2939068AD03f",
    name:'HBCH',
    symbol: "HBCH",
    decimals: 8,
    systemType: "HECO",
    image:"https://cryptologos.cc/logos/bitcoin-cash-bch-logo.svg?v=010"
  },
  {
    tokenAddress: "0x720b988238d48a7Ff52ac1258469542E244f0E88",
    name:'HFIL',
    symbol: "HFIL",
    decimals: 8,
    systemType: "HECO",
    image:"https://cryptologos.cc/logos/filecoin-fil-logo.svg?v=010"
  },
  {
    tokenAddress: "0x983830f32d67172Cad74870D82b130E093fb38A9",
    name:'AAVE',
    symbol: "AAVE",
    decimals: 8,
    systemType: "HECO",
    image:"https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110"
  },
  {
    tokenAddress: "0x7Ed4E02D93598460c868639221F226F748CeF2D3",
    name:'HBSV',
    symbol: "HBSV",
    decimals: 8,
    systemType: "HECO",
    image:"https://cryptologos.cc/logos/bitcoin-sv-bsv-logo.svg?v=010"
  },
  {
    tokenAddress: "0xaDa3454E88C88e9721675c23CeeB5Fb2f9c1C54A",
    name:'SNX',
    symbol: "SNX",
    decimals: 8,
    systemType: "HECO",
    image:"https://assets.coingecko.com/coins/images/3406/thumb/SNX.png?1598631139"
  },
  {
    tokenAddress: "0xF8DE1e055db67bc0d6e736767B0524EB6b2E9672",
    name:'HUSD',
    symbol: "HUSD",
    decimals: 8,
    systemType: "HECO",
    image:"https://assets.coingecko.com/coins/images/9567/thumb/HUSD.jpg?1568889385"
  },
  {
    tokenAddress: "0xB4A61f37E2E9FA080A001B36D9C5f8F0BE21831E",
    name:'MDX',
    symbol: "MDX",
    decimals: 8,
    systemType: "HECO",
    image:"https://assets.coingecko.com/coins/images/13736/thumb/png-cmc.png?1611288725"
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
