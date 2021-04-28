import React, { Fragment, useState } from 'react'

import InsList from './ins_list'
import InsDeal from './ins_deal'

export default function Insurance() {

  const [isShowDeal, setShowDeal] = useState(false)
  
  return (
    <div className="ins-policy">
      <div style={{display: isShowDeal ? 'none' : 'block'}}>
        <InsList />
      </div>
      <div style={{display: isShowDeal ? 'none' : 'block'}}>
        <InsDeal />
      </div>
    </div>
  )
}
