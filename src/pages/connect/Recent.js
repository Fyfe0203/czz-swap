import React, { Fragment,useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { Scrollbars } from 'rc-scrollbars'
import useGlobal from '../../hooks/useGlobal'
import SwapPending from '../swap/SwapPending'

export default function Recent() {
  const { accounts } = useGlobal()
  const [recent, setRecent] = useLocalStorage([], 'recent')
  const status = ['loader', 'check-circle', 'octagon']
  const [hash, setHash] = useState(null)

  const recentList = (
    <div className="recent">
      <div className="recent-head f-c-sb">
        <div className="recent-title">Recent Transactions</div>
        <div className="recent-clear" onClick={() => {return setRecent(i => [])} }>Clear All</div>
      </div>
      <div className="recent-list" >
        <Scrollbars autoHeight={ true } autoHeightMax={ 300 }>
          {
            recent.length > 0 && recent.map((item, index) => <div onClick={ ()=>setHash(item.hash)} key={ index } className="recent-item"><a href={item.explorerUrl} target="_bank"> {item?.content}</a> <i className={`ico ico-${status[item.status]}`} /></div>)
        }
      </Scrollbars>
      </div>
    </div>
  )
  return (
    <Fragment>
      {
        recent.length > 0 ? recentList: null
      }
      <SwapPending visible={hash} onClose={ ()=>setHash(false)} />
    </Fragment>
  )
}
