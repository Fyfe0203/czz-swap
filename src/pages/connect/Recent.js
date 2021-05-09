import React, { Fragment, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { Scrollbars } from 'rc-scrollbars'
import useGlobal from '../../hooks/useGlobal'
import SwapPending from '../swap/SwapPending'

// swap history
export default function Recent() {
  const { accounts } = useGlobal()
  const [recent, setRecent] = useLocalStorage('recent',[])
  const status = ['rotate-cw', 'check-circle', 'octagon']
  const [hash, setHash] = useState(null)

  const showRecent = item => {
    if(item.types === 'Swap') setHash(item)
    if(item.types === 'Approved') window.open(item.explorerUrl)
  }
  const recentList = (
    <div className="recent">
      <div className="recent-head f-c-sb">
        <div className="recent-title">Recent Transactions</div>
        <div className="recent-clear" onClick={() => setRecent([]) }>Clear All</div>
      </div>
      <div className="recent-list" >
        <Scrollbars autoHeight={ true } autoHeightMax={ 320 }>
          {
            recent.length > 0 && recent.filter(i => i.accounts === accounts).map((item, index) => {
              return (
                <div onClick={()=>showRecent(item)} key={index} className="recent-item">
                  <a href={item.explorerUrl} target="_bank">{item?.content}</a>
                  <i className={`ico ico-${status[item.status]} ${item.status === 0 ? 'loader': ''}`} />
                </div>
              )
            })
          }
      </Scrollbars>
      </div>
    </div>
  )
  
  return (
    <Fragment>
      { recent.length > 0 ? recentList  : null}
      <SwapPending visible={hash} onClose={setHash} {...hash} />
    </Fragment>
  )
}
