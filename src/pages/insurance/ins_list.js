import React, { useState } from 'react'
import './ins_list.scss'
import insLogo from '../../asset/svg/insurance.svg'
import ethLogo from '../../asset/svg/ETH.svg'
import czzLogo from '../../asset/svg/logos.svg'
import bscLogo from '../../asset/svg/BSC.svg'
import hecoLogo from '../../asset/svg/HECO.svg'
import { Link } from 'react-router-dom'
import { Modal } from '../../compontent'
import InsPolicyPop from './ins_policy_pop'

export default function Insurance() {
  const insItems = [
    // {
    //   fromLogo: ethLogo,
    //   fromName: 'ETH',
    //   // toLogo: '',
    //   toName: 'ECZZ',
    //   amountVal: '11139020.34',
    //   policyVal: '89922.22',
    //   tvlVal: '8338432.32',
    // },
    {
      fromLogo: bscLogo,
      fromName: 'BSC',
      // toLogo: '',
      toName: 'BCZZ',
      amountVal: '239020.43',
      policyVal: '39232.34',
      tvlVal: '53334321',
    },
    {
      fromLogo: hecoLogo,
      fromName: 'HECO',
      // toLogo: '',
      toName: 'HCZZ',
      amountVal: '200000.23',
      policyVal: '372332.11',
      tvlVal: '738232.21',
    },
  ]

  const [showInsPolicy, setShowInsPolicy] = useState(false)

  const onConfirm = () => {
    // do something..

    // close modal
    setShowInsPolicy(false)
  }

  return (
    <div className="ins-policy-wrap">
      <div className="ins-policy-content">
        <div className="ins-logo-wrap">
          <div
            className="ins-logo"
            style={{ backgroundImage: `url(${insLogo})` }}
          ></div>
        </div>
        <div className="ins-head">Insurance Policy</div>
        <div className="ins-desc-wrap">
          <div className="ins-desc">
            CZZswap takes approximate 1 minute to complete, you may be subject
            to exchange rate volatility during this time. An insurance policy is
            available to mitigate this risk. The premium rate 0.1%, and the
            proceeds of sale will be distributed to reserve providers of the
            insurance contract.
          </div>
        </div>
        <div className="ins-card-list">
          {insItems.map((item, index) => {
            return (
              <Link to="/harvest">
                <div className="ins-card" key={index}>
                  <div className="from-wrap">
                    <div
                      className="from-logo"
                      style={{ backgroundImage: `url(${item.fromLogo})` }}
                    ></div>
                    <div className="from-name">{item.fromName}</div>
                  </div>
                  <div className="to-wrap">
                    <div className="local-czz-wrap">
                      <div className="lczz">
                        <div
                          className="lczz-logo"
                          style={{ backgroundImage: `url(${czzLogo})` }}
                        ></div>
                        <div className="lczz-name">{item.toName}</div>
                      </div>
                    </div>
                    <div className="policy-tvl">
                      <div className="tvl-wrap">
                        <div className="potv-label">TVL</div>
                        <div className="potv-val">${item.tvlVal}</div>
                      </div>
                      <div className="policy-wrap">
                        <div className="potv-label">Fee</div>
                        <div className="potv-val">${item.policyVal}</div>
                      </div>
                      {/* <div className="amount-wrap">
                        <div className="potv-label">Amount</div>
                        <div className="potv-val">${item.amountVal}</div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <div onClick={() => setShowInsPolicy(true)}>
          open insurance policy popup. (for testing)
        </div>
        <Modal visible={showInsPolicy} onClose={() => setShowInsPolicy(false)}>
          <InsPolicyPop
            onConfirm={onConfirm}
            onCancel={() => setShowInsPolicy(false)}
          ></InsPolicyPop>
        </Modal>
      </div>
    </div>
  )
}
