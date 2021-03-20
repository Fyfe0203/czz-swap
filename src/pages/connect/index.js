import React, { useState,useEffect, useCallback, Fragment } from 'react'
import { Modal } from '../../compontent/index'
import useGlobal from '../../hooks/useGlobal'
import { formatAddress, getBalanceNumber } from '../../utils'
import { CopyButton ,Loading} from '../../compontent'
import Pending from './Pending'
import NetworkError from './NetworkError'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { Jazzicon } from '@ukstv/jazzicon-react'
import Recent from './Recent'
import './index.scss'
// https://chainid.network/chains.json

export default function Connect(props) {
  const { accounts, updateAccounts, setWallet, wallet, networkStatus, networks, pending,poolsList } = useGlobal()
  const [connectText, setConnectText] = useState(null)
  const getNetworkAndChainId = useCallback( async () => {
    try {
      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      })
      const networkId = await window.ethereum.request({
        method: 'net_version',
      })
      setWallet({chainId, networkId})
    } catch (err) {
      console.error(err)
    }
  },[window.ethereum])

  const initialize = () => {
    const isMetaMaskInstalled = () => {
      const { ethereum } = window
      return Boolean(ethereum && ethereum.isMetaMask)
    }
    accountsChange()
    setConnectText(!isMetaMaskInstalled() ? 'Install MetaMask!' : 'Connect MetaMask')
  }

  useEffect(() => {
    initialize()
    getNetworkAndChainId()
  }, [window.ethereum])


  const connectMetamask = async () => {
    try {
      const res = await window.ethereum.request({ method: 'eth_requestAccounts' })
      updateAccounts(res[0])
      setShowModal(false)
    } catch(error) {
      console.warn(error)
    }
  }

  const accountsChange = () => {
    if (window.ethereum) { 
      window.ethereum.on('chainChanged', (chainId) => {
        getNetworkAndChainId()
      })
    }
  }
  const walletList = [
    {
      icon:require('../../asset/svg/metamask-fox.svg'),
      name: 'metaMask',
      actions: connectMetamask,
      connectText
    },
    {
      icon:require('../../asset/svg/walletConnectIcon.svg'),
      name: 'walletConnect',
      actions: () => {
        console.log('4')
      }
    }
  ]

  const closeWallet = async() => {}

  const [showModal, setShowModal] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  const [currentNetwork, setCurrentNetwork] = useState([])
  const [balance, setBalance] = useState(null)
  const [networkLoading, setNetworkLoading] = useState(false)

  const networkChange = async () => {
    try {
      setNetworkLoading(true)
      const networkItem = networks.filter(i => i.networkId == wallet.networkId)
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
    networkChange()
  }, [wallet])
  
  const accountBlock = (
    <Fragment>
      <div className="c-wallet c-connect-link network">{ currentNetwork?.networkName}</div>
      <div className="c-wallet f-c">
        {networkLoading && <Loading size="small" mask={true} style={{borderRadius:90}} />}
          <div className="f-c" onClick={() => setShowAccount(!showModal)}>
            <div className="c-balance">{balance} { currentNetwork?.symbol}</div>
            <div className="c-accounts f-c">
            <div className="c-wallet-icon">
              <Jazzicon address={accounts} />
            </div>
            {formatAddress(accounts)}</div>
            {pending.length ? <Pending /> : null}
            {!networkStatus ? <NetworkError /> :null}
        </div>
      </div>
    </Fragment>
  )
  const accountError = (<div className="c-wallet c-connect-link" onClick={() => setShowModal(!showModal)}>Connect to a wallet</div>)
  const accountsButton = accounts ? accountBlock : accountError

  const modalContent = (
    <div className="connect-list">{
    walletList.map((item, index) => {
      return (
        <div key={index} className="connect-item f-c" onClick={() => item.actions()}>
          <div className="img" style={{backgroundImage:`url(${item.icon.default})`}} alt={item.name} />
          <div className="connect-button f-1">{item.connectText}</div>
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
            <div className="button-min" onClick={closeWallet}>Disconnect</div>
          </div>
        </div>
        <div className="f-c-sb">
          <div>
            <h3>{formatAddress(accounts)}</h3>
            <div className="f-c connect-bar">
              <CopyButton toCopy={accounts}>copy Address</CopyButton>
              <a className="button-link" href={ `https://etherscan.io/address/${accounts}`}>
                <i className="ico-external-link" />View on Etherscan
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
        <Modal title="Connect Wallet" visible={showModal} onClose={setShowModal}>{ modalContent }</Modal>
        <Modal title="Account" visible={showAccount} onClose={setShowAccount}>{ accountsContent } </Modal>
      </div>
    </div>
  )
}
