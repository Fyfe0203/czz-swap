import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import banner from '../../asset/images/saly.png'

export default function OverView() {
  return (
    <div className="home">
      <div>
        <h1>All For Your Trading.</h1>
        <p>Decentralized Full Aggregation Protocol.</p>
        <p>Guaranteed liquidity for millions of users and hundreds of Ethereum applications.</p>
        <p>liquidity providers and traders to participate in a financial marketplace that is open and accessible to all.</p>
        <p><Link className="swap-button" style={{ width: 180 }} to="/swap" >GO SWAP</Link></p>
      </div>
      <div className="imgs" style={{backgroundImage:`url(${banner})`}}></div>
    </div>
  )
}
