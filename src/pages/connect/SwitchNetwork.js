import React from 'react'
import useGlobal from '../../hooks/useGlobal'
import useWallet from '../../hooks/useWallet'
import {Select} from '../../compontent'

export default function SwitchNetwork() {
  const { networks } = useGlobal()
  const { addEthereum } = useWallet()
  return (
    <div>
      <Select />
    </div>
  )
}
