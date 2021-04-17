import { useEffect, useState } from 'react'
import WalletConnect from "@walletconnect/client"
import QRCodeModal from "@walletconnect/qrcode-modal"
import useGlobal from './useGlobal'
import Web3 from 'web3'

export default function useWalletConnect() {
  const [wallet,setWallet] = useState({})
  const { setState,networks } = useGlobal()
  const walletconnectAction = () => {
    const rpc = {}
    networks.forEach(item => {
      rpc[Web3.utils.hexToNumber(item.chainId)] = item.rpcUrls
    })
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
      rpc,
      qrcodeModalOptions: {
        mobileLinks: [
        //   // "rainbow",
          "metamask",
          "bitkeep",
          // "Huobi"
        //   // "argent",
        //   // "trust",
        //   // "imtoken",
        //   // "pillar",
        ],
      },
    });

    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      connector.createSession()
    }

    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      if (error) {
        throw error
      }

      const { accounts, chainId } = payload.params[0]
      setWallet({accounts,chainId})
      setState({
        wallet: { accounts, chainId },
        accounts
      })
    })
  }
  // useEffect(() => {
  //   connect()
  // },[])
  return {wallet,walletconnectAction}
}
