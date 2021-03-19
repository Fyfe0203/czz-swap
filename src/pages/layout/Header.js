import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import routes from '../../routes'
import Connect from '../connect/index'
import { AppContext } from '../../context/AppGlobalState'
import './layout.scss'

export default function Header() {
  const { theme, toggleTheme } = useContext(AppContext)
  return (
    <div className="c-header">
      <div className="f-c">
        <h1 className="logo"><NavLink to="/" className="img" style={{backgroundImage:`url(${require('../../asset/svg/logo.svg').default })`}}>ClassZZSwap</NavLink></h1>
        <div className="c-nav">
          {routes.map((item, index) => index < 2 && <NavLink exact={item.exact} activeClassName="selected" className="nav-link" to={item.path} key={index} >{item.name}</NavLink>)}
        </div>
      </div>
      <div className="f-c c-tool">
        <Connect />
        <div className="theme-button" onClick={ toggleTheme }>
          <i className={theme ? 'ico-moon' : 'ico-sun'} />
        </div>
      </div>
    </div>
  )
}
