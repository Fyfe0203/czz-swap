import React, { useState } from 'react'
import useGlobal from '../../hooks/useGlobal'
import { Input } from '../../compontent'
import styled from 'styled-components'
import intl from 'react-intl-universal'

function TabSelect(props) {
  const { title, unit, value } = props
  const [current,setCurrent] = useState(0)
  const valChange = v => {
    setCurrent(null)
    props.onChange(v)
  }
  const selectVal = (item,index) => {
    setCurrent(index)
    props.onChange(item)
  }
  let Custom = intl.get("Custom")

  return (
    <div className="setting-item">
      <div className="setting-title">{title} <span>{Number(value).toFixed(2)}{ unit}</span></div>
    <div className="item">
      <div className="tolerance">
        {props?.list.map((item, index) => { 
          return <div className={`tolerance-item ${current === index ? "selected" : ''}`} onClick={() => selectVal(item, index)} key={index}>{item} { unit }</div>
        })}
      </div>
        <div className="tolerance-custom">
          <div className="tolerance-input">
            <Input maxLength={2} type="number" placeholder={current === null ? value : Custom} value={current ?  '' : value} onChange={val => valChange(val)} />
          </div>
          {unit}</div>
      </div>
    </div>
  )
}

// function SelectRouter() {
//   const { wallet } = useGlobal()
//   const {networkId } = wallet
//   const routerList = [
//     {
//       networkId:'3',
//       name: 'SushiSwap',
//       router: '0x2323...293842',
//       weth: '0x2398...2983'
//     },
//     {
//       networkId:'3',
//       name: 'UNI',
//       router: '0x2323...293842',
//       weth: '0x2398...2983'
//     },
//     {
//       networkId:'256',
//       name: 'Mdex',
//       router: '0x2323...293842',
//       weth: '0x2398...2983'
//     },
//     {
//       networkId:'256',
//       name: 'DogeSwap',
//       router: '0x2323...293842',
//       weth: '0x2398...2983'
//     }
//   ]
//   const [status,setStatus] = useState(false)
//   const filters = i => i.networkId === networkId
//   return (
//     <div>
//       <div>
//       <div  onClick={()=>setStatus(true)}>{ `Select Router`}</div>
//         {status && <div>
//           {
//             routerList.filter(filters).map((item, index) => {
//               return <div key={index}>{ item.name}</div>
//             })
//           }
//         </div>}
//       </div>
//     </div>
//   )  
// }
// const routerList = [
//   {
//     networkId:'3',
//     name: 'SushiSwap',
//     router: '0x2323...293842',
//     weth: '0x2398...2983'
//   },
//   {
//     networkId:'3',
//     name: 'UNI',
//     router: '0x2323...293842',
//     weth: '0x2398...2983'
//   },
//   {
//     networkId:'256',
//     name: 'Mdex',
//     router: '0x2323...293842',
//     weth: '0x2398...2983'
//   },
//   {
//     networkId:'256',
//     name: 'DogeSwap',
//     router: '0x2323...293842',
//     weth: '0x2398...2983'
//   }
// ]

export default function Setting(props) {
  const { from, to, wallet, swapSetting, setSwapSetting } = useGlobal()
  const { router, tolerance, gas, deadline} = swapSetting
  const { chiainId } = wallet
  const toleranceArray = [0.5, 1, 1.5, 3]
  const gasArray = [160, 200, 197]
    let TransactionDeadlineNumber = intl.get("TransactionDeadlineNumber")
  console.log(swapSetting)
  // const filter = item => item.networkId === networkId
  return (
    <div className="setting">
      {/* <SettingItem title="Swap Router">
        <Select list={routerList} filter={filter} value={ router } rangeKey="name" onChange={val => setSwapSetting({router:val})} />
      </SettingItem> */}
      <TabSelect list={toleranceArray} unit={'%'} title={intl.get("SlippageTolerance")} value={tolerance} onChange={val => setSwapSetting({ tolerance: val })} />
      {Number(tolerance) > 5 && <ItemError>{intl.get("YourTransactionMayBeFrontrun")}</ItemError>}
      {/* <TabSelect list={gasArray} unit={'GWEI'} title={intl.get("GasPrice")} value={ gas } onChange={val => setSwapSetting({gas:val})} /> */}
      <SettingItem title={intl.get("TransactionDeadline")}>
          <div className="f-1 tolerance-custom init">
            <Input type="text" onChange={val => setSwapSetting({ deadline: val })} pattern={/^\d*?$/} value={deadline} placeholder={TransactionDeadlineNumber} />
          </div>
          <span>{intl.get("minutes")}</span>
      </SettingItem>
    </div>
  )
}
const ItemError = styled.div`
  font-size:12px;
  color:#ff3300;
  margin-bottom:14px;
`

function SettingItem(props){
  return (
    <div className="setting-item">
      <div className="setting-title">{props.title}</div>
      <div className="f-c-sb item">
        { props.children }
      </div>
    </div>
  )
}
