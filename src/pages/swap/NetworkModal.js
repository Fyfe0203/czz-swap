import React from 'react'
import { Button,Image } from '../../compontent'
import useWallet from '../../hooks/useWallet'
import useGlobal from '../../hooks/useGlobal'

export default function NetworkModal() {
  const { addEthereum, networkNode } = useWallet()
  debugger
  const { chainName, rpcUrls,chainId,blockExplorerUrls} = networkNode
  const { from } = useGlobal()

  const BASE_TEXT = `If you have already configured this network in MetaMask, then open MetaMask -> Network Dropdown at the top of MetaMask and select ${from.networkName}.`
  const INFO_TEXT = `If you have not configured this network, then open Metamask -> Settings -> Networks -> Add Network and paste the settings below`

  return (
    <div className="network-switch">
      <Image src={ require('../../asset/svg/location.svg').default} style={{width:'100%',backgroundSize:'cover',height:200,marginBottom:10}} />
      <div className="text">
        { BASE_TEXT }
      </div>
      <div className="text">
        { INFO_TEXT }
      </div>
      {networkNode.chainId && <div className="network-node">
        <p>NetWorkName: <b>{chainName }</b></p>
        <p>RPC URL:<b>{rpcUrls[0] }</b></p>
        <p>Chain ID:<b>{chainId }</b></p>
        <p>NetWorkName:<b>{chainName}</b></p>
        <p>Currency Symbol:<b>{ }</b></p>
        <p>Block Explorer URL:<b>{blockExplorerUrls[0]}</b></p>
      </div>}
      <Button className="button block" onClick={()=> addEthereum(from) }>Unlock Wallet</Button>
    </div>
  )
}
