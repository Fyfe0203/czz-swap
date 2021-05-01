import React, { Fragment, useState, useEffect} from 'react'
import { Modal, Loading, message, Button, Image } from '../../compontent'
import useGetTokenValue from '../../hooks/useGetTokenValue'
import useSwapAndBurn from '../../hooks/useSwapAndBurn'
import useGlobal from '../../hooks/useGlobal'
import useSwap from '../../hooks/useSwap'
import useMidPrice from '../../hooks/useMidPrice'
import useBalance from '../../hooks/useBalance'
import Setting from './Setting'
import SwapItem from './SwapItem'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import SwapPending from './SwapPending'
import useWallet from '../../hooks/useWallet'
import {decToBn,bnToDec,toNonExponential} from '../../utils'
import './swap.scss'
import intl from 'react-intl-universal'

const SwapConfirmItem = ({item,status,index}) => {
  return (
    <div className="confirm-node">
      <Image src={item.currency.image} style={{width:36,height:36,borderRadius: 90,marginRight: 20}} />
      <div className="confirm-symbol">
        <b style={{color: status>0 && index === 1 ? 'red' : ''}}>{item.tokenValue}</b>
        <span>{item.currency.symbol}</span>
      </div>
    </div>
  )
}

export default function Swap() {
  const {accounts, networkStatus, from, to, setState, swapButtonText, priceStatus, miniReceived, setButtonText } = useGlobal()
  const { status } = useSwap()
  const { loading: valueLoading, approveActions, approveLoading, authorization } = useGetTokenValue()
  const { loading: pirceLoading, impactPrice, swapStatusList } = useMidPrice()
  const { loading: swapLoading, hash, fetchSwap,setHash,resSwap } = useSwapAndBurn()
  const {balance, getBalanceValue } = useBalance(from)
  const [setting, setSetting] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [hasBalance, setHasBalance] = useState(true)
  const { addEthereum } = useWallet()
  
  useEffect(() => {
    setHasBalance( Number(balance) > Number(from.tokenValue))
  }, [balance])

  useEffect(() => {
    setButtonLoading(swapLoading || valueLoading || pirceLoading || approveLoading)
  }, [valueLoading, swapLoading, pirceLoading, approveLoading])

  useEffect(() => {
    getBalanceValue(from)
    if (accounts) {
      if(valueLoading || pirceLoading){
        setButtonText('FINDING_PRICE_ING')
      } else if (to.currency == null) {
        setButtonText('NONE_TO_TOKEN')
      } else if (from.tokenValue === '') {
        setButtonText('NONE_AMOUNT')
      } else if (!hasBalance && to.tokenValue) {
        setButtonText('NONE_BALANCE')
      } else if (to.tokenValue && miniReceived === 0) {
        setButtonText('NONE_GAS')
      } else if (!networkStatus && to.tokenValue && impactPrice) {
        setButtonText('NONE_NETWORK')
      } else if (!authorization  && to.tokenValue && impactPrice) {
        setButtonText('APPROVE' )
      } else if(approveLoading){
        setButtonText('APPROVE_ING')
      } else if (to.tokenValue && from.tokenValue && priceStatus === 0 && hasBalance && authorization && miniReceived > 0) {
        setButtonText('SWAP')
      }
    } else {
      if (valueLoading || pirceLoading) {
        setButtonText('FINDING_PRICE_ING')
      } else {
        setButtonText('NONE_WALLET')
      }
    }
    }, [accounts, from.tokenValue, from.currency, to.tokenValue, to.currency, impactPrice, approveLoading, valueLoading, authorization, priceStatus, miniReceived, pirceLoading])
  
  const reverseExchange = () => {
    setState({
      from: { ...to, tokenValue: from.tokenValue },
      to: { ...from, tokenValue: '' }
    })
  }
  
  const networkMessage = () => {
    message({
      title: intl.get('NetworkWrong'),
      icon: 'wind',
      content: intl.get('PleaseConnectToTheAppropriateEthereumNetwork')
    })
  }
  
  const swapActions = () => {
    networkStatus ? setConfirmStatus(true) : networkMessage()
  }
  
  const exchangeButton = (<div className="swap-exchange f-c"><div onClick={reverseExchange} className="ico ico-repeat" /></div>)

  const swapFooter = (
    <div className="swap-footer">
      <div className="f-c"><span>{intl.get('MinimunReceived')}</span><span className={miniReceived === 0 ? 'red' : ''}><b>{miniReceived}</b> {to.currency?.symbol}</span></div>
      <div className="f-c"><span>{intl.get('PriceImpact')}</span> <span className={`price-${priceStatus}`}>{impactPrice} %</span> </div>
      <div className="f-c"><span>{intl.get('LiquidityProviderFee')}</span><span><b>{from.tokenValue && toNonExponential(bnToDec(decToBn(from.tokenValue).multipliedBy(new BigNumber(0.007))))}</b> {from.currency?.symbol}</span> </div>
    </div>
  )
  const [confirmStatus, setConfirmStatus] = useState(false)
  const confirmButton = (
    <div className={`swap-button button-${priceStatus}`} onClick={priceStatus === 3 || swapLoading ? null : fetchSwap}>
      {swapLoading ? <Loading text="Swap Pending" size="small" /> : swapStatusList[priceStatus]}
    </div>
  )

  useEffect(() => {
    if (hash) setConfirmStatus(false)
      // setSubmitStatus(true)
  }, [hash])

  // This swap has a price impact of at least 5%. Please confirm that you would like to continue whit this swap
  // Output is estimated.You will recive at least 0.23 HT or the transaction will revert.

  // const [submitStatus, setSubmitStatus] = useState(false)
  // const [pendingVisible, setPendingVisible] = useState(false)
  // const transactionSubmit = (
  //   <div style={{ paddingBottom: 15 }}>
  //     <div className="confirm-success">
  //       <Image style={{ height: 100, width: 100, marginBottom: 20 }} src={require('../../asset/svg/oks.svg').default} />
  //       <p>Transaction Submit</p>
  //       <div><LinkItem src={`${from.explorerUrl}tx/${hash}`}>View on Etherscan</LinkItem></div>
  //     </div>
  //     <div className="swap-button" onClick={() => setSubmitStatus(false)}>Close</div>
  //   </div>
  // )
  const confirmSwapModal = (
    <div>
      <div className="confirm-pool">
        <i className="ico ico-arrow-down" />
        <SwapConfirmItem index={0} item={from} status={priceStatus} />
        <SwapConfirmItem index={1} item={to} status={priceStatus} />
      </div>
      <div className="confirm-warn-text">
        {`Output is estimated.You will recive at least ${to.tokenValue} ${to.currency?.symbol} or the transaction will revert.`}
      </div>
      {confirmButton}
      {swapFooter}
    </div>
  )

  const walletConnect = () => {
    setState({
      showConnectWallet: true
    })
  }

  const buttonActions = () => {
    switch (swapButtonText) {
      case 'SWAP':
        swapActions()
        break
      case 'SWAP_IMPACT_WARN':
        swapActions()
        break
      case 'APPROVE':
        approveActions()
        break
      case 'NONE_WALLET':
        walletConnect()
        break
      case 'NONE_NETWORK':
        addEthereum()
        break
      default:
        return null
    }
  }

  return (
    <Fragment>
      <SwapWrap className="swap-wrap">
        <SwapPanel>
          <div className="f-c-sb">
            <h2 className="swap-title">{intl.get('swap')}</h2>
            <div className="swap-setting ico-settings" onClick={ ()=>setSetting(true)} />
          </div>
          <Item className="swap-id"> <SwapItem pool={from} type={0} /></Item>
          <Item className="swap-id"> <SwapItem pool={to} type={1} exchange={ exchangeButton } /></Item>
          <SwapBar className="swap-bar">
            <Button onClick={buttonActions} className={`block ${priceStatus} swap-button button-${priceStatus}`}>
              {buttonLoading ? <Loading size="small" text={status[swapButtonText]} /> : status[swapButtonText]}
            </Button>
          </SwapBar>
          {impactPrice && miniReceived >= 0 ? swapFooter : null}
        </SwapPanel>
      </SwapWrap>
    <Modal title={intl.get("AdvancedSettings")} visible={setting} onClose={ ()=>setSetting(false)}>
      <Setting />
    </Modal>
    <Modal title="Confirm Swap" visible={confirmStatus} onClose={ ()=>setConfirmStatus(false)}>
      { confirmSwapModal }
    </Modal>
    {/* <Modal visible={submitStatus} onClose={ ()=>setConfirmStatus(false)}>
      { transactionSubmit }
    </Modal> */}
      <SwapPending visible={hash} onClose={() => { setHash(null); resSwap()}} {...hash} />
   </Fragment>
  )
}

const Item = styled.div``
const SwapBar = styled.div``
const SwapPanel = styled.div`
  width:450px;
  max-width:450px;
  min-width:450px;
  margin: 0 auto;
  background: #fff;
  padding: 25px 25px 20px;
  border-radius: 10px;
`
const SwapWrap = styled.div``
