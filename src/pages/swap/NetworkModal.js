import React, { useEffect } from 'react'
import { Button,Image,Loading,Modal } from '../../compontent'
import useWallet from '../../hooks/useWallet'
import useGlobal from '../../hooks/useGlobal'

export default function NetworkModal(props) {
  const { onClose, ...rest } = props
  const { from, networkStatus} = useGlobal()
  const { addEthereum, networkNode,switchLoading } = useWallet()
  // debugger
  const { chainName, rpcUrls,chainId,blockExplorerUrls} = networkNode
  const BASE_TEXT = `If you have already configured this network in MetaMask, then open MetaMask -> Network Dropdown at the top of MetaMask and select ${from.networkName}.`
  const INFO_TEXT = `If you have not configured this network, then open Metamask -> Settings -> Networks -> Add Network and paste the settings below`

  useEffect(() => {
    if (networkStatus) {
      onClose(false)
    } 
  }, [networkStatus])

  return (
    <Modal {...rest} onClose={ onClose }>
      <div className="network-switch">
        <Image onClick={ ()=> onClose(false)} src={ require('../../asset/svg/location.svg').default} style={{width:'100%',backgroundSize:'cover',height:170, backgroundSize:'contain', marginBottom:18}} />
        <div className="text">
          { BASE_TEXT }
        </div>
        {/* <div className="text">
          { INFO_TEXT }
        </div> */}
        {networkNode.chainId && <div className="network-node">
          <p>NetWorkName: <b>{chainName }</b></p>
          <p>RPC URL:<b>{rpcUrls[0] }</b></p>
          <p>Chain ID:<b>{chainId }</b></p>
          {/* <p>Currency Symbol:<b>{ }</b></p> */}
          <p>Block Explorer URL:<b>{blockExplorerUrls[0]}</b></p>
        </div>}
        <Button className="button block" onClick={() => addEthereum(from)}>{ switchLoading ? <Loading color="#fff" size="small" text="Switch Network pending" /> : ' Switch Networks'}</Button>
      </div>
    </Modal>
  )
}
