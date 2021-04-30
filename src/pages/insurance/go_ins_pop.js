import React from "react"
import insLogo from "../../asset/svg/insurance.svg"

export default function GoInsPop() {
  return (
    <div className="go-ins-pop">
      <div className="content">
        <div
          className="ins-logo"
          style={{ backgroundImage: `url(${insLogo})` }}
        ></div>
        <div className="ins-title">Insurance policy</div>
        <div className="ins-desc">
          CZZswap takes approximate 1 minute to complete, you may be subject to
          exchange rate volatility during this time. An insurance policy is
          available to mitigate this risk.
        </div>
        <p></p>
        <div className="ins-desc">
          The premium rate 0.1%, and the proceeds of sale will be distributed to
          reserve providers of the insurance contract.
        </div>
        <div className="btns">
          <div className="confirm-btn">Confirm</div>
          <div className="no-btn">No</div>
        </div>
      </div>
    </div>
  )
}
