import React, { Fragment, useState } from 'react'
import { NavLink,useLocation } from 'react-router-dom'
import routes from '../../routes'
import Connect from '../connect/index'
import useGlobal from '../../hooks/useGlobal'
import './layout.scss'

export default React.memo(function Header() {
  const { theme, toggleTheme } = useGlobal()
  const locations = useLocation()
  const [menuStatus,setMenuStatus] = useState(false)
  return (
    <Fragment>
      <div className="c-header">
        <div className="f-c">
          <h1 className="logo"><NavLink to="/" className="img" style={{backgroundImage:`url(${require('../../asset/svg/logo.svg').default })`}}>ClassZZSwap</NavLink></h1>
          <div className="c-nav">
            {routes.map((item, index) => index < 2 && <NavLink exact={item.exact} activeClassName="selected" className="nav-link" to={item.path} key={index} >{item.name}</NavLink>)}
            <a href="https://classzz.gitbook.io/class-zz-heco-bsc/" target="_blank">Help</a>
          </div>
        </div>
        <div className="f-c c-tool">
          {locations.pathname === '/swap' && <Connect />}
          {/* <div className="theme-button" onClick={ toggleTheme }>
            <i className={theme ? 'ico-moon' : 'ico-sun'} />
          </div> */}
        </div>
        <div className={`menu ico-${menuStatus ? 'x' : 'menu'}`} onClick={()=> setMenuStatus(!menuStatus)} />
      </div>
      {
        menuStatus && <div className="c-menu">
          <div className="c-menu-inner">
          {routes.map((item, index) => index < 2 && <NavLink exact={item.exact} activeClassName="selected" className="nav-link" to={item.path} key={index} >{item.name}</NavLink>)}
        </div>
        </div>
      }
    </Fragment>
  )
})

