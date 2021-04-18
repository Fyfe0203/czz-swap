import React, { useState,useEffect, Fragment } from 'react'
import useGlobal from '../../hooks/useGlobal'
import useWalletConnect from '../../hooks/useWalletConnect'
import { formatAddress, getBalanceNumber,  } from '../../utils'
import { CopyButton ,Loading, Modal} from '../../compontent'
import Pending from './Pending'
import NetworkError from './NetworkError'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { Jazzicon } from '@ukstv/jazzicon-react'
import Recent from './Recent'
import NetworkModal from '../swap/NetworkModal'
import './index.scss'
// https://chainid.network/chains.json
// Insufficient liquidity for this trade.
// Insufficient BNB balance
import useWallet from '../../hooks/useWallet'

export default function Connect(props) {
  const { accounts, wallet, networkStatus, networks, pending, from, to, explorer, showConnectWallet, setState } = useGlobal()
  const { connectWallet, buttonText, disConnect } = useWallet()
  // const [showConnectWallet, setShowConnectWallet] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  const [networkVisible, setNetworkVisible] = useState(false)
  const [currentNetwork, setCurrentNetwork] = useState([])
  const [balance, setBalance] = useState(null)
  const [networkLoading, setNetworkLoading] = useState(false)

  const { walletconnectAction } = useWalletConnect()

  const setShowConnectWallet = (status) => {
    setState({
      showConnectWallet:status
    })
  }
  
  const connectMetaMask =async () => {
    const accounts = await connectWallet()
    if (accounts) setShowConnectWallet(false)
  }
  const walletList = [
    {
      icon:require('../../asset/svg/metamask-fox.svg'),
      name: 'metaMask',
      actions: connectMetaMask,
      text:buttonText
    },
    {
      icon:require('../../asset/svg/walletConnectIcon.svg'),
      name: 'walletConnect',
      actions: walletconnectAction,
      text:'Connect WalletConnect'
    }
  ]

  const networkChange = async () => {
    try {
      setNetworkLoading(true)
      const networkItem = networks.filter(i => i.chainId === from.chainId)
      setCurrentNetwork(networkItem[0] || {})
      if (networkItem[0]?.provider) {
        const res = await new Web3(networkItem[0]?.provider).eth.getBalance(accounts)
        const _balance = getBalanceNumber(new BigNumber(Number(res))).toFixed(4)
        setBalance(_balance)
      }
    } finally {
      setNetworkLoading(false)
    }
  }

  useEffect(() => {
    if (accounts) { 
      networkChange()
    }
  }, [from,to,accounts])

  const accountBlock = (
    <Fragment>
      {currentNetwork.networkName && <div className="c-wallet c-connect-link network">{ currentNetwork?.networkName}</div>}
      <div className="c-wallet f-c">
        {networkLoading && <Loading size="small" mask={true} />}
          <div className="f-c">
            {balance && <div className="c-balance">{balance} { from?.currency?.symbol }</div>}
            <div className="c-accounts f-c" onClick={() => setShowAccount(!showAccount)}>
              <div className="c-wallet-icon">
                <Jazzicon address={accounts} />
              </div>
              { buttonText }
           </div>
          {pending.length ? <Pending /> : null}
          {!networkStatus ? <NetworkError connect={()=>setNetworkVisible(true)} /> :null}
        </div>
      </div>
    </Fragment>
  )
  const accountError = (<div className="c-wallet c-connect-link" onClick={() => setShowConnectWallet(!showConnectWallet)}>Connect to a wallet</div>)
  const accountsButton = accounts ? accountBlock : accountError

  const walletContent = (
    <div className="connect-list">{
    walletList.map((item, index) => {
      return (
        <div key={index} className="connect-item f-c" onClick={() => item.actions()}>
          <div className="img" style={{backgroundImage:`url(${item.icon.default})`}} alt={item.name} />
          <div className="connect-button f-1">{item.text}</div>
        </div>
      )
    })
  }</div>)

  const accountsContent = (
    <Fragment>
      <div className="connect-block">
        <div className="f-c-sb">
          <h4>Connected with MetaMask</h4>
          <div className="f-c">
            <div className="button-min" onClick={() => disConnect().then(() => {setShowAccount(false) })}>Disconnect</div>
          </div>
        </div>
        <div className="f-c-sb">
          <div>
            <h3>{formatAddress(accounts)}</h3>
            <div className="f-c connect-bar">
              <CopyButton toCopy={accounts}>copy Address</CopyButton>
              <a className="button-link" target="_blank" href={ `${from?.explorerUrl}/address/${accounts}`}>
                <i className="ico-external-link" />
                { explorer[from?.networkType] }
              </a>
            </div>
          </div>
        </div>
      </div>
      <Recent />
    </Fragment>
  )

  return (
    <div className="c-connect">
      <div className="connect-mask">
        {accountsButton}
        <Modal title="Connect Wallet" visible={showConnectWallet} onClose={setShowConnectWallet}>{ walletContent }</Modal>
        <Modal title="Account" visible={showAccount} onClose={setShowAccount}>{ accountsContent } </Modal>
        <NetworkModal title="Connect to NetWork" visible={networkVisible} onClose={setNetworkVisible} />
      </div>
    </div>
  )
}
