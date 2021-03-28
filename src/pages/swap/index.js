import React, { Fragment, useState, useEffect} from 'react'
import { Modal, Loading, message,LinkItem,Button } from '../../compontent'
import useGetTokenValue from '../../hooks/useGetTokenValue'
import useSwapAndBurn from '../../hooks/useSwapAndBurn'
import useGlobal from '../../hooks/useGlobal'
import useSwap from '../../hooks/useSwap'
import useMidPrice from '../../hooks/useMidPrice'
import Setting from './Setting'
import SwapItem from './SwapItem'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import useWallet from '../../hooks/useWallet'
import './swap.scss'
window.BigNumber = BigNumber

const SwapConfirmItem = ({item,status,index}) => {
  return (
    <div className="confirm-node">
      <div className="img" style={{ backgroundImg: `url(${item.img})` }} />
      <div className="confirm-symbol">
        <b style={{color: status>0 && index === 1 ? 'red' : ''}}>{item.tokenValue}</b>
        <span>{item.symbol.symbol}</span>
      </div>
    </div>
  )
}

export default function Swap() {
  const { accounts, networkStatus, from, to, setState } = useGlobal()
  const { } = useSwap()
  const { loading, authorization, approveActions, approveLoading } = useGetTokenValue()
  const {loading: pirceLoading, impactPrice, swapStatus, swapStatusList} = useMidPrice()
  const {loading: swapLoading, hash, fetchSwap} = useSwapAndBurn()
  const [setting,setSetting] = useState(false)
  const [buttonLoading,setButtonLoading] = useState(false)
  const { connectWallet, loading: walletLoading, wallet } = useWallet()
  
  useEffect(() => {
    setButtonLoading(loading || pirceLoading)
  }, [loading, pirceLoading])
  useEffect(() => {
    setState({aaa:'3'})
  }, [])

  const reverseExchange = () => {
    setState({
      from:{...to,tokenValue:from.tokenValue},
      to:{...from,tokenValue:''}
    })
  }
  
  const networkMessage = () => {
     message({
        title: 'Network Wrong.',
        icon:'wind',
        content:'Please connect to the appropriate Ethereum network.'
      })
  }

  const swapActions = () => {
    networkStatus ?  setConfirmStatus(true) : networkMessage()
  }
  const exchangeButton = (<div className="swap-exchange f-c"><div onClick={ reverseExchange } className="ico ico-repeat" /></div>)
  const approveButton = <div className="swap-button" onClick={approveLoading ? null : approveActions}>{approveLoading ? <Loading mask={true} size="small" /> : 'Approve'}</div>
  const swapWarnButton = <div className={`swap-button button-${swapStatus} error`}>{swapStatusList[swapStatus]}</div>
  const connectWalletButton = <div className="swap-button disable" onClick={connectWallet}>Connect Wallet</div>

  const swapingButton = (
    <Fragment>
      {accounts ?
        <div className={`swap-button button-${buttonLoading ? '' : swapStatus} ${!accounts ? 'disable' : ''}`} onClick={buttonLoading ? null : swapActions}>
          {buttonLoading ? <Loading text="Finding Best Price" size="small" /> : swapStatusList[swapStatus]}</div> : connectWalletButton
      }
    </Fragment>
  )

  const swapButton = authorization || loading || pirceLoading ? (swapStatus === 3 ?  swapWarnButton : swapingButton ) : swapStatus === 3 ? swapWarnButton : approveButton
  
  const swapFooter = (
    <div className="swap-footer">
      <div className="f-c"><span>Minimun received</span> <span><b>{to.tokenValue}</b> { to.symbol?.symbol}</span></div>
      <div className="f-c"><span>Price Impact</span> <span className={ `price-${swapStatus}` }>{impactPrice} %</span> </div>
      <div className="f-c"><span>Liquidity Provider Fee</span><span><b>{from.tokenValue && new BigNumber(Number(from.tokenValue)).times(new BigNumber(0.0007)).toNumber()}</b> { from.symbol?.symbol}</span> </div>
    </div>
  )

  const [confirmStatus, setConfirmStatus] = useState(false)
  
  const confirmSwap = () => {
    fetchSwap()
   
  }
  const confirmButton = (
    <div className={`swap-button button-${swapStatus}`} onClick={swapStatus === 3 || swapLoading ? null : confirmSwap}>
      {swapLoading ? <Loading text="Swap Pending" size="small" /> : swapStatusList[swapStatus]}
    </div>
  )
  useEffect(() => {
    console.log('hash', hash)
    if (hash) {
      setConfirmStatus(false)
      setSubmitStatus(true)
    }
  }, [hash])

  // This swap has a price impact of at least 5%. Please confirm that you would like to continue whit this swap
  // Output is estimated.You will recive at least 0.23 HT or the transaction will revert.

  const [submitStatus, setSubmitStatus] = useState(false)
  const transactionSubmit = (
    <div style={{paddingBottom:15}}>
      <div className="confirm-success">
        {/* <div className="ico ico-arrow-up-circle" /> */}
        <div style={{backgroundImage:`url(${require('../../asset/svg/oks.svg').default})` ,height:100, width:100,marginBottom:20 }} className="img" />
        <p>Transaction Submit</p>
       <div><LinkItem src={`${from.explorerUrl}tx/${hash}`}>View on Etherscan</LinkItem></div>
      </div>
      <div className="swap-button" onClick={ () => setSubmitStatus(false)}>Close</div>
    </div>
  )

  const confirmSwapModal = (
    <div>
      <div className="confirm-pool">
        <i className="ico ico-arrow-down" />
        <SwapConfirmItem index={0} item={from} status={swapStatus} />
        <SwapConfirmItem index={1} item={to} status={swapStatus}/>
        {/* {poolsList.map((item, index) => <SwapConfirmItem key={index} index={ index } item={item} status={swapStatus}/>) } */}
      </div>
      <div className="confirm-warn-text">
        {`Output is estimated.You will recive at least ${to.tokenValue} ${to.symbol?.symbol} or the transaction will revert.`}
      </div>
      {confirmButton}
      {swapFooter}
    </div>
  )
  
  return (
    <Fragment>
      <div className="swap-wrap">
        <SwapPanel className="swap">
            <div className="f-c-sb">
              <h2 className="swap-title">SWAP</h2>
              <div className="swap-setting ico-settings" onClick={ ()=>setSetting(true)} />
          </div>
          <Item className="swap-id"> <SwapItem pools={from} type={ 0 }  /></Item>
          <Item className="swap-id"> <SwapItem pools={to} type={1} exchange={ exchangeButton } /></Item>
          <SwapBar className="swap-bar">
            {swapButton}
          </SwapBar>
          {impactPrice ? swapFooter : null}
        </SwapPanel>
        </div>
      <Modal title="Advanced Settings" visible={setting} onClose={ ()=>setSetting(false)}>
        <Setting />
      </Modal>
      <Modal title="Confirm Swap" visible={confirmStatus} onClose={ ()=>setConfirmStatus(false)}>
        { confirmSwapModal }
      </Modal>
      <Modal  visible={submitStatus} onClose={ ()=>setConfirmStatus(false)}>
        { transactionSubmit }
      </Modal>
   </Fragment>
  )
}
const Item = styled.div``
const SwapBar = styled.div``
const SwapPanel = styled.div``
