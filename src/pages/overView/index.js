import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import banner from '../../asset/images/saly.png'

export default function OverView() {
  return (
    <div className="home">
      <div>
        <h1>Powered by Te Waka.</h1>
        <p>Enabling connectivity between islands of DeFi.</p>
        <p><Link className="swap-button" style={{ width: 180 }} to="/swap" >Entry App</Link></p>
      </div>
      <div className="imgs" style={{backgroundImage:`url(${banner})`}}></div>
    </div>
  )
}
