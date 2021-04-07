import React from 'react'
import { Button } from '../../compontent'
import useWallet from '../../hooks/useWallet'
import useGlobal from '../../hooks/useGlobal'

export default function NetworkModal() {
  const { addEthereum } = useWallet()
  const { from } = useGlobal()
  console.log(from)
  const BASE_TEXT = `If you have already configured this network in MetaMask, then open MetaMask -> Network Dropdown at the top of MetaMask and select ${from.networkName}.`
  const INFO_TEXT = `If you have not configured this network, then open Metamask -> Settings -> Networks -> Add Network and paste the settings below`

  return (
    <div className="network-switch">
       <div className="text">
        { BASE_TEXT }
      </div>
      <div className="text">
        { INFO_TEXT }
      </div>
      <Button className="button" onClick={()=> addEthereum(from) }>Unlock Wallet</Button>
    </div>
  )
}
