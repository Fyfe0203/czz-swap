import React, { Fragment } from "react";
import "./ins_deal.scss";
import czzLogo from "../../asset/svg/logos.svg";
import { Link } from "react-router-dom";

export default function InsDetail() {
  return (
    <div className="ins-deal-wrap">
      <div className="ins-deal-content">
        <div className="top-part">
          <div className="refresh-btn">
            <div></div>
          </div>
          <div className="lczz-logo-wrap">
            <div className="lczz-logo" style={{ backgroundImage: `url(${czzLogo})` }}>
          </div>
          </div>
          <div className="rewards-txt">Pending Rewards ECZZ</div>
          <div className="rewards-amount">11920.02</div>
          <div className="harvest-btn">Harvest</div>
        </div>
        <div className="bottom-part">
          <div className="token-staked-title-wrap">
            <div className="token-staked-title">Token Staked</div>
            <div className="extract-btn">extract</div>
          </div>
          <div className="stake-val">109220.23</div>
          <div className="stake-token-kind">ECZZ</div>
          <div className="amount-line-wrap">
            <div className="stake-amount-wrap">
              <div className="stake-amount-label">Amount of staked token</div>
              <div className="stake-amount-val">
                $<div className="stake-amount-num">1234343.3434</div>
              </div>
            </div>
            <div className="vert-line"></div>
            <div className="stake-addr-wrap">
              <div className="stake-addr-label">Amount of staked address</div>
              <div className="stake-addr-val">91</div>
            </div>
          </div>
          <div className="stake-btn-wrap">
            <div className="stake-btn">Stake</div>
          </div>
          <div className="approve-btn-wrap">
            <div className="approve-btn">Approve</div>
          </div>
          <Link to="/swap"><div className="go-swap-link">Don't have ECZZ ? Swap</div></Link>
        </div>
      </div>
    </div>
  );
}
