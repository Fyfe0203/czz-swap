import React, { Fragment, useState, useEffect} from 'react'
import { Modal, Loading, message } from '../../compontent/index'
import useGetTokenValue from '../../hooks/useGetTokenValue'
import useSwapAndBurn from '../../hooks/useSwapAndBurn'
import useGlobal from '../../hooks/useGlobal'
import useMidPrice from '../../hooks/useMidPrice'
import Setting from './Setting'
import SwapItem from './SwapItem'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import useWallet from '../../hooks/useWallet'
import './swap.scss'
window.BigNumber = BigNumber

export default function Swap() {
  const context = useGlobal()
  const {accounts, poolsList, setPoolsList,changePools, networkStatus} = context
  const { loading, authorization, approveActions, approveLoading } = useGetTokenValue()
  const {loading: pirceLoading, impactPrice, swapStatus, swapStatusList} = useMidPrice(poolsList)
  const [setting,setSetting] = useState(false)
  const {loading: swapLoading, fetchSwap} = useSwapAndBurn()
  const [buttonLoading,setButtonLoading] = useState(false)
  const { connectWallet, loading: walletLoading } = useWallet()
  
  useEffect(() => {
    setButtonLoading(loading || swapLoading || pirceLoading)
  }, [loading, swapLoading, pirceLoading])
  
  const reverseExchange = () => {
    const list = poolsList.reverse()
    setPoolsList(list)
    changePools()
  }
  
  const networkMessage = () => {
     message({
        title: 'Network Wrong.',
        icon:'wind',
        content:'Please connect to the appropriate Ethereum network.'
      })
  }

  const swapActions = () => {
    if (networkStatus) {
      fetchSwap()
    } else {
      networkMessage()
    }
  }

  const exchangeButton = (<div className="swap-exchange f-c"><div onClick={ reverseExchange } className="ico ico-repeat" /></div>)

  const approveButton = (
    <Fragment>
      <div className="swap-button" onClick={approveLoading ? null : approveActions}>{approveLoading ? <Loading mask={true} size="small" /> : 'Approve'}</div>
    </Fragment>
  )

    const swapWarnButton = (
    <Fragment>
      <div className={`swap-button button-${swapStatus} error`}>{swapStatusList[swapStatus]}</div>
    </Fragment>
  )

  const swapingButton = (
    <Fragment>
      {poolsList[0].tokenValue && accounts ?
        <div className={`swap-button button-${buttonLoading ? '' : swapStatus} ${!accounts ? 'disable' : ''}`} onClick={buttonLoading ? null : swapActions}>
          {buttonLoading ? <Loading text="Find Best Price" size="small" /> : swapStatusList[swapStatus]}</div> :
        <div className='swap-button disable' >Enter a amount</div>}
      {!accounts && <div className="swap-button disable" onClick={ connectWallet }>Connect Wallet</div>}
    </Fragment>
  )

  const swapButton = authorization || loading || pirceLoading ? (swapStatus === 3 ?  swapWarnButton : swapingButton ) : swapStatus === 3 ? swapWarnButton : approveButton
  
  const swapFooter = (
    <div className="swap-footer">
      <div className="f-c"><span>Minimun received</span> <span><b>{poolsList[1].tokenValue}</b> { poolsList[1].symbol?.symbol}</span></div>
      <div className="f-c"><span>Price Impact</span> <span className={ `price-${swapStatus}` }>{impactPrice} %</span> </div>
      <div className="f-c"><span>Liquidity Provider Fee</span><span><b>{poolsList[0].tokenValue && new BigNumber(poolsList[0].tokenValue).multipliedBy(new BigNumber(0.0007)).toString()}</b> { poolsList[0].symbol?.symbol}</span> </div>
    </div>
  )
  return (
    <div className="swap-wrap">
    <SwapPanel className="swap">
        <div className="f-c-sb">
          <h2 className="swap-title">SWAP</h2>
          <div className="swap-setting ico-settings" onClick={ ()=>setSetting(true)} />
        </div>
        {
          poolsList.map((item, index) => {
            return (
              <Item className="swap-id" key={ index }>
                <SwapItem pools={item} type={ index } exchange={index === 1 && exchangeButton} key={ index } />
              </Item>
            )
          })
        }
        <SwapBar className="swap-bar">
          {swapButton}
        </SwapBar>
       {impactPrice ? swapFooter : null}
    </SwapPanel>
    <Modal title="Advanced Settings" visible={setting} onClose={ ()=>setSetting(false)}>
      <Setting />
    </Modal>
  </div>
  )
}

const Item = styled.div``
const SwapBar = styled.div``
const SwapPanel = styled.div``
