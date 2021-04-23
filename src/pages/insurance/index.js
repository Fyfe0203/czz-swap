import React, { Fragment } from 'react'
import './index.scss'
import insLogo from '../../asset/svg/insurance.svg'
import ethLogo from '../../asset/svg/ETH.svg'
import czzLogo from '../../asset/svg/logos.svg'
import bscLogo from '../../asset/svg/BSC.svg'
import hecoLogo from '../../asset/svg/HECO.svg'

export default function Insurance() {
  const insItems = [
    {
      fromLogo: ethLogo,
      fromName: 'ETH',
      // toLogo: '',
      toName: 'ECZZ',
      toAmount: '111390020.34',
      policyAmount: '899232.22',
      tvlAmont: '833823432.32',
    },
    {
      fromLogo: bscLogo,
      fromName: 'BSC',
      // toLogo: '',
      toName: 'BCZZ',
      toAmount: '2390020.43',
      policyAmount: '399232.34',
      tvlAmont: '5338234321',
    },
    {
      fromLogo: hecoLogo,
      fromName: 'HECO',
      // toLogo: '',
      toName: 'HCZZ',
      toAmount: '200000.23',
      policyAmount: '3723232.11',
      tvlAmont: '73823432.21',
    },
  ]
  return (
    <div className="ins-wrap">
      <div className="ins-content">
        <div className="ins-logo-wrap">
          <div
            className="ins-logo"
            style={{ backgroundImage: `url(${insLogo})` }}
          ></div>
        </div>
        <div className="ins-head">Insurance Policy</div>
        <div className="ins-desc">
          CZZswap takes approximate 1 minute to complete, you may be subject to
          exchange rate volatility during this time. An insurance policy is
          available to mitigate this risk. The premium rate 0.1%, and the
          proceeds of sale will be distributed to reserve providers of the
          insurance contract.
        </div>
        <div className="ins-card-list">
          {insItems.map((item, index) => {
            return (
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
                    <div className="lczz-amount">{item.toAmount}</div>
                  </div>
                  <div className="policy-tvl">
                    <div className="policy-wrap">
                      <div className="potv-label">POLICY</div>
                      <div className="potv-amount">${item.policyAmount}</div>
                    </div>
                    <div className="tvl-wrap">
                      <div className="potv-label">TVL</div>
                      <div className="potv-amount">${item.tvlAmont}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
